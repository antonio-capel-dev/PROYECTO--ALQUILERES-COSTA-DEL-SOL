'use strict';

/**
 * contacto router — solo expone POST /api/contactos (create).
 * find, findOne, update y delete no existen en este router,
 * por lo que no pueden concederse permisos sobre ellos ni accidentalmente.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contacto.contacto', {
  only: ['create'],
});
