/**
 * fetchPropiedades — Fuente única de datos para propiedades en build-time.
 *
 * Intenta Strapi con populate explícito.
 * Si falla → fallback a propiedades_20.json local.
 *
 * NUNCA devuelve []. Siempre hay datos (al menos los 20 del seed).
 */

import propiedades20 from "../../data/propiedades_20.json";
import { normalizarRentalLocal } from "../../utils/normalizadores";

export interface RawPropiedad {
  slug: string;
  title?: string;
  titulo?: string;
  price?: number;
  precio?: number;
  description?: string;
  zona?: string;
  location?: string;
  ubicacion?: { nombre: string; slug: string; imagen?: { url: string } };
  image?: any;
  image_url?: string;
  detalles?: { capacidad?: number; habitaciones?: number; banos?: number; metros?: number };
  Servicios?: { wifi?: boolean; aire_acondicionado?: boolean; parking?: boolean; mascotas?: boolean };
  [key: string]: any;
}

export type DataSource = "strapi" | "local";

export async function fetchPropiedades(): Promise<{ data: RawPropiedad[]; source: DataSource }> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/rentals?` +
      `fields[0]=title&fields[1]=slug&fields[2]=price&fields[3]=description&fields[4]=location&` +
      `populate[ubicacion][fields][0]=nombre&populate[ubicacion][fields][1]=slug&` +
      `populate[image][fields][0]=url&populate[image][fields][1]=formats&populate[image][fields][2]=alternativeText&` +
      `populate[detalles]=*&` +
      `populate[Servicios]=*&` +
      `pagination[limit]=200`
    );
    const json = await res.json();
    const data = json.data || [];
    if (data.length > 0) return { data, source: "strapi" };
  } catch {
    // Strapi no disponible
  }

  // Fallback: JSON local (siempre disponible, 20 propiedades)
  return {
    data: (propiedades20 as any[]).map((p) => ({
      ...p,
      title: p.titulo,
      price: p.precio,
      slug: p.slug,
    })),
    source: "local",
  };
}
