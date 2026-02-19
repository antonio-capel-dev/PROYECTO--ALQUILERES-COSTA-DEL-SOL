// ===================================================================
// filtros.js — Filtrado dinámico client-side · CostaSol Alquiler
// -------------------------------------------------------------------
// Estrategia: SSG puro + JS vanilla.
//   1. Astro serializa el dataset en build-time → <script type="json">
//   2. Este módulo lo parsea, filtra y muestra/oculta tarjetas por slug.
//   3. Sin re-render: las tarjetas las pintó Astro, nosotros solo las mostramos.
// ===================================================================


// ── 1. OBTENER DATASET ────────────────────────────────────────────
/**
 * Lee el JSON inyectado por Astro en el elemento #propiedades-data.
 * Si falla (CMS caído, DOM corrupto), devuelve [] sin romper la página.
 * @returns {Array<{slug:string, precio:number, capacidad:number, zona:string}>}
 */
function obtenerDataset() {
  try {
    const tag = document.getElementById('propiedades-data');
    if (!tag) throw new Error('Elemento #propiedades-data no encontrado en el DOM');
    return JSON.parse(tag.textContent ?? '[]');
  } catch (err) {
    console.error('[Filtros] Error al leer el dataset:', err);
    return [];
  }
}


// ── 2. ESTADO CENTRAL ─────────────────────────────────────────────
/**
 * Objeto de estado único para los filtros activos.
 * Se muta en el listener para reflejar la selección del usuario.
 */
const filtros = {
  zona:      '',    // 'marbella' | 'malaga' | 'benalmadena' | '' (todos)
  precioMax: null,  // number | null  →  null significa "sin límite"
  viajeros:  0,     // number  →  0 significa "cualquier capacidad"
};


// ── 3. NORMALIZACIÓN ──────────────────────────────────────────────
/**
 * Convierte a minúsculas y elimina tildes/diacríticos.
 * Permite comparar 'Málaga' con 'malaga' sin falsos negativos.
 * @param {string} str
 * @returns {string}
 */
function normalizarTexto(str) {
  return str.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
}


// ── 4. FILTRADO ACUMULATIVO ───────────────────────────────────────
/**
 * Aplica los tres criterios simultáneamente con .filter().
 * Desestructuración en ambas firmas para legibilidad en defensa oral.
 *
 * @param {Array}  data     - Dataset completo
 * @param {Object} filtros  - Estado actual { zona, precioMax, viajeros }
 * @returns {Array} - Propiedades que cumplen TODOS los criterios
 */
function aplicarFiltros(data, { zona, precioMax, viajeros }) {
  return data.filter(({ zona: zonaPropiedad, precio, capacidad }) => {
    const coincideZona     = !zona      || normalizarTexto(zonaPropiedad) === normalizarTexto(zona);
    const coincidePrecio   = precioMax === null || precio    <= precioMax;
    const coincideViajeros = !viajeros  || capacidad >= viajeros;

    return coincideZona && coincidePrecio && coincideViajeros;
  });
}


// ── 5. RENDER 
/**
 * Muestra u oculta cada tarjeta según si su slug está en la lista filtrada.
 * Usa Set para búsqueda O(1) en lugar de .includes() O(n).
 *
 * @param {Array} listaFiltrada - Propiedades visibles tras aplicarFiltros()
 */
function render(listaFiltrada) {
  const slugsVisibles = new Set(listaFiltrada.map(p => p.slug));

  document.querySelectorAll('[data-slug]').forEach(tarjeta => {
    tarjeta.style.display = slugsVisibles.has(tarjeta.dataset.slug) ? '' : 'none';
  });

  actualizarContador(listaFiltrada.length);
}


// ── 6. CONTADOR 
/**
 * Actualiza el span #contador-resultados con el número de resultados.
 * @param {number} n
 */
function actualizarContador(n) {
  const el = document.getElementById('contador-resultados');
  if (el) {
    el.textContent = `${n} ${n === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}`;
  }
}


// ── 7. INICIALIZACIÓN 
/**
 * Punto de entrada. Importado por index.astro vía <script> bundled.
 * Astro difiere los scripts de módulo
 */
export default function inicializarFiltros() {
  const data = obtenerDataset();
  if (!data.length) return; // falla silenciosa; error ya logueado arriba

  render(data); // render inicial → todas las tarjetas visibles

  const formulario = document.getElementById('formulario-filtro');
  if (!formulario) {
    console.error('[Filtros] #formulario-filtro no encontrado en el DOM');
    return;
  }

  
  const actualizar = () => {
    filtros.zona     = document.getElementById('filtro-ciudad')?.value    ?? '';
    filtros.viajeros = parseInt(document.getElementById('filtro-viajeros')?.value) || 0;

    const precioRaw  = parseFloat(document.getElementById('filtro-precio')?.value);
    filtros.precioMax = isNaN(precioRaw) ? null : precioRaw;

    render(aplicarFiltros(data, filtros));
  };

  formulario.addEventListener('change', actualizar);                          // tiempo real
  formulario.addEventListener('submit', e => { e.preventDefault(); actualizar(); }); // botón Buscar
}
