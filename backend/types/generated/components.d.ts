import type { Schema, Struct } from '@strapi/strapi';

export interface InmuebleDetalles extends Struct.ComponentSchema {
  collectionName: 'components_inmueble_detalles';
  info: {
    displayName: 'Detalles';
  };
  attributes: {
    banos: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 0;
        },
        number
      >;
    capacidad: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    habitaciones: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 0;
        },
        number
      >;
    metros: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 10;
        },
        number
      >;
  };
}

export interface InmuebleServicios extends Struct.ComponentSchema {
  collectionName: 'components_inmueble_servicios';
  info: {
    displayName: 'Servicios';
  };
  attributes: {
    aire_acondicionado: Schema.Attribute.Boolean;
    mascotas: Schema.Attribute.Boolean;
    parking: Schema.Attribute.Boolean;
    wifi: Schema.Attribute.Boolean;
  };
}

export interface SeoMetaSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_seos';
  info: {
    description: 'Componente reutilizable para metadatos SEO';
    displayName: 'Meta SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 90;
      }>;
    robots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'inmueble.detalles': InmuebleDetalles;
      'inmueble.servicios': InmuebleServicios;
      'seo.meta-seo': SeoMetaSeo;
    }
  }
}
