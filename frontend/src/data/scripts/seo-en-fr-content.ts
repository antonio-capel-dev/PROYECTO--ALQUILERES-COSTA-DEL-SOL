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
