/**
 * isInZona — Determina si una propiedad pertenece a una zona por su slug.
 *
 * Usa getZonaSlug (single source of truth) por debajo.
 * Comparación exacta (===), no substring (.includes).
 */

import { getZonaSlug } from "./getZonaSlug";

export function isInZona(property: any, zonaSlug: string): boolean {
  return getZonaSlug(property) === zonaSlug;
}
