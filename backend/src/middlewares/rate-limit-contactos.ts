/**
 * rate-limit-contactos.ts
 * Limita POST /api/contactos a MAX_REQUESTS por IP en WINDOW_MS milisegundos.
 * Implementación en memoria: sin dependencias externas, reinicia con el proceso.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5;            // máximo 5 envíos por IP

const store = new Map<string, number[]>();

export default () => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Solo aplica a POST /api/contactos (exacto o con trailing slash)
    if (ctx.method !== 'POST' || !/^\/api\/contactos\/?$/.test(ctx.path)) {
      return next();
    }

    // IP real: respeta X-Forwarded-For en producción con proxy/nginx
    const ip =
      (ctx.request.headers['x-forwarded-for'] as string)
        ?.split(',')[0]
        .trim() ||
      ctx.request.ip ||
      'unknown';

    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    // Filtrar solo timestamps dentro de la ventana actual
    const timestamps = (store.get(ip) ?? []).filter((t) => t > windowStart);

    if (timestamps.length >= MAX_REQUESTS) {
      strapi.log.warn(`[rate-limit] IP ${ip} bloqueada en POST /api/contactos`);
      ctx.status = 429;
      ctx.body = {
        error: {
          status: 429,
          name: 'TooManyRequestsError',
          message: 'Demasiadas solicitudes. Espera 10 minutos e inténtalo de nuevo.',
        },
      };
      return; // No llamar a next()
    }

    timestamps.push(now);
    store.set(ip, timestamps);

    // Limpieza periódica para evitar memory leak (cada 500 IPs únicas)
    if (store.size > 500) {
      for (const [key, times] of store.entries()) {
        if (!times.some((t) => t > windowStart)) {
          store.delete(key);
        }
      }
    }

    return next();
  };
};
