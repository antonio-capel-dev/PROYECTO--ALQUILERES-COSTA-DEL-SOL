# Guía de Componentes y Arquitectura para Defensa Oral

_(Por tu Mentor Técnico - 2º DAW)_

Este documento te da la munición exacta para justificar _por qué_ has programado las cosas como las has programado. Si el tribunal te señala un archivo, usa estos argumentos.

---

### 1. `Layout.astro` (El Esqueleto)

- **Qué responsabilidad tiene:** Define el armazón HTML de toda la web (las etiquetas `<html>`, `<body>`, `<main>`).
- **Qué problema resuelve:** Evita que tengas que copiar y pegar repetitivamente las etiquetas estructurales de HTML5 en cada página que creas.
- **Qué pasaría si no existiera:** Tu código tendría cientos de líneas duplicadas. Si un día el cliente quiere añadir un script de Google Analytics, tendrías que pegarlo a mano en las 15 páginas de tu proyecto.
- **Defensa oral (30s):** _"El Layout actúa como el contenedor maestro (Wrapper) del proyecto bajo el principio DRY. Me garantiza que todas las inyecciones en el `<head>` y la estructura básica del `<body>` se mantengan centralizadas."_

### 2. `Header` y `Footer` (La Navegación Constante)

- **Qué responsabilidad tiene:** Proveer la navegación principal y el pie de página legal en todas las vistas.
- **Qué problema resuelve:** Centraliza los enlaces vitales (Menú, Idioma, Legal) para que el usuario nunca se pierda.
- **Qué pasaría si no existiera:** El usuario llegaría a la ficha de una propiedad y no sabría cómo volver al inicio o contactar a la inmobiliaria, matando la retención (Bounce Rate del 100%).
- **Defensa oral (30s):** _"Son componentes UI de presencia global. Al aislarlos, me aseguro de que cualquier cambio en una ruta del menú o un enlace de privacidad se propague instantáneamente a todo el site sin tocar las vistas individuales."_

### 3. `Boton.astro` (El Componente Atómico)

- **Qué responsabilidad tiene:** Renderizar de forma consistente cualquier acción interactiva (botones de compra, enlaces de llamadas a la acción).
- **Qué problema resuelve:** Unifica el aspecto visual. Gestiona variantes ("primario", "outline") y evita botones deformados o distintos en cada página.
- **Qué pasaría si no existiera:** En una sección el botón sería azul con bordes curvos, y en otra sería celeste cuadrado, transmitiendo una imagen de marca amateur (Spaghetti CSS).
- **Defensa oral (30s):** _"Es un ejemplo de un componente atómico puro. Recibe propiedades (Props) como la variante o el tamaño, aislando el CSS de Tailwind. Esto impide que el diseño pueda romperse por un error humano en el HTML."_

### 4. `FichaAlquiler.astro` / Card (La Presentación del Dato)

- **Qué responsabilidad tiene:** Pintar los datos crudos de una propiedad (Precio, Título, Imagen) dentro de un rectángulo visual agradable.
- **Qué problema resuelve:** Aísla la maquetación compleja de las grillas. Recibe un JSON abstracto y devuelve un elemento DOM listo para insertarse en vitrinas o mapas.
- **Qué pasaría si no existiera:** Tu archivo `index.astro` tendría 200 líneas de HTML solo para pintar los resultados de búsqueda, haciéndolo incomprensible e inmantenible.
- **Defensa oral (30s):** _"La Tarjeta es un componente de presentación "tonto" (Dumb Component). No le importa de qué base de datos viene la información, sólo exige recibir un contrato estricto de *Props* (precio, título, imagen) para renderizarse."_

### 5. `filtros.js` (La Interacción del Cliente)

- **Qué responsabilidad tiene:** Leer lo que busca el usuario (ej: "Benalmádena", "Max 150€") y ocultar/mostrar las tarjetas (`Cards`) en tiempo real.
- **Qué problema resuelve:** Permite hacer búsquedas ultrarrápidas sin recargar la página ni pedirle los datos otra vez a la base de datos (Strapi).
- **Qué pasaría si no existiera:** El usuario tendría que leerse 250 alquileres a mano buscando los de su presupuesto, y se iría de la web a los 5 segundos.
- **Defensa oral (30s):** _"Inyecto un dataset JSON en el HTML oculto, y uso JavaScript Vainilla para mutar el DOM en el navegador instántaneamente usando atributos de datos (`data-slug`). Así no saturemos al servidor con peticiones inútiles."_

### 6. `propiedad/[slug].astro` (El Enrutamiento Dinámico)

- **Qué responsabilidad tiene:** Funciona como una "plantilla en blanco" que genera una página web nueva y automática por cada piso que haya en Strapi.
- **Qué problema resuelve:** Automatiza la creación de páginas. No tienes que crear `piso-marbella-1.html`, `piso-marbella-2.html`. Haces la plantilla una vez, y Astro genera mil páginas solas.
- **Qué pasaría si no existiera:** Si la inmobiliaria compra un piso nuevo, tendrías que abrir tu editor de código y programar su página individual a mano cada día.
- **Defensa oral (30s):** _"Uso las Dynamic Routes de Astro para construir todas mis vistas mediante SSR. El archivo captura el `[slug]` de la URL, interroga a Strapi por ese piso específico, y me devuelve los datos inyectados en la plantilla."_

### 7. `SeoHead.astro` (El Motor de Google)

- **Qué responsabilidad tiene:** Pintar las meta-etiquetas (`<title>`, `<meta name="description">`, OpenGraph) invisibles para el humano pero vitales para las máquinas.
- **Qué problema resuelve:** Permite que cada página tenga un título distinto en Google, y una foto portada única si alguien comparte el enlace en WhatsApp o Twitter.
- **Qué pasaría si no existiera:** Tu web saldría en Google con el título "Documento sin título" y nadie te encontraría al buscar "Alquileres Costa del Sol".
- **Defensa oral (30s):** _"He centralizado las etiquetas \<head\> en un componente aislado. Al recibir los datos de Strapi dinámicamente, automatizo la generación de tarjetas de Twitter y el SEO OpenGraph, vital para el marketing."_

### 8. Variables CSS / Tokens (`global.css`)

- **Qué responsabilidad tiene:** Almacenar colores y tamaños oficiales en un solo lugar (Variables de Entorno Estéticas).
- **Qué problema resuelve:** Impide a los desarrolladores inventarse colores. Si el color primario es `marca-primaria`, todos lo usan. No vale poner `blue-500` crudo (Hardcode).
- **Qué pasaría si no existiera:** Habría un caos visual, el "Síndrome Frankenstein" donde cada bloque de la web parece estar hecho por una empresa distinta.
- **Defensa oral (30s):** _"He integrado Tailwind con Variables CSS Nativas bajo la filosofía de Tokens de Diseño. Esto me permite hacer restylings masivos de toda la web tocando únicamente un archivo de configuración, sin modificar HTML."_

### 9. El archivo de Configuración (`navigation.ts` / `zonas.ts`)

- **Qué responsabilidad tiene:** Guardar datos fijos de la aplicación como los enlaces del menú o las fotos por defecto de cada ciudad en un diccionario estricto.
- **Qué problema resuelve:** Actúa de Single Source of Truth (Fuente única de verdad) para datos genéricos estáticos que no necesitan vivir en una base de datos.
- **Qué pasaría si no existiera:** Si un enlace o traducción cambiara, tendrías que hacer "Buscar y Reemplazar" en 20 archivos distintos, asumiendo el riesgo de olvidar alguno.
- **Defensa oral (30s):** _"Extraje las constantes estructurales a un módulo de TypeScript de configuración pura. Esto descongestiona las vistas de Astro y previene errores de tipeo al mapear los menús."_

### 10. Normalización de Datos (`normalizarStrapi`)

- **Qué responsabilidad tiene:** Traducir el JSON complejo que devuelve la API de Strapi en un formato plano y simple que la FichaAlquiler entienda fácilmente.
- **Qué problema resuelve:** Actúa de "amortiguador" o adaptador. Desacopla la base de datos de la interfaz visual.
- **Qué pasaría si no existiera:** Todo el código visual de tu web dependería de la forma exacta del JSON de Strapi. Si Strapi cambia la API en una versión futura, toda tu web se colgaría.
- **Defensa oral (30s):** _"Uso el patrón de software DTO (Data Transfer Object) mediante una función normalizadora. Atrapo el objeto crudo que escupe el backend y lo plancho, protegiendo a mis componentes Reactivos/Visuales (UI) de posibles mutaciones en la estructura de la base de datos."_
