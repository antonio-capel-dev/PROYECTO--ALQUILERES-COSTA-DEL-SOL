'use strict';

module.exports = {
    async afterCreate(event) {
        const { result } = event;

        try {
            // Intentamos enviar el correo si el plugin de email está disponible
            if (strapi.plugins['email']) {
                await strapi.plugins['email'].services.email.send({
                    to: 'alquilerescostadel2026@gmail.com',
                    from: 'alquilerescostadel2026@gmail.com',
                    replyTo: result.email,
                    subject: `Nuevo mensaje de: ${result.nombre} (Web Alquileres)`,
                    text: `Has recibido un nuevo mensaje.\n\nNombre: ${result.nombre}\nEmail: ${result.email}\nMensaje: ${result.mensaje}`,
                    html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #2563eb; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Nueva Solicitud de Lead</h1>
              </div>
              <div style="padding: 30px;">
                <p style="font-size: 16px; line-height: 1.5;">Has recibido un mensaje desde el formulario de contacto oficial.</p>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 10px 0;"><strong>👤 Nombre:</strong> ${result.nombre}</p>
                  <p style="margin: 0 0 10px 0;"><strong>📧 Email:</strong> ${result.email}</p>
                  <p style="margin: 10px 0 5px 0;"><strong>💬 Mensaje:</strong></p>
                  <div style="font-style: italic; color: #4b5563; border-left: 4px solid #2563eb; padding-left: 15px;">
                    ${result.mensaje}
                  </div>
                </div>
                <a href="mailto:${result.email}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 10px;">Responder al Cliente</a>
              </div>
              <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
                Este es un mensaje automático del sistema Alquileres Costa del Sol 2026.
              </div>
            </div>
          `,
                });
                console.log('✅ Email de contacto enviado a alquilerescostadel2026@gmail.com');
            } else {
                console.warn('⚠️ El plugin de email de Strapi no está configurado. El lead se guardó en la DB pero no se envió el correo.');
            }
        } catch (err) {
            console.error('❌ Error al intentar enviar el email de contacto:', err);
        }
    },
};
