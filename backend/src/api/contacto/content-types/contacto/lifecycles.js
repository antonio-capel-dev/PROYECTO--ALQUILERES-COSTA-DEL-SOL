'use strict';

/**
 * Lifecycle hooks para el content-type Contacto.
 *
 * afterCreate: envía email de notificación al equipo.
 * - NUNCA lanza error → el create HTTP siempre responde 200.
 * - Credenciales y destinatarios leídos de process.env (no hardcoded).
 * - HTML escapado para prevenir inyección.
 */
module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // ── Config desde env (desacoplado de auth SMTP) ──────────
    const MAIL_TO = process.env.MAIL_TO || process.env.SMTP_USER;
    const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER;

    // ── Validaciones previas ─────────────────────────────────
    if (!MAIL_TO) {
      strapi.log.warn(
        '[contacto/lifecycle] MAIL_TO y SMTP_USER no definidos en .env — email no enviado. Lead guardado en BD.'
      );
      return;
    }

    const emailPlugin = strapi.plugin('email');
    if (!emailPlugin) {
      strapi.log.warn(
        '[contacto/lifecycle] Plugin email no registrado. Lead guardado en BD sin notificación.'
      );
      return;
    }

    // ── Escape HTML (prevención XSS en cuerpo del email) ─────
    const esc = (str) =>
      String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    // ── Construir y enviar ───────────────────────────────────
    const nombre = esc(result.nombre);
    const email = esc(result.email);
    const mensaje = esc(result.mensaje);
    const fecha = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      await emailPlugin.service('email').send({
        to: MAIL_TO,
        from: MAIL_FROM,
        replyTo: result.email || process.env.MAIL_REPLY_TO || MAIL_FROM,
        subject: `[Lead] Nuevo contacto de ${result.nombre} — Alquileres Costa del Sol`,
        text: [
          'Nuevo mensaje desde el formulario web.',
          '',
          `Nombre: ${result.nombre}`,
          `Email:  ${result.email}`,
          `Fecha:  ${fecha}`,
          '',
          'Mensaje:',
          result.mensaje,
        ].join('\n'),
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0891b2 100%); padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Nuevo Lead — Contacto Web</h1>
              <p style="color: #bae6fd; margin: 6px 0 0; font-size: 13px;">Alquileres Costa del Sol</p>
            </div>
            <div style="padding: 28px 24px;">
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
                Has recibido un mensaje desde el formulario de contacto.
              </p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 100px;">Nombre</td>
                  <td style="padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Email</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600;">Fecha</td>
                  <td style="padding: 10px 12px; background: #f8fafc;">${fecha}</td>
                </tr>
              </table>
              <div style="margin: 20px 0; padding: 16px; background: #f0f9ff; border-left: 4px solid #0891b2; border-radius: 0 8px 8px 0;">
                <p style="margin: 0 0 6px; font-weight: 600; font-size: 13px; color: #64748b;">Mensaje:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${email}?subject=Re: Tu consulta en Alquileres Costa del Sol"
                   style="display: inline-block; background: #0891b2; color: #ffffff; padding: 12px 28px;
                          border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Responder al cliente
                </a>
              </div>
            </div>
            <div style="background: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
              Mensaje generado autom&aacute;ticamente &mdash; alquileres-costadelsol.com &mdash; ${fecha}
            </div>
          </div>
        `,
      });

      strapi.log.info(
        `[contacto/lifecycle] Email enviado a ${MAIL_TO} (lead de: ${result.email})`
      );
    } catch (err) {
      // NUNCA relanzar: el create debe responder 200 aunque falle el email
      strapi.log.error(
        `[contacto/lifecycle] Fallo al enviar email — Lead #${result.id} guardado en BD. Error: ${err.message || err}`
      );
      if (err.code) strapi.log.error(`[contacto/lifecycle] SMTP code: ${err.code}`);
    }
  },
};
