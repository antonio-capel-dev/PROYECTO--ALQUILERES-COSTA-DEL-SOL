/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Identidad de Marca "Alquileres Costa del Sol" (Extracted from Homepage)
        brand: {
          dark: "#0f172a", // slate-900 (Fondos Hero / Footer)
          primary: "#2563eb", // blue-600 (Botones / Gradient Start)
          secondary: "#3b82f6", // blue-500 (Gradient End / Hover)
          accent: "#06b6d4", // cyan-500 (Glows / Destacados / Gradient Text)
          purple: "#9333ea", // purple-600 (Hero Gradient Overlay)
          light: "#f8fafc", // slate-50 (Fondos Sección)
        },
      },
      fontFamily: {
        // Tipografía legible y moderna
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
