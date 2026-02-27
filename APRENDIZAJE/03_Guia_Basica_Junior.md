# 🏡 Guía del Proyecto: Alquileres Costa del Sol

_(Para alumnos de 2º DAW enfrentándose a su primer proyecto real)_

¡Hola! Soy tu profesor. Si estás leyendo esto, es porque vas a meter las manos en un proyecto profesional con **Astro** y **Strapi**. Olvida por un momento el código y vamos a entender los cimientos de la casa que vamos a construir.

---

### 1️⃣ ¿Qué es este proyecto en una frase?

Es una plataforma web ultrarrápida para buscar y reservar pisos vacacionales en Málaga, donde la información de las casas se carga desde un panel de control fácil de usar por la inmobiliaria.

### 2️⃣ ¿Qué problema de negocio resuelve?

Imagínate que tienes 50 pisos para alquilar. Sin este proyecto, tendrías que modificar el código HTML a mano cada vez que cambia el precio de un piso o quieres subir fotos nuevas. Este proyecto resuelve ese problema: **le da a la empresa un panel gráfico (CMS)** para gestionar sus propiedades, y **le da al turista una web rapidísima** para encontrarlas.

### 3️⃣ ¿Qué hace el Frontend (Astro)?

**El Frontend es el "Escaparate" de la tienda.**
Astro es el obrero que construye ese escaparate. Su misión es crear la página web, pintar los colores, los botones y poner las fotos bonitas. Astro es especial porque construye todo el HTML _antes_ de que el usuario lo pida, haciendo que la web cargue casi instantáneamente (como si te entregaran una revista impresa en lugar de pintarla frente a ti).

### 4️⃣ ¿Qué hace el Backend (Strapi)?

**El Backend es el "Almacén" y el "Gestor" de la tienda.**
Strapi guarda todos los datos de verdad: cuántos metros cuadrados tiene el piso de Benalmádena, qué precio tiene la villa en Marbella, etc. Además, Strapi proporciona una interfaz (panel de administración) para que el dueño de la inmobiliaria añada o borre casas sin tocar código.

### 5️⃣ ¿Cómo se comunican?

Hablan a través de "mensajes" llamados **APIs**.
Imagina que Astro es un camarero y Strapi es el cocinero en la cocina.
Astro (camarero) le pregunta a Strapi (cocinero): _"¡Oye! Dame todos los alquileres de Marbella en formato JSON"_.
Strapi saca los datos de la base de datos y se los devuelve al camarero. Astro coge esos ingredientes en crudo (el JSON) y los cocina en una página HTML bonita para que se la coma el cliente (el usuario final).

---

### 6️⃣ ¿Qué papel tiene cada carpeta principal?

Vamos a ver los planos de la obra:

#### 🟢 En el Frontend (Astro)

- **`src/pages/` (Las Habitaciones):** Cada archivo aquí es una URL de tu web. Si creas `contacto.astro`, existirá `tuweb.com/contacto`. Así de fácil.
- **`src/components/` (Los Muebles):** Aquí guardamos trozos de código que se repiten. Botones, tarjetas de propiedades, menús de navegación.
- **`src/layouts/` (Los Cimientos):** Define la estructura base de la web (el típico `<body>`, el `<head>`, y el Header/Footer que siempre están ahí).

#### 🔵 En el Backend (Strapi)

- **`src/api/` (Las Estanterías del Almacén):** Aquí se guarda la definición de cómo es un "Alquiler". (Ej: el Alquiler tiene Título, Precio y Zona).
- **`components/` (Las Cajas de los Cajones):** Estructuras pequeñas de datos. Por ejemplo, en vez de crear 20 campos para el SEO en cada tabla, creas un "Componente de SEO" y se lo pegas como pegatina a los pisos y a las páginas.

---

### 7️⃣ ¿Qué es un componente en este proyecto?

**Un componente es una pieza de LEGO.**
En lugar de escribir 50 veces el código HTML largo para pintar un "Botón Azul", creamos un archivo llamado `Boton.astro`. Cada vez que queramos un botón azul en la web, solo escribimos `<Boton>Comprar</Boton>`. Si mañana el dueño nos pide que los botones sean rojos, solo cambiamos el archivo `Boton.astro` una vez, y automáticamente cambiarán los 50 botones de toda la web.

---

### 8️⃣ ¿Qué es el Sistema de Diseño?

**Es el "Libro de Estilo" o las reglas de la marca.**
Al igual que McDonald's siempre usa el mismo rojo y amarillo en todos sus restaurantes del mundo, un sistema de diseño asegura que nuestra web siempre use la misma gama de azules (`marca-primaria`), los mismos tamaños de letra, y las mismas sombras.
En nuestro proyecto de Astro, guardamos estas reglas en archivos como `tailwind.config.mjs` y `global.css`.

---

### 9️⃣ ¿Qué es escalabilidad aquí?

**Escalar es que la casa no se caiga cuando le añadas 3 plantas más.**
Si mañana la inmobiliaria pasa de tener 20 pisos a tener 2.000, nuestro proyecto debe seguir funcionando igual de rápido. Como usamos Astro para pre-generar las rutas, y la base de datos está en Strapi, el proyecto es muy escalable: puede atender a 1 millón de visitas mañana sin colapsar el servidor, porque solo estamos sirviendo el HTML ya construido.

---

### 🔟 ¿Qué significa evitar "hardcodeo"?

Hacer **hardcodeo** es clavar los cuadros a la pared con superglue en lugar de usar alcayatas: funciona hoy, pero es un infierno si quieres cambiarlos de sitio mañana.

- ❌ **Hardcodeo (Mal):** Escribir `<h1>Piso soleado en Málaga por 100€</h1>` directamente en el HTML de Astro. Si cambia a 120€, tendrás que buscar ese archivo y cambiarlo a mano.
- ✅ **Sin Hardcodeo (Bien):** Traer los datos limpios y pintar: `<h1>{piso.titulo} por {piso.precio}€</h1>`. Así, el dato viene de Strapi (almacén) de forma dinámica.

---

_Si logras entender este esquema, estás preparado para aprobar 2º de DAW y empezar a trabajar como Frontend Developer profesional al salir del instituto._
