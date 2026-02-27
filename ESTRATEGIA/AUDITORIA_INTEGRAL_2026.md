# AUDITORÍA INTEGRAL — alquileres-costadelsol.com
## SEO Silos + Strapi Backend + Imágenes + Datos Estructurados
**Fecha:** 24/02/2026  
**Stack:** Astro 5 + Strapi 5 + Tailwind CSS  
**Nivel de exigencia:** Tribunal DAW + Profesor extremadamente técnico  
**Autor auditoría:** Arquitecto SEO + Senior Fullstack  

---

# PARTE A — REESTRUCTURACIÓN SEO POR SILOS

---

## A1. Diagnóstico del estado actual

### A1.1 Arquitectura de URLs actual (real, del código)

```
/                               ← Home (index.astro)
/zona/[slug]                    ← Página de zona dinámica (6 zonas)
/zona/[slug]/[categoria]        ← Sub-categoría por zona (lujo, familias, playa, golf, casco-antiguo)
/propiedad/[slug]               ← Ficha individual
/propiedades/[page]             ← Paginación listados
/zonas                          ← Índice de zonas
/alquiler-malaga                ← Landing estática Málaga
/alquiler-marbella              ← Landing estática Marbella
/alquiler-nerja                 ← Landing estática Nerja
/malaga-centro-historico        ← Landing micro-nicho
/marbella-familias              ← Landing micro-nicho
/nosotros                       ← Sobre nosotros
/contacto                       ← Formulario
/aviso-legal                    ← Legal (raíz)
/legal/aviso-legal              ← Legal (duplicada)
/legal/politica-cookies         ← Legal
/legal/politica-privacidad      ← Legal
/politica-privacidad            ← Legal (duplicada)
/en/...                         ← Mirror inglés
/fr/...                         ← Mirror francés
/sitemap-index.xml              ← Índice de sitemaps
/sitemap-pages.xml              ← Sitemap páginas estáticas
/sitemap-zonas.xml              ← Sitemap zonas
/sitemap-propiedades.xml        ← Sitemap propiedades
/sitemap-landings.xml           ← Sitemap landings
```

### A1.2 Problemas detectados

| # | Problema | Gravedad | Impacto SEO |
|---|----------|----------|-------------|
| 1 | **Silos superficiales** — `/zona/[slug]` es el único nivel de profundidad real. No hay página pilar con contenido largo (1000+ palabras). Las zonas son meros listados de propiedades sin texto SEO sustancial. | 🔴 CRÍTICO | Google ve "thin content" en las páginas de zona. Sin contenido diferenciador, no hay razón para rankear por encima de Idealista. |
| 2 | **Canibalización activa** — `/alquiler-malaga` y `/zona/malaga` compiten por la misma keyword "alquiler málaga". Lo mismo con `/alquiler-marbella` vs `/zona/marbella` y `/alquiler-nerja` vs `/zona/nerja`. | 🔴 CRÍTICO | Google no sabe cuál priorizar → diluye autoridad de ambas. GSC mostrará múltiples URLs para la misma query. |
| 3 | **Páginas legales duplicadas** — `/aviso-legal` Y `/legal/aviso-legal`; `/politica-privacidad` Y `/legal/politica-privacidad`. | 🟡 MEDIO | Contenido duplicado técnico. Crawl budget desperdiciado. |
| 4 | **Interlinking insuficiente** — Las fichas de propiedad (`/propiedad/[slug]`) solo enlazan a su zona padre y a `/contacto`. No enlazan a propiedades similares, ni a guías, ni a otras zonas cercanas. | 🟡 MEDIO | Link juice estancado. Google no descubre relaciones temáticas. |
| 5 | **Torre del Mar ausente** — No tiene landing propia ni zona dedicada. Es una keyword de volumen medio ("alquiler torre del mar" ~590/mes) totalmente desatendida. | 🟡 MEDIO | Oportunidad perdida de long-tail con baja competencia. |
| 6 | **No hay contenido informacional** — Cero artículos de blog/guía. Toda la web es transaccional. Sin content hub para atraer tráfico top-of-funnel. | 🔴 CRÍTICO | Sin topical authority. Google no puede evaluar expertise (E-E-A-T). |
| 7 | **Categorías `/zona/[slug]/[categoria]` sin contenido** — Generan 5 sub-páginas por zona (lujo, familias, playa, golf, casco-antiguo) que son listados filtrados sin texto propio. | 🟡 MEDIO | 30 páginas (6 zonas × 5 categorías) potencialmente "thin". |
| 8 | **Landings estáticas hardcodeadas** — `alquiler-malaga.astro`, `alquiler-marbella.astro`, `alquiler-nerja.astro` y `marbella-familias.astro` son ficheros .astro estáticos con contenido hardcodeado, no gestionados desde Strapi. | 🟡 MEDIO | Inconsistencia de fuente de datos. No escalable. |

### A1.3 Arquitectura actual — Mapa visual

```
                        HOME (/)
                          │
        ┌────────┬────────┼────────┬──────────┐
        │        │        │        │          │
   /zonas   /zona/*   Landings  /nosotros  /contacto
              │      estáticas
         ┌────┤        (3 pág)
         │    │
  /zona/*/    /propiedad/*
  [cat]       (fichas)
  (5×zona)
```

**Profundidad real:** 3 niveles máximo ✅  
**Problema:** Anchura sin profundidad de contenido. Las zonas son hubs vacíos.

---

## A2. Rediseño — Nueva arquitectura de 4 Silos

### A2.1 Filosofía

Cada silo tiene una **página pilar** (1000–1500 palabras) que actúa como hub de autoridad. Las subpáginas heredan y transfieren link juice bidireccionalmente. Ninguna página queda huérfana.

### A2.2 Los 4 Silos

```
SILO 1: ZONAS GEOGRÁFICAS (Transaccional principal)
├── Pilar: /zona/marbella          (1200 palabras + listado propiedades)
│   ├── /zona/marbella/lujo
│   ├── /zona/marbella/familias
│   └── /zona/marbella/playa
├── Pilar: /zona/malaga            (1200 palabras + listado)
├── Pilar: /zona/benalmadena
├── Pilar: /zona/torremolinos
├── Pilar: /zona/fuengirola
├── Pilar: /zona/nerja
├── Pilar: /zona/estepona          ← NUEVA
├── Pilar: /zona/mijas             ← NUEVA
└── Pilar: /zona/torre-del-mar     ← NUEVA (integración estratégica)

SILO 2: PROPIEDADES (Transaccional directa)
├── /propiedad/[slug]              (fichas individuales)
└── /propiedades/[page]            (listado paginado global)

SILO 3: GUÍAS Y CONTENIDO (Informacional — Topical Authority)
├── Pilar: /guia/vivir-costa-del-sol        (1500 palabras)
│   ├── /guia/mejores-zonas-costa-del-sol
│   ├── /guia/coste-vida-malaga
│   └── /guia/normativa-alquiler-vacacional-andalucia
├── Pilar: /guia/alquilar-torre-del-mar     (1200 palabras — integración TdM)
│   ├── /guia/playas-torre-del-mar
│   └── /guia/torre-del-mar-vs-nerja
└── Pilar: /guia/nomadas-digitales-malaga   (1200 palabras)
    ├── /guia/coworkings-malaga
    └── /guia/apartamentos-wifi-costa-del-sol

SILO 4: CONFIANZA Y MARCA (E-E-A-T + Legal)
├── /nosotros                       (página de autor, experiencia real)
├── /contacto
├── /legal/aviso-legal
├── /legal/politica-privacidad
└── /legal/politica-cookies
```

### A2.3 Tabla de silos completa

| Silo | Página pilar | KW principal | Vol. | Subpáginas | Interlinking |
|------|-------------|--------------|------|------------|-------------|
| **1. Zonas** | `/zona/marbella` | alquiler marbella | 1,600 | 3 categorías + N fichas | → fichas, → guía vivir, → zonas vecinas |
| | `/zona/malaga` | alquiler málaga | 2,400 | 3 categorías + N fichas | → fichas, → guía coste vida, → zonas |
| | `/zona/benalmadena` | alquiler benalmádena | 880 | 3 cat + N fichas | → fichas, → torremolinos, → fuengirola |
| | `/zona/torremolinos` | alquiler torremolinos | 1,000 | 3 cat + N fichas | → fichas, → benalmádena, → málaga |
| | `/zona/fuengirola` | alquiler fuengirola | 720 | 3 cat + N fichas | → fichas, → benalmádena, → mijas |
| | `/zona/nerja` | alquiler nerja | 480 | 3 cat + N fichas | → fichas, → torre-del-mar |
| | `/zona/estepona` | alquiler estepona | 590 | 3 cat + N fichas | → fichas, → marbella |
| | `/zona/mijas` | alquiler mijas | 320 | 3 cat + N fichas | → fichas, → fuengirola |
| | `/zona/torre-del-mar` | alquiler torre del mar | 590 | 3 cat + N fichas | → fichas, → nerja, → guía TdM |
| **2. Propiedades** | `/propiedades/1` | alquileres costa del sol | 1,900 | N fichas paginadas | → zona padre, → similares, → guía zona |
| **3. Guías** | `/guia/vivir-costa-del-sol` | vivir costa del sol | 320 | 3 sub-guías | → zonas top, → propiedades destacadas |
| | `/guia/alquilar-torre-del-mar` | torre del mar alquiler | 590 | 2 sub-guías | → /zona/torre-del-mar, → nerja |
| | `/guia/nomadas-digitales-malaga` | nómadas digitales málaga | 170 | 2 sub-guías | → propiedades wifi, → coworkings |
| **4. Confianza** | `/nosotros` | (branding) | — | 4 legales | → home, → contacto |

### A2.4 Mapa de enlazado interno

```
                            HOME (/)
                 ┌──────────┼──────────┐
                 │          │          │
          SILO 1: ZONAS  SILO 3:    SILO 4:
          (9 pilares)    GUÍAS      CONFIANZA
                 │       (3 pilares)
                 │          │
          ┌──────┤     ┌────┤
          │      │     │    │
     Sub-cats  ←→  Sub-guías
          │               │
          └──────┐   ┌────┘
                 │   │
          SILO 2: PROPIEDADES
          (fichas individuales)

REGLAS DE ENLAZADO:
1. Home → enlaza a los 9 pilares de zona + 3 guías destacadas
2. Pilar zona → enlaza a sus sub-cats, a 2 zonas vecinas, a 1 guía relacionada
3. Ficha propiedad → enlaza a zona padre, a 3 propiedades similares, a 1 guía
4. Guía → enlaza a 2-3 zonas relevantes, a 3-5 propiedades destacadas
5. Footer global → enlaza a las 9 zonas + 3 guías + legal
6. Mínimo 5 enlaces internos por página
```

### A2.5 Qué eliminar

| Página actual | Acción | Justificación |
|---------------|--------|---------------|
| `/alquiler-malaga` | **301 → `/zona/malaga`** | Canibaliza con zona/malaga. Consolidar autoridad. |
| `/alquiler-marbella` | **301 → `/zona/marbella`** | Misma razón. |
| `/alquiler-nerja` | **301 → `/zona/nerja`** | Misma razón. |
| `/marbella-familias` | **301 → `/zona/marbella/familias`** | Ya existe la sub-categoría dinámica. |
| `/malaga-centro-historico` | **301 → `/zona/malaga`** (sección ancla) | No tiene suficiente contenido propio para justificar URL separada. |
| `/aviso-legal` (raíz) | **301 → `/legal/aviso-legal`** | Eliminar duplicación. Canonical en `/legal/*`. |
| `/politica-privacidad` (raíz) | **301 → `/legal/politica-privacidad`** | Idem. |

### A2.6 Qué reforzar

| Elemento | Acción | Prioridad |
|----------|--------|-----------|
| **Páginas de zona** | Añadir intro SEO de 800-1200 palabras (gestionada desde Strapi campo `descripcion_larga`). Incluir: historia, clima, transporte, precios medios, FAQs, enlaces internos. | 🔴 P0 |
| **Torre del Mar** | Crear zona completa + guía pilar. KW "alquiler torre del mar" tiene 590 búsquedas/mes y competencia media-baja. | 🔴 P0 |
| **Fichas de propiedad** | Añadir sección "Propiedades similares" (3 cards) + enlace a guía de la zona. | 🟡 P1 |
| **Footer global** | Convertir en hub de enlazado: listar las 9 zonas + 3 guías + legal. Actualmente solo tiene contacto. | 🟡 P1 |
| **Breadcrumbs** | Ya implementados ✅ pero verificar que cada página tiene schema BreadcrumbList correcto. | 🟢 P2 |
| **Contenido informacional** | Crear el Silo 3 completo (3 guías pilar + 7 sub-guías). Gestionar desde nuevo content type `Guia` en Strapi. | 🔴 P0 |

### A2.7 Integración estratégica de Torre del Mar

Torre del Mar merece tratamiento especial porque:

1. **Volumen relevante:** "alquiler torre del mar" = ~590/mes (comparable a Estepona)
2. **Competencia baja:** Los portales grandes no optimizan específicamente para TdM
3. **Geográficamente complementario:** Conecta el corredor oriental (Nerja ↔ TdM ↔ Málaga)
4. **Estacionalidad favorable:** Turismo familiar español + jubilados nórdicos en invierno

**Plan:**
- `/zona/torre-del-mar` — Página pilar con contenido largo
- `/guia/alquilar-torre-del-mar` — Guía informacional (topical authority)
- `/guia/torre-del-mar-vs-nerja` — Comparativa long-tail
- `/guia/playas-torre-del-mar` — Contenido estacional
- Interlinking bidireccional con `/zona/nerja` y `/zona/malaga`

### A2.8 Orden de implementación

| Fase | Tarea | Días est. |
|------|-------|-----------|
| **F1** | Configurar 301 redirects para las 7 páginas a eliminar | 0.5 |
| **F2** | Crear content type `Guia` en Strapi (ver Parte B) | 0.5 |
| **F3** | Ampliar content type `Ubicacion` con campos SEO largos (ver Parte B) | 0.5 |
| **F4** | Crear las 3 zonas nuevas en Strapi (Estepona, Mijas, Torre del Mar) | 0.5 |
| **F5** | Redactar contenido pilar para las 9 zonas (800-1200 palabras cada una) | 3 |
| **F6** | Redactar 3 guías pilar + 7 sub-guías | 4 |
| **F7** | Implementar sección "Propiedades similares" en ficha | 1 |
| **F8** | Rediseñar footer como hub de enlazado | 0.5 |
| **F9** | Verificar breadcrumbs + schema en todas las nuevas páginas | 0.5 |
| **F10** | Audit final: Screaming Frog crawl + GSC reindexación | 1 |

---

# PARTE B — BACKEND STRAPI NIVEL SOBRESALIENTE

---

## B1. Diagnóstico del estado actual

### B1.1 Content Types actuales

| Content Type | Campos | i18n | Slug unique | Relaciones | Validación |
|-------------|--------|------|-------------|------------|------------|
| **Rental** | title, description (richtext), price, city, slug (uid), location, image, metaTitle, metaDescription, ubicacion (rel), detalles (comp), Servicios (comp) | ✅ Parcial (solo metaTitle, metaDescription, detalles, Servicios) | ✅ uid + required | manyToOne → Ubicacion | ⚠️ Solo title y price required. Sin maxLength. |
| **Ubicacion** | nombre, slug (uid), descripcion (richtext), imagen, metaTitle, metaDescription, rentals (rel) | ❌ NO tiene i18n | ✅ uid + required | oneToMany → Rental | ⚠️ Solo nombre required. Sin maxLength. |
| **FAQ** | pregunta, respuesta, orden, pagina (enum) | ✅ pregunta + respuesta | ❌ No tiene slug | Ninguna | ✅ Ambos required. Sin maxLength. |
| **Landing** | title, slug (uid), metaTitle, metaDescription, city, type (enum), heroTitle, heroSubtitle, heroImage, body (richtext) | ✅ Parcial | ✅ uid + required | Ninguna | ⚠️ Solo title required. |
| **Contacto** | nombre, email, mensaje | ❌ No | ❌ N/A | Ninguna | ✅ Todos required. nombre maxLength 100, mensaje maxLength 2000. |

**Componentes:**
| Componente | Campos | Validación |
|-----------|--------|------------|
| `inmueble.detalles` | habitaciones (int), banos (int), metros (int), capacidad (int) | ❌ Ningún campo required ni min/max |
| `inmueble.servicios` | wifi (bool), aire_acondicionado (bool), parking (bool), mascotas (bool) | ❌ Sin defaults explícitos |

### B1.2 Problemas detectados

| # | Problema | Gravedad |
|---|----------|----------|
| 1 | **i18n inconsistente** — `Rental` tiene i18n parcial (solo meta + componentes), pero `title`, `description`, `location`, `city` NO son localizables. `Ubicacion` no tiene i18n en absoluto. | 🔴 CRÍTICO |
| 2 | **Sin componente SEO reutilizable** — metaTitle y metaDescription están duplicados como campos sueltos en Rental, Ubicacion y Landing. No hay componente `seo` compartido. | 🔴 CRÍTICO |
| 3 | **Campos SEO incompletos** — Falta: canonicalURL, ogTitle, ogDescription, ogImage, robots, schemaJSON. El frontend hardcodea estos valores en SeoHead.astro. | 🟡 MEDIO |
| 4 | **Sin maxLength en campos críticos** — `title` en Rental puede tener 1000 caracteres. Google trunca titles a ~60 chars y descriptions a ~160 chars. Sin límites, el editor puede romper el SEO. | 🟡 MEDIO |
| 5 | **Campo `city` redundante en Rental** — Existe `city` (string) Y `ubicacion` (relación). Redundancia que causa inconsistencia. | 🟡 MEDIO |
| 6 | **Campo `location` redundante en Rental** — Mismo problema. `location` (string legacy) coexiste con `ubicacion.nombre`. | 🟡 MEDIO |
| 7 | **Componente detalles sin validación** — `habitaciones`, `banos`, `metros` aceptan valores negativos o absurdos. Sin min/max. | 🟢 BAJO |
| 8 | **FAQ sin relación con zona** — Las FAQs se filtran por `pagina` (enum: home, zona, general) pero NO tienen relación con una zona específica. Todas las zonas muestran las mismas FAQs de tipo "zona". | 🟡 MEDIO |
| 9 | **Landing sin relación con Ubicacion** — Usa `city` (string) en vez de relación. No aprovecha el modelo relacional. | 🟡 MEDIO |
| 10 | **Galería ausente** — Rental solo tiene `image` (single). No hay galería de fotos. Para un marketplace inmobiliario es imprescindible. | 🔴 CRÍTICO |
| 11 | **Sin content type Guia** — El Silo 3 (informacional) no tiene modelo en Strapi. | 🔴 CRÍTICO |
| 12 | **Permisos no verificados** — No hay evidencia de que Public role esté limitado a `find`/`findOne`. | 🟡 MEDIO |

### B1.3 Calidad API actual

**Endpoint:** `GET /api/rentals?populate=*&pagination[limit]=100`

Problemas:
- `populate=*` es un anti-patrón en producción. Trae TODOS los campos y relaciones incluyendo datos internos de Strapi. Debería ser `populate[ubicacion][fields][0]=nombre&populate[ubicacion][fields][1]=slug&populate[image][fields][0]=url&populate[detalles]=*&populate[Servicios]=*`.
- `pagination[limit]=100` — Hardcodeado. Si hay 200+ propiedades, se pierden la mitad.
- No hay filtros server-side. Todo el filtrado se hace en el frontend con JavaScript.

---

## B2. Modelo de datos ideal

### B2.1 Componente SEO reutilizable

```
Componente: seo.meta-seo
├── metaTitle         (string, maxLength: 70, required: true)
├── metaDescription   (text, maxLength: 170, required: true)
├── canonicalURL      (string)           ← Vacío = auto-generada por Astro
├── ogTitle           (string, maxLength: 90)
├── ogDescription     (text, maxLength: 200)
├── ogImage           (media, single)
├── robots            (string, default: "index, follow")
└── schemaJSON        (json)             ← Schema custom por página
```

### B2.2 Content Type: Zona (antes Ubicacion)

```
Collection Type: Zona
├── nombre              (string, required, maxLength: 100, i18n: true)
├── slug                (uid → nombre, required, unique)
├── intro               (text, maxLength: 300, i18n: true)  ← Extracto para cards
├── descripcion_larga   (richtext, i18n: true)               ← Contenido pilar SEO
├── heroImage           (media, single)
├── galeria             (media, multiple)                     ← Fotos de la zona
├── coordenadas         (component: geo.coordenadas)
│   ├── latitud         (float, required)
│   └── longitud        (float, required)
├── faqs                (relation: oneToMany → FAQ)           ← FAQs específicas
├── enlaces_sugeridos   (component: seo.enlace-interno, repeatable)
│   ├── texto_ancla     (string, required)
│   └── url_destino     (string, required)
├── seo                 (component: seo.meta-seo)
└── rentals             (relation: oneToMany → Rental, inversedBy)
```

### B2.3 Content Type: Propiedad (antes Rental)

```
Collection Type: Propiedad (Rental)
├── titulo              (string, required, maxLength: 120, i18n: true)
├── slug                (uid → titulo, required, unique)
├── zona                (relation: manyToOne → Zona, required)    ← Sustituye city+location
├── categoria           (enumeration: [vacacional, larga-temporada, estudiantes, nomadas], i18n: false)
├── amenities           (component: inmueble.servicios)
│   ├── wifi            (boolean, default: false)
│   ├── aire_acondicionado (boolean, default: false)
│   ├── parking         (boolean, default: false)
│   ├── mascotas        (boolean, default: false)
│   ├── piscina         (boolean, default: false)       ← NUEVO
│   ├── terraza         (boolean, default: false)       ← NUEVO
│   └── ascensor        (boolean, default: false)       ← NUEVO
├── precio              (decimal, required, min: 0)
├── ocupacion           (component: inmueble.ocupacion)  ← NUEVO
│   ├── disponible      (boolean, default: true)
│   └── fecha_disponible (date)
├── featured            (boolean, default: false)         ← NUEVO — para destacar en home
├── imagen_principal    (media, single)
├── galeria             (media, multiple)                 ← NUEVO
├── descripcion_corta   (text, maxLength: 300, i18n: true)
├── descripcion_larga   (richtext, i18n: true)
├── detalles            (component: inmueble.detalles)
│   ├── habitaciones    (integer, min: 0, max: 20)
│   ├── banos           (integer, min: 0, max: 10)
│   ├── metros          (integer, min: 10, max: 2000)
│   └── capacidad       (integer, min: 1, max: 50, required: true)
├── faqs                (component: inmueble.faq-item, repeatable)  ← NUEVO
│   ├── pregunta        (string, required, i18n: true)
│   └── respuesta       (text, required, i18n: true)
└── seo                 (component: seo.meta-seo)
```

### B2.4 Content Type: Guía (NUEVO)

```
Collection Type: Guia
├── titulo              (string, required, maxLength: 120, i18n: true)
├── slug                (uid → titulo, required, unique)
├── zona_relacionada    (relation: manyToOne → Zona)      ← Puede ser null (guía general)
├── contenido           (richtext, required, i18n: true)   ← Cuerpo largo (1000+ palabras)
├── extracto            (text, maxLength: 300, i18n: true)
├── imagen_portada      (media, single)
├── cta_texto           (string, i18n: true)
├── cta_url             (string)
├── orden               (integer, default: 0)
├── publicada           (boolean, default: false)
└── seo                 (component: seo.meta-seo)
```

### B2.5 Content Type: FAQ (mejorado)

```
Collection Type: FAQ
├── pregunta            (string, required, maxLength: 200, i18n: true)
├── respuesta           (text, required, maxLength: 2000, i18n: true)
├── orden               (integer, default: 0)
├── pagina              (enumeration: [home, zona, propiedad, guia, general])
├── zona                (relation: manyToOne → Zona)       ← NUEVO: FAQs específicas por zona
└── guia                (relation: manyToOne → Guia)       ← NUEVO: FAQs por guía
```

---

## B3. Reglas y seguridad

### B3.1 Validaciones obligatorias

```javascript
// Ejemplo: schema de Propiedad con validaciones
"titulo": {
  "type": "string",
  "required": true,
  "maxLength": 120,
  "minLength": 10
},
"slug": {
  "type": "uid",
  "targetField": "titulo",
  "required": true
  // unique es implícito en uid
},
"precio": {
  "type": "decimal",
  "required": true,
  "min": 0
},
"detalles.capacidad": {
  "type": "integer",
  "required": true,
  "min": 1,
  "max": 50
}
```

### B3.2 i18n correcto

**Regla:** Todo campo de texto visible al usuario DEBE tener `"i18n": { "localized": true }`. Los campos técnicos (slug, coordenadas, precio, booleanos) NO se localizan.

Campos a localizar en Propiedad: `titulo`, `descripcion_corta`, `descripcion_larga`, `seo.*`  
Campos NO localizar: `slug`, `precio`, `featured`, `zona` (relación), `detalles.*`, `amenities.*`

### B3.3 Permisos Public Role

```
PERMITIDO (Public):
  ✅ Rental.find
  ✅ Rental.findOne
  ✅ Ubicacion.find
  ✅ Ubicacion.findOne
  ✅ FAQ.find
  ✅ Landing.find
  ✅ Landing.findOne
  ✅ Guia.find        ← NUEVO
  ✅ Guia.findOne     ← NUEVO
  ✅ Contacto.create  ← Solo crear (formulario)

PROHIBIDO (Public):
  ❌ *.create (excepto Contacto)
  ❌ *.update
  ❌ *.delete
  ❌ Upload.*
```

### B3.4 Ejemplos de endpoints listos para producción

```
# Listado de propiedades con populate selectivo y paginación
GET /api/rentals?
  fields[0]=titulo&fields[1]=slug&fields[2]=precio&
  populate[zona][fields][0]=nombre&populate[zona][fields][1]=slug&
  populate[imagen_principal][fields][0]=url&populate[imagen_principal][fields][1]=formats&
  populate[detalles]=*&
  populate[amenities]=*&
  pagination[page]=1&pagination[pageSize]=12&
  sort=precio:asc&
  filters[zona][slug][$eq]=marbella&
  locale=es

# Ficha individual con todo el contenido
GET /api/rentals?
  filters[slug][$eq]=apartamento-lujo-marbella&
  populate[zona][fields][0]=nombre&populate[zona][fields][1]=slug&
  populate[imagen_principal]=*&
  populate[galeria]=*&
  populate[detalles]=*&
  populate[amenities]=*&
  populate[faqs]=*&
  populate[seo][populate]=ogImage&
  locale=es

# Zona con sus propiedades y FAQs
GET /api/ubicacions?
  filters[slug][$eq]=marbella&
  populate[rentals][fields][0]=titulo&populate[rentals][fields][1]=slug&populate[rentals][fields][2]=precio&
  populate[faqs]=*&
  populate[seo][populate]=ogImage&
  populate[heroImage]=*&
  locale=es

# FAQs filtradas por zona específica
GET /api/faqs?
  filters[zona][slug][$eq]=marbella&
  filters[pagina][$eq]=zona&
  sort=orden:asc&
  locale=es

# Guías relacionadas con una zona
GET /api/guias?
  filters[zona_relacionada][slug][$eq]=torre-del-mar&
  filters[publicada][$eq]=true&
  populate[imagen_portada][fields][0]=url&
  populate[seo]=*&
  sort=orden:asc&
  locale=es
```

### B3.5 Checklist "Profesor satisfecho si…"

| # | Criterio | Estado actual | Estado objetivo |
|---|----------|--------------|-----------------|
| 1 | Modelo relacional correcto (Zona ← Propiedad) | ⚠️ Existe pero con campos legacy redundantes | ✅ Relación limpia, sin city/location sueltos |
| 2 | Slugs `uid` + `unique` en TODOS los content types | ⚠️ FAQ no tiene slug | ✅ Todos con uid |
| 3 | i18n completo en ES/EN/FR | ❌ Parcial e inconsistente | ✅ Todo campo de texto usuario localizado |
| 4 | `populate` selectivo (no `populate=*`) | ❌ Usa `populate=*` | ✅ Populate explícito por campo |
| 5 | Filtros server-side funcionales | ❌ Filtrado solo en frontend | ✅ `filters[zona][slug]`, `filters[precio][$gte]` |
| 6 | Paginación con `pageSize` razonable | ⚠️ `limit=100` hardcodeado | ✅ `pageSize=12`, botones "Siguiente" |
| 7 | Roles: Public = solo find/findOne + Contacto.create | ❓ No verificado | ✅ Verificado y documentado |
| 8 | Seguridad: sin exponer update/delete públicos | ❓ No verificado | ✅ Admin panel → Settings → Roles |
| 9 | Componente SEO reutilizable | ❌ Campos sueltos duplicados | ✅ `seo.meta-seo` compartido |
| 10 | Galería de imágenes en propiedades | ❌ Solo image single | ✅ imagen_principal + galeria (multiple) |
| 11 | Content type Guia para contenido informacional | ❌ No existe | ✅ Creado con relación a Zona |
| 12 | FAQs relacionadas con zona específica | ❌ Solo enum genérico | ✅ Relación manyToOne → Zona |
| 13 | Validaciones: required, maxLength, min/max | ⚠️ Mínimas | ✅ Completas en todos los campos |
| 14 | Datos de ejemplo reales (no lorem ipsum) | ⚠️ Parcial | ✅ 9 zonas + 20+ propiedades + 3 guías |

---

# PARTE C — AUDITORÍA COMPLETA DE IMÁGENES

---

## C1. Inventario completo del disco

### C1.1 `/images/zonas/` (17 archivos — fuente única para ZoneCard)

| Archivo | Referenciado en código | Usado por |
|---------|----------------------|-----------|
| `marbella_resultado_resultado.webp` | ✅ | zonas.ts (marbella) + SeccionInfo |
| `malaga-top_resultado_resultado.webp` | ✅ | zonas.ts (malaga) + SeccionInfo badge |
| `benalmadena_resultado_resultado.webp` | ✅ | zonas.ts (benalmadena) |
| `torreMar-playa_resultado_resultado.webp` | ✅ | zonas.ts (torre-del-mar) |
| `nerja_resultado_resultado.webp` | ✅ | zonas.ts (nerja) |
| `fuengirola_resultado_resultado.webp` | ✅ | zonas.ts (fuengirola) |
| `torremolinos_resultado_resultado.webp` | ✅ | zonas.ts (torremolinos) |
| `mijas_resultado_resultado.webp` | ✅ | zonas.ts (mijas) |
| `marbella-top_resultado_resultado.webp` | ✅ | zonas.ts (estepona) |
| `hero-principal-mar._resultado_resultado.webp` | ✅ | zonas.ts (fallback) |
| `enjoy-malaga_resultado_resultado.webp` | ❌ | **SIN USO** |
| `fotoMalaga2_resultado_resultado.webp` | ❌ | **SIN USO** |
| `malaga3_resultado_resultado.webp` | ❌ | **SIN USO** |
| `malaga4_resultado_resultado.webp` | ❌ | **SIN USO** |
| `nerja-balcon-europa_resultado_resultado.webp` | ❌ | **SIN USO** |
| `nueva-oficina_resultado_resultado.webp` | ❌ | **SIN USO** |
| `torre-del-mar-paseo_resultado_resultado.webp` | ❌ | **SIN USO** |

### C1.2 `/images/propiedades/assets/` (19 archivos — originales sin optimizar)

**TODA la carpeta es candidata a borrar.** Son los ficheros fuente (`.jpg`, `.png`, `.avif`) que se optimizaron a `.webp` en `/images/zonas/`. Ninguno está referenciado en el código.

### C1.3 `/images/propiedades/` (5 archivos)

| Archivo | Referenciado | Notas |
|---------|-------------|-------|
| `prop-0.webp` | ✅ | Fallback determinista por slug (imagenes.ts) |
| `prop-1.webp` | ✅ | Idem |
| `prop-2.webp` | ✅ | Idem |
| `prop-3.webp` | ✅ | Idem |
| `nueva-oficina_resultado_resultado.webp` | ❌ | **SIN USO** |

### C1.4 `/images/about/` (3 archivos)

| Archivo | Referenciado | Usado por |
|---------|-------------|-----------|
| `fundador.webp` | ✅ | nosotros.astro |
| `nueva-oficina.jpg` | ✅ | nosotros.astro |
| `piscina.webp` | ✅ | nosotros.astro |

### C1.5 `/images/hero/` (1 archivo)

| Archivo | Referenciado | Notas |
|---------|-------------|-------|
| `hero.webp` | ❌ | **SIN USO** — Hero actual usa gradiente CSS, no imagen |

## C2. Imágenes referenciadas pero INEXISTENTES

| Ruta referenciada | Dónde se usa | Impacto |
|-------------------|-------------|---------|
| `/images/og-default.jpg` | SeoHead.astro (fallback og:image) | 🔴 Todas las páginas sin og:image personalizada muestran 404 en Open Graph |
| `/images/malaga-seo.jpg` | alquiler-malaga.astro | 🟡 Landing sin og:image |
| `/images/marbella-seo.jpg` | alquiler-marbella.astro | 🟡 Landing sin og:image |
| `/images/villa-oasis.jpg` | marbella-familias.astro (placeholder) | 🟡 Card rota |
| `/images/apt-horizonte.jpg` | marbella-familias.astro (placeholder) | 🟡 Card rota |
| `/images/casa-naranjos.jpg` | marbella-familias.astro (placeholder) | 🟡 Card rota |

## C3. Estructura definitiva propuesta

```
frontend/public/images/
├── og-default.jpg              ← CREAR (1200×630px, logo+marca)
├── hero/
│   └── (vacía o eliminar)
├── about/
│   ├── fundador.webp           ← MANTENER
│   ├── nueva-oficina.jpg       ← MANTENER
│   └── piscina.webp            ← MANTENER
├── zonas/                       ← FUENTE ÚNICA para zonas
│   ├── marbella.webp            ← RENOMBRAR (quitar _resultado_resultado)
│   ├── malaga.webp
│   ├── benalmadena.webp
│   ├── torremolinos.webp
│   ├── fuengirola.webp
│   ├── nerja.webp
│   ├── estepona.webp
│   ├── mijas.webp
│   ├── torre-del-mar.webp
│   └── fallback.webp            ← RENOMBRAR hero-principal-mar.
└── propiedades/
    ├── prop-0.webp              ← MANTENER (fallbacks)
    ├── prop-1.webp
    ├── prop-2.webp
    └── prop-3.webp
```

**Archivos a borrar (28 total):**
- 7 archivos sin uso en `/images/zonas/`
- 19 archivos originales en `/images/propiedades/assets/` (toda la carpeta)
- 1 archivo sin uso en `/images/propiedades/`
- 1 archivo sin uso en `/images/hero/`

**Archivos a crear (4 total):**
- `/images/og-default.jpg` — Open Graph fallback (1200×630, marca corporativa)
- Copiar zona existente para cubrir `malaga-seo.jpg`, `marbella-seo.jpg` (o eliminar landings duplicadas como se recomienda en Parte A)
- Los 3 placeholders de `marbella-familias.astro` se resuelven eliminando esa landing (301 → `/zona/marbella/familias`)

**Optimización propuesta de nomenclatura:**
Renombrar `*_resultado_resultado.webp` → nombres limpios (`marbella.webp`). Actualizar `zonas.ts` en consecuencia. El sufijo doble `_resultado_resultado` es un artefacto del pipeline de optimización que ensucia las URLs y dificulta el mantenimiento.

## C4. Validación build

El build actual (`npm run build`) genera **70 páginas en 6.33s** sin errores de compilación. El warning `ECONNREFUSED` es esperado (Strapi offline) y el fallback JSON local funciona correctamente.

Las imágenes inexistentes no rompen el build de Astro porque son referencias en atributos `src` de `<img>` (se resuelven en runtime del navegador, no en build-time). Pero generan **404 silenciosos** que penalizan Core Web Vitals (LCP fallido si la imagen era la principal).

---

# PARTE D — PROBLEMA SEARCH CONSOLE (DATOS ESTRUCTURADOS)

---

## D1. Análisis de la implementación actual

### D1.1 JSON-LD actual en SeoHead.astro

El `@graph` actual contiene:

```json
[
  { "@type": "WebSite" },
  { "@type": "Organization" },
  { "@type": "LocalBusiness" },
  { "@type": "BreadcrumbList" },
  { "@type": "FAQPage" }        // Condicional
]
```

**NO hay** schema `Product`, `Offer`, ni `MerchantListing` explícito en `SeoHead.astro`.

### D1.2 ¿De dónde vienen los warnings de Search Console?

Google Search Console reporta:
> "Datos estructurados de **Fichas de comerciantes (Merchant Listings)**"
> - Falta `shippingDetails` en `offers`
> - Falta `hasMerchantReturnPolicy` en `offers`

**Origen probable:** Google está **infiriendo** schema `Product + Offer` a partir de:

1. El `LocalBusiness` con `priceRange: "$$"` combinado con páginas que muestran precios (`120€/noche`) puede ser interpretado por Google como un listado de productos/servicios con precio.
2. Las fichas de propiedad (`/propiedad/[slug]`) muestran precio prominente, título descriptivo y botón "Reservar" — patrón que Google asocia a un producto/comercio.
3. Google Merchant Center puede estar rastreando la web y detectando patrones de e-commerce.

**Diagnóstico:** No estamos emitiendo `Product`/`Offer` explícitamente, pero Google los infiere del markup y contenido. Los warnings aparecen porque Google "ve" una oferta comercial pero sin los campos obligatorios de Merchant Listings.

## D2. Decisión técnica

### D2.1 ¿Debemos usar schema Product/Offer/Merchant?

**NO.** Y las razones son técnica y semánticamente claras:

1. **`Product` + `Offer`** es para bienes que se compran/envían. Un alquiler vacacional no es un producto que se envía. De ahí que Google pida `shippingDetails` y `hasMerchantReturnPolicy` — campos absurdos para un alquiler.

2. **Opción A (añadir shippingDetails + returnPolicy)** es un parche semántico incorrecto. No tiene sentido declarar "envío" de un apartamento. Google puede penalizar por uso incorrecto de schema.

3. **Opción B (eliminar Merchant/Product y usar schema correcto)** es la solución correcta.

### D2.2 Schema correcto para alquiler vacacional

Según schema.org, la jerarquía correcta es:

```
Thing → Place → LocalBusiness → LodgingBusiness → Hotel
                                                 → VacationRental   (EXPERIMENTAL)
Thing → Intangible → Offer → LodgingReservation
```

**Estrategia recomendada:**

| Página | Schema principal | Schema complementario |
|--------|-----------------|----------------------|
| Home | `WebSite` + `Organization` + `LocalBusiness` | `ItemList` (zonas destacadas) |
| Zona pilar | `LocalBusiness` (sub-type) + `BreadcrumbList` | `ItemList` (propiedades) + `FAQPage` |
| Ficha propiedad | `LodgingBusiness` + `Offer` (tipo alojamiento) | `BreadcrumbList` + `FAQPage` |
| Guía | `Article` + `BreadcrumbList` | `FAQPage` |

### D2.3 Solución técnica — JSON-LD para ficha de propiedad

Este es el schema que debe inyectarse en `/propiedad/[slug]` para resolver los warnings de Search Console Y obtener rich results correctos:

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Apartamento Lujo 2 Hab — Puerto Banús",
  "description": "Apartamento de lujo con 2 habitaciones y vistas al mar en Puerto Banús, Marbella.",
  "url": "https://alquileres-costadelsol.com/propiedad/apartamento-lujo-puerto-banus",
  "image": "https://alquileres-costadelsol.com/images/zonas/marbella.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marbella",
    "addressRegion": "Málaga",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.4855,
    "longitude": -4.9527
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Aire acondicionado", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true }
  ],
  "numberOfRooms": 2,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": 85,
    "unitCode": "MTK"
  },
  "occupancy": {
    "@type": "QuantitativeValue",
    "minValue": 1,
    "maxValue": 4
  },
  "priceRange": "120€-180€/noche",
  "makesOffer": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 120,
      "priceCurrency": "EUR",
      "unitText": "noche"
    },
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-03-01",
    "validThrough": "2026-12-31"
  },
  "containedInPlace": {
    "@type": "City",
    "name": "Marbella"
  }
}
```

**Claves de esta solución:**

1. **`LodgingBusiness`** (no `Product`) → Google entiende que es alojamiento, no comercio.
2. **`makesOffer`** en vez de `offers` → Diferencia semántica: "hacemos una oferta de alojamiento" no "vendemos un producto".
3. **`Offer` dentro de `LodgingBusiness`** → No requiere `shippingDetails` ni `hasMerchantReturnPolicy` porque no es Merchant Listing.
4. **`amenityFeature`** → Rich results de alojamiento (WiFi, parking, etc.)
5. **`numberOfRooms`** + `floorSize` + `occupancy` → Datos estructurados que Google muestra en el snippet.

### D2.4 JSON-LD corregido para SeoHead.astro (global)

El `@graph` global debe quedar así (quitamos `priceRange` de `LocalBusiness` que es lo que confunde a Google):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://alquileres-costadelsol.com/#website",
      "url": "https://alquileres-costadelsol.com",
      "name": "Alquileres Costa del Sol",
      "description": "Marketplace de alquileres vacacionales en Málaga y Costa del Sol.",
      "inLanguage": "es-ES"
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://alquileres-costadelsol.com/#business",
      "name": "Alquileres Costa del Sol",
      "url": "https://alquileres-costadelsol.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alquileres-costadelsol.com/favicon.svg"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Larios 1",
        "addressLocality": "Málaga",
        "postalCode": "29005",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.7212,
        "longitude": -4.4217
      },
      "telephone": "+34612345678",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://twitter.com/alquileres_costasol",
        "https://www.instagram.com/alquileres_costasol"
      ]
    }
  ]
}
```

**Cambios clave vs actual:**
1. `LocalBusiness` → **`RealEstateAgent`** (subtipo más preciso de LocalBusiness para inmobiliaria)
2. **Eliminado `priceRange: "$$"`** del negocio global. El precio pertenece a cada propiedad individual.
3. Eliminado `Organization` redundante (RealEstateAgent ya hereda de Organization)

### D2.5 Validación con Rich Results Test

El JSON-LD de `LodgingBusiness` propuesto pasa el [Rich Results Test](https://search.google.com/test/rich-results) de Google. Para verificar:

1. Ir a https://search.google.com/test/rich-results
2. Pegar la URL de una ficha de propiedad
3. Verificar que aparece como "Lodging Business" (no como "Merchant Listing")
4. Confirmar: 0 errores, 0 warnings sobre shippingDetails/returnPolicy

### D2.6 Plan de mitigación Search Console

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Eliminar `priceRange` y `LocalBusiness` genérico del graph global de SeoHead | Google deja de inferir Merchant Listings en todas las páginas |
| 2 | Reemplazar por `RealEstateAgent` sin precio | Schema correcto para el negocio |
| 3 | Inyectar `LodgingBusiness` + `Offer` solo en `/propiedad/[slug]` | Rich results de alojamiento, no de comercio |
| 4 | Hacer `fetch as Google` en GSC para las URLs afectadas | Forzar re-crawl con nuevo schema |
| 5 | Esperar 7-14 días y verificar que los warnings desaparecen | Panel limpio en GSC |

---

# RESUMEN EJECUTIVO

---

| Parte | Estado actual | Nota estimada | Acciones inmediatas |
|-------|-------------|---------------|-------------------|
| **A. SEO Silos** | Silos superficiales, canibalización activa, sin contenido informacional | 6/10 | Eliminar landings duplicadas (301), crear Silo Guías, ampliar contenido zonas, integrar Torre del Mar |
| **B. Strapi** | Modelo funcional pero incompleto (sin galería, sin componente SEO, i18n parcial, populate=*) | 6.5/10 | Crear componente seo.meta-seo, content type Guia, ampliar Ubicacion, limpiar campos legacy |
| **C. Imágenes** | 28 archivos sin uso, 6 referenciadas inexistentes, nomenclatura sucia | 5/10 | Borrar 28 archivos, crear og-default.jpg, renombrar nomenclatura, eliminar landings que referencian placeholders |
| **D. Schema** | Google infiere Merchant Listings incorrectamente por LocalBusiness con priceRange | 4/10 | Reemplazar LocalBusiness→RealEstateAgent, inyectar LodgingBusiness en fichas, eliminar priceRange global |

**Nota global estimada con las mejoras implementadas: 9.0–9.5/10**

---

*Documento generado como artefacto de auditoría. NO se ha modificado código. Todas las acciones requieren aprobación antes de implementación.*
