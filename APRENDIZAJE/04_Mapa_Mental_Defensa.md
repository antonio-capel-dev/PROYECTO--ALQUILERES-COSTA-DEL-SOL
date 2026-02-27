# Mapa Mental del Proyecto: Alquileres Costa del Sol

_Documento de estudio para la defensa oral de Arquitectura y Sistemas Web (DAW)._

---

## 1. Arquitectura General

- **Paradigma:** Headless / Desacoplada.
- **Separación de responsabilidades:** El Sistema de Gestión de Contenidos (CMS) no pinta la web; solo entrega datos. El cliente (Astro) se encarga exclusivamente de la vista y la velocidad.
- **Ventaja competitiva:** Seguridad (el panel del CMS no está expuesto en las rutas públicas) y rendimiento brutal frente a un monolito tradicional (como WordPress monolítico).
- _Conexión:_ Esta arquitectura se divide estrictamente en dos bloques: Frontend (Sección 2) y Backend (Sección 3).

## 2. Frontend (Astro + Tailwind)

- **Rol:** Consumidor y Presentador.
- **Enrutamiento (`src/pages/`):** File-based routing donde cada archivo `.astro` es una ruta pública o dinámica (ej: `/propiedad/[slug].astro`).
- **Modularidad (`src/components/`):** UI atomizada (Botones, Tarjetas, Formularios) que no "saben" de dónde vienen los datos, solo reciben `Props`.
- **Estado y Lógica:** JavaScript diferido y mínimo en cliente (`<script>`). La mayor parte del JS se ejecuta en el servidor durante el Build (SSG) o la peticion (SSR).
- _Conexión:_ Para que este frontend no sea un cascarón vacío de HTML, requiere datos, provenientes estrictamente del Backend (Sección 3) mediante fetching.

## 3. Backend (Strapi - Node.js)

- **Rol:** Fuente Única de Verdad (Single Source of Truth) y Gestor de Tablas.
- **Estructura Crítica (`src/api/`):** Cada colección (Rentals, Zonas) tiene su propio esquema de base de datos (`schema.json`), Controlador, y Router genérico.
- **Reusabilidad (`src/components/` de Strapi):** Bloques de datos encajables (ej: "Detalles del Inmueble" o "Metadatos SEO") que se inyectan en múltiples Content-Types para evitar esquemas gigantes y redundantes.
- _Conexión:_ Astro y Strapi no comparten código ni archivos. Hablan un idioma común detallado en el Flujo de Datos (Sección 4).

## 4. Flujo de Datos (El Viaje de la Información)

- **Paso 1 (Creación):** El gerente guarda un nuevo piso en el panel de Strapi y hace "Publicar". Strapi lo inserta en la base de datos (SQLite/PostgreSQL) a través del Controlador.
- **Paso 2 (La Petición):** El visitante entra a `alquileres-costadelsol.com`. En ese instante (SSR), Astro ejecuta un `fetch` a la URL del backend (`/api/rentals?populate=*`).
- **Paso 3 (Entrega):** Strapi devuelve un objeto JSON puro (DTO - Data Transfer Object).
- **Paso 4 (Normalización):** Astro intercepta el JSON, filtra solo las propiedades necesarias en un tipo plano (`Propiedad`) para no acoplar el componente visual a la jerarquía compleja de Strapi.
- **Paso 5 (Pintado):** El componente (ej. `<FichaAlquiler>`) recibe los datos limpios por `Props` y los inyecta en el HTML y Tailwind final que ve el usuario.

## 5. Sistema de Diseño (UI)

- **Single Source of Truth de Estilos:** El archivo `global.css` (Capa `:root`) y `tailwind.config.mjs`.
- **Tipografía Fluida:** Uso dinámico de `clamp()` para que no hayan saltos bruscos nativos en móvil vs escritorio.
- **Componentización Visual:** Clases `.boton`, `.tarjeta`, agrupadas por `@layer components` para no tener HTML obeso en las vistas.
- _Conexión:_ Este sistema asegura que el Frontend (Sección 2) sea mantenible y que los rediseños no rompan el Flujo de Datos (Sección 4).

## 6. SEO Técnico

- **Velocidad de carga (Lighthouse):** Astro inyecta el CSS crítico y aplaza el JS no esencial. Un renderizado rápido es premiado por Google.
- **Sitemaps dinámicos:** En `src/pages/sitemap.xml.ts` se levanta un script asíncrono que pregunta al backend cuántas propiedades vivas hay y escupe un XML actualizado para los motores de búsqueda.
- **JSON-LD (Structured Data):** Se inyectan esquemas estructurados de "Product" o "LodgingBusiness" en `<script type="application/ld+json">` dentro de `<FichaAlquiler>`, lo que le permite a Google indexar el precio o zona directamente en la cuadrícula de búsqueda.
- **Internacionalización (i18n):** Subdirectorios (`/en`, `/fr`) gobernados por utilidades puras y el uso de _alternate links_ y _hreflang_ en el Layout base para no canibalizar palabras clave.

## 7. Escalabilidad (¿Qué pasa si el negocio crece x100?)

- **Capa Base de Datos:** Strapi puede migrar de SQLite a PostgreSQL sin requerir que toquemos ni una línea en Astro.
- **Capa Frontend:** Si se dispara el tráfico de turistas buscando propiedades, Astro servirá el HTML y no saturará al motor Node.js. Al estar desacoplado (Headless), Astro puede desplegarse en una CDN global como Vercel o Cloudflare Edge.
- **Capa UI:** Si se contratan 5 desarrolladores nuevos, el Sistema de Diseño (Sección 5) de Tailwind v4 y los componentes estrictos impedirán que se inventen colores y rompan la solidez de la marca.

## 8. Riesgos Técnicos (Conscientes y asumidos)

- **Dependencia Estricta del Backend:** Si el motor Strapi se cae o el host apaga la máquina, Astro (en formato SSR puro) devolverá errores si no hay un sistema robusto de cachés o "Fallbacks/Empty States" bien controlados (como los fallbacks de los JSON de prueba).
- **Cambio de Estructura de Datos:** Si en el futuro altero un _Componente Core_ en Strapi y cambia la profundidad del JSON (`data.attributes.precio` a `data.precio`), Astro explotará si la función "Normalizadora" no se modifica para mapear el nuevo camino. Por ello la normalización del Flujo de Datos (Seccion 4) es la "frontera defensiva" del proyecto.
