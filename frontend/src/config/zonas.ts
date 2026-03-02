/**
 * FUENTE DE VERDAD ÚNICA — Imágenes de zona y fallbacks de propiedades.
 * Importar desde aquí en HeroZona.astro y en index.astro.
 * Garantiza que la tarjeta de zona (Home) y el hero de /zona/[slug]
 * muestren EXACTAMENTE la misma imagen, sin lógica duplicada.
 */

// Mapa curado: slug → ruta local de imagen de zona (WebP optimizadas)
export const IMAGENES_ZONA: Record<string, string> = {
  marbella:        "/images/zonas/marbella.webp",
  malaga:          "/images/zonas/malaga.webp",
  benalmadena:     "/images/zonas/benalmadena.webp",
  "torre-del-mar": "/images/zonas/torre-del-mar.webp",
  nerja:           "/images/zonas/nerja.webp",
  fuengirola:      "/images/zonas/fuengirola.webp",
  torremolinos:    "/images/zonas/torremolinos.webp",
  mijas:           "/images/zonas/mijas.webp",
  estepona:        "/images/zonas/marbella-costa.webp", // sin imagen propia → coastal fallback
};

export const IMAGEN_ZONA_FALLBACK = "/images/zonas/hero-costa-del-sol.webp";

// Fallbacks para propiedades sin foto (deterministas por slug)
export const FALLBACKS_PROPIEDAD = [
  "/images/propiedades/prop-0.webp",
  "/images/propiedades/prop-1.webp",
  "/images/propiedades/prop-2.webp",
  "/images/propiedades/prop-3.webp",
];

/**
 * Devuelve un fallback de imagen determinista por slug.
 * Garantiza que la misma propiedad siempre muestre la misma imagen
 * aunque el orden del listado cambie o Strapi no tenga foto subida.
 *
 * Fuente única: todos los componentes deben importar esta función
 * en lugar de calcular el índice inline.
 */
export function fallbackPorSlug(slug: string): string {
  const idx =
    slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    FALLBACKS_PROPIEDAD.length;
  return FALLBACKS_PROPIEDAD[idx];
}
