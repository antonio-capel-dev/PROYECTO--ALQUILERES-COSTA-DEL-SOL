/**
 * FUENTE DE VERDAD — Contenido SEO enriquecido por zona.
 * Usado en /zona/[slug].astro para generar texto de calidad,
 * FAQs por zona y datos locales para el enlazado interno.
 */

export type ZonaContenido = {
  slug: string;
  precioDesde: number; // precio orientativo €/noche para el title CTR
  descripcion: {
    intro: string;
    cuerpo: string;
    cierre: string;
  };
  faqs: { pregunta: string; respuesta: string }[];
  datos: {
    playas: string[];
    transporte: string;
    ventajas: string[];
  };
  verTambien: { texto: string; href: string }[]; // enlaces internos naturales en texto
};

export const ZONAS_CONTENIDO: Record<string, ZonaContenido> = {
  marbella: {
    slug: "marbella",
    precioDesde: 95,
    descripcion: {
      intro:
        "Marbella es, sin duda, el destino de referencia en la Costa del Sol y uno de los municipios más exclusivos de toda España. Con sus 27 kilómetros de litoral mediterráneo, el término municipal abarca desde el glamuroso Puerto Banús hasta la tranquilidad de Elviria, pasando por el encantador Casco Antiguo repleto de naranjos y calles blancas. Alquilar en Marbella significa acceder a un estilo de vida privilegiado donde el lujo, la gastronomía y el ocio se fusionan con una naturaleza exuberante.",
      cuerpo:
        "La ciudad se articula en barrios muy diferenciados que responden a distintos perfiles de visitante. Puerto Banús, con su puerto deportivo repleto de yates y sus boutiques de alta costura, atrae a quienes buscan vivir el lujo en primera persona. Nueva Andalucía, conocida como el 'Valle del Golf', concentra algunos de los campos de golf más prestigiosos de Europa junto a villas y adosados de alto standing perfectos para familias. La Milla de Oro, el eje entre el centro urbano y San Pedro Alcántara, reúne algunas de las propiedades más codiciadas, con villas de arquitectura contemporánea a pocos metros del paseo marítimo. El Casco Antiguo, por su parte, ofrece apartamentos con encanto en una zona peatonal donde la vida discurre entre terrazas, galerías de arte y plazas sombreadas. Para estancias más largas o perfil residencial, San Pedro Alcántara y Estepona ofrecen una Marbella más auténtica y familiar, con mercados semanales y precios más accesibles sin renunciar a las playas de Bandera Azul.",
      cierre:
        "Elegir un alquiler vacacional en Marbella es apostar por una experiencia completa: sol garantizado más de 320 días al año, gastronomía de primer nivel con restaurantes de cocina mediterránea, norteafricana y asiática fusión, y una oferta de ocio inigualable que va desde los beach clubs más exclusivos hasta rutas de senderismo por la Sierra Blanca. Tanto si buscas una semana de descanso familiar como una estancia de teletrabajo al sol, Marbella tiene la propiedad perfecta esperándote.",
    },
    faqs: [
      {
        pregunta: "¿Cuál es la mejor zona de Marbella para alquilar con familia?",
        respuesta:
          "Para familias, las mejores zonas son Elviria, Nueva Andalucía y San Pedro Alcántara. Estas áreas ofrecen urbanizaciones tranquilas con piscina comunitaria, proximidad a colegios internacionales y supermercados, y playas de Bandera Azul menos masificadas que las del centro.",
      },
      {
        pregunta: "¿En qué época es más barato alquilar en Marbella?",
        respuesta:
          "Los precios más competitivos se encuentran entre noviembre y marzo (temporada baja), cuando el clima sigue siendo muy agradable con temperaturas que rondan los 17-20ºC. Abril-junio y septiembre-octubre ofrecen el equilibrio ideal entre precio, clima y ocupación.",
      },
      {
        pregunta: "¿Qué incluyen normalmente los alquileres vacacionales en Marbella?",
        respuesta:
          "La mayoría de apartamentos y villas incluyen WiFi de alta velocidad, aire acondicionado, ropa de cama, toallas, acceso a piscina y parking. Los alquileres de lujo suelen añadir limpieza diaria, chef privado opcional, traslados y servicio de conserjería 24h.",
      },
      {
        pregunta: "¿Es fácil moverse por Marbella sin coche?",
        respuesta:
          "El centro de Marbella y Puerto Banús son bastante accesibles a pie o en bicicleta. La línea de bus M-221 conecta el casco urbano con Puerto Banús y San Pedro. Para zonas residenciales alejadas como Nueva Andalucía o Elviria se recomienda disponer de vehículo propio.",
      },
      {
        pregunta: "¿Cuánto cuesta de media alquilar un apartamento en Marbella?",
        respuesta:
          "En temporada media, un apartamento de 2 habitaciones en el centro o cerca de la playa oscila entre 80 y 150 € por noche. Las villas con piscina privada en zonas prime pueden superar los 500 € noche en julio y agosto.",
      },
    ],
    datos: {
      playas: ["Playa de la Fontanilla", "Playa de Venus", "Playa del Cable", "Playa de Río Verde"],
      transporte: "Bus M-221 (centro-Puerto Banús-San Pedro), taxi, VTC. Aeropuerto Málaga a 55 km.",
      ventajas: [
        "320+ días de sol al año",
        "15+ campos de golf en radio de 10 km",
        "Colegios internacionales bilingües",
        "Puerto Banús a 7 km del centro",
        "Sierra Blanca para senderismo y MTB",
      ],
    },
    verTambien: [
      { texto: "alquileres de lujo en Marbella", href: "/alquiler-marbella" },
      { texto: "Marbella con piscina para familias", href: "/marbella-familias" },
      { texto: "apartamentos en Benalmádena", href: "/zona/benalmadena" },
    ],
  },

  malaga: {
    slug: "malaga",
    precioDesde: 65,
    descripcion: {
      intro:
        "Málaga Capital ha experimentado en la última década una transformación extraordinaria que la ha convertido en uno de los destinos más deseados de Europa. Elegida repetidamente como mejor ciudad para vivir por expatriados y nómadas digitales, la capital de la Costa del Sol combina a la perfección su rica herencia cultural —cuna de Picasso— con una vibrante oferta tecnológica, una gastronomía basada en el producto local y unas playas urbanas de primer nivel.",
      cuerpo:
        "El Centro Histórico concentra la mayor densidad de museos por metro cuadrado de España, con el Museo Picasso, el Museo Carmen Thyssen, el Centre Pompidou y el Museo de Arte Contemporáneo entre otros. Vivir aquí significa despertar con el aroma del café de puchero y los espetos de sardinas en la playa de La Malagueta, el barrio más animado y soleado de la ciudad costera. El barrio de Teatinos es la opción preferida de estudiantes universitarios y jóvenes profesionales, con excelentes conexiones de metro a la Universidad de Málaga y precios más contenidos. El Puerto de Málaga, completamente renovado, es hoy un espacio de ocio con el Muelle Uno, restaurantes de diseño y el Museo Automovilístico. La zona de El Palo y Pedregalejo ofrece la Málaga más auténtica, con el chiringuito como institución social y apartamentos frente al mar a precios razonables.",
      cierre:
        "Alquilar en Málaga Capital es conectar con una ciudad que no para: festivales de cine, música, arte callejero, gastronomía de mercado y una climatología envidiable con más de 300 días de sol. La nueva línea de metro que conecta el aeropuerto con el centro en 12 minutos y la futura estación de AVE en el Puerto harán de Málaga un hub de movilidad europeo sin parangón.",
    },
    faqs: [
      {
        pregunta: "¿Qué barrio de Málaga es mejor para alquilar por primera vez?",
        respuesta:
          "El Centro Histórico o La Malagueta son ideales para turistas que quieren vivir la esencia de la ciudad. Para estancias largas o trabajo remoto, el barrio de Teatinos o El Palo ofrecen mejor relación calidad-precio con todas las comodidades.",
      },
      {
        pregunta: "¿Tiene playa Málaga Capital?",
        respuesta:
          "Sí. Málaga cuenta con varias playas urbanas: La Malagueta (la más céntrica), El Palo, Pedregalejo y La Caleta. Todas son accesibles en transporte público desde el centro en menos de 20 minutos.",
      },
      {
        pregunta: "¿Cómo llegar al aeropuerto desde Málaga ciudad?",
        respuesta:
          "El aeropuerto de Málaga-Costa del Sol está a solo 12 minutos en metro (línea 1) desde el centro de la ciudad, con frecuencias de paso cada 20 minutos. También hay taxi (aprox. 25€) y autobús de línea.",
      },
      {
        pregunta: "¿Es caro alquilar en Málaga Capital?",
        respuesta:
          "Málaga sigue siendo más asequible que Madrid o Barcelona. Un apartamento de 1 habitación en el centro ronda los 800-1.100 € mensuales en alquiler de larga estancia. En alquiler vacacional, la noche desde 60€ para estudio o apartamento en temporada media.",
      },
      {
        pregunta: "¿Qué hacer con niños en Málaga Capital?",
        respuesta:
          "Málaga es muy familiar: el Parque de Málaga, el Museo Interactivo de la Música, el acuario, las playas tranquilas de Pedregalejo y las rutas en bici por el paseo marítimo son actividades perfectas para los más pequeños.",
      },
    ],
    datos: {
      playas: ["La Malagueta", "El Palo", "Pedregalejo", "La Caleta"],
      transporte: "Metro línea 1 (aeropuerto-centro), EMT bus urbano, Cercanías RENFE. AVE a Madrid.",
      ventajas: [
        "Aeropuerto a 12 min en metro",
        "Hub tecnológico (Google, Vodafone, Accenture)",
        "15 museos en el centro histórico",
        "Puerto renovado con Muelle Uno",
        "Universidad con 38.000 estudiantes",
      ],
    },
    verTambien: [
      { texto: "alquileres en Málaga capital", href: "/alquiler-malaga" },
      { texto: "apartamentos en Torremolinos cerca del metro", href: "/zona/torremolinos" },
      { texto: "zonas con playa en la Costa del Sol", href: "/zona/benalmadena" },
    ],
  },

  benalmadena: {
    slug: "benalmadena",
    precioDesde: 70,
    descripcion: {
      intro:
        "Benalmádena es uno de los municipios más completos de la Costa del Sol: combina el pintoresco pueblo blanco de Benalmádena Pueblo en la sierra con la animada Costa y el moderno Puerto Marina, el mayor puerto deportivo de Andalucía. Esta diversidad en apenas 10 kilómetros de costa convierte a Benalmádena en el destino perfecto para quienes quieren tenerlo todo sin desplazarse demasiado.",
      cuerpo:
        "Benalmádena Costa concentra la mayoría de los complejos residenciales y turísticos, con una amplia oferta de apartamentos a primera y segunda línea de playa dotados de piscinas comunitarias, zonas ajardinadas y vistas al Mediterráneo. El teleférico del Calamorro, que sube hasta los 769 metros de altitud, ofrece panorámicas impresionantes de la Costa del Sol y del norte de África en días despejados. El Puerto Marina es un núcleo de ocio y restauración con ambiente cosmopolita, donde arquitectura colorista y ambiente festivo atraen a visitantes de toda Europa. Arroyo de la Miel, el núcleo urbano más accesible, dispone de todo tipo de servicios: mercado municipal, colegios, centro de salud y la estación de Cercanías que conecta en 20 minutos con Málaga Capital.",
      cierre:
        "Alquilar en Benalmádena significa disfrutar de una ubicación estratégica entre Málaga y Torremolinos, con excelentes conexiones en tren de cercanías hacia ambas ciudades y hacia el aeropuerto internacional. Ideal tanto para escapadas de una semana como para teleworkers que buscan un base-camp mediterráneo con todos los servicios.",
    },
    faqs: [
      {
        pregunta: "¿Cuánto tarda el tren de Benalmádena a Málaga?",
        respuesta:
          "Desde la estación de Arroyo de la Miel (Cercanías C-1) se tarda entre 20 y 25 minutos hasta la estación de Málaga María Zambrano, con trenes cada 20-30 minutos.",
      },
      {
        pregunta: "¿Tiene buen ambiente nocturno Benalmádena?",
        respuesta:
          "Sí, especialmente el Puerto Marina concentra una animada vida nocturna con bares, discotecas y restaurantes abiertos hasta altas horas. Benalmádena Costa también tiene zona de pubs a lo largo del paseo marítimo.",
      },
      {
        pregunta: "¿Qué playas tiene Benalmádena?",
        respuesta:
          "Las principales son Playa de Benalmádena (amplia y bien equipada), Playa de Torrebermeja, Playa de Santa Ana y Playa del Bil-Bil. La mayoría cuentan con Bandera Azul, servicios de hamacas y chiringuitos.",
      },
      {
        pregunta: "¿Es Benalmádena buena opción para alquilar con niños?",
        respuesta:
          "Excelente. El Parque de Atracciones Tivoli World, el Teleférico del Calamorro, el Sea Life Benalmádena y las playas amplias y seguras hacen de Benalmádena uno de los destinos más completos de la Costa del Sol para familias.",
      },
      {
        pregunta: "¿Puedo ir de excursión desde Benalmádena a otros pueblos?",
        respuesta:
          "Desde Benalmádena es fácil visitar Torremolinos (10 min en tren), Fuengirola (20 min en tren), Marbella (45 min en coche) y Málaga Capital (25 min en tren o cercanías). También está cerca de la ruta de los pueblos blancos andaluces.",
      },
    ],
    datos: {
      playas: ["Playa de Benalmádena", "Playa de Torrebermeja", "Playa de Santa Ana", "Playa del Bil-Bil"],
      transporte: "Cercanías C-1 (Málaga-Fuengirola), bus M-110, taxi. Aeropuerto a 15 km.",
      ventajas: [
        "Puerto Marina: el mayor de Andalucía",
        "Teleférico del Calamorro",
        "Cercanías a Málaga en 20 min",
        "Parque Tivoli World para familias",
        "Precios más contenidos que Marbella",
      ],
    },
    verTambien: [
      { texto: "apartamentos en Torremolinos a pie de playa", href: "/zona/torremolinos" },
      { texto: "alquileres en Fuengirola para familias", href: "/zona/fuengirola" },
      { texto: "pisos en Málaga capital con metro", href: "/alquiler-malaga" },
    ],
  },

  torremolinos: {
    slug: "torremolinos",
    precioDesde: 60,
    descripcion: {
      intro:
        "Torremolinos fue la primera ciudad de la Costa del Sol en abrirse al turismo internacional en los años 60, y hoy sigue siendo uno de los destinos más vibrantes y acogedores del litoral malagueño. Con 7 playas de arena fina que suman más de 6 kilómetros de litoral, una oferta gastronómica diversa que va del chiringuito tradicional al restaurante de cocina fusión, y un ambiente multicultural e inclusivo, Torremolinos es mucho más que su imagen de turismo de masas.",
      cuerpo:
        "La Carihuela es el barrio pesquero por excelencia, donde todavía se pueden ver las barcas de los pescadores a primera hora de la mañana junto a los modernos apartamentos frente al mar. Es la zona más auténtica y la preferida por quienes buscan la esencia mediterránea con precios razonables. El centro urbano de Torremolinos, con la peatonal Calle San Miguel, ofrece una intensa vida comercial y gastronómica con tiendas, bares de tapas y heladerías. El Bajondillo es la playa urbana por excelencia, ideal para quienes buscan animación, servicios de playa completos y acceso directo desde el centro. La zona de Playamar y Los Álamos, más tranquila y residencial, atrae a familias y a quienes buscan largas estancias con todas las comodidades.",
      cierre:
        "La principal ventaja competitiva de Torremolinos es su excelente relación calidad-precio: apartamentos bien equipados, a pocos minutos de la playa, con acceso en metro o cercanías al aeropuerto de Málaga (solo 3 estaciones) y al centro de la capital. Un destino que ofrece sol, mar y autenticidad sin arruinar el presupuesto.",
    },
    faqs: [
      {
        pregunta: "¿Cuánto tarda el metro de Torremolinos al aeropuerto de Málaga?",
        respuesta:
          "El metro línea 1 conecta Torremolinos con el aeropuerto en aproximadamente 8-10 minutos (3 estaciones). Es una de las ventajas únicas de Torremolinos frente a otros destinos de la Costa del Sol.",
      },
      {
        pregunta: "¿Es Torremolinos un destino seguro para el colectivo LGBTQ+?",
        respuesta:
          "Sí. Torremolinos es reconocido como uno de los destinos más LGBTQ+ friendly de España, especialmente la zona de La Nogalera. El ambiente es muy abierto y tolerante durante todo el año.",
      },
      {
        pregunta: "¿Qué playas son las mejores en Torremolinos?",
        respuesta:
          "Las más populares son La Carihuela (ambiente local y auténtico), El Bajondillo (céntrica y animada) y Playamar (más tranquila y familiar). Todas tienen chiringuitos, servicio de hamacas y duchas.",
      },
      {
        pregunta: "¿Es Torremolinos barato para alquilar en verano?",
        respuesta:
          "En comparación con Marbella o Nerja, Torremolinos ofrece precios más competitivos. Un apartamento de 2 habitaciones en primera línea puede encontrarse desde 80-120€/noche en julio-agosto, significativamente menos que en otros puntos de la Costa del Sol.",
      },
      {
        pregunta: "¿Hay supermercados y servicios cerca de las playas de Torremolinos?",
        respuesta:
          "Sí, Torremolinos tiene una infraestructura urbana muy desarrollada. Mercadona, Lidl, Carrefour y múltiples comercios de proximidad están distribuidos por todo el municipio, muchos a distancia caminable de las playas principales.",
      },
    ],
    datos: {
      playas: ["La Carihuela", "El Bajondillo", "Playamar", "Los Álamos"],
      transporte: "Metro L1 (aeropuerto-centro Málaga), Cercanías C-1, bus M-110. Aeropuerto a 3 estaciones de metro.",
      ventajas: [
        "Metro directo al aeropuerto (8 min)",
        "6+ km de playas de arena fina",
        "Ambiente multicultural e inclusivo",
        "Precios competitivos todo el año",
        "Gastronomía diversa a buen precio",
      ],
    },
    verTambien: [
      { texto: "pisos en Málaga capital a 12 min en metro", href: "/alquiler-malaga" },
      { texto: "apartamentos en Benalmádena con Puerto Marina", href: "/zona/benalmadena" },
      { texto: "alquileres con piscina en Fuengirola", href: "/zona/fuengirola" },
    ],
  },

  fuengirola: {
    slug: "fuengirola",
    precioDesde: 65,
    descripcion: {
      intro:
        "Fuengirola es la ciudad más familiar de la Costa del Sol. Con 8 kilómetros de playas de Bandera Azul, un zoo de fama internacional, el Castillo Sohail y una comunidad de expatriados de más de 40 nacionalidades, Fuengirola ofrece todo lo necesario para una estancia cómoda, segura y repleta de actividades para todas las edades.",
      cuerpo:
        "El paseo marítimo de Fuengirola, con más de 7 kilómetros de longitud, es uno de los más largos de Andalucía y el eje vertebrador de la vida social de la ciudad. A lo largo de él se suceden restaurantes, bares de tapas, tiendas y servicios que hacen que moverse a pie o en bicicleta sea la opción preferida de residentes y visitantes. Los Boliches es el barrio más auténtico y residencial, preferido por expatriados de larga estancia por su ambiente tranquilo y servicios completos. El centro histórico, con la plaza de la Constitución como epicentro, conserva el carácter andaluz con mercado municipal, iglesia y terrazas concurridas. La zona de Torreblanca y El Castillo concentra las urbanizaciones más modernas con vistas privilegiadas al mar y a la sierra.",
      cierre:
        "La gran ventaja de Fuengirola es ser el nodo de comunicaciones de la Costa del Sol occidental: la Cercanías C-1 conecta en 40 minutos con el aeropuerto de Málaga, en 30 con Torremolinos y en 20 con Benalmádena. Es también el punto de partida de las rutas hacia Mijas Pueblo, una de las visitas obligadas de la provincia.",
    },
    faqs: [
      {
        pregunta: "¿Es Fuengirola buena para vivir todo el año como expatriado?",
        respuesta:
          "Muy buena. Fuengirola tiene una de las comunidades de expatriados más grandes de la Costa del Sol con más de 40 nacionalidades. Hay colegios internacionales (British, sueco, finlandés), servicios médicos en varios idiomas y una amplia red de comercios especializados.",
      },
      {
        pregunta: "¿Qué playas tiene Fuengirola y cómo son?",
        respuesta:
          "Las principales son Playa de Fuengirola (la más central y animada), Los Boliches (más tranquila y familiar), El Castillo y Santa Amalia. Todas tienen Bandera Azul, hamacas, duchas y varios chiringuitos.",
      },
      {
        pregunta: "¿Qué hacer en Fuengirola con niños?",
        respuesta:
          "El Bioparc Fuengirola es uno de los mejores zoos de España con concepto de inmersión en ecosistemas naturales. Además están las playas, el Castillo Sohail (con eventos culturales), el paseo marítimo en bici y las rutas a Mijas Pueblo.",
      },
      {
        pregunta: "¿Cuánto cuesta el tren de Fuengirola al aeropuerto?",
        respuesta:
          "El billete sencillo en Cercanías de Fuengirola al aeropuerto de Málaga cuesta alrededor de 2,50€ y el trayecto dura aproximadamente 40 minutos con paradas intermedias.",
      },
      {
        pregunta: "¿Hay mercadillo en Fuengirola?",
        respuesta:
          "Sí. El mercadillo de los martes en Fuengirola es uno de los más grandes y populares de la Costa del Sol, con productos frescos, ropa, artesanía y una enorme variedad de artículos de segunda mano.",
      },
    ],
    datos: {
      playas: ["Playa de Fuengirola", "Los Boliches", "El Castillo", "Santa Amalia"],
      transporte: "Cercanías C-1 (Málaga-Fuengirola terminal), bus M-120 y M-121. Aeropuerto a 40 min en tren.",
      ventajas: [
        "8 km de playas Bandera Azul",
        "Bioparc: mejor zoo de Andalucía",
        "40+ nacionalidades de expatriados",
        "Colegios internacionales",
        "Paseo marítimo de 7 km",
      ],
    },
    verTambien: [
      { texto: "apartamentos en Benalmádena con teleférico", href: "/zona/benalmadena" },
      { texto: "pisos en Torremolinos baratos cerca del metro", href: "/zona/torremolinos" },
      { texto: "villas de lujo en Marbella", href: "/alquiler-marbella" },
    ],
  },

  nerja: {
    slug: "nerja",
    precioDesde: 75,
    descripcion: {
      intro:
        "Nerja es el secreto mejor guardado de la Costa del Sol. Situada en el extremo oriental de la provincia de Málaga, a los pies de la Sierra de Almijara-Tejeda, esta joya mediterránea combina calas de aguas cristalinas con el famoso Balcón de Europa —uno de los miradores más espectaculares del país— y la impresionante Cueva de Nerja, declarada Bien de Interés Cultural.",
      cuerpo:
        "El casco urbano de Nerja conserva intacto el encanto del pueblo blanco andaluz: calles estrechas, casas encaladas, plazas sombreadas por naranjos y una arquitectura que huye deliberadamente de los grandes complejos hoteleros. Esta apuesta por un turismo de calidad y sostenible ha hecho que Nerja sea elegida repetidamente como uno de los pueblos más bonitos de España. Las calas de Nerja son su mayor tesoro: Burriana, la mayor y mejor equipada; Maro, vírgenes y de acceso algo más difícil; Carabeo y Calahonda en pleno corazón del pueblo; y El Playazo, ideal para el snorkel por sus aguas transparentes. La Cueva de Nerja, con sus impresionantes formaciones de estalactitas y estalagmitas y el famoso Festival Internacional de Música y Danza, es uno de los monumentos más visitados de Andalucía.",
      cierre:
        "Alquilar en Nerja es elegir la Costa del Sol más auténtica y tranquila. Perfecta para parejas, fotógrafos, amantes del senderismo por los senderos de la Sierra de Almijara o simplemente para quienes quieren desconectar del ritmo acelerado en un entorno natural privilegiado. La ausencia de grandes hoteles de cadena garantiza un ambiente íntimo y personalizado que cada año fideliza a miles de turistas.",
    },
    faqs: [
      {
        pregunta: "¿Cuánto se tarda de Málaga a Nerja?",
        respuesta:
          "En coche por la A-7 (autovía del Mediterráneo), Nerja está a aproximadamente 55-65 km de Málaga Capital, con un tiempo de trayecto de 45-55 minutos según el tráfico. El bus de Alsa también cubre la ruta varias veces al día desde la estación de autobuses de Málaga.",
      },
      {
        pregunta: "¿Cuáles son las mejores calas de Nerja?",
        respuesta:
          "Playa Burriana es la más completa (chiringuitos, equipos de buceo, voleibol). Para aguas cristalinas y ambiente más tranquilo destacan las calas de Maro. Carabeo y Calahonda están en pleno centro urbano. El Playazo es ideal para el snorkel.",
      },
      {
        pregunta: "¿Es Nerja adecuada para senderismo?",
        respuesta:
          "Nerja es el punto de entrada al Parque Natural Sierra de Tejeda, Almijara y Alhama. El sendero de Los Cahorros, la ruta al Río Higuerón (Frigiliana) y el PR-A 249 son algunas de las rutas más populares con vistas espectaculares al mar y la montaña.",
      },
      {
        pregunta: "¿Merece la pena visitar la Cueva de Nerja?",
        respuesta:
          "Absolutamente. Las Cuevas de Nerja albergan las formaciones de estalactitas más grandes del mundo en cavernas de uso público. En verano se celebra el Festival Internacional de Música y Danza dentro de la cueva, una experiencia única. Se recomienda reservar entrada con antelación en temporada alta.",
      },
      {
        pregunta: "¿Hay apartamentos cerca del Balcón de Europa en Nerja?",
        respuesta:
          "Sí, aunque son muy demandados y suelen reservarse con meses de antelación en temporada alta. El Balcón de Europa es el corazón de Nerja, rodeado de restaurantes y con acceso directo a las calas de Carabeo y Calahonda. Alquilar en esta zona permite ir a pie a todos los puntos de interés.",
      },
    ],
    datos: {
      playas: ["Playa Burriana", "Calas de Maro", "Carabeo", "Calahonda", "El Playazo"],
      transporte: "Bus Alsa desde Málaga (1h), coche por A-7. Sin tren. Aeropuerto Málaga a 60 km.",
      ventajas: [
        "Balcón de Europa: mirador único",
        "Cueva de Nerja Bien de Interés Cultural",
        "Calas de aguas cristalinas",
        "Sin grandes hoteles de cadena",
        "Parque Natural Sierra de Almijara",
      ],
    },
    verTambien: [
      { texto: "alquileres en Fuengirola para familias con zoo", href: "/zona/fuengirola" },
      { texto: "apartamentos en Málaga capital con museos", href: "/alquiler-malaga" },
      { texto: "villas en Marbella con piscina privada", href: "/alquiler-marbella" },
    ],
  },
};

/** Lista ordenada de zonas principales para el widget "Otras Zonas" */
export const ZONAS_PRINCIPALES = [
  { slug: "marbella", nombre: "Marbella" },
  { slug: "malaga", nombre: "Málaga" },
  { slug: "benalmadena", nombre: "Benalmádena" },
  { slug: "torremolinos", nombre: "Torremolinos" },
  { slug: "fuengirola", nombre: "Fuengirola" },
  { slug: "nerja", nombre: "Nerja" },
];
