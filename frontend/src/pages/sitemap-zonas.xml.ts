
export async function GET({ site }) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  
  // Zonas Hardcoded por ahora (Estrategia: Priorizar las Money Zones)
  // En un futuro se pueden sacar de Strapi si hubiera un endpoint de "Zonas"
  const zones = [
    "marbella",
    "malaga",
    "benalmadena",
    "torremolinos",
    "nerja",
    "fuengirola",
    "mijas",
    "estepona",
    "torre-del-mar"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${zones
    .map(
      (slug) => `
    <url>
      <loc>${site}zona/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
