// ===================================================================
// carrusel.js — Navegación con flechas para el carrusel de propiedades
// -------------------------------------------------------------------
// Sin librerías externas. Usa la API nativa scrollBy + scroll-snap CSS.
//
// Dependencias DOM:
//   #carrusel-propiedades  → contenedor flex scrollable
//   #btn-prev              → flecha izquierda
//   #btn-next              → flecha derecha
// ===================================================================

/**
 * Devuelve el ancho de la primera tarjeta visible en el carrusel.
 * Usamos getBoundingClientRect() para obtener el tamaño real renderizado
 * (respeta responsive, zoom del navegador y el gap del flex).
 *
 * Las tarjetas tienen data-slug; el wrapper oculto tiene style.display='none'
 * (lo pone filtros.js), así que buscamos el primer hijo no oculto.
 *
 * @param {HTMLElement} carrusel
 * @returns {number} píxeles a desplazar por cada clic
 */
function obtenerAnchoPaso(carrusel) {
  const primerVisible = [...carrusel.children].find(
    el => el.style.display !== 'none'
  );
  // Fallback: un tercio del contenedor si no hay tarjetas visibles
  return primerVisible
    ? primerVisible.getBoundingClientRect().width
    : carrusel.offsetWidth / 3;
}

/**
 * Punto de entrada. Importado por index.astro vía <script> bundled.
 * Astro difiere los módulos → DOM garantizado al ejecutar.
 */
export default function inicializarCarrusel() {
  const carrusel = document.getElementById('carrusel-propiedades');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');

  // Salida silenciosa si el carrusel no está en el DOM (página sin propiedades)
  if (!carrusel || !btnPrev || !btnNext) return;

  btnPrev.addEventListener('click', () => {
    carrusel.scrollBy({
      left:     -obtenerAnchoPaso(carrusel),
      behavior: 'smooth',
    });
  });

  btnNext.addEventListener('click', () => {
    carrusel.scrollBy({
      left:     obtenerAnchoPaso(carrusel),
      behavior: 'smooth',
    });
  });
}
