export interface Details {
    habitaciones: number;
    banos: number;
    metros_cuadrados: number;
    capacidad: number;
}

export interface Services {
    wifi: boolean;
    piscina: boolean;
    aire_acondicionado: boolean;
    cocina: boolean;
    parking: boolean;
    mascotas: boolean;
    tv: boolean;
    lavadora: boolean;
}

export interface LocationData {
    ciudad: string;
    zona: string;
    latitud: number;
    longitud: number;
}

export interface Rental {
    documentId: string;
    title: string;
    slug: string;
    price: number;
    description: string;
    location: string;
    // Strapi Components
    detalles: Details;
    servicios: Services;
    ubicacion: LocationData;
    image?: {
        url: string;
        alternativeText?: string;
    };
}
