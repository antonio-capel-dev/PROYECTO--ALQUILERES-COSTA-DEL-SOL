export async function GET({ site }) {
  const s = String(site);
  const SITE = s.endsWith("/") ? s.slice(0, -1) : s;

  const i18nPages = [
    ["", "en", "fr"],
    ["nosotros", "en/about", "fr/about"],
    ["contacto", "en/contact", "fr/contact"],
  ];

  const esOnlyPages = [
    "legal/aviso-legal",
    "legal/politica-privacidad",
    "legal/politica-cookies",
  ];

  const lastmod = new Date().toISOString();

  function makeAlt(esUrl: string, enUrl: string, frUrl: string) {
    return [
      `      <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />`,
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
    ].join("\n");
  }

  function makeUrl(loc: string, lastmod: string, freq: string, prio: string, alternates?: string) {
    const lines = [
      `    <url>`,
      `      <loc>${loc}</loc>`,
      `      <lastmod>${lastmod}</lastmod>`,
      `      <changefreq>${freq}</changefreq>`,
      `      <priority>${prio}</priority>`,
    ];
    if (alternates) lines.push(alternates);
    lines.push(`    </url>`);
    return lines.join("\n");
  }

  const urls: string[] = [];

  for (const [es, en, fr] of i18nPages) {
    const esUrl = `${SITE}/${es}`;
    const enUrl = `${SITE}/${en}`;
    const frUrl = `${SITE}/${fr}`;
    const prio = es === "" ? "1.0" : "0.8";
    const a = makeAlt(esUrl, enUrl, frUrl);
    urls.push(makeUrl(esUrl, lastmod, "monthly", prio, a));
    urls.push(makeUrl(enUrl, lastmod, "monthly", "0.7", a));
    urls.push(makeUrl(frUrl, lastmod, "monthly", "0.7", a));
  }

  for (const p of esOnlyPages) {
    urls.push(makeUrl(`${SITE}/${p}`, lastmod, "monthly", "0.5"));
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
