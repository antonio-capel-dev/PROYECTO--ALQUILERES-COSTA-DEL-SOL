// ===================================================================
// mapa.js — Mapa interactivo Leaflet + OpenStreetMap · CostaSol
// -------------------------------------------------------------------
// Sin tokens. Sin npm. Leaflet cargado via CDN (is:inline, síncrono).
//
// Dependencias DOM:
//   #propiedades-data  → JSON inyectado por Astro en build-time (ya existe)
//   #mapa-propiedades  → contenedor div donde Leaflet monta el mapa
//   window.L           → Leaflet global, disponible porque el CDN se carga
//                        con <script is:inline> (bloqueante) antes del bundle
// ===================================================================

// Tokens de color del sistema (--color-marca-* de global.css)
const COLOR = {
  titulo: '#0f172a', // --color-marca-oscura
  subtitulo: '#64748b', // slate-500 (neutro)
  precio: '#2563eb', // --color-marca-primaria
  enlace: '#2563eb', // --color-marca-primaria
};

/** Coordenadas de fallback por zona (claves normalizadas sin acentos ni mayúsculas) */
const COORDS_ZONA = {
  'marbella': [36.5100, -4.8850],
  'malaga': [36.7213, -4.4214],
  'benalmadena': [36.5967, -4.5360],
  'torremolinos': [36.6219, -4.5007],
  'fuengirola': [36.5390, -4.6240],
  'estepona': [36.4279, -5.1459],
  'torre-del-mar': [36.7408, -4.0931],
  'torre del mar': [36.7408, -4.0931],
  'nerja': [36.7580, -3.8770],
  'mijas': [36.5960, -4.6370],
  'rincon-de-la-victoria': [36.7167, -4.2833],
  'rincon de la victoria': [36.7167, -4.2833],
  'torrox': [36.7561, -3.9525],
  'manilva': [36.3772, -5.2519],
  'casares': [36.4431, -5.2731],
  'san-pedro-de-alcantara': [36.4862, -4.9863],
  'san pedro de alcantara': [36.4862, -4.9863],
};

const COORDS_DEFAULT = [36.55, -4.70];

/**
 * Normaliza un string para búsqueda en el diccionario de zonas
 */
function normalizeStr(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/**
 * Devuelve [lat, lng] para una propiedad.
 * Prioridad: coordenadas explícitas del item > fallback por zona > centro Costa del Sol.
 */
function obtenerCoordenadas(prop) {
  if (prop.lat && prop.lng) return [prop.lat, prop.lng];
  const zonaNorm = normalizeStr(prop.zona);
  return COORDS_ZONA[zonaNorm] ?? COORDS_DEFAULT;
}

/**
 * Punto de entrada. Importado por index.astro vía <script> bundled (Astro).
 * Los módulos Astro son diferidos (type="module") → se ejecutan después de
 * DOMContentLoaded → window.L ya está disponible (CDN síncrono precargado).
 */
export default function inicializarMapa() {
  // ── Guardianes — salida silenciosa sin romper la página ──────────
  if (typeof window.L === 'undefined') {
    console.warn('[Mapa] Leaflet (window.L) no disponible. ¿Cargó el CDN?');
    return;
  }

  const contenedor = document.getElementById('mapa-propiedades');
  if (!contenedor) {
    console.warn('[Mapa] #mapa-propiedades no encontrado en el DOM');
    return;
  }

  const tag = document.getElementById('propiedades-data');
  if (!tag) {
    console.warn('[Mapa] #propiedades-data no encontrado — reutiliza el dataset inline de Astro');
    return;
  }

  let propiedades;
  try {
    propiedades = JSON.parse(tag.textContent ?? '[]');
  } catch (err) {
    console.error('[Mapa] Error al parsear #propiedades-data:', err);
    return;
  }

  if (!propiedades.length) {
    console.warn('[Mapa] Dataset vacío — no hay marcadores que mostrar');
    return;
  }

  // ── Inicializar mapa Leaflet ──────────────────────────────────────
  const mapa = window.L.map(contenedor);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mapa);

  // ── Añadir marcadores con popup ───────────────────────────────────
  const bounds = [];

  propiedades.forEach(prop => {
    const coords = obtenerCoordenadas(prop);

    const marker = window.L.marker(coords).addTo(mapa);

    // Popup: título + precio/zona + enlace a la página de detalle
    marker.bindPopup(`
      <div style="min-width:170px;font-family:system-ui,sans-serif;line-height:1.6">
        <strong style="font-size:.9rem;display:block;color:${COLOR.titulo};margin-bottom:2px">
          ${prop.titulo ?? prop.slug}
        </strong>
        <span style="font-size:.78rem;color:${COLOR.subtitulo}">
          ${prop.zona} &nbsp;·&nbsp;
          <b style="color:${COLOR.precio}">${prop.precio}€</b>/noche
        </span>
        <br>
        <a href="/propiedad/${prop.slug}"
           style="font-size:.8rem;color:${COLOR.enlace};font-weight:600;text-decoration:none;display:inline-block;margin-top:4px">
          Ver disponibilidad →
        </a>
      </div>
    `);

    bounds.push(coords);
  });

  // ── Centrar el mapa para que quepan todos los markers ────────────
  if (bounds.length > 0) {
    mapa.fitBounds(bounds, { padding: [40, 40] });
  }
}
