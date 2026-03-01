/**
 * buildZonas — Construye la lista completa de zonas para getStaticPaths.
 *
 * 1. Extrae zonas de los datos de propiedades (Strapi o JSON local).
 * 2. Fusiona zonas definidas en IMAGENES_ZONA (config/zonas.ts) para garantizar
 *    que zonas como Nerja, Mijas o Estepona siempre tengan pagina,
 *    incluso sin propiedades asociadas.
 */

import { IMAGENES_ZONA } from "../../config/zonas";
import { fetchPropiedades } from "./fetchPropiedades";
import { getZonaSlug, getZonaNombre } from "./getZonaSlug";
import { isInZona } from "./isInZona";

export interface ZonaInfo {
  slug: string;
  nombre: string;
  imagen?: any;
}

/** Nombres legibles para las zonas de config que no aparecen en datos */
const NOMBRES_ZONA: Record<string, string> = {
  marbella: "Marbella",
  malaga: "Malaga",
  benalmadena: "Benalmadena",
  torremolinos: "Torremolinos",
  fuengirola: "Fuengirola",
  nerja: "Nerja",
  "torre-del-mar": "Torre del Mar",
  mijas: "Mijas",
  estepona: "Estepona",
};

export async function buildZonasConPropiedades() {
  const { data: propiedades, source } = await fetchPropiedades();

  const zonasMap = new Map<string, ZonaInfo>();
  propiedades.forEach((p: any) => {
    const slug = getZonaSlug(p);
    if (!slug) return;
    if (!zonasMap.has(slug)) {
      zonasMap.set(slug, {
        slug,
        nombre: getZonaNombre(p),
        imagen: p.ubicacion?.imagen,
      });
    }
  });

  // Fusionar zonas de config que no esten ya en los datos
  for (const slug of Object.keys(IMAGENES_ZONA)) {
    if (!zonasMap.has(slug)) {
      zonasMap.set(slug, {
        slug,
        nombre: NOMBRES_ZONA[slug] || slug.charAt(0).toUpperCase() + slug.slice(1),
      });
    }
  }

  const zonas = Array.from(zonasMap.values());

  const paths = zonas.map((zona) => {
    const propsDeZona = propiedades.filter((p: any) => isInZona(p, zona.slug));
    return {
      params: { slug: zona.slug },
      props: { zona, propiedades: propsDeZona, todasLasZonas: zonas, dataSource: source },
    };
  });

  return paths;
}
