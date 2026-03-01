'use strict';

/**
 * contacto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contacto.contacto', ({ strapi }) => ({
  /**
   * GET /api/contactos/test-email
   * Verifica que el SMTP está configurado correctamente.
   * Solo útil en desarrollo — no crea registros en BD.
   */
  async testEmail(ctx) {
    if (process.env.NODE_ENV === 'production') {
      return ctx.forbidden('No disponible en producción.');
    }

    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        replyTo: process.env.MAIL_REPLY_TO || process.env.SMTP_USER,
        subject: '[TEST] Email SMTP — Alquileres Costa del Sol',
        text: 'Este es un email de prueba enviado desde Strapi para verificar la configuración SMTP.',
        html: '<p>Este es un email de prueba enviado desde <strong>Strapi</strong> para verificar la configuración SMTP.</p>',
      });

      ctx.body = { ok: true, message: 'Email de prueba enviado correctamente.' };
    } catch (err) {
      strapi.log.error('test-email error:', err);
      ctx.body = { ok: false, message: err.message };
    }
  },
}));
