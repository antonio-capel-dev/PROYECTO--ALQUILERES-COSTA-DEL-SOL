import propiedades20 from "../data/propiedades_20.json";
import { IMAGENES_ZONA } from "../config/zonas";

export async function GET({ site }) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  let zones: string[] = [];

  try {
    const res = await fetch(`${STRAPI_URL}/api/ubicacions?fields[0]=slug&pagination[limit]=100`);
    const json = await res.json();
    const data = json.data || [];
    if (data.length > 0) {
      zones = data.map((z: any) => z.slug);
    }
  } catch {
    // Strapi no disponible
  }

  if (zones.length === 0) {
    const normalize = (txt: string) =>
      txt ? txt.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") : "";
    const set = new Set<string>();
    (propiedades20 as any[]).forEach((p: any) => {
      if (p.zona) set.add(normalize(p.zona));
    });
    zones = Array.from(set);
  }

  const zonesSet = new Set(zones);
  for (const slug of Object.keys(IMAGENES_ZONA)) {
    zonesSet.add(slug);
  }
  zones = Array.from(zonesSet);

  const s = String(site);
  const SITE = s.endsWith("/") ? s.slice(0, -1) : s;

  function makeAlt(esUrl: string, enUrl: string, frUrl: string) {
    return [
      `      <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
    ].join("\n");
  }

  function makeUrl(loc: string, lastmod: string, freq: string, prio: string, alternates: string) {
    return [
      `    <url>`,
      `      <loc>${loc}</loc>`,
      `      <lastmod>${lastmod}</lastmod>`,
      `      <changefreq>${freq}</changefreq>`,
      `      <priority>${prio}</priority>`,
      alternates,
      `    </url>`,
    ].join("\n");
  }

  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  for (const slug of zones) {
    const esUrl = `${SITE}/zona/${slug}`;
    const enUrl = `${SITE}/en/zone/${slug}`;
    const frUrl = `${SITE}/fr/zone/${slug}`;
    const a = makeAlt(esUrl, enUrl, frUrl);
    urls.push(makeUrl(esUrl, lastmod, "weekly", "0.9", a));
    urls.push(makeUrl(enUrl, lastmod, "weekly", "0.8", a));
    urls.push(makeUrl(frUrl, lastmod, "weekly", "0.8", a));
  }

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    urls.join("\n"),
    `</urlset>`,
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
