/**
 * imagenes.ts — Fuente única de verdad para construcción de URLs de imagen.
 *
 * Regla: ningún otro archivo debe construir URLs de Strapi manualmente.
 * Todos los componentes importan desde aquí.
 */

// ── Tipos ────────────────────────────────────────────────────────────────────

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export type PreferredFormat = keyof NonNullable<StrapiMedia["formats"]>;

// ── URL builder ──────────────────────────────────────────────────────────────

const STRAPI_BASE =
  import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Convierte una ruta relativa de Strapi en URL absoluta.
 * Si ya es absoluta (http/https), la devuelve sin cambios.
 */
export function buildStrapiUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${STRAPI_BASE}${path}`;
}

// ── Resolución de imagen ─────────────────────────────────────────────────────

export interface ResolvedImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Devuelve src, width, height y alt a partir de un objeto StrapiMedia.
 * Prefiere el formato indicado si existe; si no, usa el original.
 */
export function resolveStrapiImage(
  media: StrapiMedia,
  preferFormat: PreferredFormat = "medium",
): ResolvedImage {
  const format = media.formats?.[preferFormat];
  return {
    src: buildStrapiUrl(format?.url ?? media.url),
    width: format?.width ?? media.width ?? 800,
    height: format?.height ?? media.height ?? 600,
    alt: media.alternativeText ?? "",
  };
}
