/**
 * contenidoZonas.ts - Contenido SEO (800-1200 palabras) por zona.
 * FAQs se usan para JSON-LD FAQPage schema.
 */

export interface SeccionSEO {
  h2: string;
  parrafos: string[];
  subsecciones?: { h3: string; texto: string }[];
  listaCaracteristicas?: string[];
}

export interface FaqZona { pregunta: string; respuesta: string; }

export interface ContenidoZona {
  intro: string;
  secciones: SeccionSEO[];
  faqs: FaqZona[];
  seo_title?: string;
  seo_description?: string;
}

function contenidoGenerico(nombre: string): ContenidoZona {
  return {
    intro: nombre + " es uno de los destinos mas atractivos de la Costa del Sol para alquiler vacacional. Con su clima privilegiado, sus playas de calidad y su oferta cultural, se ha convertido en un referente del turismo residencial en la provincia de Malaga. Tanto si buscas una estancia corta como una temporada larga, " + nombre + " ofrece opciones para todos los gustos y presupuestos.",
    secciones: [
      {
        h2: "Por que elegir " + nombre + " para tus vacaciones",
        parrafos: [
          nombre + " destaca por su combinacion unica de playa, cultura y gastronomia mediterranea. La zona cuenta con infraestructura turistica consolidada. Los alquileres vacacionales en " + nombre + " ofrecen una alternativa flexible al hotel tradicional, permitiendo disfrutar de la vida local con total independencia.",
          "El clima de la Costa del Sol, con mas de 300 dias de sol al anio y temperaturas medias de 18 grados, convierte a " + nombre + " en un destino atractivo durante todo el anio. La temporada alta se concentra entre junio y septiembre, aunque la primavera y el otonyo ofrecen condiciones ideales con precios mas asequibles.",
        ],
        subsecciones: [
          { h3: "Ubicacion y accesibilidad", texto: nombre + " cuenta con excelentes conexiones por carretera. El Aeropuerto de Malaga-Costa del Sol (AGP) recibe vuelos directos desde las principales capitales europeas. La red de transporte publico conecta " + nombre + " con el resto de localidades de la costa." },
          { h3: "Playas y entorno natural", texto: "Las playas de " + nombre + " son su principal atractivo. Desde calas tranquilas hasta extensos arenales con todos los servicios. Muchas playas cuentan con la distincion de Bandera Azul." },
        ],
      },
      {
        h2: "Tipos de alojamiento vacacional en " + nombre,
        parrafos: ["En " + nombre + " encontraras una amplia variedad de alquileres vacacionales. Desde estudios ideales para parejas hasta villas con piscina privada para grupos familiares."],
        listaCaracteristicas: ["Apartamentos en primera linea de playa", "Villas con piscina privada y jardin", "Aticos con terraza panoramica", "Casas rurales con encanto andaluz", "Estudios modernos para teletrabajo", "Alojamientos adaptados para familias"],
        subsecciones: [{ h3: "Equipamiento y servicios", texto: "Los alquileres en " + nombre + " incluyen wifi, ropa de cama, cocina equipada y aire acondicionado. Muchos ofrecen parking, piscina y acceso a la playa." }],
      },
      {
        h2: "Que hacer en " + nombre + ": actividades y ocio",
        parrafos: ["Mas alla de la playa, " + nombre + " ofrece actividades culturales, deportivas y gastronomicas. El casco historico invita a pasear por calles empedradas y descubrir monumentos centenarios.", "Para los amantes del deporte, la zona dispone de campos de golf, puertos deportivos, rutas de senderismo y centros de deportes acuaticos."],
        subsecciones: [
          { h3: "Gastronomia local", texto: "La cocina malaguenia es protagonista en " + nombre + ". Chiringuitos con espetos de sardinas, restaurantes con tapas tradicionales y cocina de autor. Ajoblanco, fritura malaguenia y vino dulce de la zona." },
          { h3: "Excursiones cercanas", texto: "Desde " + nombre + " puedes visitar Malaga capital, Ronda, Antequera o el Caminito del Rey. Paisajes desde la costa hasta la montanya, pasando por pueblos blancos." },
        ],
      },
    ],
    faqs: [
      { pregunta: "Cual es la mejor epoca para alquilar en " + nombre + "?", respuesta: "La temporada alta va de junio a septiembre. Primavera y otonyo ofrecen precios competitivos y temperaturas agradables. El invierno es ideal para estancias largas." },
      { pregunta: "Que servicios incluyen los alquileres en " + nombre + "?", respuesta: "Wifi, aire acondicionado, cocina equipada, ropa de cama y toallas. Muchos con parking, piscina comunitaria y terraza." },
      { pregunta: "Como llegar a " + nombre + " desde el aeropuerto de Malaga?", respuesta: "El Aeropuerto de Malaga-Costa del Sol (AGP) esta bien comunicado por autovia, transporte publico y taxi. El trayecto dura entre 20 y 60 minutos." },
    ],
  };
}

export const CONTENIDO_ZONAS: Record<string, ContenidoZona> = {
  "marbella": {
    "seo_title": "Villa de lujo con piscina en Marbella – Alquiler Costa del Sol",
    "seo_description": "Descubre nuestra exclusiva selección de villas de lujo en Marbella con piscina privada y vistas al mar. Reserva online tu estancia premium en la Costa del Sol hoy.",
    "intro": "Marbella es el destino mas exclusivo de la Costa del Sol. Conocida internacionalmente por Puerto Banus, la Milla de Oro y sus playas de arena dorada, Marbella combina lujo, naturaleza y tradicion andaluza. El casco antiguo, con sus calles encaladas y plazas con naranjos, contrasta con la modernidad de sus urbanizaciones y campos de golf de campeonato. Para alquiler vacacional, Marbella ofrece desde apartamentos junto al paseo maritimo hasta villas con vistas al Mediterraneo.",
    "secciones": [
      {
        "h2": "Por que elegir Marbella para tus vacaciones",
        "parrafos": [
          "Marbella no es solo sinonimo de lujo: es un destino completo que atrae a viajeros de todo el mundo por su calidad de vida, seguridad y oferta cultural. Con 27 kilometros de costa, la ciudad cuenta con mas de 20 playas, muchas con Bandera Azul. La temperatura media anual ronda los 19 grados, lo que permite disfrutar de actividades al aire libre durante los 12 meses del anio.",
          "El alquiler vacacional en Marbella es una alternativa cada vez mas popular al hotel tradicional. Permite vivir como un local, con la flexibilidad de cocinar en casa, disfrutar de piscina privada y explorar los rincones menos turisticos de la ciudad. Desde familias hasta parejas y grupos de amigos, Marbella tiene opciones para todos."
        ],
        "subsecciones": [
          {
            "h3": "Puerto Banus y la Milla de Oro",
            "texto": "Puerto Banus es el corazon del lujo en Marbella. Este puerto deportivo alberga yates de grandes dimensiones, boutiques de firmas internacionales y restaurantes de alta cocina. A pocos pasos, la Milla de Oro concentra hoteles cinco estrellas, clubs de playa y algunas de las propiedades mas exclusivas de la Costa del Sol."
          },
          {
            "h3": "Casco Antiguo y vida local",
            "texto": "El casco antiguo de Marbella es un laberinto de calles empedradas, plazas con flores y edificios encalados que conservan la esencia del pueblo andaluz. La Plaza de los Naranjos, la Iglesia de la Encarnacion y las murallas del castillo arabe son visita obligada."
          }
        ]
      },
      {
        "h2": "Tipos de alojamiento en Marbella",
        "parrafos": [
          "Marbella ofrece la gama mas amplia de alquileres vacacionales de toda la Costa del Sol. Desde estudios funcionales en el centro hasta villas de lujo con piscina infinity y vistas al mar. Las urbanizaciones de Nueva Andalucia, Los Monteros y Sierra Blanca son especialmente populares."
        ],
        "listaCaracteristicas": [
          "Villas de lujo con piscina privada en Nueva Andalucia",
          "Apartamentos frente al mar en el paseo maritimo",
          "Aticos con terraza en el centro historico",
          "Casas adosadas en urbanizaciones con seguridad 24h",
          "Estudios modernos cerca de Puerto Banus",
          "Propiedades con acceso directo a campos de golf"
        ],
        "subsecciones": [
          {
            "h3": "Equipamiento premium",
            "texto": "Los alquileres en Marbella destacan por su equipamiento superior. Piscina privada o comunitaria, aire acondicionado frio/calor, cocina de disenyo, smart TV, wifi de alta velocidad y, en muchos casos, acceso a gimnasio o spa."
          }
        ]
      },
      {
        "h2": "Que hacer en Marbella: planes imprescindibles",
        "parrafos": [
          "Marbella es mucho mas que playa y sol. La ciudad ofrece una agenda cultural con festivales, conciertos y exposiciones durante todo el anio.",
          "Los amantes del golf tienen a su disposicion mas de 15 campos en un radio de 20 kilometros. Para los deportes acuaticos, las condiciones son ideales para paddle surf, kayak, jet ski y buceo."
        ],
        "subsecciones": [
          {
            "h3": "Gastronomia marbelli",
            "texto": "La oferta gastronomica de Marbella es extraordinaria. Desde chiringuitos en la playa donde degustar espetos de sardinas hasta restaurantes con estrella Michelin. El Mercado Municipal y la zona de tapas del casco antiguo son paradas obligatorias."
          },
          {
            "h3": "Excursiones desde Marbella",
            "texto": "Desde Marbella puedes visitar Ronda (1h), el Caminito del Rey (1h15), Malaga capital (45min), Nerja (1h15) y Gibraltar (1h). La Sierra de las Nieves, Reserva de la Biosfera, esta a solo 30 minutos."
          }
        ]
      }
    ],
    "faqs": [
      {
        "pregunta": "Cual es la mejor epoca para alquilar en Marbella?",
        "respuesta": "Marbella es un destino de 12 meses gracias a su clima subtropical. La temporada alta (junio-septiembre) ofrece maxima animacion y temperatura ideal para playa. La primavera y el otonyo son perfectos para golf, senderismo y turismo cultural con precios mas asequibles. El invierno marbelli es suave, con temperaturas diurnas de 15-18 grados."
      },
      {
        "pregunta": "Cuanto cuesta un alquiler vacacional en Marbella?",
        "respuesta": "Los precios varian segun la temporada, ubicacion y tipo de propiedad. Un apartamento centrico parte de 80 euros por noche en temporada baja, mientras que una villa con piscina en Nueva Andalucia puede superar los 300 euros por noche en verano."
      },
      {
        "pregunta": "Como llegar a Marbella desde el aeropuerto de Malaga?",
        "respuesta": "El Aeropuerto de Malaga (AGP) esta a 50 km de Marbella, unos 40 minutos por la autopista AP-7. Hay autobuses directos cada hora, taxis disponibles 24h y servicios de transfer privado."
      }
    ]
  },
  "nerja": {
    "seo_title": "Alquiler en Nerja: Villas y Apartamentos con Vistas al Mar",
    "seo_description": "Reserva tu villa exclusiva con vistas al mar en Nerja. Disfruta de calas naturales, el Balcón de Europa y las mejores playas de la Costa del Sol oriental.",
    "intro": "Nerja es la perla de la Costa del Sol oriental, un destino que combina naturaleza salvaje, playas cristalinas y un casco historico con encanto. Famosa por el Balcon de Europa y las Cuevas de Nerja, esta localidad mantiene un caracter autentico. Sus calas, rodeadas de acantilados y vegetacion subtropical, ofrecen una experiencia de playa unica en la provincia de Malaga.",
    "secciones": [
      {
        "h2": "Por que elegir Nerja para tus vacaciones",
        "parrafos": [
          "Nerja es el equilibrio perfecto entre naturaleza y civilizacion. Aqui encontraras calas escondidas, acantilados con vistas al Mediterraneo y un pueblo que conserva su identidad andaluza. El alquiler vacacional en Nerja te permite vivir esta experiencia desde dentro.",
          "El microclima de Nerja es privilegiado. Protegida por las sierras de Tejeda, Almijara y Alhama, registra mas de 320 dias de sol al anio y una temperatura media de 20 grados. En invierno se mantiene en 16-18 grados, refugio invernal para europeos."
        ],
        "subsecciones": [
          {
            "h3": "El Balcon de Europa y el casco historico",
            "texto": "El Balcon de Europa es el mirador mas famoso de la Costa del Sol. Vistas panoramicas desde la Sierra de Almijara hasta las costas africanas. Calles peatonales con tiendas, restaurantes y bares de tapas conforman un casco historico lleno de vida."
          },
          {
            "h3": "Calas y playas unicas",
            "texto": "Nerja tiene las mejores calas de Malaga. La Playa de Maro ofrece aguas cristalinas entre acantilados. Burriana es la favorita de familias. Calahonda tiene un encanto irresistible."
          }
        ]
      },
      {
        "h2": "Alojamiento vacacional en Nerja",
        "parrafos": [
          "El alquiler vacacional en Nerja es la forma ideal de disfrutar de esta localidad. Apartamentos con terraza y vistas al mar son los mas solicitados. Casas de pueblo en el casco historico ofrecen mucho caracter. La demanda es alta en verano."
        ],
        "listaCaracteristicas": [
          "Apartamentos con terraza y vistas al Mediterraneo",
          "Casas de pueblo restauradas en el casco historico",
          "Villas con piscina en las colinas de Nerja",
          "Estudios cerca del Balcon de Europa",
          "Alojamientos junto a la Playa de Burriana",
          "Casas rurales en Maro y alrededores"
        ],
        "subsecciones": [
          {
            "h3": "Entorno natural privilegiado",
            "texto": "Muchos alojamientos se benefician de un entorno excepcional. Amaneceres sobre el Mediterraneo, acantilados con vegetacion subtropical y la silueta de Africa en dias claros."
          }
        ]
      },
      {
        "h2": "Actividades y excursiones en Nerja",
        "parrafos": [
          "Paraiso para naturaleza y aventura. Parque Natural de Sierras de Tejeda, Almijara y Alhama con decenas de rutas de senderismo. Kayak por calas de Maro y Cerro Gordo es de las experiencias mas valoradas.",
          "Las Cuevas de Nerja, Bien de Interes Cultural, con pinturas rupestres y formaciones geologicas espectaculares. El Festival de las Cuevas reune cada verano a artistas internacionales."
        ],
        "subsecciones": [
          {
            "h3": "Ruta del Rio Chillar",
            "texto": "La excursion mas popular de Nerja. Sendero acuatico por caniones de roca caliza, pozas naturales y cascadas. Ideal para verano y familias. Madrugar para evitar aglomeraciones."
          },
          {
            "h3": "Gastronomia nerjenia",
            "texto": "Cocina marinera y rural de la Axarquia. Chiringuitos de Burriana con paellas y espetos. Tabernas del casco historico con tapas de pescado fresco, gazpacho y migas. Vinos moscatel como acompaniamiento perfecto."
          }
        ]
      }
    ],
    "faqs": [
      {
        "pregunta": "Cual es la mejor epoca para visitar Nerja?",
        "respuesta": "Destino de 12 meses. Verano ideal para playa (28-34 grados). Primavera y otonyo para senderismo. Invierno con 16-18 grados diurnos. Ruta del Rio Chillar solo en verano."
      },
      {
        "pregunta": "Merece la pena visitar las Cuevas de Nerja?",
        "respuesta": "Absolutamente. Patrimonio Historico con pinturas rupestres de mas de 42.000 anios. Visita guiada de 45 min. Festival de las Cuevas en verano con conciertos en escenario natural unico."
      },
      {
        "pregunta": "Como llegar a Nerja desde el aeropuerto de Malaga?",
        "respuesta": "A 65 km, 50 min por la A-7. ALSA opera autobuses directos. Transfer privado o alquilar coche para explorar las calas."
      }
    ]
  },
  "torre-del-mar": {
    "seo_title": "Apartamentos en Torre del Mar para Familias | Costa del Sol",
    "seo_description": "Alojamiento premium en Torre del Mar ideal para familias. Disfruta del paseo marítimo más largo de la Costa del Sol y playas con Bandera Azul.",
    "intro": "Torre del Mar es la joya de la Axarquia, destino familiar por excelencia en la Costa del Sol oriental. Con mas de 4 km de paseo maritimo, oferta gastronomica autentica y ambiente relajado, atrae a quienes buscan la esencia de la costa malaguenia. Playa con Bandera Azul y clima excepcional la convierten en lugar ideal para alquiler vacacional todo el anio.",
    "secciones": [
      {
        "h2": "Por que elegir Torre del Mar para tus vacaciones",
        "parrafos": [
          "Torre del Mar ofrece autenticidad. La vida local sigue su ritmo, los mercados venden productos de la huerta y pesca del dia, y los chiringuitos sirven espetos de sardinas como se ha hecho durante generaciones. Perfecto para familias que buscan tranquilidad sin renunciar a servicios.",
          "El paseo maritimo es uno de los mas largos y mejor equipados de la provincia. Carriles bici, zonas infantiles, restaurantes y terrazas. Temperatura media anual supera los 18 grados."
        ],
        "subsecciones": [
          {
            "h3": "Ubicacion estrategica en la Axarquia",
            "texto": "A 30 minutos de Malaga capital y 20 de Nerja. Base ideal para explorar pueblos blancos como Frigiliana, Competa o Canillas de Aceituno. La autovia A-7 conecta con el resto de la costa y el aeropuerto esta a 40 min."
          },
          {
            "h3": "Playa y paseo maritimo",
            "texto": "Playa con Bandera Azul, arena oscura y todos los servicios. Paseo maritimo renovado para caminar, correr o pedalear. Al atardecer, terrazas llenas disfrutando de la puesta de sol."
          }
        ]
      },
      {
        "h2": "Tipos de alojamiento en Torre del Mar",
        "parrafos": [
          "Alquileres a precios competitivos comparados con la Costa del Sol occidental. Apartamentos junto al paseo, pisos en el centro y casas con terraza. La mayoria a menos de 10 minutos de la playa."
        ],
        "listaCaracteristicas": [
          "Apartamentos con vistas al mar en primera linea",
          "Pisos renovados en el centro con terraza",
          "Casas con jardin en urbanizaciones familiares",
          "Estudios economicos ideales para parejas",
          "Aticos con solarium y vistas panoramicas",
          "Alojamientos pet-friendly"
        ],
        "subsecciones": [
          {
            "h3": "Relacion calidad-precio",
            "texto": "Alquileres significativamente mas economicos que en Marbella o Malaga centro. Un apartamento de 2 habitaciones puede costar desde 50 euros/noche en temporada baja."
          }
        ]
      },
      {
        "h2": "Que hacer en Torre del Mar y alrededores",
        "parrafos": [
          "Mucho mas que playa. Noche de San Juan, festivales gastronomicos y Festival Indie. Mercadillos semanales con productos locales y artesania.",
          "Rutas de senderismo por la Axarquia con paisajes de montanias, rios y pueblos con encanto. Parque Natural de Tejeda, Almijara y Alhama a menos de 30 min."
        ],
        "subsecciones": [
          {
            "h3": "Gastronomia de la Axarquia",
            "texto": "Cocina que fusiona tradicion marinera y productos de la huerta. Espetos de sardinas, ajoblanco, migas y chivo lechal. Vinos de la Axarquia, especialmente moscateles."
          },
          {
            "h3": "Pueblos blancos de la Axarquia",
            "texto": "Visita Frigiliana, Competa, Sayalonga con cementerio redondo unico en Europa, y la Cueva de Nerja. Cada pueblo tiene personalidad propia."
          }
        ]
      }
    ],
    "faqs": [
      {
        "pregunta": "Cual es la mejor epoca para visitar Torre del Mar?",
        "respuesta": "Junio a septiembre para playa (25-35 grados). Primavera y otonyo con clima agradable y menos turismo. Invierno suave para estancias largas con precios reducidos."
      },
      {
        "pregunta": "Que servicios incluyen los apartamentos?",
        "respuesta": "Wifi, aire acondicionado, cocina equipada, ropa de cama y toallas. Muchos con terraza, parking y cerca de la playa. Algunos con piscina comunitaria."
      },
      {
        "pregunta": "Como llegar desde el aeropuerto de Malaga?",
        "respuesta": "A 55 km, 40 min por la A-7. Autobuses directos ALSA varias veces al dia. Alquilar coche recomendable para explorar la Axarquia."
      }
    ]
  }
,
  "torremolinos": {
      "seo_title": "Apartamentos en Torremolinos - Alquiler Vacacional Costa del Sol",
      "seo_description": "Alquila tu apartamento en Torremolinos junto a la playa. Paseo maritimo, ocio familiar y la mejor relacion calidad-precio de la Costa del Sol.",
      "intro": "Torremolinos fue el destino pionero del turismo en la Costa del Sol. Situado a solo 8 km del aeropuerto, combina playas extensas con un animado centro. La Carihuela conserva el encanto de los pueblos costeros con chiringuitos donde degustar los mejores espetos de sardinas.",
      "secciones": [
          {
              "h2": "Por que elegir Torremolinos",
              "parrafos": [
                  "Ubicacion privilegiada junto al aeropuerto. 7 km de costa con Bandera Azul.",
                  "Mas de 300 dias de sol. Temperaturas medias de 19 grados."
              ],
              "subsecciones": [
                  {
                      "h3": "La Carihuela: barrio marinero",
                      "texto": "Antiguo barrio de pescadores. Chiringuitos con espetos de sardinas y fritura malaguenia."
                  },
                  {
                      "h3": "Playas con Bandera Azul",
                      "texto": "Bajondillo, Los Alamos. Arena dorada con servicios."
                  }
              ]
          },
          {
              "h2": "Alojamiento vacacional en Torremolinos",
              "parrafos": [
                  "Variedad de apartamentos a precios asequibles."
              ],
              "listaCaracteristicas": [
                  "Primera linea de playa Bajondillo",
                  "Pisos familiares con piscina",
                  "Estudios junto al tren",
                  "Aticos con vistas al mar",
                  "Alojamientos economicos para larga estancia",
                  "Apartamentos pet-friendly"
              ],
              "subsecciones": [
                  {
                      "h3": "Equipamiento",
                      "texto": "Wifi, aire acondicionado, cocina, parking y piscina."
                  }
              ]
          },
          {
              "h2": "Ocio y cultura en Torremolinos",
              "parrafos": [
                  "Aqualand y Jardin Botanico Molino de Inca.",
                  "Vida nocturna animada. Golf a 15 min."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomia",
                      "texto": "Chiringuitos de La Carihuela. Espetos, fritura, gazpacho y ajoblanco."
                  },
                  {
                      "h3": "Excursiones",
                      "texto": "Malaga 15 min. Marbella 30 min. Ronda, Antequera y Caminito del Rey."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Mejor epoca para Torremolinos?",
              "respuesta": "Junio-septiembre para playa. Primavera y otonyo mas barato. Invierno suave a 16 grados."
          },
          {
              "pregunta": "Como llegar desde el aeropuerto?",
              "respuesta": "8 km. Cercanias en 8 minutos."
          },
          {
              "pregunta": "Adecuado para familias?",
              "respuesta": "Playas seguras, Aqualand, apartamentos con piscina."
          }
      ]
  },
  "fuengirola": {
      "seo_title": "Apartamentos en Fuengirola para Familias - Alquiler Costa del Sol",
      "seo_description": "Alquiler vacacional en Fuengirola ideal para familias. 8 km de playa, Bioparc y Castillo Sohail.",
      "intro": "Fuengirola es el destino familiar por excelencia de la Costa del Sol occidental. 8 km de playas, Bioparc, Castillo Sohail y paseo maritimo.",
      "secciones": [
          {
              "h2": "Por que elegir Fuengirola para familias",
              "parrafos": [
                  "Playa con zonas poco profundas y socorrismo. Bioparc con habitats recreados.",
                  "Cercanias al aeropuerto en 40 min. Supermercados internacionales."
              ],
              "subsecciones": [
                  {
                      "h3": "Playa: 8 km de arena dorada",
                      "texto": "Los Boliches y Fuengirola: servicios completos y chiringuitos."
                  },
                  {
                      "h3": "Castillo Sohail",
                      "texto": "Fortaleza fenicio-arabe con conciertos en verano."
                  }
              ]
          },
          {
              "h2": "Alojamiento en Fuengirola",
              "parrafos": [
                  "Apartamentos para todos los presupuestos."
              ],
              "listaCaracteristicas": [
                  "Frente al mar",
                  "Pisos con piscina infantil",
                  "Estudios junto al tren",
                  "Adosados en Mijas Costa",
                  "Aticos con solarium",
                  "Alojamientos adaptados"
              ],
              "subsecciones": [
                  {
                      "h3": "Servicios familiares",
                      "texto": "Cunas, tronas, parques infantiles y piscinas infantiles."
                  }
              ]
          },
          {
              "h2": "Actividades familiares",
              "parrafos": [
                  "Bioparc: zoologico de inmersion con 100 especies.",
                  "Mercado los martes. Puerto Deportivo."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomia multicultural",
                      "texto": "Chiringuitos, pubs britanicos, restaurantes escandinavos y tapas."
                  },
                  {
                      "h3": "Excursiones",
                      "texto": "Mijas 10 min. Malaga 30 min. Marbella 20 min."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Mejor zona familiar?",
              "respuesta": "Los Boliches y Carvajal. Playas tranquilas con piscina comunitaria."
          },
          {
              "pregunta": "Transporte al aeropuerto?",
              "respuesta": "Cercanias cada 20 min, 40 minutos."
          },
          {
              "pregunta": "Cuando llueve?",
              "respuesta": "Bioparc cubierto. Miramar con cine. Solo 45 dias de lluvia."
          }
      ]
  },
  "benalmadena": {
      "seo_title": "Apartamentos en Benalmadena con Vistas al Puerto - Costa del Sol",
      "seo_description": "Alquiler vacacional en Benalmadena: puerto deportivo premiado, Bandera Azul, Tivoli World, teleferico y Sea Life.",
      "intro": "Benalmadena es uno de los municipios mas versatiles de la Costa del Sol. Tres nucleos: Costa, Pueblo y Arroyo de la Miel. Puerto Deportivo premiado como mejor del mundo.",
      "secciones": [
          {
              "h2": "Por que elegir Benalmadena",
              "parrafos": [
                  "Playa, montana y entretenimiento. Puerto Marina premiado mundialmente.",
                  "Cercanias, AP-7. A 20 min del aeropuerto."
              ],
              "subsecciones": [
                  {
                      "h3": "Puerto Marina",
                      "texto": "Restaurantes internacionales, acuario. Excursiones para ver delfines."
                  },
                  {
                      "h3": "Playas",
                      "texto": "9 km. Bil-Bil con castillo. Malapesquera con Bandera Azul."
                  }
              ]
          },
          {
              "h2": "Alojamiento en Benalmadena",
              "parrafos": [
                  "Apartamentos con vistas al puerto o casas en el pueblo."
              ],
              "listaCaracteristicas": [
                  "Vistas al Puerto Marina",
                  "Primera linea de playa",
                  "Casas en Benalmadena Pueblo",
                  "Aticos en Arroyo de la Miel",
                  "Familiares con piscina",
                  "Estudios junto al teleferico"
              ],
              "subsecciones": [
                  {
                      "h3": "Tres nucleos",
                      "texto": "Costa para mar. Arroyo para servicios. Pueblo para tranquilidad."
                  }
              ]
          },
          {
              "h2": "Actividades familiares",
              "parrafos": [
                  "Tivoli World, Sea Life y teleferico.",
                  "Castillo de Colomares."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomia",
                      "texto": "Internacional en Puerto Marina. Andaluza en Pueblo. Espetos en playa."
                  },
                  {
                      "h3": "Excursiones",
                      "texto": "Malaga 20 min. Mijas 15 min. Marbella 30 min. Caminito del Rey 1h."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Mejor zona?",
              "respuesta": "Costa para playa. Arroyo para transporte. Pueblo para vistas."
          },
          {
              "pregunta": "Como llegar?",
              "respuesta": "15 km. Cercanias en 15 min."
          },
          {
              "pregunta": "Para ninos?",
              "respuesta": "Tivoli World, Sea Life, teleferico, delfines."
          }
      ]
  },
  "estepona": {
      "seo_title": "Villa de Lujo en Estepona - Alquiler Exclusivo Costa del Sol",
      "seo_description": "Villas de lujo en Estepona. Jardin de la Costa del Sol. Murales artisticos y campos de golf.",
      "intro": "Estepona es destino emergente de lujo en la Costa del Sol occidental. El Jardin de la Costa del Sol con orquideas, murales y urbanizaciones exclusivas con campos de golf.",
      "secciones": [
          {
              "h2": "Por que elegir Estepona para lujo",
              "parrafos": [
                  "Autenticidad andaluza con infraestructura moderna. 50 murales artisticos.",
                  "Playa del Cristo: cala natural con aguas tranquilas."
              ],
              "subsecciones": [
                  {
                      "h3": "Casco historico y murales",
                      "texto": "Galeria de arte al aire libre. 50 murales internacionales."
                  },
                  {
                      "h3": "Playas y naturaleza",
                      "texto": "21 km de costa. Playa del Cristo como cala protegida. Sierra Bermeja."
                  }
              ]
          },
          {
              "h2": "Villas de lujo en Estepona",
              "parrafos": [
                  "Villas en La Resina, Atalaya, Cancelada. Piscina privada y vistas."
              ],
              "listaCaracteristicas": [
                  "Villas con infinity pool",
                  "Primera linea de playa",
                  "Adosados en campos de golf",
                  "Aticos en el puerto",
                  "Fincas rusticas",
                  "Propiedades con domotica"
              ],
              "subsecciones": [
                  {
                      "h3": "Urbanizaciones",
                      "texto": "Seguridad 24h, golf, spa. La Resina, Atalaya, Los Flamingos."
                  }
              ]
          },
          {
              "h2": "Que hacer en Estepona",
              "parrafos": [
                  "Orchidarium con 5000 orquideas. Selwo Aventura. Golf de elite.",
                  "Puerto Deportivo con pesca y velero. Sierra Bermeja."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomia",
                      "texto": "Puerto pesquero activo. Espetos, restaurantes de autor y tabernas."
                  },
                  {
                      "h3": "Excursiones",
                      "texto": "Marbella 20 min. Gibraltar 45 min. Ronda 1h. Casares 20 min."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Diferencia con Marbella?",
              "respuesta": "Mas tranquila y autentica. Precios mas competitivos."
          },
          {
              "pregunta": "Como llegar?",
              "respuesta": "80 km, 50 min por AP-7. Autobuses Avanza."
          },
          {
              "pregunta": "Para golf?",
              "respuesta": "Atalaya, El Paraiso, Estepona Golf y Valle Romano."
          }
      ]
  },
  "malaga": {
      "seo_title": "Apartamento Turistico en Malaga Centro - Alquiler Vacacional",
      "seo_description": "Apartamento turistico en Malaga centro. Museos, gastronomia, playas urbanas y la mejor vida cultural de la Costa del Sol.",
      "intro": "Malaga es la capital de la Costa del Sol. Centro historico con Museo Picasso, Centre Pompidou, Alcazaba y Teatro Romano. Playas de La Malagueta y Pedregalejo con chiringuitos y paseo maritimo.",
      "secciones": [
          {
              "h2": "Por que elegir Malaga capital",
              "parrafos": [
                  "Mas de 30 museos. Oferta gastronomica y centro historico peatonal.",
                  "Vivir como un local: calle Larios, Atarazanas, La Malagueta, Pedregalejo."
              ],
              "subsecciones": [
                  {
                      "h3": "Centro historico y museos",
                      "texto": "Picasso, Pompidou, Carmen Thyssen, CAC. Alcazaba y Gibralfaro con vistas."
                  },
                  {
                      "h3": "Playas urbanas y Pedregalejo",
                      "texto": "La Malagueta a 10 min del centro. Pedregalejo con chiringuitos y espetos."
                  }
              ]
          },
          {
              "h2": "Alojamiento en Malaga",
              "parrafos": [
                  "Zonas diferenciadas: centro, Soho, Pedregalejo y Puerto."
              ],
              "listaCaracteristicas": [
                  "Centro junto a calle Larios",
                  "Vistas al puerto",
                  "Lofts en el Soho",
                  "Pedregalejo cerca de la playa",
                  "Aticos con vistas a Alcazaba",
                  "Estudios junto a Maria Zambrano"
              ],
              "subsecciones": [
                  {
                      "h3": "Barrios con caracter",
                      "texto": "Centro cultural. Soho con arte urbano. Pedregalejo marinero."
                  }
              ]
          },
          {
              "h2": "Que hacer en Malaga",
              "parrafos": [
                  "Alcazaba, museos, Atarazanas, Muelle Uno, La Malagueta, espetos en Pedregalejo.",
                  "Caminito del Rey a 45 min. Montes de Malaga con senderismo."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomia malaguenia",
                      "texto": "Atarazanas: marisco y frutas. Tapas: boquerones, campero. Espetos de Pedregalejo."
                  },
                  {
                      "h3": "Excursiones",
                      "texto": "Caminito 45 min. Antequera 40 min. Nerja 50 min. Ronda 1h30. AVE a Madrid 2h30."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Mejor zona en Malaga?",
              "respuesta": "Centro historico para museos. Pedregalejo para playa. Soho alternativo."
          },
          {
              "pregunta": "Sin coche?",
              "respuesta": "Centro compacto y peatonal. Bus, metro y cercanias."
          },
          {
              "pregunta": "Museos?",
              "respuesta": "Picasso, Pompidou, Carmen Thyssen, CAC gratuito. Mas de 30."
          }
      ]
  }
};

// test

// --- EN generic fallback -------------------------------------------
function contenidoGenericoEN(nombre: string): ContenidoZona {
  return {
    intro: "Discover beautiful holiday rentals in " + nombre + ", one of the most sought-after destinations on the Costa del Sol. Our selection of apartments, villas and penthouses offers the perfect base for your Andalusian getaway, combining Mediterranean lifestyle with modern comfort.",
    secciones: [
      {
        h2: "Holiday Rentals in " + nombre + " - Find Your Perfect Stay",
        parrafos: [
          nombre + " offers exceptional accommodation for every type of traveller on the Costa del Sol. From beachfront apartments to spacious villas with private pools, the rental market caters to families, couples and groups seeking a memorable Mediterranean holiday.",
          "Our curated selection combines comfort and prime location. Each property is carefully chosen for its quality, amenities and proximity to the best beaches, restaurants and local attractions on the Costa del Sol."
        ]
      },
      {
        h2: "Why Choose " + nombre + " for Your Holiday?",
        parrafos: [
          "The Costa del Sol enjoys over 300 days of sunshine per year, making " + nombre + " an ideal year-round destination. Summer temperatures between 28 and 35 degrees create perfect beach conditions, while mild winters attract long-stay visitors.",
          "With excellent transport links to Malaga Airport and a wide range of local amenities, " + nombre + " combines accessibility with authentic Andalusian charm. Car hire is recommended to explore the surrounding region."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "What is the best time to visit " + nombre + "?",
        respuesta: "June to September offers ideal beach weather with temperatures between 28 and 35 degrees. Spring and autumn provide pleasant conditions with fewer tourists and lower rental prices."
      },
      {
        pregunta: "What amenities are included in holiday rentals?",
        respuesta: "Most properties include WiFi, air conditioning, fully equipped kitchen, bed linen and towels. Many offer terraces, sea views, parking and access to community swimming pools."
      },
      {
        pregunta: "How far is " + nombre + " from Malaga Airport?",
        respuesta: "Most areas on the Costa del Sol are between 30 and 90 minutes from Malaga Airport. Airport transfers and car hire can be arranged for your convenience."
      }
    ]
  };
}

// --- FR generic fallback -------------------------------------------
function contenidoGenericoFR(nombre: string): ContenidoZona {
  return {
    intro: "Decouvrez de magnifiques locations de vacances a " + nombre + ", l'une des destinations les plus recherchees de la Costa del Sol. Notre selection d'appartements, villas et penthouses offre la base parfaite pour votre escapade andalouse en Mediterranee.",
    secciones: [
      {
        h2: "Locations de Vacances a " + nombre + " - Trouvez Votre Sejour Ideal",
        parrafos: [
          nombre + " sur la Costa del Sol propose des options d'hebergement exceptionnelles pour tous les types de voyageurs. Des appartements en bord de mer aux villas spacieuses avec piscine privee, le marche locatif convient aux familles, couples et groupes.",
          "Notre selection de locations combine confort et emplacement ideal. Chaque propriete est soigneusement choisie pour sa qualite, ses equipements et sa proximite avec les meilleures plages et restaurants de la Costa del Sol."
        ]
      },
      {
        h2: "Pourquoi Choisir " + nombre + " pour Vos Vacances?",
        parrafos: [
          "La Costa del Sol beneficie de plus de 300 jours de soleil par an, faisant de " + nombre + " une destination ideale toute l'annee. Les temperatures estivales entre 28 et 35 degres creent des conditions parfaites pour la plage.",
          "Avec d'excellentes liaisons de transport vers l'aeroport de Malaga et une large gamme de commodites locales, " + nombre + " combine accessibilite et charme andalou authentique."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "Quelle est la meilleure periode pour visiter " + nombre + "?",
        respuesta: "De juin a septembre, le temps ideal pour la plage avec des temperatures entre 28 et 35 degres. Le printemps et l'automne offrent des conditions agreables avec moins de touristes et des prix inferieurs."
      },
      {
        pregunta: "Quels equipements sont inclus dans les locations?",
        respuesta: "La plupart des proprietes incluent WiFi, climatisation, cuisine entierement equipee, linge de lit et serviettes. Beaucoup proposent egalement des terrasses et piscines communes."
      },
      {
        pregunta: "A quelle distance se trouve l'aeroport de Malaga de " + nombre + "?",
        respuesta: "La plupart des zones de la Costa del Sol se trouvent entre 30 et 90 minutes de l'aeroport de Malaga en voiture. Les transferts et la location de voiture peuvent etre organises."
      }
    ]
  };
}

// --- EN specific content -----------------------------------------------
const CONTENIDO_ZONAS_EN: Record<string, ContenidoZona> = {
  "marbella": {
    "seo_title": "Luxury Villa with Pool in Marbella – Costa del Sol",
    "seo_description": "Book this exclusive luxury villa in Marbella with private pool and sea views. Ideal for families or groups. Reserve your Costa del Sol getaway now.",
    "intro": "Marbella is synonymous with luxury on the Costa del Sol. Renowned for its glamorous Puerto Banus marina, pristine Blue Flag beaches and world-class golf courses, this Mediterranean jewel attracts discerning travellers from across Europe and beyond. Our holiday rentals in Marbella place you at the heart of this exceptional destination, offering everything from chic beachfront apartments in the historic centre to exclusive villas on the prestigious Golden Mile and Nueva Andalucia.",
    secciones: [
      {
        h2: "Luxury Holiday Rentals in Marbella",
        parrafos: [
          "Marbella reputation as one of Europe most prestigious resort towns is well deserved. The city combines a perfectly preserved old town with 27 kilometres of Blue Flag beaches, offering a lifestyle that is both culturally rich and magnificently sun-drenched. Holiday rentals range from compact studios in the town centre to multi-bedroom villas with private pools overlooking the Mediterranean.",
          "The Golden Mile connecting Marbella town to Puerto Banus is lined with some of the most desirable properties on the Costa del Sol. Renting here puts you within easy reach of world-famous beach clubs, Michelin-starred restaurants and designer boutiques. For families, the residential areas of Las Chapas and Elviria offer quieter settings with excellent amenities and access to the best beaches on the coast."
        ],
        subsecciones: [
          {
            h3: "Puerto Banus and the Golden Mile",
            texto: "Puerto Banus remains one of the most iconic marinas in the Mediterranean. This glamorous port town, with its luxury yachts, designer shops and vibrant nightlife, is a short drive from most Marbella rentals. The Golden Mile offers some of the finest villa rentals on the coast, combining exclusivity with convenient access to all major attractions."
          },
          {
            h3: "Marbella Old Town",
            texto: "The historic centre of Marbella, with its whitewashed buildings, flower-filled plazas and traditional tapas bars, provides a wonderful contrast to the modern resort. Renting an apartment near the old town allows you to experience authentic Andalusian culture while remaining close to the beach and all modern amenities."
          }
        ],
        listaCaracteristicas: [
          "27 kilometres of Blue Flag beaches",
          "More than 60 world-class golf courses nearby",
          "Puerto Banus marina with luxury boutiques and restaurants",
          "Historic old town with authentic Andalusian atmosphere",
          "Over 300 days of sunshine per year",
          "Excellent international connections via Malaga Airport"
        ]
      },
      {
        h2: "Activities and Attractions in Marbella",
        parrafos: [
          "Beyond the beach, Marbella offers an exceptional range of activities for all interests. Golf enthusiasts will find more than 60 courses within easy reach, many designed by legendary architects. The surrounding mountains of the Sierra Blanca provide excellent hiking opportunities, while the Mediterranean waters offer world-class sailing, snorkelling and water sports of all kinds.",
          "Culturally, Marbella rewards exploration. The Museum of Contemporary Spanish Engraving, the Bonsai Museum and the old town archaeological museum offer fascinating insights into the region. The Thursday street market in San Pedro de Alcantara is a local institution, while the Casco Antiguo hosts regular art exhibitions and cultural events throughout the year."
        ]
      },
      {
        h2: "When to Visit Marbella",
        parrafos: [
          "Marbella is a genuine year-round destination thanks to its exceptional microclimate. Summer months from June to September bring guaranteed sunshine and temperatures between 28 and 36 degrees Celsius, perfect for beach holidays. The peak season also coincides with a vibrant social calendar of events, festivals and beach parties.",
          "Spring and autumn are increasingly popular with visitors seeking a quieter, more affordable Marbella experience. April, May, October and November offer warm temperatures, green landscapes and significantly lower rental prices. Winter in Marbella is remarkably mild, attracting long-stay visitors and digital nomads who appreciate the outdoor lifestyle."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "What is the best area to stay in Marbella?",
        respuesta: "It depends on your priorities. The old town offers authentic charm and walkability. The Golden Mile provides luxury and proximity to Puerto Banus. Elviria and Las Chapas are ideal for families seeking quieter beach areas with good amenities and supermarkets nearby."
      },
      {
        pregunta: "How far is Marbella from Malaga Airport?",
        respuesta: "Marbella is approximately 60 kilometres from Malaga Airport, a journey of around 45 to 60 minutes by car. Regular bus services operate between the airport and Marbella. Car hire is recommended for exploring the surrounding area at your own pace."
      },
      {
        pregunta: "Are holiday rentals in Marbella suitable for families?",
        respuesta: "Absolutely. Marbella offers excellent family-friendly accommodation, from apartments with community pools to spacious villas with private gardens. Areas such as Elviria, Las Chapas and Nueva Andalucia are particularly well suited to families, with good schools, supermarkets and family beaches nearby."
      }
    ]
  },
  "nerja": {
    seo_title: "Nerja Holiday Rentals: Sea View Apartments and Villas",
    seo_description: "Book your holiday rental in Nerja with stunning sea views. Explore the Balcon de Europa and pristine beaches on the Costa del Sol.",
    intro: "Nerja is one of the Costa del Sol most beloved destinations, a charming whitewashed village perched above the Mediterranean with dramatic cliff scenery and some of the finest beaches in Andalusia. Our holiday rentals in Nerja offer authentic Andalusian character combined with modern comfort, placing you at the heart of this magical town where the famous Balcon de Europa terrace offers panoramic sea views that have made it one of the most photographed spots in all of Spain.",
    secciones: [
      {
        h2: "Holiday Rentals in Nerja - Authentic Andalusian Experience",
        parrafos: [
          "Unlike the more commercialised resorts of the western Costa del Sol, Nerja retains a genuinely authentic Andalusian character that attracts visitors seeking something more genuine and unspoiled. The town pedestrianised centre, with its tapas bars, craft shops and flower-filled streets, creates a relaxed and charming atmosphere that is perfect for a traditional Spanish holiday.",
          "Our selection of holiday rentals in Nerja ranges from cosy apartments in the town centre to spacious villas in the surrounding hills with breathtaking sea views. Many properties are within walking distance of the famous Balcon de Europa, the local beaches and the town excellent restaurants and bars."
        ],
        listaCaracteristicas: [
          "Balcon de Europa - the iconic viewpoint of the Costa del Sol",
          "Pristine beaches including Burriana, Maro and La Torrecilla",
          "Nerja Caves - a spectacular prehistoric underground wonder",
          "Authentic Andalusian old town with pedestrianised centre",
          "Excellent local seafood restaurants and tapas bars",
          "Easy access to the Natural Park of Sierras de Tejeda"
        ]
      },
      {
        h2: "Beaches and Natural Beauty Around Nerja",
        parrafos: [
          "Nerja is blessed with some of the most beautiful beaches on the Costa del Sol. Burriana Beach, the largest and most popular, offers excellent facilities including sunbeds, beach bars and water sports equipment hire. The more secluded coves of Maro and Calahonda, accessible by footpath or boat, provide a peaceful alternative for those seeking privacy and natural beauty.",
          "The Natural Park of Sierras de Tejeda, Almijara and Alhama borders Nerja to the north, offering spectacular hiking through rugged mountain terrain with panoramic views of the Mediterranean. The Chillar River Walk, a refreshing summer hike through a river canyon, is one of the most popular outdoor activities in the entire region."
        ]
      },
      {
        h2: "Discovering Nerja Cultural Heritage",
        parrafos: [
          "The Nerja Caves, discovered in 1959, represent one of Spain most important prehistoric sites. The cave system contains impressive stalactite and stalagmite formations alongside Palaeolithic cave paintings dating back more than 40,000 years. A visit to the caves is an unmissable experience for any guest staying in the area.",
          "The annual Nerja Festival, held in the caves each July, is one of the most unique cultural events in Spain, featuring flamenco performances and classical concerts against the extraordinary backdrop of the cave interior. The town also hosts traditional festivals throughout the year, including a vibrant Carnival in February and the San Isidro celebrations in May."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "How far is Nerja from Malaga Airport?",
        respuesta: "Nerja is approximately 55 kilometres east of Malaga, a drive of about 50 to 60 minutes via the A-7 coastal motorway. Regular ALSA bus services connect the airport with Nerja several times daily. Hiring a car is recommended for exploring surrounding villages and natural parks."
      },
      {
        pregunta: "What are the best beaches in Nerja?",
        respuesta: "Burriana Beach is the largest and best equipped, ideal for families with water sports and beach bar facilities. La Torrecilla and El Salon are closest to the town centre. For more secluded options, the coves of Maro and Calahonda offer natural beauty and tranquility away from the crowds."
      },
      {
        pregunta: "Is Nerja suitable for families with children?",
        respuesta: "Nerja is an excellent choice for families. The safe calm beaches are ideal for children, and the town centre is largely pedestrianised making it easy to explore on foot. The Nerja Caves and surrounding natural parks offer wonderful educational experiences for children of all ages."
      }
    ]
  },
  "torre-del-mar": {
    seo_title: "Torre del Mar Family Apartments | Holiday Rentals Costa del Sol",
    seo_description: "Family-friendly holiday apartments in Torre del Mar. Longest promenade on the Costa del Sol, authentic cuisine and easy access to the Axarquia.",
    intro: "Torre del Mar is an authentic seaside town on the Axarquia coast, beloved by Spanish families and an increasing number of international visitors who appreciate its genuine Mediterranean character, long sandy beaches and exceptional local cuisine. Our holiday rentals in Torre del Mar offer excellent value and a real taste of everyday Andalusian life, far from the tourist crowds of the more commercialised Costa del Sol resorts.",
    secciones: [
      {
        h2: "Holiday Rentals in Torre del Mar - Authentic Mediterranean Living",
        parrafos: [
          "Torre del Mar is the seaside resort of Velez-Malaga, the capital of the Axarquia region, and it retains a wonderfully authentic Spanish character that increasingly attracts visitors seeking an alternative to the more commercialised Costa del Sol resorts. The long promenade, lined with excellent seafood restaurants and traditional bars, is the social hub of the town.",
          "Our holiday rentals in Torre del Mar offer genuine value for money without compromising on quality or location. Apartments and townhouses here provide excellent bases for exploring not only the beaches but also the spectacular Axarquia hinterland, with its historic villages, subtropical plantations and dramatic mountain scenery."
        ],
        listaCaracteristicas: [
          "Long sandy beach stretching for several kilometres",
          "Excellent traditional seafood restaurants on the promenade",
          "Gateway to the Axarquia region and its charming inland villages",
          "Authentic Spanish atmosphere without the tourist crowds",
          "Regular local markets and traditional Andalusian festivals",
          "55 kilometres from Malaga Airport via the A-7 motorway"
        ]
      },
      {
        h2: "Beaches and Promenade Life in Torre del Mar",
        parrafos: [
          "The beach at Torre del Mar stretches for several kilometres of fine dark sand, typical of the eastern Costa del Sol. The sheltered bay creates calm swimming conditions that are ideal for families with children. The beach is well serviced with sunbed rentals, chiringuitos (beach bars) and water sports facilities during the summer season.",
          "The Paseo Maritimo, the long beachfront promenade, is the heart of social life in Torre del Mar. Lined with palm trees, restaurants and bars, it is the perfect place for the traditional Spanish evening stroll. The weekly market along the promenade is a colourful local institution offering fresh produce, local crafts and clothing."
        ]
      },
      {
        h2: "Exploring the Axarquia Region from Torre del Mar",
        parrafos: [
          "Torre del Mar greatest asset as a holiday base is its position as the gateway to the spectacular Axarquia region. The inland villages of Competa, Frigiliana and Canillas de Albaida, perched on hillsides among vineyards and subtropical gardens, offer some of the most authentic Andalusian experiences on the entire coast.",
          "The Axarquia is renowned for its wine production, particularly the sweet Moscatel wines produced in the region for centuries. The local cuisine is exceptional, with traditional dishes including ajoblanco (cold garlic soup) and the famous espetos de sardinas (sardines on skewers) cooked over open wood fires on the beach."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "What is the best time to visit Torre del Mar?",
        respuesta: "June to September is ideal for beach holidays, with temperatures between 25 and 35 degrees Celsius and guaranteed sunshine. Spring and autumn offer pleasant weather with fewer tourists. Winter is mild and attracts long-stay visitors seeking warmth and tranquility at reduced prices."
      },
      {
        pregunta: "What amenities are included in Torre del Mar holiday rentals?",
        respuesta: "Most rentals include WiFi, air conditioning, a fully equipped kitchen, bed linen and towels. Many properties have terraces or balconies, some with sea views. Parking is often available, and community swimming pools are common in apartment complexes."
      },
      {
        pregunta: "How far is Torre del Mar from Malaga Airport?",
        respuesta: "Torre del Mar is approximately 40 kilometres east of Malaga Airport, a journey of around 35 to 40 minutes via the A-7 motorway. Regular ALSA bus services connect Malaga with Torre del Mar throughout the day. Car hire is recommended for exploring the Axarquia region."
      }
    ]
  }
,
  "torremolinos": {
      "seo_title": "Torremolinos Holiday Rentals - Apartments Costa del Sol",
      "seo_description": "Book your holiday apartment in Torremolinos. Close to Malaga Airport, Blue Flag beaches and the best value on the Costa del Sol.",
      "intro": "Torremolinos was the pioneer of Costa del Sol tourism and remains one of the most complete holiday destinations on the coast. Just 8 km from Malaga Airport, it combines extensive beaches with a lively town centre full of shops, restaurants and nightlife. La Carihuela, the old fishing quarter, preserves authentic charm with beachfront chiringuitos serving the finest sardine espetos in the province.",
      "secciones": [
          {
              "h2": "Why Choose Torremolinos for Your Holiday",
              "parrafos": [
                  "Torremolinos offers an unbeatable location just minutes from the airport and Malaga city centre. With 7 km of Blue Flag coastline, the town provides an ideal setting for a beach holiday rental on the Costa del Sol.",
                  "The climate, with over 300 days of sunshine and average temperatures of 19 degrees Celsius, allows year-round outdoor enjoyment. Peak season runs from June to September, though spring and autumn offer pleasant weather with lower prices."
              ],
              "subsecciones": [
                  {
                      "h3": "La Carihuela: Authentic Fishing Quarter",
                      "texto": "La Carihuela is the heart and soul of Torremolinos. This former fishing village is now the culinary reference point for the area, with beachfront chiringuitos serving grilled sardine espetos on olive-wood skewers, traditional Malaga-style fried fish and classic paella."
                  },
                  {
                      "h3": "Blue Flag Beaches",
                      "texto": "From Bajondillo to Los Alamos, Torremolinos boasts extensive golden sand beaches with full facilities and Blue Flag certification, including sunbed hire, water sports and lifeguard services."
                  }
              ]
          },
          {
              "h2": "Holiday Accommodation in Torremolinos",
              "parrafos": [
                  "Torremolinos offers a wide variety of holiday apartments at significantly more affordable prices than other areas of the Costa del Sol, making it an excellent value destination."
              ],
              "listaCaracteristicas": [
                  "Beachfront apartments in Bajondillo",
                  "Family flats with communal pool",
                  "Modern studios near the train station",
                  "Penthouses with panoramic sea views",
                  "Budget-friendly long-stay accommodation",
                  "Pet-friendly apartments near La Carihuela"
              ],
              "subsecciones": [
                  {
                      "h3": "Facilities and Services",
                      "texto": "Holiday apartments typically include WiFi, air conditioning, equipped kitchen and bed linen. Many offer parking, communal swimming pool and private terrace."
                  }
              ]
          },
          {
              "h2": "Things to Do in Torremolinos",
              "parrafos": [
                  "Beyond the beach, Torremolinos offers surprisingly rich cultural and entertainment options. Aqualand water park is a family favourite, while the Molino de Inca Botanical Garden provides a peaceful tropical retreat.",
                  "The nightlife in Torremolinos is among the most vibrant on the Costa del Sol, with bars, clubs and live entertainment. Several golf courses lie within 15 minutes drive."
              ],
              "subsecciones": [
                  {
                      "h3": "Local Cuisine",
                      "texto": "La Carihuela chiringuitos are the gastronomic reference: sardine espetos grilled over olive wood, traditional Malaga fried fish, gazpacho and ajoblanco cold soup."
                  },
                  {
                      "h3": "Day Trips from Torremolinos",
                      "texto": "Malaga city centre is 15 minutes by commuter train. Marbella 30 minutes by motorway. Ronda, Antequera and the famous Caminito del Rey as excellent half-day excursions."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Best time to visit Torremolinos?",
              "respuesta": "June to September for beach holidays. Spring and autumn offer lower prices and pleasant temperatures of 20 to 25 degrees. Winter is mild at around 16 degrees, perfect for long stays."
          },
          {
              "pregunta": "How to get from Malaga Airport?",
              "respuesta": "Torremolinos is just 8 km from the airport. The commuter train connects both in 8 minutes. Buses and taxis are also readily available."
          },
          {
              "pregunta": "Is Torremolinos family-friendly?",
              "respuesta": "Absolutely. Wide safe beaches with lifeguards, Aqualand water park and the Botanical Garden. Family apartments with swimming pools and play areas are widely available."
          }
      ]
  },
  "fuengirola": {
      "seo_title": "Fuengirola Family Holiday Apartments - Costa del Sol Rentals",
      "seo_description": "Family holiday rentals in Fuengirola. 8 km of beach, Bioparc zoo, Sohail Castle and the best family entertainment on the Costa del Sol.",
      "intro": "Fuengirola is the ultimate family destination on the western Costa del Sol. With 8 km of sandy beaches, Bioparc immersive zoo, the historic Sohail Castle and a lively seafront promenade, this cosmopolitan town attracts families from across Europe. Its multicultural community gives it a uniquely international character while retaining genuine Andalusian warmth.",
      "secciones": [
          {
              "h2": "Why Choose Fuengirola for a Family Holiday",
              "parrafos": [
                  "Fuengirola combines beach, culture and family entertainment like no other town on the Costa del Sol. The extensive sandy beach with shallow waters and lifeguard services is ideal for children of all ages.",
                  "The commuter train connects Fuengirola to Malaga city and the airport in just 40 minutes. International supermarkets, health centres and comprehensive shopping make families feel at home."
              ],
              "subsecciones": [
                  {
                      "h3": "Fuengirola Beach: 8 km of Golden Sand",
                      "texto": "The beach extends for 8 km across several zones. Los Boliches and Fuengirola are the most popular, with full services, chiringuitos and calm, shallow waters suitable for young children."
                  },
                  {
                      "h3": "Sohail Castle and Old Town",
                      "texto": "Sohail Castle, a Phoenician fortress rebuilt in the Arab period, crowns the western entrance to the town and hosts summer concerts and cultural festivals in its dramatic setting."
                  }
              ]
          },
          {
              "h2": "Holiday Accommodation in Fuengirola",
              "parrafos": [
                  "Fuengirola offers holiday apartments for every budget, from affordable studios in the centre to spacious family flats with sea views and pool access."
              ],
              "listaCaracteristicas": [
                  "Beachfront apartments on the promenade",
                  "Family flats with pool and play area",
                  "Studios near the commuter train station",
                  "Townhouses in Mijas Costa with gardens",
                  "Penthouses with solarium and panoramic views",
                  "Adapted accessible accommodation"
              ],
              "subsecciones": [
                  {
                      "h3": "Family Services",
                      "texto": "Holiday rentals in Fuengirola stand out for family-friendly equipment: cots, high chairs, playground areas within complexes and child-friendly swimming pools."
                  }
              ]
          },
          {
              "h2": "Family Activities in Fuengirola",
              "parrafos": [
                  "Bioparc Fuengirola is the star family attraction: an immersive zoo with over 100 species living in recreated tropical habitats without visible barriers, offering a unique educational experience.",
                  "The Tuesday market is one of the largest on the coast, offering fresh produce, clothing and local crafts. The marina provides boat excursions and dolphin-watching trips."
              ],
              "subsecciones": [
                  {
                      "h3": "Multicultural Dining",
                      "texto": "The dining scene reflects Fuengirola diversity: traditional espeto chiringuitos alongside British pubs, Scandinavian restaurants and Asian cuisine. Town centre tapas bars are unmissable."
                  },
                  {
                      "h3": "Day Trips from Fuengirola",
                      "texto": "Mijas village 10 minutes away, a classic whitewashed hill town. Malaga city 30 minutes by train. Marbella 20 minutes. Selwo Aventura safari park in Estepona for animal lovers."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Best area for families in Fuengirola?",
              "respuesta": "Los Boliches and Carvajal are the most family-friendly areas. Calm beaches, playgrounds, nearby supermarkets and apartments with communal pools."
          },
          {
              "pregunta": "How to get from the airport?",
              "respuesta": "Fuengirola is 30 km from Malaga Airport. The C-1 commuter train runs every 20 minutes with a journey time of 40 minutes. It is the terminus station, very convenient."
          },
          {
              "pregunta": "What to do on rainy days?",
              "respuesta": "Bioparc has covered areas. Miramar shopping centre offers cinema, shops and restaurants. Rain is rare: only 45 days per year on average."
          }
      ]
  },
  "benalmadena": {
      "seo_title": "Benalmadena Holiday Apartments with Marina Views - Costa del Sol",
      "seo_description": "Holiday rentals in Benalmadena near the award-winning marina. Blue Flag beaches, Tivoli World, cable car and Sea Life Aquarium.",
      "intro": "Benalmadena is one of the most versatile municipalities on the Costa del Sol, comprising three distinct areas: Benalmadena Costa by the sea, Benalmadena Pueblo perched on the hillside, and Arroyo de la Miel as the commercial and transport hub. Its Puerto Marina has been awarded Best Marina in the World, making it the epicentre of a destination offering Blue Flag beaches, Tivoli World theme park, a cable car and Sea Life Aquarium.",
      "secciones": [
          {
              "h2": "Why Choose Benalmadena for Your Holiday",
              "parrafos": [
                  "Benalmadena combines beach, mountains and entertainment within just a few kilometres. Puerto Marina, the world-award-winning port, offers restaurants, shops and vibrant nightlife. From there, the cable car ascends to the summit of Monte Calamorro with views reaching Africa on clear days.",
                  "Connectivity is excellent: commuter train to Malaga and the airport, AP-7 motorway towards Marbella. Just 20 minutes from the airport, Benalmadena is easily accessible from across Europe."
              ],
              "subsecciones": [
                  {
                      "h3": "Puerto Marina: Heart of the Costa del Sol",
                      "texto": "Puerto Marina is much more than a marina. With distinctive architecture, it houses international restaurants, live music bars, boutiques and an aquarium. It serves as the departure point for boat excursions and dolphin-watching trips."
                  },
                  {
                      "h3": "Benalmadena Beaches",
                      "texto": "The beaches extend for 9 km along the coast. Bil-Bil beach is notable for its striking Arab-style castle on the seafront. Malapesquera beach holds Blue Flag status with full facilities."
                  }
              ]
          },
          {
              "h2": "Holiday Accommodation in Benalmadena",
              "parrafos": [
                  "Benalmadena offers holiday apartments for every type of visitor, from modern apartments with marina views to charming houses in the pueblo with panoramic terraces."
              ],
              "listaCaracteristicas": [
                  "Marina view apartments at Puerto Marina",
                  "Beachfront flats in Benalmadena Costa",
                  "Charming houses in Benalmadena Pueblo",
                  "Penthouses with solarium in Arroyo de la Miel",
                  "Family apartments with pool and garden",
                  "Studios near the cable car and Tivoli World"
              ],
              "subsecciones": [
                  {
                      "h3": "Three Areas, Three Experiences",
                      "texto": "Benalmadena Costa for sea and marina life. Arroyo de la Miel for services, shops and transport connections. Benalmadena Pueblo for peaceful hillside views over the coastline."
                  }
              ]
          },
          {
              "h2": "Family Activities in Benalmadena",
              "parrafos": [
                  "Benalmadena packs more tourist attractions than any other municipality on the Costa del Sol. Tivoli World is the oldest theme park in Andalusia. Sea Life Aquarium showcases Mediterranean marine life. The cable car offers spectacular views with birds of prey displays at the summit.",
                  "Colomares Castle, a unique monument dedicated to the discovery of America, is an unmissable architectural curiosity combining Gothic, Romanesque and Byzantine styles."
              ],
              "subsecciones": [
                  {
                      "h3": "Dining Options",
                      "texto": "Puerto Marina concentrates international cuisine: Italian, Japanese, Mexican and Indian. In Benalmadena Pueblo, traditional Andalusian cooking dominates. Beach chiringuitos serve the classic espetos."
                  },
                  {
                      "h3": "Day Trips from Benalmadena",
                      "texto": "Malaga city centre 20 minutes by commuter train. Mijas pueblo 15 minutes. Marbella and Puerto Banus 30 minutes. The famous Caminito del Rey walkway 1 hour."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Best area to stay in Benalmadena?",
              "respuesta": "Benalmadena Costa if you prioritise beach and marina. Arroyo de la Miel for services and transport links. Benalmadena Pueblo for tranquillity and panoramic views."
          },
          {
              "pregunta": "How to get from the airport?",
              "respuesta": "Just 15 km from Malaga Airport. Commuter train to Arroyo de la Miel station in 15 minutes. Buses and taxis also available."
          },
          {
              "pregunta": "Activities for children in Benalmadena?",
              "respuesta": "Tivoli World theme park, Sea Life Aquarium, cable car with birds of prey demonstrations, dolphin watching boat trips and family beaches with play areas."
          }
      ]
  },
  "estepona": {
      "seo_title": "Luxury Villa Rental in Estepona - Exclusive Costa del Sol",
      "seo_description": "Luxury villa rentals in Estepona, the Garden of the Costa del Sol. Beaches, artistic murals and golf.",
      "intro": "Estepona is the emerging luxury destination on the western Costa del Sol. Known as the Garden of the Costa del Sol for its orchids and artistic murals. Exclusive golf developments attract discerning travellers.",
      "secciones": [
          {
              "h2": "Why Choose Estepona for Luxury",
              "parrafos": [
                  "Authentic Andalusian character with modern infrastructure. Over 50 artistic murals and the Orchid Route.",
                  "Playa del Cristo: natural cove with calm waters. Seafront promenade to the marina."
              ],
              "subsecciones": [
                  {
                      "h3": "Historic Centre and Murals",
                      "texto": "Open-air gallery with 50 international murals. The Mural Route through whitewashed streets."
                  },
                  {
                      "h3": "Beaches and Nature",
                      "texto": "21 km of coastline. Playa del Cristo as sheltered cove. Sierra Bermeja mountain backdrop."
                  }
              ]
          },
          {
              "h2": "Luxury Villas in Estepona",
              "parrafos": [
                  "High-end villas in La Resina, Atalaya and Cancelada. Private pools and views."
              ],
              "listaCaracteristicas": [
                  "Villas with infinity pool",
                  "Beachfront apartments",
                  "Golf course townhouses",
                  "Marina penthouses",
                  "Rustic farmhouses",
                  "Contemporary with home automation"
              ],
              "subsecciones": [
                  {
                      "h3": "Premium Developments",
                      "texto": "24h security, golf, spa. La Resina Golf, Atalaya, Los Flamingos with 5-star hotel."
                  }
              ]
          },
          {
              "h2": "Things to Do in Estepona",
              "parrafos": [
                  "Orchidarium with 5000 orchids. Selwo Aventura safari. Championship golf.",
                  "Marina with fishing, dolphins and sailing. Sierra Bermeja hiking."
              ],
              "subsecciones": [
                  {
                      "h3": "Local Cuisine",
                      "texto": "Active fishing port. Espeto chiringuitos, fine dining and traditional tapas."
                  },
                  {
                      "h3": "Day Trips",
                      "texto": "Marbella 20 min. Gibraltar 45 min. Ronda 1h. Casares 20 min."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Estepona vs Marbella?",
              "respuesta": "Quieter and more authentic. Better prices. Marbella has Puerto Banus."
          },
          {
              "pregunta": "Airport access?",
              "respuesta": "80 km, 50 min on AP-7. Avanza buses direct."
          },
          {
              "pregunta": "Golf in Estepona?",
              "respuesta": "Atalaya, El Paraiso, Estepona Golf, Valle Romano. Year-round season."
          }
      ]
  },
  "malaga": {
      "seo_title": "Holiday Apartment in Malaga City Centre - Vacation Rental",
      "seo_description": "Rent a holiday apartment in Malaga centre. Museums, gastronomy, urban beaches and the best cultural life on the Costa del Sol.",
      "intro": "Malaga is the Costa del Sol capital and one of the fastest-growing tourist cities in Europe. The historic centre houses the Picasso Museum, Centre Pompidou, the Alcazaba and Roman Theatre. La Malagueta and Pedregalejo beaches complement with chiringuitos and promenade.",
      "secciones": [
          {
              "h2": "Why Choose Malaga City",
              "parrafos": [
                  "Over 30 museums, expanding gastronomy and pedestrianised historic centre. Competes with Barcelona and Seville.",
                  "Live like a local: Calle Larios, Atarazanas Market, La Malagueta, espetos in Pedregalejo."
              ],
              "subsecciones": [
                  {
                      "h3": "Historic Centre and Museums",
                      "texto": "Picasso, Pompidou, Carmen Thyssen, CAC. Alcazaba and Gibralfaro with panoramic views."
                  },
                  {
                      "h3": "Urban Beaches and Pedregalejo",
                      "texto": "La Malagueta 10 min from centre. Pedregalejo with authentic chiringuitos and espetos."
                  }
              ]
          },
          {
              "h2": "Accommodation in Malaga",
              "parrafos": [
                  "Distinctive neighbourhoods: historic centre, Soho, Pedregalejo, Port area."
              ],
              "listaCaracteristicas": [
                  "Historic centre near Calle Larios",
                  "Port and Mediterranean views",
                  "Soho arts district lofts",
                  "Pedregalejo near the beach",
                  "Penthouses with Alcazaba views",
                  "Studios near Maria Zambrano station"
              ],
              "subsecciones": [
                  {
                      "h3": "Neighbourhoods",
                      "texto": "Vibrant centre. Soho with street art. Pedregalejo: quiet and maritime."
                  }
              ]
          },
          {
              "h2": "Things to Do in Malaga",
              "parrafos": [
                  "Alcazaba, museums, Atarazanas, Muelle Uno, La Malagueta, Pedregalejo espetos. Weeks of plans.",
                  "Caminito del Rey 45 min. Montes de Malaga with hiking and views."
              ],
              "subsecciones": [
                  {
                      "h3": "Malaga Gastronomy",
                      "texto": "Atarazanas Market: seafood, tropical fruits. Tapas: anchovies, campero. Pedregalejo espetos."
                  },
                  {
                      "h3": "Day Trips",
                      "texto": "Caminito 45 min. Antequera 40 min. Nerja 50 min. Ronda 90 min. AVE to Madrid 2h30."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Best area in Malaga?",
              "respuesta": "Historic centre for culture. Pedregalejo for beach. Soho for alternative."
          },
          {
              "pregunta": "Without a car?",
              "respuesta": "Compact pedestrian centre. Bus, metro and commuter trains."
          },
          {
              "pregunta": "Museums?",
              "respuesta": "Picasso, Pompidou, Carmen Thyssen, free CAC. 30+ museums total."
          }
      ]
  }
};

// --- FR specific content -----------------------------------------------
const CONTENIDO_ZONAS_FR: Record<string, ContenidoZona> = {
  "marbella": {
    "seo_title": "Location Villa de Luxe à Marbella – Costa del Sol",
    "seo_description": "Villa de prestige à Marbella avec piscine privée et vue sur mer. Parfaite pour un séjour en famille. Réservez directement votre villa haut de gamme dès maintenant.",
    "intro": "Marbella est synonyme de luxe sur la Costa del Sol. Reconnue pour sa marina glamour de Puerto Banus, ses plages immaculees Pavillon Bleu et ses terrains de golf de classe mondiale, ce joyau mediterraneen attire des voyageurs exigeants de toute l'Europe. Nos locations de vacances a Marbella vous placent au coeur de cette destination exceptionnelle, offrant tout, des appartements en bord de mer dans le centre historique aux villas exclusives sur la prestigieuse Milla de Oro.",
    secciones: [
      {
        h2: "Locations de Vacances de Luxe a Marbella",
        parrafos: [
          "La reputation de Marbella comme l'une des stations balneaires les plus prestigieuses d'Europe est bien meritee. La ville combine une vieille ville parfaitement preservee avec 27 kilometres de plages Pavillon Bleu, offrant un style de vie a la fois riche culturellement et magnifiquement ensoleille.",
          "La Milla de Oro reliant le centre de Marbella a Puerto Banus est bordee de certaines des proprietes les plus convoitees de la Costa del Sol. Louer ici vous permet d'acceder facilement aux beach clubs mondialement connus, aux restaurants etoiles Michelin et aux boutiques de luxe."
        ],
        subsecciones: [
          {
            h3: "Puerto Banus et la Milla de Oro",
            texto: "Puerto Banus reste l'une des marinas les plus emblematiques de la Mediterranee. Ce port glamour, avec ses yachts de luxe, ses boutiques de designer et sa vie nocturne animee, est a quelques minutes de la plupart des locations de Marbella. La Milla de Oro offre certaines des meilleures locations de villas de la cote."
          },
          {
            h3: "La Vieille Ville de Marbella",
            texto: "Le centre historique de Marbella, avec ses batiments blanchis a la chaux, ses places fleuries et ses bars a tapas traditionnels, offre un merveilleux contraste avec les complexes balneaires modernes. Louer un appartement pres de la vieille ville vous permet de vivre la culture andalouse authentique."
          }
        ],
        listaCaracteristicas: [
          "27 kilometres de plages Pavillon Bleu",
          "Plus de 60 terrains de golf de classe mondiale",
          "Marina de Puerto Banus avec boutiques et restaurants de luxe",
          "Vieille ville historique a l'atmosphere andalouse authentique",
          "Plus de 300 jours de soleil par an",
          "Excellentes connexions internationales via l'aeroport de Malaga"
        ]
      },
      {
        h2: "Activites et Attractions a Marbella",
        parrafos: [
          "Au-dela de la plage, Marbella offre une gamme exceptionnelle d'activites. Les amateurs de golf trouveront plus de 60 parcours a proximite, concus par des architectes legendaires. Les eaux de la Mediterranee offrent de la voile, de la plongee et des sports nautiques de premier ordre.",
          "Culturellement, Marbella recompense l'exploration. Le Musee de la Gravure Espagnole Contemporaine, le Musee du Bonsai et le musee archeologique de la vieille ville offrent des aperus fascinants de l'histoire de la region."
        ]
      },
      {
        h2: "Quand Visiter Marbella?",
        parrafos: [
          "Marbella est une destination veritable toute l'annee grace a son microclimat exceptionnel. Les mois d'ete de juin a septembre apportent un soleil garanti et des temperatures entre 28 et 36 degres, parfaits pour les vacances a la plage.",
          "Le printemps et l'automne sont de plus en plus populaires aupres des visiteurs recherchant une experience plus tranquille et abordable. Avril, mai, octobre et novembre offrent des temperatures agreables et des prix de location significativement inferieurs."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "Quelle est la meilleure zone pour sejourner a Marbella?",
        respuesta: "Cela depend de vos priorites. La vieille ville offre un charme authentique. La Milla de Oro propose le luxe et la proximite de Puerto Banus. Elviria et Las Chapas sont ideales pour les familles recherchant des plages calmes avec de bonnes infrastructures."
      },
      {
        pregunta: "A quelle distance se trouve l'aeroport de Malaga de Marbella?",
        respuesta: "Marbella se trouve a environ 60 kilometres de l'aeroport de Malaga, soit 45 a 60 minutes en voiture. Des services de bus reguliers relient l'aeroport a Marbella. La location de voiture est recommandee pour explorer les environs."
      },
      {
        pregunta: "Les locations de vacances a Marbella sont-elles adaptees aux familles?",
        respuesta: "Absolument. Marbella offre d'excellents logements familiaux, des appartements avec piscines communes aux villas spacieuses. Les zones d'Elviria, Las Chapas et Nueva Andalucia sont particulierement adaptees aux familles avec enfants."
      }
    ]
  },
  "nerja": {
    seo_title: "Location Nerja Vue Mer : Appartements et Villas Costa del Sol",
    seo_description: "Louez votre appartement avec vue sur mer a Nerja. Balcon de Europa, criques naturelles et charme andalou authentique sur la Costa del Sol.",
    intro: "Nerja estdes destinations les plus aimees de la Costa del Sol, un charmant village blanchi a la chaux perche au-dessus de la Mediterranee avec des falaises dramatiques et certaines des plus belles plages d'Andalousie. Nos locations de vacances a Nerja offrent un caractere andalou authentique combine au confort moderne, vous placant au coeur de cette ville magique ou le celebre Balcon de Europa offre des vues panoramiques sur la mer.",
    secciones: [
      {
        h2: "Locations de Vacances a Nerja - Experience Andalouse Authentique",
        parrafos: [
          "Contrairement aux stations balneaires plus commercialisees de l'ouest de la Costa del Sol, Nerja conserve un caractere andalou genuinement authentique qui attire les visiteurs recherchant quelque chose de plus authentique et preserv. Le centre pietonnise de la ville, avec ses bars a tapas et ses boutiques artisanales, cree une atmosphere relaxante parfaite.",
          "Notre selection de locations de vacances a Nerja va des appartements confortables dans le centre-ville aux villas spacieuses dans les collines environnantes avec des vues imprenables sur la mer. De nombreuses proprietes sont a distance de marche du Balcon de Europa, des plages locales et des excellents restaurants."
        ],
        listaCaracteristicas: [
          "Le Balcon de Europa - le joyau iconique de la Costa del Sol",
          "Plages immaculees dont Burriana, Maro et La Torrecilla",
          "Grottes de Nerja - une merveille naturelle souterraine spectaculaire",
          "Atmosphere authentique de vieille ville andalouse pietonnisee",
          "Excellents restaurants de fruits de mer et bars a tapas locaux",
          "Acces facile au Parc Naturel des Sierras de Tejeda"
        ]
      },
      {
        h2: "Plages et Beaute Naturelle Autour de Nerja",
        parrafos: [
          "Nerja est dotee de certaines des plus belles plages de la Costa del Sol. La plage de Burriana, la plus grande et la plus populaire, offre d'excellentes installations incluant transats, bars de plage et sports nautiques. Les criques plus isolees de Maro et Calahonda, accessibles a pied ou en bateau, offrent une alternative paisible pour ceux qui recherchent la tranquillite.",
          "Le Parc Naturel des Sierras de Tejeda, Almijara et Alhama borde Nerja au nord, offrant des randonnees spectaculaires a travers un terrain montagneux avec des vues panoramiques sur la Mediterranee. La Promenade du Rio Chillar est l'une des activites de plein air les plus populaires de la region."
        ]
      },
      {
        h2: "Decouvrir le Patrimoine Culturel de Nerja",
        parrafos: [
          "Les Grottes de Nerja, decouvertes en 1959, representent l'un des sites prehistoriques les plus importants d'Espagne. Le systeme de grottes contient d'impressionnantes formations de stalactites et stalagmites avec des peintures rupestres paleolithiques datant de plus de 40 000 ans.",
          "Le Festival annuel de Nerja, organise dans les grottes chaque juillet, est l'un des evenements culturels les plus uniques d'Espagne, avec des spectacles de flamenco et des concerts classiques dans ce cadre extraordinaire. La ville organise egalement des festivals traditionnels tout au long de l'annee."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "A quelle distance se trouve Nerja de l'aeroport de Malaga?",
        respuesta: "Nerja se trouve a environ 55 kilometres a l'est de Malaga, soit 50 a 60 minutes de conduite via la A-7. Des services de bus ALSA reguliers relient l'aeroport a Nerja plusieurs fois par jour. La location de voiture est recommandee pour explorer les villages et parcs naturels environnants."
      },
      {
        pregunta: "Quelles sont les meilleures plages de Nerja?",
        respuesta: "La plage de Burriana est la plus grande et la mieux equipee, ideale pour les familles avec sports nautiques et bar de plage. La Torrecilla et El Salon sont les plus proches du centre-ville. Pour des options plus isolees, les criques de Maro et Calahonda offrent beaute naturelle et tranquillite."
      },
      {
        pregunta: "Nerja est-elle adaptee aux familles avec enfants?",
        respuesta: "Nerja est un excellent choix pour les familles. Les plages calmes et securisees sont ideales pour les enfants, et le centre-ville est largement pietonnise. Les Grottes de Nerja et les parcs naturels environnants offrent de merveilleuses experiences educatives pour les enfants de tous ages."
      }
    ]
  },
  "torre-del-mar": {
    seo_title: "Location Torre del Mar pour Familles | Costa del Sol",
    seo_description: "Appartements familiaux a Torre del Mar. La plus longue promenade de la Costa del Sol, cuisine authentique et acces facile a la region de Axarquia.",
    intro: "Torre del Mar estauthentique ville balneaire de la Axarquia, adoree des familles espagnoles et d'un nombre croissant de visiteurs internationaux qui apprecient son caractere mediterraneen genuinement authentique, ses longues plages de sable et sa cuisine locale exceptionnelle. Nos locations de vacances a Torre del Mar offrent un excellent rapport qualite-prix et un vrai gout de la vie andalouse du quotidien.",
    secciones: [
      {
        h2: "Locations de Vacances a Torre del Mar - Vie Mediterraneenne Authentique",
        parrafos: [
          "Torre del Mar est la station balneaire de Velez-Malaga, la capitale de la region de la Axarquia, et elle conserve un caractere espagnol merveilleusement authentique qui attire de plus en plus les visiteurs recherchant une alternative aux stations balneaires plus commercialisees.",
          "Nos locations de vacances a Torre del Mar offrent un excellent rapport qualite-prix. Appartements et maisons de ville fournissent d'excellentes bases pour explorer non seulement les plages mais aussi le splendide arriere-pays de l'Axarquia avec ses villages historiques et ses plantations subtropicales."
        ],
        listaCaracteristicas: [
          "Longue plage de sable s'etendant sur plusieurs kilometres",
          "Excellents restaurants de fruits de mer traditionnels sur le front de mer",
          "Porte d'entree de la region de l'Axarquia et de ses villages interieurs",
          "Atmosphere espagnole authentique sans les foules touristiques",
          "Marches locaux reguliers et festivals traditionnels andalous",
          "55 kilometres de l'aeroport de Malaga via l'autoroute A-7"
        ]
      },
      {
        h2: "Plages et Vie sur le Front de Mer a Torre del Mar",
        parrafos: [
          "La plage de Torre del Mar s'etend sur plusieurs kilometres de sable fin sombre, typique de l'est de la Costa del Sol. La baie abritee cree des conditions de baignade calmes ideales pour les familles avec enfants. La plage est bien servie avec des locations de transats, des chiringuitos (bars de plage) et des sports nautiques.",
          "Le Paseo Maritimo, la longue promenade du front de mer, est le coeur de la vie sociale a Torre del Mar. Borde de palmiers, de restaurants et de bars, c'est l'endroit parfait pour la traditionnelle promenade espagnole du soir. Le marche hebdomadaire le long de la promenade est une institution locale coloree."
        ]
      },
      {
        h2: "Explorer la Region de l'Axarquia depuis Torre del Mar",
        parrafos: [
          "Le plus grand atout de Torre del Mar comme base de vacances est sa position de porte d'entree vers la spectaculaire region de l'Axarquia. Les villages interieurs de Competa, Frigiliana et Canillas de Albaida, perches sur des collines parmi les vignobles et les jardins subtropicaux, offrent certaines des experiences andalouses les plus authentiques de toute la cote.",
          "L'Axarquia est renommee pour sa production vinicole, notamment les vins Moscatel doux produits dans la region depuis des siecles. La cuisine locale est exceptionnelle avec des plats traditionnels comme l'ajoblanco (soupe froide a l'ail) et les celebres espetos de sardinas (sardines a la broche) cuites sur des feux de bois sur la plage."
        ]
      }
    ],
    faqs: [
      {
        pregunta: "Quelle est la meilleure periode pour visiter Torre del Mar?",
        respuesta: "De juin a septembre est ideal pour les vacances a la plage, avec des temperatures entre 25 et 35 degres et un soleil garanti. Le printemps et l'automne offrent un temps agreable pour explorer la region de l'Axarquia avec moins de touristes."
      },
      {
        pregunta: "Quels equipements sont inclus dans les locations de Torre del Mar?",
        respuesta: "La plupart des locations incluent WiFi, climatisation, cuisine entierement equipee, linge de lit et serviettes. De nombreuses proprietes ont des terrasses ou balcons, certains avec vue sur la mer. Le parking est souvent disponible et les piscines communes sont frequentes dans les residences."
      },
      {
        pregunta: "A quelle distance se trouve l'aeroport de Malaga de Torre del Mar?",
        respuesta: "Torre del Mar se trouve a environ 40 kilometres a l'est de l'aeroport de Malaga, soit 35 a 40 minutes via l'autoroute A-7. Des services de bus ALSA reguliers relient Malaga a Torre del Mar tout au long de la journee. La location de voiture est recommandee pour explorer la region de l'Axarquia."
      }
    ]
  }
,
  "torremolinos": {
      "seo_title": "Location Appartement Torremolinos - Vacances Costa del Sol",
      "seo_description": "Louez votre appartement a Torremolinos pres de la plage. Proche aeroport de Malaga, plages Pavillon Bleu et meilleur rapport qualite-prix.",
      "intro": "Torremolinos est le pionnier du tourisme sur la Costa del Sol et reste une destination de vacances complete. A seulement 8 km de aeroport de Malaga, il combine de vastes plages avec un centre anime. La Carihuela, ancien quartier de pecheurs, conserve son charme authentique avec des chiringuitos servant les meilleurs espetos de sardines de la province.",
      "secciones": [
          {
              "h2": "Pourquoi choisir Torremolinos",
              "parrafos": [
                  "Emplacement imbattable a quelques minutes de aeroport et du centre de Malaga. 7 km de cote avec Pavillon Bleu.",
                  "Plus de 300 jours de soleil. Temperatures moyennes de 19 degres toute annee."
              ],
              "subsecciones": [
                  {
                      "h3": "La Carihuela : quartier de pecheurs",
                      "texto": "Coeur gastronomique de Torremolinos. Chiringuitos avec espetos de sardines, friture de Malaga et paella."
                  },
                  {
                      "h3": "Plages Pavillon Bleu",
                      "texto": "Du Bajondillo a Los Alamos, vastes plages de sable dore avec services complets et Pavillon Bleu."
                  }
              ]
          },
          {
              "h2": "Hebergement a Torremolinos",
              "parrafos": [
                  "Grande variete appartements vacances a prix plus abordables que le reste de la cote."
              ],
              "listaCaracteristicas": [
                  "Appartements en bord de mer au Bajondillo",
                  "Appartements familiaux avec piscine",
                  "Studios modernes pres de la gare",
                  "Attiques avec terrasse panoramique",
                  "Logements economiques longue duree",
                  "Appartements acceptant les animaux"
              ],
              "subsecciones": [
                  {
                      "h3": "Equipements",
                      "texto": "WiFi, climatisation, cuisine equipee, linge de lit. Parking, piscine et terrasse dans beaucoup de logements."
                  }
              ]
          },
          {
              "h2": "Que faire a Torremolinos",
              "parrafos": [
                  "Parc aquatique Aqualand en famille. Jardin Botanique Molino de Inca.",
                  "Vie nocturne parmi les plus animees de la Costa del Sol."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomie",
                      "texto": "Chiringuitos de La Carihuela : espetos de sardines, friture de Malaga, gazpacho et ajoblanco."
                  },
                  {
                      "h3": "Excursions",
                      "texto": "Malaga centre 15 min en train. Marbella 30 min. Ronda, Antequera et Caminito del Rey."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Meilleure periode pour Torremolinos?",
              "respuesta": "Juin-septembre pour la plage. Printemps et automne avec prix reduits. Hiver doux a 16 degres."
          },
          {
              "pregunta": "Comment arriver depuis aeroport?",
              "respuesta": "A 8 km. Train de banlieue en 8 minutes."
          },
          {
              "pregunta": "Adapte aux familles?",
              "respuesta": "Oui. Plages securisees, Aqualand, appartements avec piscine."
          }
      ]
  },
  "fuengirola": {
      "seo_title": "Location Fuengirola pour Familles - Appartements Costa del Sol",
      "seo_description": "Location vacances a Fuengirola ideale pour les familles. 8 km de plage, Bioparc, chateau Sohail et divertissements familiaux.",
      "intro": "Fuengirola est la destination familiale par excellence de la Costa del Sol. 8 km de plages, Bioparc, Chateau Sohail et front de mer anime. Cette ville cosmopolite attire les familles de toute Europe.",
      "secciones": [
          {
              "h2": "Pourquoi choisir Fuengirola en famille",
              "parrafos": [
                  "Plage, culture et divertissement familial. Eaux peu profondes ideales pour les enfants.",
                  "Train de banlieue a Malaga et aeroport en 40 minutes. Supermarches internationaux."
              ],
              "subsecciones": [
                  {
                      "h3": "Plage de Fuengirola : 8 km de sable",
                      "texto": "Los Boliches et Fuengirola sont les plus populaires avec services complets et chiringuitos."
                  },
                  {
                      "h3": "Chateau Sohail",
                      "texto": "Forteresse phenicienne-arabe couronnant la ville. Concerts et festivals en ete."
                  }
              ]
          },
          {
              "h2": "Hebergement a Fuengirola",
              "parrafos": [
                  "Appartements pour tous les budgets. Studios economiques et appartements familiaux."
              ],
              "listaCaracteristicas": [
                  "Front de mer sur le paseo",
                  "Appartements familiaux avec piscine",
                  "Studios pres de la gare",
                  "Maisons mitoyennes a Mijas Costa",
                  "Attiques avec solarium",
                  "Logements adaptes PMR"
              ],
              "subsecciones": [
                  {
                      "h3": "Services familiaux",
                      "texto": "Lits bebe, chaises hautes, aires de jeux et piscines adaptees."
                  }
              ]
          },
          {
              "h2": "Activites familiales a Fuengirola",
              "parrafos": [
                  "Bioparc : zoo immersif avec plus de 100 especes.",
                  "Marche du mardi parmi les plus grands de la cote. Port de plaisance."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomie multiculturelle",
                      "texto": "Chiringuitos, pubs britanniques, restaurants scandinaves et cuisine asiatique. Tapas du centre."
                  },
                  {
                      "h3": "Excursions",
                      "texto": "Mijas village 10 min. Malaga 30 min en train. Marbella 20 min. Selwo Aventura."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Meilleure zone pour familles?",
              "respuesta": "Los Boliches et Carvajal. Plages calmes et piscines communautaires."
          },
          {
              "pregunta": "Transport depuis aeroport?",
              "respuesta": "30 km. Train toutes les 20 min, trajet 40 minutes."
          },
          {
              "pregunta": "Quand il pleut?",
              "respuesta": "Bioparc couvert. Centre commercial Miramar. Seulement 45 jours de pluie par an."
          }
      ]
  },
  "benalmadena": {
      "seo_title": "Location Benalmadena avec Vue sur le Port - Costa del Sol",
      "seo_description": "Location vacances a Benalmadena pres du port prime mondial. Plages Pavillon Bleu, Tivoli World, telepherique et Sea Life.",
      "intro": "Benalmadena est une des communes les plus polyvalentes de la Costa del Sol. Trois noyaux : Costa, Pueblo et Arroyo de la Miel. Port de plaisance prime meilleur au monde. Tivoli World, telepherique et Sea Life Aquarium.",
      "secciones": [
          {
              "h2": "Pourquoi choisir Benalmadena",
              "parrafos": [
                  "Plage, montagne et divertissement a quelques kilometres. Puerto Marina prime mondial.",
                  "Train de banlieue a Malaga. A 20 minutes de aeroport."
              ],
              "subsecciones": [
                  {
                      "h3": "Puerto Marina",
                      "texto": "Restaurants internationaux, bars live, boutiques et aquarium. Excursions pour voir les dauphins."
                  },
                  {
                      "h3": "Plages",
                      "texto": "9 km de cote. Bil-Bil avec chateau arabe. Malapesquera avec Pavillon Bleu."
                  }
              ]
          },
          {
              "h2": "Hebergement a Benalmadena",
              "parrafos": [
                  "Appartements pour tous les profils. Vues sur le port ou maisons dans le village."
              ],
              "listaCaracteristicas": [
                  "Vue sur Puerto Marina",
                  "Premiere ligne de plage",
                  "Maisons a Benalmadena Pueblo",
                  "Attiques a Arroyo de la Miel",
                  "Appartements familiaux avec piscine",
                  "Studios pres du telepherique"
              ],
              "subsecciones": [
                  {
                      "h3": "Trois noyaux, trois experiences",
                      "texto": "Costa pour la mer. Arroyo pour les services. Pueblo pour la tranquillite."
                  }
              ]
          },
          {
              "h2": "Activites familiales",
              "parrafos": [
                  "Tivoli World, Sea Life Aquarium et telepherique. Plus attractions que tout autre commune.",
                  "Chateau de Colomares : monument unique."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomie",
                      "texto": "Internationale au port. Andalouse au Pueblo. Espetos a la plage."
                  },
                  {
                      "h3": "Excursions",
                      "texto": "Malaga 20 min en train. Mijas 15 min. Marbella 30 min. Caminito del Rey 1h."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Meilleure zone?",
              "respuesta": "Costa pour plage et port. Arroyo pour transport. Pueblo pour vues et calme."
          },
          {
              "pregunta": "Depuis aeroport?",
              "respuesta": "15 km. Train en 15 minutes."
          },
          {
              "pregunta": "Pour les enfants?",
              "respuesta": "Tivoli World, Sea Life, telepherique, dauphins et plages."
          }
      ]
  },
  "estepona": {
      "seo_title": "Location Villa de Luxe Estepona - Costa del Sol Exclusive",
      "seo_description": "Villas de luxe a Estepona, le Jardin de la Costa del Sol. Plages paisibles, fresques artistiques et golf de championship.",
      "intro": "Estepona est la destination de luxe emergente sur la Costa del Sol occidentale. Connue comme le Jardin de la Costa del Sol pour ses orchidees et ses fresques murales artistiques. Urbanisations exclusives avec golf pour voyageurs exigeants.",
      "secciones": [
          {
              "h2": "Pourquoi choisir Estepona pour le luxe",
              "parrafos": [
                  "Authenticite andalouse avec infrastructure moderne. Plus de 50 fresques murales et Route des Orchidees.",
                  "Playa del Cristo : crique naturelle aux eaux calmes ideales pour les familles."
              ],
              "subsecciones": [
                  {
                      "h3": "Centre historique et fresques",
                      "texto": "Galerie a ciel ouvert avec 50 fresques internationales. Route des Fresques incontournable."
                  },
                  {
                      "h3": "Plages et nature",
                      "texto": "21 km de cote. Playa del Cristo comme crique protegee. Sierra Bermeja en toile de fond."
                  }
              ]
          },
          {
              "h2": "Villas de luxe a Estepona",
              "parrafos": [
                  "Villas haut de gamme a La Resina, Atalaya et Cancelada. Piscine privee et vues."
              ],
              "listaCaracteristicas": [
                  "Villas avec infinity pool",
                  "Appartements en bord de mer",
                  "Maisons mitoyennes sur golf",
                  "Attiques exclusifs au port",
                  "Fincas rustiques andalouses",
                  "Proprietes contemporaines domotisees"
              ],
              "subsecciones": [
                  {
                      "h3": "Residences de luxe",
                      "texto": "Securite 24h, golf, spa. La Resina, Atalaya et Los Flamingos."
                  }
              ]
          },
          {
              "h2": "Que faire a Estepona",
              "parrafos": [
                  "Orchidarium avec 5000 orchidees unique en Europe. Selwo Aventura safari. Golf de championship.",
                  "Port de plaisance avec peche, dauphins et voile. Sierra Bermeja pour la randonnee."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomie",
                      "texto": "Port de peche actif. Espetos, restaurants gastronomiques et tabernas traditionnelles."
                  },
                  {
                      "h3": "Excursions",
                      "texto": "Marbella 20 min. Gibraltar 45 min. Ronda 1h. Casares 20 min."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Estepona vs Marbella?",
              "respuesta": "Plus calme et authentique. Meilleurs prix. Marbella pour Puerto Banus."
          },
          {
              "pregunta": "Depuis aeroport?",
              "respuesta": "80 km, 50 min sur AP-7. Bus Avanza directs."
          },
          {
              "pregunta": "Pour le golf?",
              "respuesta": "Atalaya, El Paraiso, Estepona Golf, Valle Romano. Toute saison."
          }
      ]
  },
  "malaga": {
      "seo_title": "Appartement Touristique Malaga Centre - Location Vacances",
      "seo_description": "Louez votre appartement touristique au centre de Malaga. Musees, gastronomie, plages urbaines et la meilleure vie culturelle de la Costa del Sol.",
      "intro": "Malaga est la capitale de la Costa del Sol et une des villes touristiques a la croissance la plus rapide en Europe. Centre historique avec Musee Picasso, Centre Pompidou, Alcazaba et Theatre Romain. Plages urbaines de La Malagueta et Pedregalejo avec chiringuitos et promenade.",
      "secciones": [
          {
              "h2": "Pourquoi choisir Malaga capitale",
              "parrafos": [
                  "Plus de 30 musees, gastronomie en expansion et centre historique pietonnier.",
                  "Vivre comme un local : calle Larios, Marche Atarazanas, La Malagueta, espetos a Pedregalejo."
              ],
              "subsecciones": [
                  {
                      "h3": "Centre historique et musees",
                      "texto": "Picasso, Pompidou, Carmen Thyssen, CAC. Alcazaba et Gibralfaro avec vues panoramiques."
                  },
                  {
                      "h3": "Plages urbaines et Pedregalejo",
                      "texto": "La Malagueta a 10 min du centre. Pedregalejo avec chiringuitos authentiques et espetos face a la mer."
                  }
              ]
          },
          {
              "h2": "Hebergement touristique a Malaga",
              "parrafos": [
                  "Quartiers differencies : centre historique, Soho, Pedregalejo et Port."
              ],
              "listaCaracteristicas": [
                  "Centre historique pres de calle Larios",
                  "Vues sur le port et Mediterranee",
                  "Lofts dans le quartier Soho",
                  "Maisons a Pedregalejo pres de la plage",
                  "Attiques avec vue sur Alcazaba",
                  "Studios pres de la gare Maria Zambrano"
              ],
              "subsecciones": [
                  {
                      "h3": "Quartiers avec caractere",
                      "texto": "Centre anime et culturel. Soho avec art de rue. Pedregalejo calme et maritime."
                  }
              ]
          },
          {
              "h2": "Que faire a Malaga",
              "parrafos": [
                  "Alcazaba, musees, Atarazanas, Muelle Uno, La Malagueta, espetos a Pedregalejo. Des semaines de programmes.",
                  "Caminito del Rey a 45 min. Montes de Malaga avec randonnee."
              ],
              "subsecciones": [
                  {
                      "h3": "Gastronomie malaguenia",
                      "texto": "Marche Atarazanas : fruits de mer, fruits tropicaux. Tapas : anchois au vinaigre, campero. Espetos de Pedregalejo."
                  },
                  {
                      "h3": "Excursions",
                      "texto": "Caminito 45 min. Antequera 40 min. Nerja 50 min. Ronda 1h30. AVE a Madrid 2h30."
                  }
              ]
          }
      ],
      "faqs": [
          {
              "pregunta": "Meilleure zone a Malaga?",
              "respuesta": "Centre historique pour musees. Pedregalejo pour plage. Soho pour ambiance alternative."
          },
          {
              "pregunta": "Sans voiture?",
              "respuesta": "Centre compact et pietonnier. Bus, metro et trains de banlieue."
          },
          {
              "pregunta": "Quels musees?",
              "respuesta": "Picasso, Pompidou, Carmen Thyssen, CAC gratuit. Plus de 30 musees."
          }
      ]
  }
};

// --- Main export -------------------------------------------------------
export function getContenidoZona(slug: string, nombre: string, lang: "es" | "en" | "fr" = "es"): ContenidoZona {
  if (lang === "en") return CONTENIDO_ZONAS_EN[slug] || contenidoGenericoEN(nombre);
  if (lang === "fr") return CONTENIDO_ZONAS_FR[slug] || contenidoGenericoFR(nombre);
  return CONTENIDO_ZONAS[slug] || contenidoGenerico(nombre);
}
