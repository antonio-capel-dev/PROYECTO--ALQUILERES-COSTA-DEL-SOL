// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // Check if any rentals exist
      const count = await strapi.documents('api::rental.rental').count();

      if (count === 0) {
        strapi.log.info('🌱 Seeding Rentals...');

        const fs = await import('fs');
        const path = await import('path');
        const dataPath = path.join(process.cwd(), 'data', 'seed-rentals.json');

        if (fs.existsSync(dataPath)) {
          const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

          for (const rental of data) {
            await strapi.documents('api::rental.rental').create({
              data: rental,
              status: 'published',
            });
          }
          strapi.log.info('✅ Seeding completed!');
        } else {
          strapi.log.warn(`⚠️ Seed file not found at ${dataPath}`);
        }
      }


    // ── Seed Guias ──────────────────────────────────────────────────
    try {
      const guiaCount = await strapi.documents('api::guia.guia').count();

      if (guiaCount === 0) {
        strapi.log.info('Seeding Guias...');

        const fsGuia = await import('fs');
        const pathGuia = await import('path');
        const guiaPath = pathGuia.join(process.cwd(), 'data', 'seed-guias.json');

        if (fsGuia.existsSync(guiaPath)) {
          const guiaData = JSON.parse(fsGuia.readFileSync(guiaPath, 'utf-8'));

          for (const guia of guiaData) {
            await strapi.documents('api::guia.guia').create({
              data: guia,
              status: 'published',
            });
          }
          strapi.log.info('Guias seeding completed!');
        } else {
          strapi.log.warn('Guia seed file not found at ' + guiaPath);
        }
      }
    } catch (guiaError) {
      strapi.log.error('Guia seeding failed:', guiaError);
    }
    } catch (error) {
      strapi.log.error('❌ Seeding failed:', error);
    }
  },
};
