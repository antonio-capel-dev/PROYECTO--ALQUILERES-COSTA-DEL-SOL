/**
 * normalizadores.ts — Transformación canónica de datos externos al tipo Propiedad.
 *
 * Regla: ninguna página ni componente normaliza rentals inline.
 * Toda la aplicación usa normalizarRentalStrapi() o normalizarRentalLocal().
 *
 * Campos reales de ApiRentalRental (contentTypes.d.ts):
 *   slug, title, price, description, location, city,
 *   image (Media), detalles (Component), Servicios (Component),
 *   ubicacion (Relation → Ubicacion), metaTitle, metaDescription.
 *
 * Campos que NO existen en Strapi y se eliminan del frontend:
 *   tipo, image_url.
 */

import type { StrapiMedia } from "./imagenes";

// ── Tipo compartido ───────────────────────────────────────────────────────────

export type Propiedad = {
  slug: string;
  titulo: string;
  zona: string;
  precio: number;
  capacidad: number;
  habitaciones?: number;
  /** Objeto media completo de Strapi (formats, dimensions, alternativeText). */
  image?: StrapiMedia;
  /** URL directa — exclusivo del seed JSON local (propiedades_20.json). */
  image_url?: string;
};

// ── Normalizadores ────────────────────────────────────────────────────────────

/**
 * Transforma un objeto raw de la API de Strapi 5 al tipo Propiedad.
 *
 * Solo mapea campos que existen en ApiRentalRental.
 * En DEV emite console.warn si el rental no tiene imagen subida al CMS,
 * lo que indica que se mostrará el fallback determinista por slug.
 */
export function normalizarRentalStrapi(r: any): Propiedad {
  if (import.meta.env.DEV && !r.image) {
    console.warn(
      `[normalizarRentalStrapi] "${r.slug ?? "sin-slug"}" no tiene imagen en Strapi. ` +
        `Sube una imagen en /admin para evitar el fallback.`,
    );
  }

  return {
    slug: r.slug ?? "",
    titulo: r.title ?? "Sin título",
    // ubicacion.nombre es el campo real del modelo Ubicacion.
    // r.location es el campo string plano del propio Rental (legacy).
    zona: r.ubicacion?.nombre ?? r.location ?? "",
    precio: r.price ?? 0,
    // Defaulta a 4 si el componente inmueble.detalles no está relleno.
    capacidad: r.detalles?.capacidad ?? 4,
    habitaciones: r.detalles?.habitaciones,
    // Preservamos el objeto media completo — PropertyImage extrae formats/dimensions/alt.
    image: r.image ?? undefined,
    // image_url no existe en el schema de Strapi: no se mapea.
  };
}

/**
 * Transforma un objeto del seed JSON local (propiedades_20.json) al tipo Propiedad.
 */
export function normalizarRentalLocal(p: any): Propiedad {
  return {
    slug: p.slug,
    titulo: p.titulo,
    zona: p.zona,
    precio: p.precio,
    capacidad: p.capacidad,
    habitaciones: p.habitaciones,
    image_url: p.image_url,
  };
}
