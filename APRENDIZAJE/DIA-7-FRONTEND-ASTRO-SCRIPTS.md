# DÍA 7 — Frontend: Astro SSG + Scripts del Cliente
## Carrusel · Mapa Leaflet · Hero Slideshow · Filtros client-side

---

## ÍNDICE

1. [Arquitectura del frontend](#1-arquitectura-del-frontend)
2. [Patrón de scripts en Astro SSG](#2-patrón-de-scripts-en-astro-ssg)
3. [filtros.js — Filtrado client-side con data-slug](#3-filtrosjs--filtrado-client-side-con-data-slug)
4. [carrusel.js — Carrusel con scroll-snap nativo CSS](#4-carruseljs--carrusel-con-scroll-snap-nativo-css)
5. [mapa.js — Mapa interactivo con Leaflet + OpenStreetMap](#5-mapajs--mapa-interactivo-con-leaflet--openstreetmap)
6. [hero-slideshow.js — Crossfade de fondo sin librerías](#6-hero-slideshowjs--crossfade-de-fondo-sin-librerías)
7. [index.astro — Integración de todos los sistemas](#7-indexastro--integración-de-todos-los-sistemas)
8. [Conceptos CSS avanzados usados](#8-conceptos-css-avanzados-usados)
9. [Preguntas de examen tipo test](#9-preguntas-de-examen-tipo-test)

---

## 1. Arquitectura del frontend

### ¿Qué es Astro SSG?

Astro SSG (Static Site Generator) genera HTML estático en tiempo de compilación (build time).
Cuando el usuario visita la web, recibe HTML ya construido — no hay servidor Node ejecutándose.

```
DESARROLLO                     PRODUCCIÓN
-----------                    -----------
src/pages/index.astro          dist/index.html  ← HTML puro, listo
src/scripts/filtros.js    →    dist/_astro/filtros.js (bundleado)
src/data/propiedades.json      (consumido en build, no se expone)
```

### Por qué SSG para alquileres vacacionales

| Característica | SSG (Astro) | SSR (Next.js/Remix) |
|---|---|---|
| Velocidad | Máxima (HTML pre-generado) | Media (renderiza en cada request) |
| Coste servidor | Casi 0 (solo archivos estáticos) | Necesita Node.js corriendo |
| SEO | Perfecto (HTML completo en carga) | Bueno (con hidratación) |
| Datos en tiempo real | No (requiere re-build) | Sí |
| Ideal para | Catálogos, portfolios, landings | Dashboards, e-commerce dinámico |

### Estructura de archivos del proyecto (frontend)

```
frontend/
├── src/
│   ├── pages/
│   │   └── index.astro          ← Página principal (genera dist/index.html)
│   ├── components/
│   │   ├── RentalCard.astro     ← Tarjeta de propiedad
│   │   └── SearchBar.astro      ← Barra de búsqueda/filtros
│   ├── scripts/                 ← JS del cliente (se bundlea con Vite)
│   │   ├── filtros.js           ← Filtrado sin recarga de página
│   │   ├── carrusel.js          ← Navegación por flechas
│   │   ├── mapa.js              ← Mapa Leaflet interactivo
│   │   └── hero-slideshow.js    ← Crossfade de imágenes de fondo
│   ├── data/
│   │   └── propiedades_20.json  ← Dataset de 20 propiedades (fallback)
│   └── styles/
│       └── global.css           ← Tailwind v4 + @theme personalizado
└── astro.config.mjs
```

---

## 2. Patrón de scripts en Astro SSG

### Problema: ¿Cómo ejecutar JS en el cliente con Astro?

Astro es "JavaScript opcional". Por defecto, los componentes .astro NO envían JS al navegador.
Para tener interactividad, usamos un bloque `<script>` al final de la página.

### Dos tipos de `<script>` en Astro

```astro
<!-- TIPO 1: Script bundleado por Vite (recomendado para código propio) -->
<!-- Astro lo procesa, resuelve imports, lo minifica y lo defiere automáticamente -->
<script>
  import inicializarFiltros from '../scripts/filtros.js';
  inicializarFiltros();
</script>

<!-- TIPO 2: Script inline — Astro NO lo toca -->
<!-- Útil para: CDN externos, código que DEBE ser síncrono -->
<script is:inline src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### ¿Por qué `type="module"` y por qué el DOM está garantizado?

Los scripts bundleados por Astro se emiten como `type="module"`.
Los módulos ES6 se ejecutan de forma diferida (equivalente a `defer`).
Esto garantiza que el DOM esté completamente cargado cuando el código JS se ejecuta.

```
Orden de carga:
1. HTML parseado → DOM construido
2. Scripts type="module" ejecutados (DESPUÉS del DOM)
3. → filtros(), carrusel(), mapa(), slideshow() corren con DOM disponible
```

### El patrón: funciones de inicialización exportadas

Cada script sigue el mismo patrón:

```javascript
// Cada archivo exporta UNA función de inicialización
export default function inicializarAlgo() {
  // 1. Buscar elementos del DOM
  const elemento = document.getElementById('mi-id');

  // 2. Salida silenciosa si el elemento no existe
  if (!elemento) {
    console.warn('[MiScript] Elemento no encontrado');
    return;
  }

  // 3. Lógica del script
  elemento.addEventListener('click', () => { /* ... */ });
}
```

```astro
<!-- index.astro — punto de entrada unificado -->
<script>
  import inicializarFiltros  from '../scripts/filtros.js';
  import inicializarCarrusel from '../scripts/carrusel.js';
  import inicializarMapa     from '../scripts/mapa.js';
  import initHeroSlideshow   from '../scripts/hero-slideshow.js';

  // Ejecutar todas las inicializaciones
  inicializarFiltros();
  inicializarCarrusel();
  inicializarMapa();
  initHeroSlideshow();
</script>
```

### Dataset inline: inyección de datos en build-time

El reto: los scripts del cliente necesitan los datos de las propiedades,
pero Astro ya terminó de ejecutar el servidor cuando el JS del cliente corre.

Solución: inyectar los datos en el HTML como JSON oculto.

```astro
<!-- En el frontmatter de Astro (servidor, build-time): -->
---
const dataset = data.map(({ slug, zona, precio, capacidad, titulo }) => ({
  slug, zona, precio, capacidad, titulo,
}));
---

<!-- En el HTML (se convierte en JSON plano en el build): -->
<script type="application/json" id="propiedades-data" is:inline
  set:html={JSON.stringify(dataset)} />
```

```javascript
// En el cliente (navegador), filtros.js lee ese JSON:
const tag = document.getElementById('propiedades-data');
const propiedades = JSON.parse(tag.textContent);
// → Array con los datos de las 20 propiedades
```

**¿Por qué `type="application/json"`?**
El navegador NO ejecuta scripts con ese tipo — solo almacena el texto.
Es el método estándar para pasar datos del servidor al cliente sin variables globales.

---

## 3. filtros.js — Filtrado client-side con data-slug

### El problema a resolver

El catálogo tiene 20 propiedades. El usuario quiere filtrar por zona, precio y capacidad
SIN recargar la página (sin ir al servidor).

### Concepto: data-attributes como "etiquetas" en el DOM

HTML permite añadir cualquier atributo que empiece por `data-`:

```html
<!-- En RentalCard.astro -->
<article
  data-slug="villa-marbella-piscina-4h-8p"
  class="...tarjeta..."
>
  <!-- contenido -->
</article>

<!-- En index.astro — el WRAPPER del carrusel también lleva data-slug -->
<div data-slug="villa-marbella-piscina-4h-8p"
     class="flex-none basis-full md:basis-1/2 lg:basis-1/3 snap-start">
  <RentalCard {...prop} />
</div>
```

**¿Por qué data-slug en el wrapper Y en el article?**

Si ocultamos solo el `<article>`, el wrapper vacío sigue ocupando espacio en el flex/grid.
Al ocultar el wrapper con `display:none`, desaparece completamente del layout.

```
Sin data-slug en wrapper:          Con data-slug en wrapper:
┌──────┬──────┬──────┐            ┌──────┬──────┐
│ Card │ VOID │ Card │     →      │ Card │ Card │
└──────┴──────┴──────┘            └──────┴──────┘
   wrapper vacío visible              wrapper oculto
```

### Arquitectura de filtros.js

```javascript
// ── 1. Datos del dataset (inyectados en build-time) ──────────────────────────
const tag = document.getElementById('propiedades-data');
const PROPIEDADES = JSON.parse(tag.textContent ?? '[]');
// → [{ slug, zona, precio, capacidad, titulo }, ...]

// ── 2. Estado de filtros activos ─────────────────────────────────────────────
let filtrosActivos = {
  zona:       'todas',    // string
  precioMax:  Infinity,   // number
  capacidad:  0,          // number mínimo
};

// ── 3. Función pura: ¿esta propiedad pasa el filtro? ─────────────────────────
function pasaFiltros(prop) {
  if (filtrosActivos.zona !== 'todas' && prop.zona !== filtrosActivos.zona) return false;
  if (prop.precio > filtrosActivos.precioMax) return false;
  if (prop.capacidad < filtrosActivos.capacidad) return false;
  return true;
}

// ── 4. Render: actualiza el DOM según los filtros ────────────────────────────
function render() {
  // Set de slugs visibles (O(1) lookup)
  const visibles = new Set(
    PROPIEDADES.filter(pasaFiltros).map(p => p.slug)
  );

  // Ocultar/mostrar wrappers del carrusel
  document.querySelectorAll('[data-slug]').forEach(tarjeta => {
    tarjeta.style.display = visibles.has(tarjeta.dataset.slug) ? '' : 'none';
  });

  // Actualizar contador
  const contador = document.getElementById('contador-resultados');
  if (contador) {
    const n = visibles.size;
    contador.textContent = `${n} ${n === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}`;
  }
}
```

### ¿Por qué usar `Set` en lugar de `Array.includes()`?

```javascript
// Lento: O(n) por cada tarjeta — si hay 1000 props, son 1000*1000 = 1.000.000 operaciones
const visibles = PROPIEDADES.filter(pasaFiltros).map(p => p.slug);
tarjeta.style.display = visibles.includes(slug) ? '' : 'none';

// Rápido: O(1) lookup — Set usa tabla hash
const visibles = new Set(PROPIEDADES.filter(pasaFiltros).map(p => p.slug));
tarjeta.style.display = visibles.has(slug) ? '' : 'none';
```

### Event listeners de los controles de filtro

```javascript
// Selector de zona
const selectZona = document.getElementById('filtro-zona');
selectZona.addEventListener('change', (e) => {
  filtrosActivos.zona = e.target.value;
  render();
});

// Slider de precio máximo
const sliderPrecio = document.getElementById('filtro-precio');
sliderPrecio.addEventListener('input', (e) => {
  filtrosActivos.precioMax = Number(e.target.value);
  document.getElementById('precio-valor').textContent = `${e.target.value}€`;
  render();
});

// Selector de capacidad mínima
const selectCapacidad = document.getElementById('filtro-capacidad');
selectCapacidad.addEventListener('change', (e) => {
  filtrosActivos.capacidad = Number(e.target.value);
  render();
});
```

---

## 4. carrusel.js — Carrusel con scroll-snap nativo CSS

### ¿Qué es CSS scroll-snap?

CSS scroll-snap hace que el scroll "encaje" en posiciones predefinidas,
como un carrusel, pero usando solo CSS sin JavaScript de posicionamiento.

### Las clases Tailwind que lo hacen funcionar

```html
<!-- Contenedor scrollable -->
<div
  id="carrusel-propiedades"
  class="flex overflow-x-auto snap-x snap-mandatory gap-6"
  style="scrollbar-width: none;"
>
  <!-- Cada item del carrusel -->
  <div
    data-slug="villa-marbella"
    class="flex-none basis-full md:basis-1/2 lg:basis-1/3 snap-start"
  >
    <RentalCard ... />
  </div>
</div>
```

| Clase Tailwind | CSS generado | Efecto |
|---|---|---|
| `overflow-x-auto` | `overflow-x: auto` | Scroll horizontal activado |
| `snap-x` | `scroll-snap-type: x` | Snap en eje horizontal |
| `snap-mandatory` | `scroll-snap-type: x mandatory` | El snap es obligatorio (siempre encaja) |
| `snap-start` | `scroll-snap-align: start` | Cada item encaja por su borde izquierdo |
| `flex-none` | `flex-shrink: 0` | Las tarjetas no se encogen |
| `basis-1/3` | `flex-basis: 33.333%` | Cada tarjeta ocupa 1/3 del ancho |
| `scrollbar-width: none` | (estilo inline) | Oculta la scrollbar en Firefox |

### carrusel.js — Lógica de flechas

Las flechas no controlan la posición directamente — solo llaman a `scrollBy()`.
El CSS scroll-snap se encarga de que el scroll termine en la posición correcta.

```javascript
export default function inicializarCarrusel() {
  const carrusel = document.getElementById('carrusel-propiedades');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');

  if (!carrusel || !btnPrev || !btnNext) return;

  // Calcular el ancho de una tarjeta (excluye las ocultas por filtros)
  function obtenerAnchoPaso() {
    const primerVisible = [...carrusel.children].find(
      el => el.style.display !== 'none'
    );
    return primerVisible
      ? primerVisible.getBoundingClientRect().width
      : carrusel.offsetWidth / 3;  // fallback: 1/3 del contenedor
  }

  btnNext.addEventListener('click', () => {
    carrusel.scrollBy({
      left: obtenerAnchoPaso(),
      behavior: 'smooth'    // animación CSS nativa, sin JS
    });
  });

  btnPrev.addEventListener('click', () => {
    carrusel.scrollBy({
      left: -obtenerAnchoPaso(),
      behavior: 'smooth'
    });
  });
}
```

### Compatibilidad con filtros.js

Cuando filtros.js oculta una tarjeta con `display:none`, `obtenerAnchoPaso()`
busca el primer elemento visible con `.find(el => el.style.display !== 'none')`.
Así el scroll siempre se calcula sobre tarjetas reales.

---

## 5. mapa.js — Mapa interactivo con Leaflet + OpenStreetMap

### ¿Qué es Leaflet?

Leaflet es la librería de mapas interactivos de código abierto más popular del mundo.
Usa OpenStreetMap como fuente de tiles (azulejos de mapa) — sin coste, sin API key.

### El problema de timing: Leaflet global vs módulos diferidos

```
Orden de carga en el navegador:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTML parseado
  │
  ├── <link rel="stylesheet" href="leaflet.css">     ← CSS cargado
  │
  ├── <script is:inline src="leaflet.js">            ← BLOQUEANTE (síncrono)
  │     → window.L = { map, tileLayer, marker... }   ← L disponible aquí
  │
  └── <script type="module">                         ← DIFERIDO
        import inicializarMapa from '...'            ← Se ejecuta DESPUÉS
        inicializarMapa()                            ← window.L ya existe ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Clave:** `is:inline` en Astro = el script se carga de forma bloqueante (síncrona).
Los módulos `type="module"` son diferidos. Por eso `window.L` siempre está disponible
cuando `inicializarMapa()` corre.

### Estructura de mapa.js

```javascript
// Coordenadas de fallback por zona (propiedades sin lat/lng explícito)
const COORDS_ZONA = {
  'Marbella':     [36.5100, -4.8850],
  'Málaga':       [36.7213, -4.4214],
  'Benalmádena':  [36.5967, -4.5360],
  'Torremolinos': [36.6219, -4.5007],
  'Fuengirola':   [36.5390, -4.6240],
  'Estepona':     [36.4279, -5.1459],
};

export default function inicializarMapa() {
  // Guard 1: Leaflet cargado
  if (typeof window.L === 'undefined') {
    console.warn('[Mapa] Leaflet no disponible');
    return;
  }

  // Guard 2: contenedor en el DOM
  const contenedor = document.getElementById('mapa-propiedades');
  if (!contenedor) return;

  // Guard 3: datos disponibles
  const tag = document.getElementById('propiedades-data');
  const propiedades = JSON.parse(tag?.textContent ?? '[]');
  if (!propiedades.length) return;

  // ── Inicializar mapa Leaflet ──────────────────────────────────────────
  const mapa = window.L.map(contenedor);

  // Tiles de OpenStreetMap (gratuito, sin API key)
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapa);

  // ── Marcadores ────────────────────────────────────────────────────────
  const bounds = [];

  propiedades.forEach(prop => {
    const coords = prop.lat && prop.lng
      ? [prop.lat, prop.lng]
      : (COORDS_ZONA[prop.zona] ?? [36.55, -4.70]);

    const marker = window.L.marker(coords).addTo(mapa);

    // Popup HTML (Leaflet acepta HTML en los popups)
    marker.bindPopup(`
      <div style="min-width:170px">
        <strong>${prop.titulo ?? prop.slug}</strong>
        <br>
        <span>${prop.zona} · <b>${prop.precio}€</b>/noche</span>
        <br>
        <a href="/propiedad/${prop.slug}">Ver disponibilidad →</a>
      </div>
    `);

    bounds.push(coords);
  });

  // Centrar automáticamente para que quepan todos los markers
  if (bounds.length > 0) {
    mapa.fitBounds(bounds, { padding: [40, 40] });
  }
}
```

### Reutilización del dataset: diseño DRY

El mismo `#propiedades-data` lo usan tres scripts distintos:
- `filtros.js` → para saber qué tarjetas mostrar/ocultar
- `mapa.js` → para saber dónde poner los marcadores
- (en el futuro) cualquier otro script que necesite los datos

Esto es el principio **DRY** (Don't Repeat Yourself): un solo origen de datos.

---

## 6. hero-slideshow.js — Crossfade de fondo sin librerías

### El patrón de dos divs para crossfade

En lugar de animar una sola imagen (que causaría un flash al cambiar),
usamos DOS divs que se alternan:

```
Estado inicial:        Transición:           Estado final:
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ bg-a: img1  │ op=1   │ bg-a: img1  │ op=1→0 │ bg-a: img1  │ op=0
│ bg-b: vacío │ op=0   │ bg-b: img2  │ op=0→1 │ bg-b: img2  │ op=1
└─────────────┘        └─────────────┘        └─────────────┘
                              ↑ 1 segundo de CSS transition
```

### El HTML en index.astro

```html
<!-- Los dos divs de fondo, posición absoluta, uno encima del otro -->
<div
  id="hero-bg-a"
  class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100"
></div>
<div
  id="hero-bg-b"
  class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
></div>

<!-- Overlay para garantizar legibilidad del texto -->
<div class="absolute inset-0 bg-black/45"></div>

<!-- Contenido por encima (z-10) -->
<div class="relative z-10 ...">
  <h1>Alquiler Vacacional</h1>
</div>
```

### hero-slideshow.js completo explicado

```javascript
const IMAGENES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920',
  // ... 5 más
];
const INTERVALO_MS = 6000; // cada 6 segundos

// Pre-carga la imagen N para que esté en caché cuando toque mostrarla
function precargar(idx) {
  const img = new Image();
  img.src = IMAGENES[idx % IMAGENES.length]; // módulo para no salirse del array
}

export default function initHeroSlideshow() {
  const bgA = document.getElementById('hero-bg-a');
  const bgB = document.getElementById('hero-bg-b');
  if (!bgA || !bgB) return;

  // ── Accesibilidad: respetar preferencias del usuario ─────────────────────
  // Si el usuario configuró "reducir movimiento" en su SO,
  // mostramos solo la primera imagen sin animar
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bgA.style.backgroundImage = `url('${IMAGENES[0]}')`;
    return; // salimos: sin intervalo, sin animación
  }

  let indiceActual = 0;
  let activo = 'a'; // ¿qué div está visible?

  bgA.style.backgroundImage = `url('${IMAGENES[0]}')`;
  precargar(1); // pre-cargamos la segunda

  setInterval(() => {
    indiceActual = (indiceActual + 1) % IMAGENES.length;

    const entrante = activo === 'a' ? bgB : bgA; // el que está oculto
    const saliente = activo === 'a' ? bgA : bgB; // el que está visible

    // 1. Ponemos la imagen nueva en el div oculto (nadie la ve aún)
    entrante.style.backgroundImage = `url('${IMAGENES[indiceActual]}')`;

    // 2. CSS transition-opacity hace el fundido (1 segundo)
    entrante.style.opacity = '1'; // aparece
    saliente.style.opacity = '0'; // desaparece

    // 3. Pre-cargamos la siguiente para la próxima vuelta
    precargar(indiceActual + 1);

    // 4. Actualizamos cuál es el activo
    activo = activo === 'a' ? 'b' : 'a';
  }, INTERVALO_MS);
}
```

### Concepto: prefers-reduced-motion

Algunos usuarios tienen configurado en su sistema operativo que prefieren
menos movimiento (personas con vértigo, epilepsia fotosensible, etc.).

```css
/* En CSS también se puede usar */
@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; }
}
```

```javascript
// En JavaScript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // No animar
}
```

Usarlo no es opcional en producción — es requisito de accesibilidad (WCAG 2.1, nivel AA).

---

## 7. index.astro — Integración de todos los sistemas

### El frontmatter: lógica de servidor (build-time)

```astro
---
// Todo esto corre en Node.js durante el BUILD, no en el navegador

import propiedades20 from '../data/propiedades_20.json';

// Intentar Strapi primero; si falla → JSON local de 20 props
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
let strapiData = [];
try {
  const res = await fetch(`${STRAPI_URL}/api/rentals?populate=*`);
  const json = await res.json();
  strapiData = json.data || [];
} catch {
  // Strapi no disponible → usamos fallback
}

// Normalizar ambas fuentes al mismo formato
const data = strapiData.length > 0
  ? strapiData.map(normalizarStrapi)
  : propiedades20.map(normalizarLocal);

// Dataset reducido para los scripts del cliente
// (solo los campos que necesitan filtros.js y mapa.js)
const dataset = data.map(({ slug, zona, precio, capacidad, titulo }) => ({
  slug, zona, precio, capacidad, titulo,
}));
---
```

### La sección del carrusel — estructura completa

```astro
<div class="relative">
  <!-- Flecha izquierda (oculta en móvil) -->
  <button id="btn-prev" class="hidden md:flex absolute left-0 -translate-x-1/2 ...">
    ←
  </button>

  <!-- Contenedor scrollable con snap -->
  <div id="carrusel-propiedades"
       class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2"
       style="scrollbar-width: none;">

    {data.map((prop) => (
      <!-- WRAPPER: data-slug aquí para que filtros.js oculte el slot completo -->
      <div
        data-slug={prop.slug}
        class="flex-none basis-full md:basis-1/2 lg:basis-1/3 snap-start"
      >
        <RentalCard {...prop} />
        <!-- RentalCard también lleva data-slug en su article interno -->
      </div>
    ))}
  </div>

  <!-- Flecha derecha -->
  <button id="btn-next" class="hidden md:flex absolute right-0 translate-x-1/2 ...">
    →
  </button>
</div>
```

---

## 8. Conceptos CSS avanzados usados

### CSS Custom Properties con @theme (Tailwind v4)

```css
/* global.css */
@import "tailwindcss";

@theme {
  /* Define colores de marca accesibles como: text-brand-primary, bg-brand-dark... */
  --color-brand-primary: #3b82f6;
  --color-brand-dark:    #0f172a;
  --color-brand-accent:  #f59e0b;

  /* Define espaciado con clamp() para tipografía fluida */
  --font-size-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
}
```

### `clamp()` — Tipografía responsiva sin breakpoints

```css
/* Sintaxis: clamp(mínimo, ideal, máximo) */
font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);

/* En móvil (320px): 5% de 320 + 1rem = 16px + 16px = 32px → mínimo: 40px */
/* En tablet (768px): 5% de 768 + 16px = ~54px → dentro del rango */
/* En desktop (1440px): superaría 4.5rem → se limita a 4.5rem = 72px */
```

Ventaja: un solo valor de `font-size` que escala fluidamente entre móvil y desktop.

### Backdrop-blur y glassmorphism

```html
<!-- La navbar usa efecto vidrio esmerilado -->
<nav class="bg-white/90 backdrop-blur-md border-b border-slate-100">
```

```css
/* Equivalente CSS */
background-color: rgba(255, 255, 255, 0.9); /* blanco semi-transparente */
backdrop-filter: blur(12px);                 /* desenfoca lo de detrás */
```

---

## 9. Preguntas de examen tipo test

**1. ¿Qué hace `is:inline` en Astro?**
- A) Hace el script síncrono (bloqueante)
- B) Evita que Astro/Vite procese el script
- C) Inyecta el script dentro del HTML sin etiqueta `<script>`
- D) Ambas A y B ✓

**2. ¿Por qué se usa `Set` en filtros.js en lugar de `Array`?**
- A) Porque Set acepta objetos, Array no
- B) Porque Set tiene lookup O(1) vs O(n) de Array.includes() ✓
- C) Porque Set es más moderno
- D) Por compatibilidad con IE11

**3. ¿Qué garantiza CSS `snap-mandatory`?**
- A) Que el scroll es infinito
- B) Que el scroll siempre termina exactamente en un punto de snap ✓
- C) Que el scroll no puede ir hacia atrás
- D) Que las tarjetas tienen el mismo tamaño

**4. ¿Por qué Leaflet se carga con `<script is:inline>` en lugar del bundle?**
- A) Porque Leaflet es muy grande
- B) Para que sea síncrono y `window.L` esté disponible antes del módulo diferido ✓
- C) Porque Leaflet no es compatible con ES6
- D) Por restricciones de licencia

**5. ¿Qué significa `prefers-reduced-motion: reduce`?**
- A) El usuario tiene una CPU lenta
- B) El usuario prefiere menos animaciones por configuración de su SO ✓
- C) El navegador es antiguo y no soporta animaciones
- D) La conexión a internet es lenta

**6. ¿Qué produce `npm run build` en Astro SSG?**
- A) Un servidor Node.js listo para producción
- B) Archivos HTML/CSS/JS estáticos en la carpeta `dist/` ✓
- C) Un bundle JavaScript que se ejecuta en el servidor
- D) Una imagen Docker

**7. ¿Por qué `data-slug` está en el wrapper div Y en el article?**
- A) Es redundante, solo se necesita en el article
- B) El wrapper con `display:none` desaparece del flex layout; el article oculto deja hueco ✓
- C) Para compatibilidad con navegadores antiguos
- D) Requisito de Astro SSG

**Respuestas: 1-D, 2-B, 3-B, 4-B, 5-B, 6-B, 7-B**
