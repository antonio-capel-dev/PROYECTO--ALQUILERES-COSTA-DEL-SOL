/**
 * getZonaSlug — Single source of truth para derivar el slug de zona de cualquier propiedad.
 *
 * Prioridad: ubicacion.slug → normalizar(ubicacion.nombre) → normalizar(zona) → normalizar(location) → ""
 *
 * Regla del profesor: una sola función, reutilizada en todas las páginas.
 * Nada hardcodeado, nada inline, nada duplicado.
 */

export function normalizarSlug(txt: string): string {
  return (
    txt
      ?.toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || ""
  );
}

export function getZonaSlug(property: any): string {
  if (property.ubicacion?.slug) return property.ubicacion.slug;
  if (property.ubicacion?.nombre) return normalizarSlug(property.ubicacion.nombre);
  if (property.zona) return normalizarSlug(property.zona);
  if (property.location) return normalizarSlug(property.location);

  if (import.meta.env.DEV) {
    console.warn(
      `[getZonaSlug] Propiedad "${property.slug ?? property.titulo ?? "?"}" sin zona asignada.`
    );
  }

  return "";
}

export function getZonaNombre(property: any): string {
  return (
    property.ubicacion?.nombre ||
    property.zona ||
    property.location ||
    "Costa del Sol"
  );
}
