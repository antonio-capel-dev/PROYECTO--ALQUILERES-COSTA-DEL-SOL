# Informe Técnico de Calidad en Interfaces Web – Evaluación Académica

## 1️⃣ Veredicto Ejecutivo

- **Nota Estimada Actual:** 6.5 / 10
- **3 Fortalezas Reales en Interfaces:**
  1. **Uso de Tipografía Fluida (`clamp`):** La implementación en `global.css` demuestra conocimiento avanzado y garantiza legibilidad escalar sin abusar de media queries.
  2. **Definición Estricta de Variables CSS:** Hay un sistema de tokens configurado correctamente en `:root` y mapeado en Tailwind (`tailwind.config.mjs`).
  3. **Enrutamiento y Abstracción:** El uso de componentes de Astro (`ZoneCard`, `FichaAlquiler`, `HeroZona`) separa lógicamente el dato de la vista.
- **5 Debilidades que bajarían nota en defensa oral:**
  1. **Inyección Inconsistente de Utilidades (Hardcoding):** Componentes como el Hero en `index.astro` inyectan colores o estilos muy concretos a los contenedores (ej. `bg-black/40`, `bg-slate-900`) en lugar de usar el sistema semántico definido.
  2. **Rastros de "Plantilla Automática" o IA:** Emojis sobrevivientes (☀️, 📧, 📍, 📞) usados como iconografía principal en el `<nav>`, `<footer>` y `Empty States`. Esto delata inmadurez visual y resta valor percibido frente a un cliente que busca "Alquiler Exclusivo".
  3. **Disparidad de Componentes vs HTML Puro:** Mientras un botón usa una abstracción perfecta (`<Boton />`), el carrusel y las tarjetas del Hero de inicio se engordan con clases Tailwind encadenadas larguísimas directamente en las vistas, violando la consistencia que se intenta vender.
  4. **Contraste y Legibilidad en Capas (Z-Index):** En algunos `div` absolutos, se satura el DOM y se difuminan las fronteras usando superposiciones de color (ej. `bg-white/95 backdrop-blur-sm px-4 py-2`).
  5. **Manejo de Estados Vacíos (Empty States):** El bloque visual de "No hay propiedades visibles" usa un emoji gigante "🏝️" en `index.astro`, lo cual rompe agresivamente el tono solemne del _"Lujo y la Exclusividad"_.
- **Riesgo principal que detectaría un profesor exigente:**
  - _"Vendes que usas un Sistema de Diseño atómico, pero en `index.astro` tienes decenas de clases Tailwind inyectadas manualmente y emojis estructurales. ¿Dónde está realmente el sistema si no es obligatorio usarlo?"_

---

## 2️⃣ Imagen de Marca (Brand UI)

- **Coherencia Cromática:** Existe una paleta base buena (Marina/Acento), pero la aplicación es esporádica. A menudo el diseño recurre al salvavidas genérico de Tailwind (`slate-100`, `slate-500`) diluyendo la identidad comercial del producto.
- **Sistema Tipográfico:** Robusto gracias a las directivas `@layer base`. Mantiene buena herencia.
- **Iconografía:** **SUSPENSO.** Uso masivo de Emojis (`☀️`, `📧`, `🏝️`, `✨`, `🚀`) en lugares críticos (Navegación, Hero, Footer, Contadores).
- **Sensación General:** Parece un esqueleto de inicio rápido bien configurado, pero que evidencia una maquetación de "copiar y pegar" (con rastros de IA) antes que un producto maduro diseñado _ad-hoc_. Delata falta de refinamiento.

| Diagnóstico Visual               | Detalle                                                                                                          |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Delata improvisación**         | Emojis en el header/footer. Empty states informales.                                                             |
| **Delata generación automática** | Atributos semánticos como `aria-label` mezclados con clases CSS gigantescas de 3 líneas en el mismo `className`. |
| **Delata falta de sistema**      | El Hero mezcla `bg-slate-900` con `bg-black/40`, ignorando las variables de la marca `<marca-oscura>`.           |

---

## 3️⃣ Sistema de Diseño

- **Tokens Definidos:** ✔️ Sí (CSS Variables en `:root` existiendo en perfecta sintonía con Tailwind v4).
- **Escala Tipográfica:** ✔️ Sí (Clamp fluido y coherente).
- **Componentes Reutilizables Reales:** ⚠️ A medias. Tienes `<Boton />` y `<FichaAlquiler />`, pero todo el Navbar y Carrusel están hardcodeados en los Layouts y Pages, lo cual los vuelve difíciles de mantener.
- **Regla de espaciado:** ⚠️ A medias. Algunos contenedores usan `py-32`, otros `py-24`, otros `py-16`.

**Se rompe el sistema explícitamente en:**

- `src/pages/index.astro`. En la sección Hero hay estilos _inline_ injertados (`style="background-image: url(...)"`) y utilidades estáticas como `bg-slate-900`.
- En el Footer (dentro de `Layout.astro`), que repite la estructura repetitiva y hace uso de emojis estructurales, en lugar de importar un `<Footer />` aislado con iconos.

---

## 4️⃣ Descanso Visual (Ritmo y Respiración)

- **Espaciado y Jerarquía:** Correcto en su mayoría. El macro-espaciado ayuda a evitar agobios visuales.
- **Contraste:** Los textos en gris `text-slate-500` sobre fondos claros están al borde del ratio de contraste AA. Se debe validar rigurosamente.
- **Síntomas de diseño amateur detectados:**
  - Carrusel con flechas `←` y `→` como texto literal y no como SVG o icono de interfaz.
  - Botones que actúan distinto (Ej: _Ir al CMS →_). Las flechas de texto crudas como pseudo-iconografía ensucian el UI y se sienten "pobres" visualmente.

---

## 5️⃣ Responsive y Consistencia

- **Mobile-first:** Adaptación aceptable. Tailwind impone ese orden y se respeta en los breakpoints clásicos (`md:`, `lg:`).
- **Grid Consistente:** Uso correcto de contenedores bloqueando el `max-w-7xl` e inyectando `mx-auto`.
- **Rupturas:** El mapa interactivo usa valores arbitrarios de altura que pueden verse forzados en ciertas pantallas tablet (`height: 320px` a `height: 420px`). Se recomiendan _aspect-ratios_.

---

## 6️⃣ Checklist de Sobresaliente (Solo Interfaces)

- [ ] **1. Cero Emojis:** Ni uno solo en toda la interfaz pública (NavBar, Footer, Empty States, botones). (Requiere SVGs puros).
- [ ] **2. Uso de `<Icon />` local o inyectado:** Centralizar la iconografía.
- [ ] **3. Cero estilos `inline` en UI principal:** Mover `style=""` fuera del `index.astro`.
- [ ] **4. Botones Consistentes:** Toda acción de llamada debe usar el `<Boton />` de UI, nada de anclas crudas imitando botones.
- [ ] **5. Aislamiento UI:** Extraer Navbar y Footer de `Layout.astro` a `<Header />` y `<Footer />` independientes.
- [x] **6. Tokens Globales:** `tailwind.config` o variables en `global.css` como Single Source of Truth.
- [x] **7. Tipografía Centralizada:** Inter declarada en el layout como prelaod y gestionada globalmente.
- [ ] **8. Eliminación de Colores "Tailwind Default" (Slate):** Restringir UI a los colores de sistema (Variables de Marca, y su gama gris estricta en lugar de grises arbitrarios).
- [x] **9. Contenedores Estándar:** Uso sistemático de un ancho máximo centralizado (Ej: abstracción `.contenedor-fluido`).
- [ ] **10. Contraste AA Mínimo Revisado:** Comprobar que todos los textos grises pasan el test de accesibilidad en navegadores.
- [ ] **11. Transiciones CSS Estandarizadas:** En vez de repetir `transition-all duration-300`, usar una abstracción si un cambio ocurre repetidas veces.
- [ ] **12. Limpieza de Clases Gigantescas:** Abstenerse de tener >15 utilidades Tailwind en líneas simples. Extraer usando `@apply` si la pieza se repite.
- [ ] **13. Espaciado Vertical Sistémico:** Definir un ritmo vertical estricto (Ej: usar siempre `py-20` para secciones completas, no mezclar).
- [ ] **14. Estados Activos Formularios/Buscadores:** (Focus Ring coherente aplicado a la `BarraBusqueda`).
- [ ] **15. Ausencia Total de Flechas de Texto Falsas:** Eliminar `←` y `→` (texto Unicode) del carrusel y links direccionales. Reemplazar por flechas de interfaz puras de un pack de iconos profesional (Ej: Heroicons, Phosphor Icons, o Lucide).

---

## 7️⃣ Plan de Mejora en 3 Fases

### Fase 1 – Impacto Inmediato (Limpieza Visual de Aprobado/Suspenso)

1.  **Purgar Unicode/Emojis (`Layout`, `index`, `Ficha`).**
    - **Cambio:** Quitar ☀️, 🏝️, 📧, 📍. Reemplazar por `<svg>` estáticos.
    - **Por qué sube nota:** Demuestra que no se usó ChatGPT para vomitar el UI y eleva el tono profesional al "nivel agencia".
2.  **Remplazar flechas de texto por componentes de iconos.**
    - **Cambio:** Deshacerse del `→` literal incrustado en los Action Links y Carruseles.
3.  **Encapsular NavBar y Footer en Archivos Independientes.**
    - **Cambio:** Crear `src/components/layout/Header.astro` y `Footer.astro`.
    - **Por qué sube nota:** Abstrae la vista global y alivia la carga de `Layout.astro`, defendiendo una buena modularización en Arquitectura de Componentes.
4.  **Eliminar Estilos Inline en Heroes.**
    - **Cambio:** Abstenerse de usar `style="background-image:"`. Inyectar mediante Directivas de Astro de forma limpia.
5.  **Aislar el Carrusel del index.**
    - **Cambio:** Todo el `<div class="relative">` del carrusel es "ruido". Pasarlo a `<CatalogoCarousel />`.

### Fase 2 – Consolidación del Sistema Gráfico

1.  **Limpiar clases kilométricas (Abstracción en CSS).**
    - **Cambio:** Cualquier envoltorio con más de 10 clases Tailwind que actúe de bloque decorativo repetido debe migrarse a `@layer components`.
2.  **Definir espaciado de Macro-Secciones.**
    - **Cambio:** Estandarizar márgenes (`py-16` vs `py-24`).
3.  **Sistematizar Botones/Links Ocultos.**
    - **Cambio:** A pesar de haber sistema de `<Boton />`, hay anclas (`<a>`) que simulan llamadas a la acción en `index.astro` a pulso. Hay que unificar.
4.  **Implementar Skeleton UI (Opcional en SSG/SSR pero sube percepción).**
    - **Cambio:** Uso visual de cargadores en lugar de ver el UI "vacío" o el fallback gigante del emoji si falla la carga diferida.
5.  **Corregir Paleta Fallback.**
    - **Cambio:** Reemplazar llamadas a `bg-slate-900` por llamadas estrictas a tus colores de marca `bg-marca-oscura` para la verdadera modularización.

### Fase 3 – Pulido Profesional ("A por el 10")

1. **Aspect Ratio a Imágenes.**
   - Forzar cargas estables de imágenes. Las imágenes del Hero o mapas Leaflet se estabilizarían con `.aspect-video` u otros.
2. **Sistema de Componente de "Sectores".**
   - Crear un componente `<Section title="..." description="..." />` que automatice el padding, H2 y la P que has venido programando a mano sección por sección.
3. **Control tipográfico estricto del "Measure" (Longitud de línea).**
   - Forzar `max-w-prose` a textos descriptivos del hero.
4. **Interactividad Unificada.**
   - Auditar los `hover:translate-x`, `hover:shadow-xl` para que todos los elementos clicables sigan un mismo patrón de rebote o animación.
5. **Auditoría Exhaustiva de Z-Index.**
   - Extraer los z-index de Tailwind a la config si hay capas difusas (`z-50`, `z-10`) asegurando que ningún mapa Leaflet se pise con el Navbar.
