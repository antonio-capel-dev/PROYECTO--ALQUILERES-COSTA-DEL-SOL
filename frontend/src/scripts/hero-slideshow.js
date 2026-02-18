// ===================================================================
// hero-slideshow.js — Crossfade de fondo en el hero · CostaSol
// -------------------------------------------------------------------
// Sin librerías. Usa dos divs absolutos (#hero-bg-a / #hero-bg-b)
// y alterna la opacidad cada 6s mediante CSS transition.
//
// Accesibilidad:
//   Si prefers-reduced-motion: reduce → muestra la primera imagen fija.
//
// Rendimiento:
//   · Pre-carga la siguiente imagen con new Image().src antes del swap.
//   · URLs con ?auto=format&fit=crop&w=1920&q=80 (Unsplash CDN optimizado).
// ===================================================================

/**
 * ── ARRAY DE IMÁGENES ────────────────────────────────────────────
 * Reemplaza estas URLs por las tuyas antes de la entrega.
 * Formato recomendado: Unsplash → ?auto=format&fit=crop&w=1920&q=80
 */
const IMAGENES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1920&q=80',
];

const INTERVALO_MS = 6000; // 6 segundos entre cada imagen

/**
 * Pre-carga la imagen en el índice dado para que el navegador la tenga
 * en caché antes de que toque mostrarla.
 * @param {number} idx
 */
function precargar(idx) {
  const img = new Image();
  img.src = IMAGENES[idx % IMAGENES.length];
}

/**
 * Punto de entrada. Importado por index.astro vía <script> bundled.
 * Astro difiere los módulos → DOM garantizado al ejecutar.
 */
export default function initHeroSlideshow() {
  const bgA = document.getElementById('hero-bg-a');
  const bgB = document.getElementById('hero-bg-b');

  // Salida silenciosa si el DOM no tiene los elementos esperados
  if (!bgA || !bgB) {
    console.warn('[HeroSlideshow] #hero-bg-a o #hero-bg-b no encontrados');
    return;
  }

  // ── Respeta prefers-reduced-motion ────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Solo muestra la primera imagen, sin animación
    bgA.style.backgroundImage = `url('${IMAGENES[0]}')`;
    return;
  }

  // ── Inicialización: primera imagen en bgA ─────────────────────
  let indiceActual = 0;
  let activo       = 'a'; // 'a' → bgA visible | 'b' → bgB visible

  bgA.style.backgroundImage = `url('${IMAGENES[0]}')`;
  // bgA ya tiene opacity-100 desde las clases Tailwind; bgB tiene opacity-0

  // Pre-carga inmediata de la segunda imagen
  precargar(1);

  // ── Intervalo de crossfade ────────────────────────────────────
  setInterval(() => {
    indiceActual = (indiceActual + 1) % IMAGENES.length;

    // El div "entrante" es el que está oculto (opacity-0)
    const entrante = activo === 'a' ? bgB : bgA;
    const saliente = activo === 'a' ? bgA : bgB;

    // 1. Poner la nueva imagen en el div oculto (aún invisible)
    entrante.style.backgroundImage = `url('${IMAGENES[indiceActual]}')`;

    // 2. Crossfade: entrante se hace visible, saliente desaparece
    //    La transición CSS (duration-1000) se encarga de la suavidad
    entrante.style.opacity = '1';
    saliente.style.opacity = '0';

    // 3. Pre-cargar la imagen siguiente para tenerla lista a tiempo
    precargar(indiceActual + 1);

    // 4. Actualizar qué div es el activo
    activo = activo === 'a' ? 'b' : 'a';
  }, INTERVALO_MS);
}
