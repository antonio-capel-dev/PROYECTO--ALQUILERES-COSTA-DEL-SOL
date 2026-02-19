/**
 * ============================================================================
 * LÓGICA DE NEGOCIO AVANZADA: SISTEMA DE FILTRADO MVI
 * ============================================================================
 * Nivel: Sobresaliente (Exam Ready)
 * Arquitectura: Model-View-Intent (Unidirectional Data Flow)
 *
 * 1. MODEL (Estado): Ssource of Truth inmutable.
 * 2. VIEW (Render): Función pura f(State) -> UI.
 * 3. INTENT (Actions): Eventos del usuario que proponen cambios de estado.
 */

// ── CONSTANTES Y SELECTORES ─────────────────────────────────────────────────
const DOM = {
  DATASET: "propiedades-data",
  FORM: "formulario-filtro",
  INPUTS: {
    TEXTO: "filtro-texto",
    ZONA: "filtro-ciudad",
    VIAJEROS: "filtro-viajeros",
    PRECIO: "filtro-precio",
  },
  UI: {
    CONTADOR: "contador-resultados",
    LISTA: "carrusel-propiedades", // Contenedor de items
    ITEMS: "[data-slug]",
  },
  CLASES: {
    OCULTO: "hidden", // Tailwind
    ANIMACION: "animate-fade-in-up",
  },
};

// ── UTILS (Functional Core) ─────────────────────────────────────────────────

/**
 * Normaliza strings para busqueda (quita acentos, minusculas).
 * @param {string} txt
 * @returns {string}
 */
const normalizar = (txt) =>
  txt
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") || "";

/**
 * Crea una expresión regular dinámica segura.
 * @param {string} texto
 * @returns {RegExp}
 */
const crearRegex = (texto) => {
  try {
    // Escapamos caracteres especiales de regex para evitar crash
    const limpio = texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(limpio, "i"); // 'i' flag = case insensitive
  } catch (e) {
    return /.*/; // Fallback: coincidir todo si falla
  }
};

// ── MODEL (State Management) ────────────────────────────────────────────────

// Estado Inicial
const INITIAL_STATE = {
  filtros: {
    texto: "",
    zona: "",
    viajeros: 0,
    precioMax: null,
  },
  status: "IDLE", // 'IDLE' | 'FILTERING' | 'EMPTY' | 'SUCCESS'
  resultados: 0,
};

/**
 * Store Reactivo simple (Observer Pattern).
 */
const createStore = (initialState, subscriber) => {
  let state = { ...initialState };

  return {
    getState: () => ({ ...state }), // Return copy
    dispatch: (partialState) => {
      // Simulamos latencia mínima para feedback visual (opcional, da toque 'pro')
      // En un examen papel: state = { ...state, ...partialState }; subscriber(state);

      // Update síncrono para filtros client-side (instantáneo)
      state = { ...state, ...partialState };
      subscriber(state);
    },
  };
};

/**
 * Lógica pura de filtrado (Business Logic).
 * Aplica TODOS los filtros sobre el dataset original.
 */
const filtrarPropiedades = (dataset, filtros) => {
  const regexTexto = crearRegex(filtros.texto);
  const zonaNorm = normalizar(filtros.zona);

  return dataset.filter((p) => {
    // 1. Filtro Texto (Regex sobre titulo o zona)
    const matchTexto =
      !filtros.texto || regexTexto.test(p.titulo) || regexTexto.test(p.zona);

    // 2. Filtro Zona (Exacta)
    const matchZona = !filtros.zona || normalizar(p.zona).includes(zonaNorm); // includes permite flexibilidad "Málaga" en "Málaga Centro"

    // 3. Filtro Precio (Rango 0 - Max)
    const matchPrecio =
      filtros.precioMax === null || p.precio <= filtros.precioMax;

    // 4. Filtro Capacidad (Mínimo)
    const matchViajeros = p.capacidad >= filtros.viajeros;

    // Combinación AND (Filtros restrictivos)
    return matchTexto && matchZona && matchPrecio && matchViajeros;
  });
};

// ── VIEW (Render Layer) ─────────────────────────────────────────────────────

const actualizarContador = (n) => {
  const el = document.getElementById(DOM.UI.CONTADOR);
  if (el)
    el.textContent = `${n} ${n === 1 ? "propiedad encontrada" : "propiedades encontradas"}`;
};

const actualizarVisibilidad = (slugsVisibles) => {
  const items = document.querySelectorAll(DOM.UI.ITEMS);

  items.forEach((item) => {
    const visible = slugsVisibles.has(item.dataset.slug);

    // Manipulación eficiente de clases
    if (visible) {
      item.style.display = "";
      item.classList.remove("opacity-50", "scale-95"); // Reset anim
    } else {
      item.style.display = "none";
    }
  });
};

const render = (state, dataset) => {
  // 1. Calcular resultados
  const resultados = filtrarPropiedades(dataset, state.filtros);
  const slugsVisibles = new Set(resultados.map((p) => p.slug));

  // 2. Actualizar DOM (View)
  actualizarVisibilidad(slugsVisibles);
  actualizarContador(resultados.length);

  // 3. Manejo de 'Estados de UI' (Empty State)
  // Nota: El empty state visual lo manejamos mostrando/ocultando un div específico o por CSS.
  // Aquí delegamos en la lógica visual simple del contador + display:none.

  // Debug para Defensa:
  console.log(
    `[MVI] Estado: ${state.status}, Resultados: ${resultados.length}`,
  );
};

// ── INTENT (Event Handling) ─────────────────────────────────────────────────

export default function inicializarFiltros() {
  // 1. Bootstrapping
  const scriptData = document.getElementById(DOM.DATASET);
  if (!scriptData) return;
  const dataset = JSON.parse(scriptData.textContent || "[]");

  // 2. Store Creation
  const store = createStore(INITIAL_STATE, (newState) => {
    render(newState, dataset);
  });

  // 3. Event Listeners
  const form = document.getElementById(DOM.FORM);
  if (!form) return;

  const onFilterChange = () => {
    // Leer valores DOM
    const texto = document.getElementById(DOM.INPUTS.TEXTO)?.value || "";
    const zona = document.getElementById(DOM.INPUTS.ZONA)?.value || "";
    const viajeros = Number(
      document.getElementById(DOM.INPUTS.VIAJEROS)?.value || 0,
    );
    const precioRaw = document.getElementById(DOM.INPUTS.PRECIO)?.value;
    const precioMax = precioRaw ? Number(precioRaw) : null;

    // Dispatch Action
    store.dispatch({
      status: "FILTERING",
      filtros: { texto, zona, viajeros, precioMax },
    });
  };

  // Bind 'input' para reacción en tiempo real (Real-time search)
  // Bind 'change' para selects
  // Bind 'submit' para prevenir recarga
  ["input", "change"].forEach((evt) =>
    form.addEventListener(evt, onFilterChange),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFilterChange();
  });

  // Render inicial "clean"
  render(INITIAL_STATE, dataset);
}
