import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://alquileres-costadelsol.com",
  integrations: [],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "fr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    // Anti-cannibalization: legacy marketing URLs -> canonical zone pages
    "/alquiler-malaga": "/zona/malaga",
    "/alquiler-marbella": "/zona/marbella",
    "/alquiler-nerja": "/zona/nerja",
    "/alquiler-benalmadena": "/zona/benalmadena",
    "/alquiler-torremolinos": "/zona/torremolinos",
    "/alquiler-fuengirola": "/zona/fuengirola",
    "/alquiler-estepona": "/zona/estepona",
    "/alquiler-torre-del-mar": "/zona/torre-del-mar",
    // Legal pages consolidation
    "/aviso-legal": "/legal/aviso-legal",
    "/politica-privacidad": "/legal/politica-privacidad",
    "/politica-cookies": "/legal/politica-cookies",
  },
});
