'use strict';

/**
 * contacto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contacto.contacto', ({ strapi }) => ({
  /**
   * GET /api/contactos/test-email
   * Envía un email de prueba para verificar configuración SMTP.
   * Solo disponible fuera de producción.
   */
  async testEmail(ctx) {
    if (process.env.NODE_ENV === 'production') {
      return ctx.forbidden('Test endpoint disabled in production');
    }

    const MAIL_TO = process.env.MAIL_TO || process.env.SMTP_USER;
    const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER;

    if (!MAIL_TO || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return ctx.badRequest('Missing env vars: SMTP_USER, SMTP_PASS, or MAIL_TO');
    }

    try {
      await strapi.plugin('email').service('email').send({
        to: MAIL_TO,
        from: MAIL_FROM,
        subject: '[Test] Verificación SMTP — Alquileres Costa del Sol',
        text: 'Si recibes este email, la configuración SMTP es correcta.',
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0891b2; margin-top: 0;">SMTP Test OK</h2>
            <p>Si recibes este email, la configuraci&oacute;n SMTP de Strapi es <strong>correcta</strong>.</p>
            <p style="color: #64748b; font-size: 13px;">Enviado: ${new Date().toISOString()}</p>
          </div>
        `,
      });

      strapi.log.info('[contacto/test-email] Email de prueba enviado correctamente');
      return ctx.send({ ok: true, message: `Test email sent to ${MAIL_TO}` });
    } catch (err) {
      strapi.log.error(`[contacto/test-email] ${err.message}`);
      return ctx.send({
        ok: false,
        error: err.message,
        code: err.code || null,
        hint: err.code === 'EAUTH'
          ? 'Verifica SMTP_PASS (App Password de 16 chars) y que "Acceso de apps menos seguras" o App Passwords esté habilitado en Google.'
          : err.code === 'ECONNREFUSED'
            ? 'No se pudo conectar a smtp.gmail.com:465. Verifica firewall o red.'
            : 'Revisa los logs del servidor para más detalle.',
      }, 500);
    }
  },
}));
