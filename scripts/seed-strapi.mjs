/**
 * seed-strapi.mjs — Seed idempotente para Strapi v5
 * --------------------------------------------------
 * Lógica:
 *   - GET /api/rentals?filters[slug][$eq]=... → si existe → PUT (actualiza)
 *   - Si no existe → POST (crea como published)
 *   - Sin duplicados. Ejecutable N veces sin efectos secundarios.
 *
 * Variables de entorno (PowerShell):
 *   $env:STRAPI_URL        = "http://localhost:1337"
 *   $env:STRAPI_TOKEN      = "TU_TOKEN_AQUI"
 *   $env:STRAPI_COLLECTION = "rentals"
 *   node .\scripts\seed-strapi.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join }  from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Configuración ────────────────────────────────────────────────
const STRAPI_URL        = process.env.STRAPI_URL        || 'http://localhost:1337';
const STRAPI_TOKEN      = process.env.STRAPI_TOKEN      || '';
const STRAPI_COLLECTION = process.env.STRAPI_COLLECTION || 'rentals';

if (!STRAPI_TOKEN) {
  console.error('\n❌ STRAPI_TOKEN no definido. Genera un token Full Access en:\n   Strapi Admin → Settings → API Tokens → Create new token\n');
  process.exit(1);
}

const BASE_URL = `${STRAPI_URL}/api/${STRAPI_COLLECTION}`;
const HEADERS  = {
  'Content-Type':  'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
};

// ── Coordenadas por zona (para el componente ubicacion) ──────────
const COORDENADAS = {
  'Marbella':     { latitud: 36.5100, longitud: -4.8950 },
  'Málaga':       { latitud: 36.7213, longitud: -4.4214 },
  'Benalmádena':  { latitud: 36.5972, longitud: -4.5360 },
  'Torremolinos': { latitud: 36.6219, longitud: -4.5007 },
  'Fuengirola':   { latitud: 36.5394, longitud: -4.6248 },
  'Estepona':     { latitud: 36.4278, longitud: -5.1481 },
};

// ── Mapper: JSON local → payload de Strapi v5 ────────────────────
function toStrapiPayload(prop) {
  const coords   = COORDENADAS[prop.zona] || { latitud: 36.55, longitud: -4.70 };
  const amenities = prop.amenities || [];

  return {
    title:       prop.titulo,
    slug:        prop.slug,
    price:       prop.precio,
    location:    prop.zona,
    city:        prop.zona,
    // ── Campos nuevos (añadir en Content-Type Builder antes de ejecutar) ──
    tipo:        prop.tipo      ?? null,
    image_url:   prop.image_url ?? null,
    // ── Componentes ───────────────────────────────────────────────
    detalles: {
      habitaciones:     prop.habitaciones ?? 0,
      banos:            prop.banos        ?? 1,
      metros_cuadrados: prop.metros        ?? 50,
      capacidad:        prop.capacidad,
    },
    servicios: {
      wifi:               amenities.includes('wifi'),
      piscina:            amenities.some(a => a.includes('piscina')),
      aire_acondicionado: amenities.includes('aire acondicionado'),
      cocina:             amenities.some(a => a.includes('cocina')),
      parking:            amenities.includes('parking'),
      mascotas:           false,
      tv:                 false,
      lavadora:           amenities.includes('lavadora'),
    },
  };
}

// ── Helpers de API ───────────────────────────────────────────────

/** Busca un rental por slug. Devuelve { documentId } o null. */
async function buscarPorSlug(slug) {
  const url = `${BASE_URL}?filters[slug][$eq]=${encodeURIComponent(slug)}&fields[0]=slug&fields[1]=documentId`;
  const res  = await fetch(url, { headers: HEADERS });

  if (!res.ok) throw new Error(`GET ${url} → HTTP ${res.status}: ${await res.text()}`);

  const json = await res.json();
  return json.data?.[0] ?? null;  // null si no existe
}

/** Crea un rental nuevo y lo publica de inmediato. */
async function crear(payload) {
  // status=published → Strapi v5 publica directamente (sin borrador)
  const res = await fetch(`${BASE_URL}?status=published`, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify({ data: payload }),
  });
  if (!res.ok) throw new Error(`POST → HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Actualiza un rental existente por su documentId. */
async function actualizar(documentId, payload) {
  // Strapi v5 usa documentId (string), no id numérico como v4
  const res = await fetch(`${BASE_URL}/${documentId}?status=published`, {
    method:  'PUT',
    headers: HEADERS,
    body:    JSON.stringify({ data: payload }),
  });
  if (!res.ok) throw new Error(`PUT /${documentId} → HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

// ── Seed principal ───────────────────────────────────────────────
async function seed() {
  const dataPath    = join(__dirname, '../frontend/src/data/propiedades_20.json');
  const propiedades = JSON.parse(readFileSync(dataPath, 'utf-8'));

  console.log(`\n🌱 Seed idempotente — ${propiedades.length} propiedades → ${BASE_URL}`);
  console.log('─'.repeat(60));

  const resultados = { creadas: 0, actualizadas: 0, errores: 0 };

  for (const prop of propiedades) {
    const payload = toStrapiPayload(prop);
    try {
      const existente = await buscarPorSlug(prop.slug);

      if (existente) {
        await actualizar(existente.documentId, payload);
        console.log(`  ↺  UPDATED  ${prop.slug}`);
        resultados.actualizadas++;
      } else {
        await crear(payload);
        console.log(`  ✓  CREATED  ${prop.slug}`);
        resultados.creadas++;
      }
    } catch (err) {
      console.error(`  ✗  ERROR    ${prop.slug} → ${err.message}`);
      resultados.errores++;
    }
  }

  console.log('─'.repeat(60));
  console.log(`\n📊 Resumen:`);
  console.log(`   Creadas:     ${resultados.creadas}`);
  console.log(`   Actualizadas:${resultados.actualizadas}`);
  console.log(`   Errores:     ${resultados.errores}`);
  console.log(`   Total:       ${resultados.creadas + resultados.actualizadas} / ${propiedades.length}\n`);

  if (resultados.errores > 0) {
    console.warn('⚠️  Revisa los errores. Puede que falten campos en el Content-Type.');
    console.warn('   Añade "tipo" (Short text) e "image_url" (Short text) en Content-Type Builder.\n');
  }
}

seed().catch(err => {
  console.error('\n❌ Error fatal:', err.message);
  process.exit(1);
});
