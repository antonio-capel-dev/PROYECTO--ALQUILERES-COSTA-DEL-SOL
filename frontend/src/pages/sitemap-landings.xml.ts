
export async function GET({ site }) {
  // Estas son las combinaciones Long Tail que vamos a generar en Phase 14
  // Zonas * Categorias
  const zones = ["marbella", "malaga", "nerja", "benalmadena", "torremolinos"];
  const categories = ["lujo", "familias", "playa", "golf", "casco-antiguo"];

  const landings = [];

  zones.forEach(zone => {
    categories.forEach(cat => {
      landings.push(`zona/${zone}/${cat}`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${landings
    .map(
      (path) => `
    <url>
      <loc>${site}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
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
