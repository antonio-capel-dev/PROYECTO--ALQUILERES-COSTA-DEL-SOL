
export async function GET({ site }) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  let properties = [];

  try {
    const res = await fetch(`${STRAPI_URL}/api/rentals?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=100`);
    const json = await res.json();
    properties = json.data || [];
  } catch (error) {
    console.error("Error generating properties sitemap:", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${properties
    .map(
      (prop) => `
    <url>
      <loc>${site}propiedad/${prop.slug}</loc>
      <lastmod>${prop.updatedAt || new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
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
