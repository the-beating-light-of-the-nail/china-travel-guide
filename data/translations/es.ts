// Español (es) — paquete de traducción de contenido
// ---------------------------------------------------------------
// Estructura idéntica a data/travel-data.ts; los campos L se escriben
// directamente en español. Solo campos principales (ciudades + metadatos
// de guías); el resto recurre al inglés en el build.
// ---------------------------------------------------------------
import type { LocalePack } from '../localize'

const pack: LocalePack = {
  cities: {
    chengdu: {
      name: 'Chengdu',
      region: 'Suroeste de China',
      tagline: 'Donde el ritmo se relaja y la vida sabe mejor',
      tags: 'Pandas,Comida picante,Cultura de casas de té,Vida tranquila',
      description:
        'Capital de Sichuan y cuna de la antigua civilización Shu, Chengdu lleva más de 2.000 años siendo llamada la «Tierra de la Abundancia» — la única ciudad china cuyo emplazamiento y nombre no han cambiado desde su fundación. Los locales llaman a la buena vida «bashi»: cómoda, tranquila, simplemente perfecta, y lo notarás en cuanto te hundes en una silla de bambú con una taza de té de jazmín. Más allá de los pandas gigantes y el fuego entumecedor del hot pot sichuanés, Chengdu es la puerta a los picos nevados del Tíbet y a las aguas de cuento de Jiuzhaigou.',
      intro:
        'Chengdu se asienta en el centro de la cuenca de Sichuan, nutrida durante dos milenios por las obras de riego de Dujiangyan. Es una ciudad donde la vida va despacio: los locales pasan las tardes con té en gaiwan y mahjong, y de noche se lanzan al hot pot y a los bares del puente Jiuyan. La UNESCO la nombró Ciudad de la Gastronomía, y desde la base de cría de pandas hasta los callejones antiguos de Kuanzhai, cada rincón premia un paso tranquilo. Ven por los pandas, quédate por el té.',
      history:
        'Más de 2.600 años de historia: la única ciudad china cuyo emplazamiento y nombre permanecen invariables desde su fundación. Su nombre viene de la frase Zhou «en tres años se hizo ciudad», y el apodo de «Ciudad del Hibisco» se lo dio un emperador del siglo X que mandó plantar hibiscos junto a las murallas.',
      bestSeason: 'Marzo–junio y septiembre–noviembre (primavera y otoño son las más suaves; media anual de 16 °C)',
      duration: '3–4 días recomendados (añade 1–2 para Dujiangyan y el monte Qingcheng)',
    },
    xian: {
      name: "Xi'an",
      region: 'Noroeste de China',
      tagline: 'Recorre 3.000 años de historia en una sola ciudad',
      tags: 'Ejército de Terracota,Muralla antigua,Dinastía Tang,Ruta de la Seda',
      description:
        "Xi'an — la antigua Chang'an — fue capital de 13 dinastías y punto de partida oriental de la Ruta de la Seda. Hogar del Ejército de Terracota, de una monumental muralla Ming intacta y del bullicioso barrio musulmán: una ciudad donde 3.000 años de historia siguen vivos.",
      intro:
        "Conocida antaño como Chang'an, la «Ciudad de la Paz Eterna», Xi'an es el corazón de la historia china antigua. Trece dinastías fijaron aquí su capital, desde los Qin que unificaron China por primera vez hasta los Tang, cuya edad dorada aún define la identidad cultural del país. Fue el término oriental de la Ruta de la Seda, la ruta que unió Oriente y Occidente durante siglos. Hoy puedes pedalear los 13,7 km de la muralla antigua (la mayor y mejor conservada de China), detenerte ante miles de guerreros de terracota a tamaño real y comer a tu paso por el vibrante barrio musulmán. Pocas ciudades hacen tan presente la historia.",
      history: 'Capital de 13 dinastías (de Zhou a Tang) durante casi 1.100 años; más de 3.100 años de historia urbana',
      bestSeason: 'Marzo a mayo y septiembre a noviembre (primavera y otoño son ideales)',
      duration: '3–5 días recomendados',
    },
    beijing: {
      name: 'Pekín',
      region: 'Norte de China',
      tagline: 'Donde gobernaron los emperadores y la Gran Muralla toca el cielo',
      tags: 'Ciudad Prohibida,Gran Muralla,Hutongs,Pato Pekín,Capital imperial',
      description:
        'La capital de China: una ciudad de palacios imperiales, la Gran Muralla, hutongs centenarios y una escena gastronómica que va mucho más allá del pato Pekín. Tres mil años de historia y seis dinastías han dejado huella en cada rincón.',
      intro:
        'Pekín es la capital de China y su corazón político, cultural e histórico, con más de 3.000 años de historia urbana y más de 850 como capital imperial. Al esplendor de las dinastías Jin, Yuan, Ming y Qing se suman los hutong, la Gran Muralla y una escena culinaria que llegó a ser votada la mejor de China continental. Por mucho que te quedes, la ciudad siempre guarda un secreto más.',
      history: 'Más de 3.000 años de historia, capital durante más de 850 años, ciudad de seis dinastías',
      bestSeason: 'Otoño (sep–nov): aire seco y hojas rojas en la Colina Perfumada; ferias de temple en invierno (dic–feb)',
      duration: '5 días recomendados',
    },
  },
  guides: {
    'xian-3-day-classic-route': {
      title: "3 días en Xi'an: Ejército de Terracota, muralla y street food",
      excerpt: "¿Primera vez en Xi'an? Este itinerario de 3 días cubre todo lo imprescindible, los mejores puestos de comida y consejos prácticos de transporte. Síguelo paso a paso.",
      label: '3 días / 2 noches',
      readTime: 'Lectura de 8 min',
    },
    'beijing-off-the-beaten-path': {
      title: 'Más allá de las postales: 5 días de Pekín auténtico',
      excerpt: 'Pekín es mucho más que la Ciudad Prohibida y la Gran Muralla. Esta guía te lleva a los hutong, museos escondidos y calles de comida donde comen de verdad los locales.',
      label: '5 días / 4 noches',
      readTime: 'Lectura de 10 min',
    },
    'chengdu-food-guide': {
      title: 'Guía gastronómica de Chengdu: de los puestos callejeros a los clásicos centenarios',
      excerpt: 'Hot pot, brochetas, fideos dandan, cabezas de conejo… 20 locales favoritos de los vecinos, desde huecos en la pared hasta restaurantes centenarios.',
      label: 'Mapa gastronómico',
      readTime: 'Lectura de 7 min',
    },
    'first-trip-to-china-guide': {
      title: 'Primer viaje a China: la guía de planificación completa',
      excerpt: 'Visados, apps de pago, tarjetas SIM, transporte: todo lo que necesitas saber antes de tu primer viaje a China, en un solo lugar.',
      label: 'Guía para principiantes',
      readTime: 'Lectura de 12 min',
    },
    'best-time-to-visit-china': {
      title: 'Cuándo viajar a China: guía estación por estación',
      excerpt: 'Flores de primavera, montañas de verano, follaje de otoño, festivales de invierno. La mejor época para cada rincón de China, con el mejor clima y menos gentío.',
      label: 'Planificación',
      readTime: 'Lectura de 6 min',
    },
  },
}

export default pack
