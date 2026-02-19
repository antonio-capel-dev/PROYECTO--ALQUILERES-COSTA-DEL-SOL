
export async function GET({ site }) {
  const sitemaps = [
    "sitemap-pages.xml",
    "sitemap-zonas.xml",
    "sitemap-propiedades.xml",
    "sitemap-landings.xml" // Para las landings de atributo (fase 14)
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (file) => `
    <sitemap>
      <loc>${site}${file}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`
    )
    .join("")}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
