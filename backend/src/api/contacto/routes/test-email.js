'use strict';

/**
 * Ruta de test para verificar que el email SMTP funciona.
 * Solo disponible en desarrollo (NODE_ENV !== 'production').
 *
 * GET /api/contactos/test-email
 *
 * Responde JSON con el resultado del envío.
 * No crea ningún registro en BD.
 */
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/contactos/test-email',
      handler: 'contacto.testEmail',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
