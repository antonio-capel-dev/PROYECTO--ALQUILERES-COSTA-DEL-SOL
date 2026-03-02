import guiasSeed from "../data/guias_seed.json";

export async function GET({ site }: { site: URL }) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  let guias: any[] = [];

  try {
    const res = await fetch(`${STRAPI_URL}/api/guias?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=100`);
    const json = await res.json();
    guias = json.data || [];
  } catch (error) {
    console.error("Error generating guides sitemap:", error);
  }

  if (guias.length === 0) {
    guias = (guiasSeed as any[])
      .filter((g: any) => g.publicada !== false)
      .map((g: any) => ({
        slug: g.slug,
        updatedAt: new Date().toISOString(),
      }));
  }

  const s = String(site);
  const SITE = s.endsWith("/") ? s.slice(0, -1) : s;

  function makeUrl(loc: string, lastmod: string) {
    return [
      `    <url>`,
      `      <loc>${loc}</loc>`,
      `      <lastmod>${lastmod}</lastmod>`,
      `      <changefreq>monthly</changefreq>`,
      `      <priority>0.6</priority>`,
      `    </url>`,
    ].join("\n");
  }

  const urls: string[] = [];
  for (const guia of guias) {
    const lastmod = guia.updatedAt || new Date().toISOString();
    const esUrl = `${SITE}/guia/${guia.slug}`;
    urls.push(makeUrl(esUrl, lastmod));
  }

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls.join("\n"),
    `</urlset>`,
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
