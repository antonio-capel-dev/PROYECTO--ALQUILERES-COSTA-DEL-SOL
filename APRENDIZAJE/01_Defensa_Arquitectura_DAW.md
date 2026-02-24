# Resumen de Arquitectura: Astro (Frontend) y Strapi (Backend)

Esta guía te ayudará a comprender la organización de tu proyecto, justificar tus decisiones ante el tribunal de 2º de DAW y evitar los errores más comunes.

---

## 🏗️ 1. FRONTEND (Astro)

Astro es el motor de nuestro frontend. Está diseñado para rendir al máximo (orientado a contenido) consumiendo la API de nuestro backend.

### `src/pages/`

1. **Para qué sirve:** Es el núcleo del enrutamiento (File-based routing). Cada archivo aquí es una URL accesible de la web.
2. **Responsabilidad:** Gestionar la petición HTTP, pedir los datos a Strapi (SSR o SSG en _build time_) y devolver el HTML.
3. **Tipo de archivos:** `.astro`, `.js`/`.ts` (para endpoints de API o sitemaps como `sitemap.xml.ts`).
4. **Relación:** Llama a los `layouts` para la estructura general y a los `components` para dibujar la UI. Consume la API de Strapi usando variables de `src/config/`.
5. **Si no existiera:** Tu web no tendría URLs. Daría 404 en todas partes. No habría aplicación.
6. **En defensa oral:** _"La carpeta pages es el enrutador de mi aplicación. Aquí aplico Server-Side Rendering o generación estática para pedir datos a Strapi y despachar HTML optimizado, maximizando el SEO."_
7. **Errores comunes (Alumnos):** Meter lógica de negocio compleja aquí o maquetar componentes gigantes en vez de extraerlos a `src/components`.

### `src/components/`

1. **Para qué sirve:** Almacena piezas de interfaz de usuario reutilizables (Botones, Tarjetas, Headers, Héroes).
2. **Responsabilidad:** Recibir propiedades (`Props`) y renderizar un bloque de HTML/CSS de forma aislada e independiente.
3. **Tipo de archivos:** Exclusivamente `.astro` (o `.jsx`/`.svelte` si usas integraciones).
4. **Relación:** Son importados e instanciados por las `pages` o por los `layouts`. No gestionan el enrutamiento.
5. **Si no existiera:** Estarías duplicando código HTML en cada página. Mantenimiento nulo (Spaghetti code visual).
6. **En defensa oral:** _"He encapsulado la interfaz en componentes aislados bajo el principio DRY (Don't Repeat Yourself), permitiendo escalabilidad y facilidad para realizar refactorings globales, como mis Botones o mis Tarjetas de Alquiler."_
7. **Errores comunes (Alumnos):** Hacer que los componentes pidan datos directamente a la base de datos (fetch a Strapi) en vez de recibir los datos mediante `Props` desde la página actual.

### `src/layouts/`

1. **Para qué sirve:** Define la "plantilla maestra" o esqueleto de las páginas (el típico `<head>`, `<body>`, Navbar y Footer).
2. **Responsabilidad:** Proveer la estructura HTML base y los metadatos globales (títulos, descripciones SEO) para que las páginas solo inyecten el contenido interior vía `<slot />`.
3. **Tipo de archivos:** Archivos `.astro` como `Layout.astro`.
4. **Relación:** Las `pages` envuelven su contenido usando el componente Layout.
5. **Si no existiera:** Tendrías que escribir la etiqueta `<html>`, `<head>`, los `<meta>` y el Navbar en cada una de las rutas manualmente.
6. **En defensa oral:** _"Mi Layout.astro centraliza la estructura del documento y las inyecciones de SEO dinámico. Así garantizo que las cabeceras y el pie de página sean consistentes sin duplicar código."_
7. **Errores comunes (Alumnos):** Mezclar lógica específica de una vista con la estructura maestra.

---

## 🗄️ 2. BACKEND (Strapi)

Strapi actúa como un Headless CMS. Sólo sirve datos crudos (JSON), no renderiza vistas.

### `src/api/`

1. **Para qué sirve:** Contiene el corazón de la base de datos y los endpoints. Strapi organiza todo por colecciones (ej: `rentals`, `zonas`).
2. **Responsabilidad:** Definir el esquema (Schema) de la base de datos (qué campos tiene un alquiler), enrutar peticiones HTTP y gestionar los controladores y servicios que procesan la lógica de la base de datos (ej: filtrar, crear reservas).
3. **Tipo de archivos:** Archivos `.json` (para definir esquemas) y `.js`/`.ts` para separar la lógica de Controladores (Controllers), Servicios (Services) y Enrutadores (Routes).
4. **Relación:** Expone las URLs (por ejemplo `/api/rentals`) que consumirá nuestro frontend en Astro desde sus `pages`.
5. **Si no existiera:** El backend sería un cascarón vacío. No tendrías tablas de base de datos ni Endpoints a los que consultar.
6. **En defensa oral:** _"La carpeta API de Strapi define mis tablas mediante JSONs y levanta automáticamente los endpoints genéricos de lectura y escritura para ser consumidos por Astro."_
7. **Errores comunes (Alumnos):** Alterar los esquemas JSON directamente a mano y corromper la instancia de Strapi, en lugar de crearlos visualmente en el Content-Type Builder.

### `src/components/` (de Strapi)

1. **Para qué sirve:** Define bloques de datos reutilizables (no botones de UI), sino estructuras de base de datos encajables (ej: _SEO Metadata_, _Detalles del Inmueble_).
2. **Responsabilidad:** Permitir que varios Content-Types compartan los mismos campos sin reescribirlos.
3. **Tipo de archivos:** Carpetas categóricas con archivos `.json` esquemáticos.
4. **Relación:** Se inyectan como relaciones y componentes lógicos dentro de los esquemas de nuestra `src/api/`.
5. **Si no existiera:** Los esquemas de la base de datos serían gigantes e inmanejables, con campos repetidos.
6. **En defensa oral:** _"Para evitar redundancia de base de datos, he abstraído bloques de información como el SEO o amenities en componentes de Strapi, permitiendo que cualquier entidad futura pueda implementar estos campos rápidamente."_
7. **Errores comunes (Alumnos):** No normalizar la base de datos y crear tablas gigantes.

---

## 🎙️ Guion Final de Defensa (2 minutos)

> "Buenos días. Para respaldar este sistema de Alquiler Vacacional, he optado por una **Arquitectura Desacoplada (Headless)** moderna.
>
> He separado estrictamente roles: **Strapi** como backend y **Astro** como motor frontend.
>
> En la parte de **Strapi**, he centralizado los esquemas de base de datos dentro del directorio `src/api`. Allí, he implementado **Componentes de Strapi**, como los bloques de SEO o detalles técnicos, permitiendo reciclar la estructura de datos para _Inmuebles_, _Zonas_ o _Páginas_. Así garantizo consistencia escalar y un mantenimiento sano.
>
> Una vez gestionado el dato, he levantado mi cliente SSR con **Astro**. He estructurado el enrutamiento visual en `src/pages`, que actúa estrictamente como controlador haciendo peticiones al backend. No permito la duplicación visual: todo elemento iterativo lo he atomizado en `src/components`, que reciben únicamente las propiedades necesarias (`Props`). Todo esto se inyecta en `src/layouts` para mantener las cabeceras semánticas automatizadas, que provienen del backend dinámicamente.
>
> ¿El resultado? Un sistema mantenible que procesa el dato en el back, renderiza HTML con rendimiento sobresaliente en el front, y cumple el principio DRY protegiendo al sistema de malas prácticas. Muchas gracias."
