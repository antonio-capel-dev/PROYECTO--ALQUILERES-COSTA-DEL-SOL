/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Redirigiendo Identidad a Variables CSS puras del sistema
        marca: {
          oscura: "var(--color-texto-principal)",
          primaria: "var(--color-principal)",
          secundaria: "var(--color-secundario)",
          acento: "var(--color-acento)",
          purpura: "var(--color-purpura)",
          clara: "var(--color-fondo)",
          superficie: "var(--color-superficie)",
          borde: "var(--color-borde)",
        },
      },
      fontFamily: {
        // Tipografía legible y moderna garantizada
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
