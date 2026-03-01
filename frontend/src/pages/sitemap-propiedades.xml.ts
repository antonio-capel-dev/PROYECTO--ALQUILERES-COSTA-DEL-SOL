import propiedades20 from "../data/propiedades_20.json";

export async function GET({ site }) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  let properties: any[] = [];

  try {
    const res = await fetch(`${STRAPI_URL}/api/rentals?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=100`);
    const json = await res.json();
    properties = json.data || [];
  } catch (error) {
    console.error("Error generating properties sitemap:", error);
  }

  if (properties.length === 0) {
    properties = (propiedades20 as any[]).map((p: any) => ({
      slug: p.slug,
      updatedAt: new Date().toISOString(),
    }));
  }

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

  function makeUrl(loc: string, lastmod: string, prio: string, alternates: string) {
    return [
      `    <url>`,
      `      <loc>${loc}</loc>`,
      `      <lastmod>${lastmod}</lastmod>`,
      `      <changefreq>daily</changefreq>`,
      `      <priority>${prio}</priority>`,
      alternates,
      `    </url>`,
    ].join("\n");
  }

  const urls: string[] = [];
  for (const prop of properties) {
    const lastmod = prop.updatedAt || new Date().toISOString();
    const esUrl = `${SITE}/propiedad/${prop.slug}`;
    const enUrl = `${SITE}/en/property/${prop.slug}`;
    const frUrl = `${SITE}/fr/property/${prop.slug}`;
    const a = makeAlt(esUrl, enUrl, frUrl);
    urls.push(makeUrl(esUrl, lastmod, "1.0", a));
    urls.push(makeUrl(enUrl, lastmod, "0.9", a));
    urls.push(makeUrl(frUrl, lastmod, "0.9", a));
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
