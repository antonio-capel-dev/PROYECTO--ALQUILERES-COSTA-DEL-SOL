import { defineMiddleware } from "astro:middleware";

/**
 * SEO Middleware — 301 Redirects
 * 
 * Purposes:
 * 1. Anti-canibalización: legacy URLs → canonical zone URLs
 * 2. i18n consistency: old EN path /en/propiedad/ → /en/property/
 * 3. Legal pages: old flat URLs → /legal/ subfolder
 */

const STATIC_REDIRECTS: Record<string, string> = {
  // Anti-canibalización: legacy marketing URLs → canonical zone pages
  "/alquiler-malaga": "/zona/malaga",
  "/alquiler-marbella": "/zona/marbella",
  "/alquiler-nerja": "/zona/nerja",
  "/alquiler-benalmadena": "/zona/benalmadena",
  "/alquiler-torremolinos": "/zona/torremolinos",
  "/alquiler-fuengirola": "/zona/fuengirola",
  "/alquiler-estepona": "/zona/estepona",
  "/alquiler-torre-del-mar": "/zona/torre-del-mar",
  "/marbella-familias": "/zona/marbella/familias",
  "/malaga-centro-historico": "/zona/malaga/casco-antiguo",
  // Legal pages: old flat URLs → subfolder
  "/aviso-legal": "/legal/aviso-legal",
  "/politica-privacidad": "/legal/politica-privacidad",
  "/politica-cookies": "/legal/politica-cookies",
};

/**
 * Prefix-based redirects for i18n path consistency.
 * /en/propiedad/xxx → /en/property/xxx (match FR convention)
 */
const PREFIX_REDIRECTS: { from: string; to: string }[] = [
  { from: "/en/propiedad/", to: "/en/property/" },
  { from: "/en/zona/", to: "/en/zone/" },
  { from: "/fr/zona/", to: "/fr/zone/" },
];

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;

  // 1. Static redirects (exact match)
  if (STATIC_REDIRECTS[pathname]) {
    return context.redirect(STATIC_REDIRECTS[pathname], 301);
  }

  // 2. Prefix-based redirects (pattern match)
  for (const { from, to } of PREFIX_REDIRECTS) {
    if (pathname.startsWith(from)) {
      const newPath = pathname.replace(from, to);
      return context.redirect(newPath, 301);
    }
  }

  return next();
});
