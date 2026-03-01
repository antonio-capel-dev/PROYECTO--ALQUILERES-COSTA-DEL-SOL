/**
 * i18n Route Map — Single Source of Truth for hreflang generation.
 * 
 * Maps ES (default) URL patterns to their EN and FR equivalents.
 * Used by SeoHead.astro to generate correct hreflang tags.
 * 
 * IMPORTANT: Order matters — more specific patterns must come first.
 * Each entry uses startsWith matching, so "/zona/" will match "/zona/marbella".
 */

export interface I18nRouteMapping {
  /** ES path prefix (default locale, no prefix) */
  es: string;
  /** EN path prefix (includes /en/) */
  en: string;
  /** FR path prefix (includes /fr/) */
  fr: string;
}

/**
 * Route mappings ordered from most specific to least specific.
 * The resolver walks this list and uses the FIRST match.
 */
export const I18N_ROUTE_MAP: I18nRouteMapping[] = [
  // Property detail pages
  { es: "/propiedad/", en: "/en/property/", fr: "/fr/property/" },
  // Zone pages — only /zona/[slug] has EN/FR equivalents
  // /zona/[slug]/[categoria] is ES-only (handled via ES_ONLY_PREFIXES check)
  { es: "/zona/", en: "/en/zone/", fr: "/fr/zone/" },
  // Zones index
  { es: "/zonas", en: "/en/destinations", fr: "/fr/destinations" },
  // Guide pages (ES only — no EN/FR guide pages exist)
  { es: "/guia/", en: "", fr: "" },
  // Static pages
  { es: "/contacto", en: "/en/contact", fr: "/fr/contact" },
  { es: "/nosotros", en: "/en/about", fr: "/fr/about" },
  // Paginated listings (ES only — no EN/FR equivalent yet)
  { es: "/propiedades/", en: "", fr: "" },
  // Legal pages (ES only)
  { es: "/legal/", en: "", fr: "" },
  // Home
  { es: "/", en: "/en", fr: "/fr" },
];

/**
 * Pages that exist ONLY in ES (no EN/FR version).
 * hreflang for these pages will only emit es + x-default.
 */
export const ES_ONLY_PREFIXES: string[] = [
  "/propiedades/",
  "/legal/",
  "/guia/",
  "/nueva-propiedad",
  "/404",
];

/**
 * Given a page's current URL pathname and its detected language,
 * returns the hreflang alternate links for all available languages.
 * 
 * Returns empty array for pages that should not have hreflang
 * (e.g., 404, admin pages).
 */
export function buildHreflangLinks(
  pathname: string,
  currentLang: string,
  siteBase: string,
): { lang: string; url: string }[] {
  // Strip trailing slash for consistent matching (except root "/")
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  // Determine the ES-equivalent path (the "base" path)
  let esPath = cleanPath;
  if (currentLang === "en") {
    // Remove /en prefix and reverse-map to ES path
    const withoutPrefix = cleanPath.replace(/^\/en/, "") || "/";
    esPath = reverseMapToEs(withoutPrefix, "en");
  } else if (currentLang === "fr") {
    const withoutPrefix = cleanPath.replace(/^\/fr/, "") || "/";
    esPath = reverseMapToEs(withoutPrefix, "fr");
  }

  // Check if this is an ES-only page
  for (const prefix of ES_ONLY_PREFIXES) {
    if (esPath.startsWith(prefix)) {
      return [
        { lang: "x-default", url: `${siteBase}${esPath}` },
        { lang: "es", url: `${siteBase}${esPath}` },
      ];
    }
  }

  // Zone category pages (/zona/[slug]/[categoria]) are ES-only
  // Only /zona/[slug] (1 segment after /zona/) has EN/FR equivalents
  if (esPath.startsWith("/zona/")) {
    const segments = esPath.slice("/zona/".length).split("/").filter(Boolean);
    if (segments.length > 1) {
      return [
        { lang: "x-default", url: `${siteBase}${esPath}` },
        { lang: "es", url: `${siteBase}${esPath}` },
      ];
    }
  }

  // Build alternates for all languages
  const links: { lang: string; url: string }[] = [];

  for (const mapping of I18N_ROUTE_MAP) {
    if (esPath === mapping.es || (mapping.es.endsWith("/") && esPath.startsWith(mapping.es)) || esPath === mapping.es) {
      // Extract the slug/suffix part after the ES prefix
      const suffix = mapping.es === "/" 
        ? "" 
        : esPath.slice(mapping.es.length);

      // x-default → ES version
      const esUrl = `${siteBase}${mapping.es}${suffix}`;
      links.push({ lang: "x-default", url: esUrl });
      links.push({ lang: "es", url: esUrl });

      // EN version (only if mapping exists)
      if (mapping.en) {
        const enUrl = mapping.en === "/en" && suffix === ""
          ? `${siteBase}/en`
          : `${siteBase}${mapping.en}${suffix}`;
        links.push({ lang: "en", url: enUrl });
      }

      // FR version (only if mapping exists)
      if (mapping.fr) {
        const frUrl = mapping.fr === "/fr" && suffix === ""
          ? `${siteBase}/fr`
          : `${siteBase}${mapping.fr}${suffix}`;
        links.push({ lang: "fr", url: frUrl });
      }

      return links;
    }
  }

  // Fallback: if no pattern matched, emit only self-referencing
  return [
    { lang: "x-default", url: `${siteBase}${cleanPath}` },
    { lang: currentLang, url: `${siteBase}${cleanPath}` },
  ];
}

/**
 * Reverse-maps a path (without language prefix) back to its ES equivalent.
 * E.g., "/property/villa-sol" (from EN) → "/propiedad/villa-sol"
 */
function reverseMapToEs(pathWithoutPrefix: string, lang: "en" | "fr"): string {
  const key = lang === "en" ? "en" : "fr";

  for (const mapping of I18N_ROUTE_MAP) {
    if (!mapping[key]) continue;

    // Get the path part of the EN/FR mapping (without language prefix)
    const langPrefix = lang === "en" ? "/en" : "/fr";
    const langPath = mapping[key].startsWith(langPrefix)
      ? mapping[key].slice(langPrefix.length)
      : mapping[key];

    if (langPath === "" && pathWithoutPrefix === "") {
      return mapping.es;
    }

    if (langPath && langPath !== "/" && pathWithoutPrefix.startsWith(langPath)) {
      const suffix = pathWithoutPrefix.slice(langPath.length);
      return `${mapping.es}${suffix}`;
    }

    if (langPath === "" && pathWithoutPrefix === "/") {
      return mapping.es;
    }
  }

  // No mapping found — return as-is (ES path = input path)
  return pathWithoutPrefix || "/";
}
