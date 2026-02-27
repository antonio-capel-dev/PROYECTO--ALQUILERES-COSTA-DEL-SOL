# DÍA 7 — Strapi v5: Backend Headless CMS
## Variables de entorno · API REST · Seed · PM2 en producción

---

## ÍNDICE

1. [¿Qué es un Headless CMS?](#1-qué-es-un-headless-cms)
2. [Arquitectura de Strapi v5](#2-arquitectura-de-strapi-v5)
3. [El archivo .env: variables obligatorias](#3-el-archivo-env-variables-obligatorias)
4. [El error "Missing admin.auth.secret"](#4-el-error-missing-adminauthsecret)
5. [API REST de Strapi v5: endpoints y parámetros](#5-api-rest-de-strapi-v5-endpoints-y-parámetros)
6. [Diferencias clave entre Strapi v4 y v5](#6-diferencias-clave-entre-strapi-v4-y-v5)
7. [seed-strapi.mjs: script de datos iniciales](#7-seed-strapiimjs-script-de-datos-iniciales)
8. [Integración Strapi + Astro SSG](#8-integración-strapi--astro-ssg)
9. [Strapi en producción con PM2](#9-strapi-en-producción-con-pm2)
10. [Preguntas de examen tipo test](#10-preguntas-de-examen-tipo-test)

---

## 1. ¿Qué es un Headless CMS?

### CMS tradicional vs Headless CMS

**CMS tradicional (WordPress, Joomla):**
```
┌─────────────────────────────────────────────────┐
│  CMS (WordPress)                                │
│  ┌─────────────┐    ┌───────────────────────┐   │
│  │  Base de    │───►│  Generador de HTML    │   │
│  │  datos      │    │  + CSS + JS           │   │
│  └─────────────┘    └──────────┬────────────┘   │
└─────────────────────────────────┼───────────────┘
                                  │ HTML completo
                                  ▼
                             Navegador
```

**Headless CMS (Strapi):**
```
┌────────────────┐     API REST/GraphQL     ┌──────────────────┐
│  Strapi        │ ─────────────────────►   │  Astro SSG       │
│  (solo datos)  │   JSON puro              │  (genera HTML)   │
│                │ ◄─────────────────────   │                  │
└────────────────┘                          └──────────────────┘
       │                                            │
  Panel Admin                                 dist/index.html
  (para el equipo)                            (para el usuario)
```

**"Headless"** = sin cabeza (sin capa de presentación).
Solo gestiona datos y los expone vía API. Quién los presenta es otro sistema.

### Ventajas del enfoque Headless para alquileres

| Característica | CMS tradicional | Strapi + Astro |
|---|---|---|
| Rendimiento | Medio | Máximo (HTML estático) |
| Flexibilidad de diseño | Limitada (plantillas) | Total (código propio) |
| Cambiar de frontend | Imposible | Sí (la API no cambia) |
| SEO | Bueno | Excelente |
| App móvil futura | Requiere API extra | Misma API Strapi |

---

## 2. Arquitectura de Strapi v5

### Estructura de carpetas del backend

```
backend/
├── config/
│   ├── admin.ts         ← Configuración del panel admin (usa ADMIN_JWT_SECRET)
│   ├── server.ts        ← Host, puerto, APP_KEYS
│   ├── database.ts      ← Conexión a SQLite/PostgreSQL/MySQL
│   ├── middlewares.ts   ← CORS, seguridad, compresión
│   └── plugins.ts       ← Plugins activados
├── src/
│   ├── api/
│   │   └── rental/      ← Content-type "rental" (nuestras propiedades)
│   │       ├── content-types/
│   │       │   └── schema.json    ← Definición de campos
│   │       ├── controllers/       ← Lógica personalizada
│   │       ├── routes/            ← Rutas API
│   │       └── services/          ← Servicios de datos
│   └── admin/           ← Personalizaciones del panel admin
├── .env                 ← Secretos (NO en git)
├── .env.example         ← Plantilla (SÍ en git)
├── package.json
└── tsconfig.json
```

### El ciclo de vida de Strapi

```
npm run develop          → Modo desarrollo (hot-reload, SQLite)
npm run build            → Compila TypeScript → JavaScript (en /dist)
npm run start            → Inicia el servidor compilado (producción)
```

**En producción siempre:**
1. `npm run build` primero
2. `npm start` (o `pm2 start npm -- start`)

---

## 3. El archivo .env: variables obligatorias

### Variables mínimas para arrancar Strapi v5

```bash
# ── Servidor ──────────────────────────────────────────────────────────────
HOST=0.0.0.0          # Escuchar en todas las interfaces (necesario en EC2)
PORT=1337             # Puerto de Strapi

# ── Claves de la aplicación ───────────────────────────────────────────────
# 4 strings aleatorios separados por coma
# Se usan para cifrar sesiones, cookies y tokens internos
APP_KEYS=clave1,clave2,clave3,clave4

# ── Secreto del panel Admin ──────────────────────────────────────────────
# ← ESTE es el que causaba el error "Missing admin.auth.secret"
ADMIN_JWT_SECRET=secreto_aleatorio_largo

# ── JWT para usuarios de la API ──────────────────────────────────────────
JWT_SECRET=otro_secreto_aleatorio

# ── Salts (refuerzan el hashing) ─────────────────────────────────────────
API_TOKEN_SALT=salt_para_tokens
TRANSFER_TOKEN_SALT=salt_para_transferencias

# ── Cifrado de datos sensibles ────────────────────────────────────────────
ENCRYPTION_KEY=clave_de_cifrado

# ── Entorno ───────────────────────────────────────────────────────────────
NODE_ENV=production   # En desarrollo: development (o se omite)
```

### ¿Cómo genera Strapi v5 los valores en `config/`?

```typescript
// config/admin.ts
const config = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),   // Lee process.env.ADMIN_JWT_SECRET
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
```

```typescript
// config/server.ts
const config = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),        // env('VAR', 'default')
  port: env.int('PORT', 1337),         // env.int() convierte a número
  app: {
    keys: env.array('APP_KEYS'),       // env.array() divide por comas
  },
});
```

### Generar valores seguros con openssl

```bash
# Generar un secreto de 32 bytes en base64 (bueno para JWT secrets):
openssl rand -base64 32
# → v1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7=

# Para APP_KEYS (4 claves en una línea):
echo "$(openssl rand -base64 24),$(openssl rand -base64 24),$(openssl rand -base64 24),$(openssl rand -base64 24)"
```

---

## 4. El error "Missing admin.auth.secret"

### El mensaje completo del error

```
Error: Missing admin.auth.secret configuration.
    at Object.register (/backend/node_modules/@strapi/admin/dist/server/index.js:...)

[2024-xx-xx] error: Missing admin.auth.secret configuration.
Your application requires a secret to sign admin JWTs.
Please add ADMIN_JWT_SECRET to your .env file.
```

### Causa raíz

Strapi v5 **obliga** a que `ADMIN_JWT_SECRET` tenga un valor no vacío.
Si `.env` no existe o la variable está vacía, el proceso aborta al arrancar.

```typescript
// Lo que hace Strapi internamente (simplificado):
const secret = process.env.ADMIN_JWT_SECRET;
if (!secret || secret === '') {
  throw new Error('Missing admin.auth.secret configuration');
}
```

### Diagnóstico paso a paso

```bash
# 1. ¿Existe el archivo .env?
ls -la backend/.env

# 2. ¿Tiene ADMIN_JWT_SECRET?
grep "ADMIN_JWT_SECRET" backend/.env

# 3. ¿Tiene un valor (no está vacío)?
grep "ADMIN_JWT_SECRET=" backend/.env
# Si devuelve: ADMIN_JWT_SECRET=   ← vacío → es el problema
# Si devuelve: ADMIN_JWT_SECRET=aXb...  ← correcto

# 4. ¿El .env está en el directorio correcto?
# Debe estar en /backend/.env, NO en la raíz
```

### La solución

```bash
# Si no existe .env:
cd backend
cp .env.example .env

# Editar y rellenar ADMIN_JWT_SECRET:
nano .env
# Pegar: ADMIN_JWT_SECRET=<valor generado con openssl rand -base64 32>

# O de una línea:
echo "ADMIN_JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n=')" >> .env
```

---

## 5. API REST de Strapi v5: endpoints y parámetros

### Endpoints base

```
GET  /api/rentals              → lista todos los alquileres
GET  /api/rentals/:documentId  → un alquiler específico
POST /api/rentals              → crear (requiere autenticación)
PUT  /api/rentals/:documentId  → actualizar (requiere autenticación)
DELETE /api/rentals/:documentId → eliminar (requiere autenticación)
```

### Parámetros de la API

```bash
# Populate: incluir relaciones (ej: imagen, autor)
GET /api/rentals?populate=*
GET /api/rentals?populate=image,ubicacion

# Paginación
GET /api/rentals?pagination[page]=1&pagination[pageSize]=10

# Filtros
GET /api/rentals?filters[zona][$eq]=Marbella
GET /api/rentals?filters[precio][$lte]=200
GET /api/rentals?filters[capacidad][$gte]=4

# Ordenación
GET /api/rentals?sort=precio:asc
GET /api/rentals?sort=precio:desc

# Solo ciertos campos (projection)
GET /api/rentals?fields[0]=titulo&fields[1]=precio&fields[2]=zona

# Combinar varios:
GET /api/rentals?populate=*&filters[zona][$eq]=Marbella&sort=precio:asc&pagination[pageSize]=5
```

### Formato de respuesta Strapi v5

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123def456",
      "title": "Ático con terraza en Marbella",
      "price": 210,
      "slug": "atico-marbella-vista-mar-2h-4p",
      "ubicacion": {
        "ciudad": "Marbella",
        "pais": "España"
      },
      "detalles": {
        "capacidad": 4,
        "habitaciones": 2
      },
      "image": {
        "url": "/uploads/foto.jpg"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "publishedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 20
    }
  }
}
```

### Operadores de filtro

| Operador | Significado | Ejemplo |
|---|---|---|
| `$eq` | igual a | `filters[zona][$eq]=Marbella` |
| `$ne` | distinto de | `filters[tipo][$ne]=Estudio` |
| `$lt` | menor que | `filters[precio][$lt]=100` |
| `$lte` | menor o igual | `filters[precio][$lte]=200` |
| `$gt` | mayor que | `filters[capacidad][$gt]=4` |
| `$gte` | mayor o igual | `filters[habitaciones][$gte]=2` |
| `$contains` | contiene | `filters[titulo][$contains]=terraza` |
| `$in` | está en lista | `filters[zona][$in]=Marbella,Málaga` |

---

## 6. Diferencias clave entre Strapi v4 y v5

### documentId vs id numérico

```javascript
// Strapi v4: id era un número
const res = await fetch('/api/rentals/5');        // id numérico
// PUT /api/rentals/5

// Strapi v5: documentId es un string alfanumérico
const res = await fetch('/api/rentals/abc123def456');  // documentId
// PUT /api/rentals/abc123def456
```

### ¿Por qué el cambio?

En Strapi v5, un mismo contenido puede tener varias versiones (draft, published, locale).
El `id` numérico identifica una versión específica.
El `documentId` identifica el documento en todas sus versiones.

### El parámetro `status`

```bash
# En Strapi v5, el contenido puede estar en dos estados:
GET /api/rentals?status=published    # Solo publicados (defecto en producción)
GET /api/rentals?status=draft        # Solo borradores

# Si no especificas status, en producción solo devuelve published
```

### Normalización en nuestro proyecto

```javascript
// normalizarStrapi en index.astro: adapta la respuesta de Strapi v5
// al formato plano que espera RentalCard
const normalizarStrapi = (r) => ({
  slug:         r.slug          ?? '',
  titulo:       r.title         ?? 'Sin título',    // Strapi usa "title", no "titulo"
  zona:         r.ubicacion?.ciudad ?? r.location ?? '',
  tipo:         r.tipo          ?? undefined,
  precio:       r.price         ?? 0,               // Strapi usa "price", no "precio"
  capacidad:    r.detalles?.capacidad    ?? 0,
  habitaciones: r.detalles?.habitaciones,
  image_url:    r.image_url
    ?? (r.image?.url
      ? (r.image.url.startsWith('http')
          ? r.image.url
          : `${STRAPI_URL}${r.image.url}`)           // URL relativa → absoluta
      : undefined),
});
```

---

## 7. seed-strapi.mjs: script de datos iniciales

### ¿Para qué sirve un seed?

Un seed (semilla) es un script que inserta datos de prueba en la base de datos.
Permite que cualquier desarrollador tenga el mismo dataset de partida.

### Diseño idempotente

**Idempotente** = se puede ejecutar N veces y el resultado es siempre el mismo.
No crea duplicados, no rompe datos existentes.

```javascript
// scripts/seed-strapi.mjs

// Para cada propiedad del JSON local:
// 1. Buscar si ya existe en Strapi por slug
// 2. Si existe → actualizar (PUT)
// 3. Si no existe → crear (POST)

for (const prop of propiedades) {
  // Buscar por slug (campo único)
  const busqueda = await fetch(
    `${STRAPI_URL}/api/rentals?filters[slug][$eq]=${prop.slug}&status=published`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  const { data } = await busqueda.json();

  if (data.length > 0) {
    // Ya existe → actualizar con PUT usando documentId (Strapi v5)
    const documentId = data[0].documentId;
    await fetch(`${STRAPI_URL}/api/rentals/${documentId}?status=published`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: mapearCampos(prop) }),
    });
    console.log(`Actualizado: ${prop.titulo}`);
  } else {
    // No existe → crear con POST
    await fetch(`${STRAPI_URL}/api/rentals?status=published`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: mapearCampos(prop) }),
    });
    console.log(`Creado: ${prop.titulo}`);
  }
}
```

### ¿Por qué `?status=published` en el POST/PUT?

En Strapi v5, cuando creas un documento, por defecto queda en borrador (draft).
Para que sea visible en la API pública necesitas publicarlo.
`?status=published` en el POST crea y publica en una sola operación.

### Cómo ejecutar el seed

```bash
# Prerrequisitos:
# 1. Strapi corriendo en http://localhost:1337
# 2. API token con permisos de escritura (creado en el panel admin)
# 3. Content-type "rental" creado en Strapi

# Ejecutar:
cd /var/www/alquileres  # o en local: raíz del proyecto
node scripts/seed-strapi.mjs
```

---

## 8. Integración Strapi + Astro SSG

### El patrón: Strapi como fuente de verdad con JSON como fallback

```javascript
// En index.astro (frontmatter, corre en build-time):

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
let strapiData = [];

try {
  // Intentar Strapi primero
  const res = await fetch(`${STRAPI_URL}/api/rentals?populate=*`);
  const json = await res.json();
  strapiData = json.data || [];
} catch {
  // Si Strapi no está disponible (desarrollo, Strapi apagado)
  // No lanzamos error, simplemente strapiData queda vacío
}

// Decidir fuente de datos
const data = strapiData.length > 0
  ? strapiData.map(normalizarStrapi)    // Strapi disponible → usar Strapi
  : propiedades20.map(normalizarLocal); // Strapi no disponible → JSON local
```

### import.meta.env — Variables de entorno en Astro

```javascript
// En Astro, las variables de entorno se acceden con import.meta.env:
import.meta.env.PUBLIC_STRAPI_URL   // Variable pública (disponible en cliente)
import.meta.env.SECRET_API_KEY      // Variable privada (solo en build-time)

// Regla: las que empiezan por PUBLIC_ se incluyen en el bundle del cliente
//        el resto SOLO están disponibles durante el build (servidor)
```

```bash
# frontend/.env
PUBLIC_STRAPI_URL=http://3.78.246.203:1337   # Accesible en el cliente
SECRET_DB_PASSWORD=mi_password               # Solo en build (NO expuesto)
```

### Build-time vs Runtime

```
BUILD-TIME (npm run build)              RUNTIME (navegador)
─────────────────────────               ──────────────────
import.meta.env funciona                import.meta.env = undefined
fetch() a Strapi funciona               Solo el JS bundleado llega
El HTML se genera con los datos         El JSON inline se lee con getElementById
```

Por eso el dataset se inyecta en el HTML como JSON: es la única forma de
pasar datos del build al código del cliente.

---

## 9. Strapi en producción con PM2

### El proceso completo de arranque en producción

```bash
# En el servidor:
cd /var/www/alquileres/backend

# 1. Instalar dependencias de producción (sin devDependencies)
npm ci --omit=dev

# 2. Compilar TypeScript → JavaScript
npm run build
# → genera /backend/dist/ con el código compilado

# 3. Iniciar con PM2 (que ejecuta npm start = node dist/server.js)
pm2 start npm --name "strapi" -- start

# 4. Guardar configuración PM2
pm2 save
```

### Variables de entorno en producción

En producción, `NODE_ENV=production` cambia el comportamiento de Strapi:
- Usa la base de datos configurada (en lugar de SQLite de desarrollo)
- Desactiva el hot-reload
- Activa optimizaciones de rendimiento
- Desactiva mensajes de depuración detallados

```bash
# backend/.env (producción)
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
# ... (el resto de secretos)
```

### Proteger la base de datos en el servidor

```bash
# La BD SQLite de Strapi está en:
/var/www/alquileres/backend/.tmp/data.db

# NUNCA hacer git clean en producción sin excluir .tmp/
git clean -fd --exclude=.tmp    # Limpia pero conserva .tmp/

# Backup de la BD antes de un deploy importante:
cp backend/.tmp/data.db backend/.tmp/data.db.backup.$(date +%Y%m%d)
```

### Logs de Strapi en producción

```bash
# Ver logs en tiempo real:
pm2 logs strapi

# Ver últimas 100 líneas:
pm2 logs strapi --lines 100

# Limpiar logs (si ocupan mucho espacio):
pm2 flush strapi

# Los logs se guardan en:
~/.pm2/logs/strapi-out.log   # stdout (output normal)
~/.pm2/logs/strapi-error.log # stderr (errores)
```

---

## 10. Preguntas de examen tipo test

**1. ¿Qué significa "Headless" en "Headless CMS"?**
- A) Que el CMS no tiene interfaz de administración
- B) Que el CMS no genera HTML — solo gestiona datos vía API ✓
- C) Que el CMS funciona sin base de datos
- D) Que no requiere Node.js

**2. ¿Cuál es la diferencia principal entre `id` y `documentId` en Strapi v5?**
- A) `id` es numérico y `documentId` es un string que identifica el documento entre versiones ✓
- B) `documentId` es numérico y `id` es string
- C) Son exactamente lo mismo
- D) `documentId` solo existe en Strapi v4

**3. ¿Qué hace `env.array('APP_KEYS')` en Strapi?**
- A) Convierte el string en un array dividiéndolo por comas ✓
- B) Busca todas las variables que empiezan por APP_KEYS
- C) Convierte el array a string
- D) Lee un archivo JSON

**4. ¿Por qué en producción se ejecuta `npm run build` antes de `npm start`?**
- A) Para instalar dependencias
- B) Para compilar TypeScript a JavaScript que Node.js puede ejecutar ✓
- C) Para limpiar la base de datos
- D) Para actualizar Strapi

**5. ¿Qué hace `?status=published` en la API de Strapi v5?**
- A) Filtra contenido por fecha de publicación
- B) Devuelve solo los documentos publicados (no borradores) ✓
- C) Publica todos los documentos devueltos
- D) Solo funciona con POST

**6. ¿Qué es un seed idempotente?**
- A) Un seed que borra todos los datos antes de insertar
- B) Un seed que puede ejecutarse múltiples veces sin crear duplicados ✓
- C) Un seed que solo funciona una vez
- D) Un seed que usa transacciones SQL

**7. ¿Cuándo funciona `import.meta.env` en Astro?**
- A) Solo en el navegador
- B) Solo durante el build (en el servidor/Node.js) ✓
- C) En el build y en el navegador
- D) Solo con TypeScript

**8. ¿Por qué `HOST=0.0.0.0` en producción y no `HOST=localhost`?**
- A) Por preferencia de Strapi
- B) `localhost` solo escucha conexiones locales; `0.0.0.0` escucha en todas las interfaces de red, necesario para EC2 ✓
- C) `0.0.0.0` es más seguro
- D) Son equivalentes

**Respuestas: 1-B, 2-A, 3-A, 4-B, 5-B, 6-B, 7-B, 8-B**
