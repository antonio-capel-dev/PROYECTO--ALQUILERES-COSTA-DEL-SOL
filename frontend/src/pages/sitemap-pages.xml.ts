
export async function GET({ site }) {
  const pages = [
    "",
    "nosotros",
    "contacto",
    "legal/aviso-legal",
    "legal/politica-privacidad",
    "legal/politica-cookies",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (path) => `
    <url>
      <loc>${site}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
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
