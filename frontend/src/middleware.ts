import { defineMiddleware } from "astro:middleware";

const REDIRECTS: Record<string, string> = {
  "/alquiler-malaga": "/zona/malaga",
  "/alquiler-marbella": "/zona/marbella",
  "/alquiler-nerja": "/zona/nerja",
  "/marbella-familias": "/zona/marbella/familias",
  "/malaga-centro-historico": "/zona/malaga",
  "/aviso-legal": "/legal/aviso-legal",
  "/politica-privacidad": "/legal/politica-privacidad",
};

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;
  
  if (REDIRECTS[pathname]) {
    return context.redirect(REDIRECTS[pathname], 301);
  }
  
  return next();
});
