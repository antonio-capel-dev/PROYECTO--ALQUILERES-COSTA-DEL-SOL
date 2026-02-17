import type { Schema, Struct } from '@strapi/strapi';

export interface InmuebleDetalles extends Struct.ComponentSchema {
  collectionName: 'components_inmueble_detalles';
  info: {
    displayName: 'Detalles';
  };
  attributes: {
    banos: Schema.Attribute.Integer;
    capacidad: Schema.Attribute.Integer;
    habitaciones: Schema.Attribute.Integer;
    metros: Schema.Attribute.Integer;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'inmueble.detalles': InmuebleDetalles;
      'inmueble.servicios': InmuebleServicios;
    }
  }
}
