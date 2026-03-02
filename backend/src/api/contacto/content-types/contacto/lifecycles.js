'use strict';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Dirección de destino leída de .env (sin hardcoding)
    const destinatario =
      process.env.SMTP_USER || 'alquilerescostadelsol2026@gmail.com';

    // Escape HTML para evitar inyección en el cuerpo del email
    const esc = (str) =>
      String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    try {
      if (!strapi.plugin('email')) {
        strapi.log.warn(
          '⚠️ Plugin email no disponible. Lead guardado en DB sin notificación.'
        );
        return;
      }

      await strapi.plugin('email').service('email').send({
        to: destinatario,
        from: destinatario,
        replyTo: result.email,
        subject: `[Lead] Nuevo mensaje de ${esc(result.nombre)} — Alquileres Costa del Sol`,
        text: `Nuevo mensaje desde el formulario web.\n\nNombre: ${result.nombre}\nEmail: ${result.email}\nMensaje:\n${result.mensaje}`,
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #1e3a8a; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px;">Nueva Solicitud de Lead</h1>
              <p style="color: #bfdbfe; margin: 6px 0 0 0; font-size: 14px;">Alquileres Costa del Sol</p>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">
                Has recibido un mensaje desde el formulario de contacto.
              </p>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${esc(result.nombre)}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${esc(result.email)}</p>
                <p style="margin: 0 0 10px 0;"><strong>Asunto:</strong> ${esc(result.asunto || 'No especificado')}</p>
                <p style="margin: 10px 0 5px 0;"><strong>Mensaje:</strong></p>
                <div style="font-style: italic; color: #4b5563; border-left: 4px solid #0ea5e9; padding-left: 15px;">
                  ${esc(result.mensaje)}
                </div>
              </div>
              <a href="mailto:${esc(result.email)}"
                style="display: inline-block; background: #1e3a8a; color: white; padding: 12px 24px;
                       border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 10px;">
                Responder al Cliente
              </a>
            </div>
            <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
              Mensaje automático generado por Alquileres Costa del Sol &mdash; ${new Date().toLocaleDateString('es-ES')}
            </div>
          </div>
        `,
      });

      strapi.log.info(`✅ Email de lead enviado a ${destinatario} (de: ${result.email})`);
    } catch (err) {
      strapi.log.error('❌ Error al enviar email de contacto:', err);
    }
  },
};
