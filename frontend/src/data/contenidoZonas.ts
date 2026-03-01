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
    intro: "Marbella is synonymous with luxury on the Costa del Sol. Renowned for its glamorous Puerto Banus marina, pristine Blue Flag beaches and world-class golf courses, this Mediterranean jewel attracts discerning travellers from across Europe and beyond. Our holiday rentals in Marbella place you at the heart of this exceptional destination, offering everything from chic beachfront apartments in the historic centre to exclusive villas on the prestigious Golden Mile and Nueva Andalucia.",
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
};

// --- FR specific content -----------------------------------------------
const CONTENIDO_ZONAS_FR: Record<string, ContenidoZona> = {
  "marbella": {
    intro: "Marbella est synonyme de luxe sur la Costa del Sol. Reconnue pour sa marina glamour de Puerto Banus, ses plages immaculees Pavillon Bleu et ses terrains de golf de classe mondiale, ce joyau mediterraneen attire des voyageurs exigeants de toute l'Europe. Nos locations de vacances a Marbella vous placent au coeur de cette destination exceptionnelle, offrant tout, des appartements en bord de mer dans le centre historique aux villas exclusives sur la prestigieuse Milla de Oro.",
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
    intro: "Nerja est l'une des destinations les plus aimees de la Costa del Sol, un charmant village blanchi a la chaux perche au-dessus de la Mediterranee avec des falaises dramatiques et certaines des plus belles plages d'Andalousie. Nos locations de vacances a Nerja offrent un caractere andalou authentique combine au confort moderne, vous placant au coeur de cette ville magique ou le celebre Balcon de Europa offre des vues panoramiques sur la mer.",
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
    intro: "Torre del Mar est une authentique ville balneaire de la Axarquia, adoree des familles espagnoles et d'un nombre croissant de visiteurs internationaux qui apprecient son caractere mediterraneen genuinement authentique, ses longues plages de sable et sa cuisine locale exceptionnelle. Nos locations de vacances a Torre del Mar offrent un excellent rapport qualite-prix et un vrai gout de la vie andalouse du quotidien.",
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
};

// --- Main export -------------------------------------------------------
export function getContenidoZona(slug: string, nombre: string, lang: "es" | "en" | "fr" = "es"): ContenidoZona {
  if (lang === "en") return CONTENIDO_ZONAS_EN[slug] || contenidoGenericoEN(nombre);
  if (lang === "fr") return CONTENIDO_ZONAS_FR[slug] || contenidoGenericoFR(nombre);
  return CONTENIDO_ZONAS[slug] || contenidoGenerico(nombre);
}
