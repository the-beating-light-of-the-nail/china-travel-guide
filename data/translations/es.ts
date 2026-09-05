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
    'what-to-buy-in-china': {
      title: 'Qué comprar en China: qué sale realmente barato (y qué no)',
      excerpt: 'Baterías externas, gafas, lino de Uniqlo, seda, artículos de anime, té — construido con cientos de relatos reales de viajeros, con precios reales y el mito de DJI desmontado.',
      label: 'Guía de compras',
      readTime: 'Lectura de 11 min',
      content: '<p>«¿Qué debería comprar en China?» es una de las preguntas más frecuentes entre visitantes primerizos — un solo hilo reciente reunió más de cien respuestas en dos días. Respuesta corta: China es la fábrica del mundo, pero no todo es ganga. Esta guía recoge lo que los viajeros con experiencia señalan de forma unánime como realmente más barato o imposible de conseguir en casa — y lo que conviene saltarse.</p><h2>Pequeña electrónica y accesorios</h2><p>El punto dulce. Baterías externas, cargadores GaN, cables USB-C y baterías MagSafe de marcas chinas (Anker, Ugreen, Baseus) cuestan un 30–50 % menos que en Europa o Norteamérica. Los auriculares open-ear FreeClip de Huawei rondan los ¥1.200–1.400 (unos 170–190 $) y simplemente no se venden oficialmente en EE. UU. Un SSD NVMe de 2 TB de marca va sobre ¥600–900. Para autenticidad garantizada: tiendas de marca en centros comerciales o JD con distintivo «自营». Truco en las tiendas Xiaomi de Shenzhen: compra varias cosas y pide amablemente un descuento extra.</p><h2>El mito de DJI e Insta360</h2><p>La sorpresa: los precios de DJI están prácticamente unificados en todo el mundo — según un exempleado de su oficina de Shenzhen. Las promos en el extranjero suelen ser mejores que el precio chino. La cuenta honesta de un dron: mismo precio que en casa, menos el ~11 % de devolución de impuestos al salir del país. En una cámara de ¥5.000, ese reembolso es dinero real — nuestra <a href="/es/guides/china-tax-refund-guide">guía de devolución de impuestos</a> lo explica paso a paso.</p><h2>Gafas graduadas listas en 20 minutos</h2><p>Si llevas gafas, quizá sea la mejor oferta de China. En el Glasses City de Pekín — un centro comercial entero de ópticas — hay pares completos (montura más lentes) desde ¥150–400, a menudo listos en 20 minutos. Lo equivalente cuesta de cinco a diez veces más en EE. UU. o Europa. Lleva tu receta (vale una foto de los parámetros) o hazte la revisión allí; cierran sobre las 17:00.</p><h2>Uniqlo, abrigos de plumas y seda</h2><p>Uniqlo es mediblemente más barato en China que en Europa — una compradora recién llegada de la UE reportó ~40 % menos en lino y ~20 % en el resto, y cada verano se repite. Los plumíferos de Anta, 361° o Uniqlo son una ganga si vienes de un país sin inviernos duros. Lo más chino de todo: la seda. La marca familiar Xiuniang (绣娘), en la calle Pingjiang de Suzhou, vende seda de morera que los locales avalan — sin ninguna tienda online.</p><h2>Té, comida y tiendas de museo</h2><p>El buen té de verdad cuesta muchísimo menos en China que en casi cualquier sitio. Compra donde puedas catar primero (mercados de té, tiendas de marca) y sáltate las latas turísticas de sobreembalaje. Como recuerdo comestible, las especialidades regionales — estuches de fideos de coral de cangrejo, kits de especias, repostería de casas centenarias — ganan siempre. Y no desprecies las tiendas de museo: la del Museo Nacional de China tiene fama de excelente.</p><h2>Bienes ACG: la elección del entendido</h2><p>Si te van el anime, el manga o los juegos, China es discretamente el mejor mercado del mundo. Los stands acrílicos de Genshin Impact, Honkai: Star Rail, ZZZ o Arknights cuestan entre un tercio y la mitad del precio japonés — a menudo mejor fabricados, con la impresión incrustada en el acrílico y diseños multicapa reactivos a la luz. Las marcas chinas de figuras (Hasuki, Snail Shell, Animester, Apex) se exportan oficialmente a Japón por aproximadamente el doble. Estilógrafos y papel Xuan de Jingxian, Anhui, son recuerdos que la gente de verdad usa.</p><h2>Lo que NO comprar</h2><p>Adidas y Nike cuestan igual que en casa; el lujo sale incluso más caro. Las teteras de arcilla púrpura de las calles turísticas están infladísimas. El «precio de mayorista» de 1688.com exige leer chino y jugar a la lotería de calidad — inservible en un viaje corto. Y los mercados de falsificaciones ya sabes que no.</p><h2>Dónde comprar, ciudad por ciudad</h2><p>Shenzhen para la tecnología — Huaqiangbei es el mercado de electrónica más denso del planeta. Pekín para gafas y regalos de museo. Shanghái para tiendas insignia y grandes centros. Suzhou para seda. ¿Tirando de tiempo? Taobao y JD entregan en tu hotel — a veces en menos de una hora — nuestra <a href="/es/guides/taobao-jd-for-tourists">guía de compra online</a> muestra cómo. Todas las recomendaciones con precios de referencia: nuestro <a href="/es/shopping">directorio de compras</a>.</p>',
    },
    'china-tax-refund-guide': {
      title: 'Devolución de impuestos al salir de China: guía paso a paso',
      excerpt: 'Gasta ¥200 en la misma tienda y recupera ~11 % — en el aeropuerto o al instante en la tienda. Quién califica, la secuencia exacta de ventanillas y los errores que cuestan dinero real.',
      label: 'Tax free',
      readTime: 'Lectura de 7 min',
      content: '<p>Un viajero compró el flamante Insta360 X6 en Shanghái, rellenó cada formulario de devolución correctamente — y luego, en el aeropuerto, se quedó sin tiempo, no encontró la ventanilla correcta y estuvo a punto de perder el 11 % de una cámara de ¥4.000. La devolución al salir de China (离境退税) es genuinamente generosa desde la reforma de abril de 2025 — pero el proceso tiene aristas. Todo el sistema en cinco minutos.</p><h2>Quién califica</h2><p>Titulares de pasaporte extranjero y residentes de Hong Kong, Macao y Taiwán con estancia continua de no más de 183 días en China continental. Las compras deben hacerse en tiendas registradas, permanecer sin usar y salir del país contigo — en cabina o facturadas — dentro de los 90 días posteriores a la compra.</p><h2>Las cifras que importan</h2><p>Mínimo: ¥200 en la misma tienda registrada el mismo día (antes de abril de 2025 eran ¥500). Importe: en torno al 11 % del precio (8 % en algunas categorías), tras comisiones. Reembolso en efectivo hasta ¥20.000 por persona; el reembolso instantáneo en tienda llega ya a ¥220.000.</p><h2>Paso 1 — Comprar en tiendas con tax refund</h2><p>Busca el logo oficial «离境退税 TAX REFUND» en la entrada o caja. Las grandes tiendas de los centros (Huawei, DJI, Insta360, grandes marcas de seda y té) suelen estar registradas; los puestos de mercado, nunca. Al pagar, presenta el pasaporte y pide el formulario de solicitud (离境退税申请单) junto con la factura detallada (发票). Sin pasaporte no hay formulario. Las compras online (Taobao/JD) no califican.</p><h2>Paso 2 — Empaca con cabeza</h2><p>Los artículos deben estar sin usar y disponibles para inspección. Todo lo que vaya facturado debe ser inspeccionado por la aduana ANTES del check-in — decídelo la noche anterior, y junta formularios, facturas y compras en una sola carpeta.</p><h2>Paso 3 — En el aeropuerto</h2><p>Presupuesta 30–45 minutos extra. Secuencia: primero verificación aduanera (equipaje facturado en el mostrador terrestre antes del check-in; equipaje de mano tras el control migratorio), luego la ventanilla de la agencia o los quioscos automáticos. Cobra en efectivo RMB o de vuelta a la tarjeta. Desde 2026, las compras por debajo de ¥10.000 se inspeccionan por muestreo — más rápido, pero los artículos tienen que poder mostrarse.</p><h2>«即买即退»: reembolso instantáneo en tienda</h2><p>Desde 2025, las tiendas participantes devuelven en el acto: firmas un acuerdo, dejas una preautorización de tarjeta de crédito como garantía y recibes el reembolso al momento. Si la mercancía no sale del país contigo, cargan la tarjeta. Disponible en muchos grandes almacenes — pregunta «¿支持即买即退吗?».</p><h2>Errores que cuestan dinero</h2><p>Los clásicos: perder el formulario (sin formulario no hay devolución); facturar las compras antes de que la aduana las vea; llegar tarde al aeropuerto; comprar en tiendas sin registrar; pasarse de los 90 días en viajes largos. El del Insta360 lo hizo todo bien y aun así casi lo pierde por una ventanilla y un reloj — deja margen.</p><h2>Checklist rápido</h2><p>Pasaporte encima al comprar ✓ · logo «TAX REFUND» ✓ · formulario + factura en una carpeta ✓ · artículos sin usar y a mano ✓ · 45 minutos extra en el aeropuerto ✓ · primero aduana, luego ventanilla ✓. Combínalo con la <a href="/es/guides/what-to-buy-in-china">guía de qué comprar</a> y el <a href="/es/shopping">directorio de compras</a>.</p>',
    },
    'taobao-jd-for-tourists': {
      title: 'Taobao y JD para turistas: compra online como un local',
      excerpt: 'El verdadero filón de las compras en China está online: más barato y en tu hotel en horas. Configurar el pago, detectar reseñas falsas, devolver sin dolor — y el truco de la recepción sin cuenta alguna.',
      label: 'Compra online',
      readTime: 'Lectura de 8 min',
      content: '<p>Si preguntas a visitantes con experiencia dónde está el verdadero filón de las compras en China, la respuesta es casi unánime: online. Los precios son menores, la entrega es absurda de rápida — menos de una hora en grandes ciudades en algunos casos — y las devoluciones son despiadadamente favorables al cliente. El único pero: las apps están hechas para locales. Este es el manual completo, incluido un truco que ni siquiera necesita cuenta.</p><h2>JD vs Taobao vs 1688</h2><p>JD.com se parece al retail propio de Amazon: los artículos con distintivo «自营» son auténticos y absurdamente rápidos — un viajero reportó entrega en menos de una hora en Chongqing. Taobao es un megamercado con toda la gama de calidad, pero las tiendas insignia de marca (旗舰店) — Xiaomi, Huawei, incluso sellos boutique como Songmont — son oficiales y suelen ser algo más baratas que la tienda física. 1688.com es la fuente mayorista detrás de todo; exige chino y una lotería de calidad — no compensa en dos semanas.</p><h2>Configuración (10 minutos)</h2><p>Instala Alipay y vincula tu Visa/Mastercard internacional — paga igual en Taobao y JD. La app de Taobao tiene interfaz en inglés (idioma en ajustes); para las páginas empecinadas, la traducción de cámara. jd.com funciona bien con el traductor del navegador. Para la dirección, pide a recepción que te la escriba en chino y pégala — recibir paquetes en el hotel es totalmente normal en China.</p><h2>Juzgar la calidad como un local</h2><p>Los chinos leen las reseñas distinto: abre primero las pestañas 差评 (reseñas negativas) y 最新 (más recientes) — lo reciente es difícil de falsificar. Distingue el tono robótico del detalle genuino, y trata las reseñas con foto como oro. Prefiere anuncios con 运费险 (seguro de devolución). ¿Decepcionado? Solicita la devolución en la app; un mensajero la recoge en tu hotel y el reembolso llega en días. Esa red de seguridad es la razón por la que los locales piden sin miedo.</p><h2>El truco de la recepción</h2><p>Sin cuenta, sin problema — con una jugada a la que los hoteles están acostumbrados: enseña en recepción exactamente lo que quieres (foto o enlace) y pide que lo pidan al hotel. Pagas en efectivo o por transferencia WeChat/Alipay. La entrega tarda normalmente 3–4 días — hazlo en tus primeros días, no en el último.</p><h2>Qué vale la pena pedir</h2><p>Los clásicos: una maleta Xiaomi de 20 pulgadas (unos ¥315 en Taobao) o la equivalente 90go (unos ¥254) — online suele salir más barato que en tienda; cables, cargadores GaN y soportes por unas decenas de yuanes; estuches de snacks regionales. Nuestro <a href="/es/shopping">directorio de compras</a> lo lista todo con precios de referencia — captura de pantalla y a enseñar en recepción.</p><h2>Precauciones</h2><p>Cuando importa la autenticidad: solo tiendas insignia o JD 自营. La ropa talla pequeño — mira centímetros, no letras. La garantía de electrónica suele ser solo para China. Y recuerda: las compras online no dan derecho a devolución de impuestos — para artículos caros como cámaras, compra en una tienda física registrada siguiendo nuestra <a href="/es/guides/china-tax-refund-guide">guía de tax free</a>.</p>',
    },
  },
  shoppingItems: [
    {
      name: 'Baterías externas, cargadores GaN y cables',
      tagline: 'Elección n.º 1 de viajeros — 30–50 % menos que en casa',
      description: 'Los accesorios de Anker, Ugreen y Baseus cuestan drásticamente menos que en Europa o Norteamérica — viajeros de Italia y Singapur lo confirman. Cargador de 65 W + batería de 10.000 mAh + cables trenzados pueden costar menos que un solo cargador en casa. Apunta también la batería MagSafe.',
      priceRef: 'Cables desde ¥20; cargadores ¥60–150; baterías ¥80–200',
      whereToBuy: 'JD 自营, tiendas Anker o la planta digital de cualquier centro',
    },
    {
      name: 'Maleta Xiaomi (la famosa maleta de ¥315)',
      tagline: 'Maleta de cabina de 20" bien construida, a precio sensato',
      description: 'Las maletas Xiaomi tienen fama entre viajeros — hay quien tiene dos de tamaños distintos. La de 20 pulgadas ronda ¥315 en Taobao, y la 90go del ecosistema Xiaomi, ¥254. Online suele ser algo más barato; entrega en el hotel en 3–4 días. En la tienda Xiaomi: compra varias cosas y pide amablemente descuento extra.',
      priceRef: '20": ¥315 (equivalente 90go ¥254)',
      whereToBuy: 'Tienda insignia Xiaomi en Taobao o tiendas Mi Home',
    },
    {
      name: 'Auriculares Huawei FreeClip',
      tagline: 'Unos 170 $ — y simplemente no se venden en EE. UU.',
      description: 'Los FreeClip open-ear de Huawei se volvieron el souvenir viral: un visitante estadounidense pagó unos 177 $ y toda su familia tuvo envidia. No hay venta oficial en EE. UU. Dos avisos honestos: el sonido va un punto por debajo de los AirPods y la garantía es solo para China.',
      priceRef: '≈¥1.200–1.400 (unos 170–190 $)',
      whereToBuy: 'Tiendas Huawei en centros comerciales o JD 自营',
    },
    {
      name: 'SSD y almacenamiento',
      tagline: '2 TB por una fracción del precio occidental',
      description: 'Un viajero indio lo resumió: los discos de 2 y hasta 5 TB cuestan «una fracción» que en casa. Quédate en marcas conocidas (Samsung, WD, Crucial, Kingston) vía JD 自营 — ahí está la garantía de autenticidad.',
      priceRef: '2 TB NVMe: ¥600–900',
      whereToBuy: 'Solo JD 自营 (distintivo «自营»)',
    },
    {
      name: 'Lectores de libros electrónicos',
      tagline: 'Modelos corrientes ¥500–1.500',
      description: 'Los lectores chinos como iReader arrancan en ¥500–1.500 los modelos corrientes; la gama alta pasa de ¥2.000. Un visitante británico se planteó justo esto: el hardware es más barato, pero comprueba antes que el idioma del firmware y la tienda de libros te convengan.',
      priceRef: 'Modelos corrientes ¥500–1.500',
      whereToBuy: 'JD 自营 o tiendas de marca',
    },
    {
      name: 'Huaqiangbei: el mercado de electrónica más denso del mundo',
      tagline: 'En ningún otro sitio hay tanta tecnología junta',
      description: 'Si te gusta la tecnología, el Huaqiangbei de Shenzhen es destino en sí mismo — mercados de componentes, cultura de reparación, puestos de gadgets y tiendas insignia manzana tras manzana. Ve por la experiencia, los accesorios pequeños y las reparaciones; para lo caro, recuerda la verdad DJI: marcas globales, precios globales. Regatea fuerte y verifica antes de pagar.',
      priceRef: 'Pasear gratis; accesorios desde ¥10',
      whereToBuy: 'Huaqiangbei, Shenzhen (metro Huaqiang Lu)',
    },
    {
      name: 'Gafas graduadas listas en 20 minutos',
      tagline: 'Pares completos desde ¥150–400 — 5–10× menos que en Occidente',
      description: 'Quizá la mejor oferta de China para quien usa gafas. El Glasses City de Pekín es un centro entero de ópticas; el par de un visitante quedó listo en 20 minutos. Lleva tu receta (vale una foto de los parámetros) o hazte la revisión allí. Cierran sobre las 17:00.',
      priceRef: 'Pares completos ¥150–400 (montura + lentes)',
      whereToBuy: 'Beijing Glasses City (北京眼镜城)',
    },
    {
      name: 'Lino y básicos de Uniqlo',
      tagline: 'Lino ~40 % menos que en la UE, el resto ~20 %',
      description: 'Medido, no intuiciones: una compradora con base en la UE constató ~40 % menos en lino y ~20 % en el resto, y cada verano se repite. Uniqlo está en cada centro comercial: el ahorro más garantizado de esta lista. Adidas y Nike, en cambio, al precio de casa.',
      priceRef: 'Camisas de lino ¥99–199; camisetas AIRism ¥79',
      whereToBuy: 'Cualquier Uniqlo de centro comercial; mismo precio nacional',
    },
    {
      name: 'Plumíferos (Anta, 361°, Uniqlo)',
      tagline: 'Abrigo serio, precio poco serio',
      description: 'Los plumíferos de Anta, 361° o Uniqlo están muy bien de precio en los centros chinos — interesante si vas a un destino frío o vienes de un país donde el plumífero cuesta una fortuna. El relleno varía por modelo: compara etiquetas. Si vives en Singapur, sáltalo.',
      priceRef: 'Anta/361°: ¥300–700; Uniqlo: ¥499–799',
      whereToBuy: 'Tiendas de marca en centros comerciales',
    },
    {
      name: 'Seda de morera de Suzhou',
      tagline: 'Marca familiar sin ninguna tienda online',
      description: 'Una viajera compró «muchísima» seda en la marca familiar Xiuniang (绣娘), calle Pingjiang de Suzhou — gran calidad, varias tiendas en la ciudad y, adrede, cero presencia online. Justo el tipo de hallazgo que solo se consigue en persona. La seda de morera auténtica (etiqueta 100 % y certificado) cuesta una fracción que en las boutiques extranjeras.',
      priceRef: 'Pañuelos desde ¥100–300; prendas desde ¥400',
      whereToBuy: 'Xiuniang (绣娘), calle Pingjiang, Suzhou — y sus otras tiendas',
    },
    {
      name: 'Hanfu, trajes Tang y pañuelos de seda',
      tagline: 'Souvenirs llevables con carácter de verdad',
      description: "El consejo local: pasa de las chucherías — un traje Tang decente, un conjunto hanfu o buenos pañuelos de seda son regalos que se siguen usando. La calidad varía muchísimo entre talleres; en persona puedes tocar tela y revisar costuras, justo lo imposible en AliExpress. Suzhou y Xi'an son los clásicos.",
      priceRef: 'Pañuelos ¥80–300; conjuntos hanfu ¥300–800',
      whereToBuy: "Calles hanfu de Xi'an/Suzhou, tiendas de seda, tiendas de museo",
    },
    {
      name: 'Buen té (de verdad más barato)',
      tagline: 'El té de calidad, una fracción del precio mundial',
      description: '«El buen té de verdad es mucho más barato en China que casi en cualquier sitio» — una de las respuestas más votadas, y es cierto. La clave es saber qué compras: donde puedas catar (mercados de té, tiendas como Tenfu), hoja suelta en cantidad bebible, y fuera las latas turísticas.',
      priceRef: 'Calidad diaria desde ¥60–150 / 500 g',
      whereToBuy: 'Mercados de té con cata; tiendas de marca; evitar latas de aeropuerto',
    },
    {
      name: 'Regalos gastronómicos regionales',
      tagline: 'De los fideos de coral de cangrejo a los kits de especias',
      description: 'A un hilo de viajeros curtidos, la primera respuesta fue una sola palabra: «¡Comida!». Las especialidades regionales — estuches de fideos de coral de cangrejo de Suzhou, kits de especias de Sichuan, repostería centenaria — son ligeras, baratas y de verdad bienvenidas en casa. Compra en marcas o laozihao, no en puestos turísticos.',
      priceRef: 'Estuches ¥30–150',
      whereToBuy: 'Tiendas laozihao (老字号) e insignias de marca',
    },
    {
      name: 'Artículos ACG: stands acrílicos y pins',
      tagline: '1/3–1/2 del precio japonés, a menudo mejor hechos',
      description: 'La elección del entendido para fans del anime y los juegos. Stands acrílicos de Genshin Impact, Star Rail, ZZZ o Arknights a un tercio o la mitad del precio japonés — a menudo con impresión interna y diseños multicapa. Ojo: muchas tiendas de goods no están registradas para tax free; para devolución, compra en tiendas registradas de centro comercial.',
      priceRef: 'Stands acrílicos ¥20–60; pins ¥10–30',
      whereToBuy: 'Tiendas de goods (谷子店) en centros de grandes ciudades; insignias en Taobao',
    },
    {
      name: 'Figuras y maquetas chinas',
      tagline: 'Exportadas oficialmente a Japón a ~2× el precio',
      description: 'Las marcas chinas de figuras — Hasuki, Snail Shell, Animester, Apex — y los fabricantes de maquetas han alcanzado un nivel serio, y se exportan oficialmente a Japón por aproximadamente el doble. Compra directo en las insignias de Taobao de cada marca o en tiendas especializadas. Cuidado con bootlegs de vendedores terceros.',
      priceRef: 'Figuras ¥100–600; maquetas ¥80–400',
      whereToBuy: 'Insignias de marca en Taobao; tiendas especializadas',
    },
    {
      name: 'Estilógrafos y papelería',
      tagline: 'Un bolígrafo de ¥30 con el trazo de uno de ¥100 fuera',
      description: 'China fabrica gran parte de los estilógrafos del mundo, y los del mercado interno (Hero, líneas chinas de Pilot, marcas de taller) tienen un precio excelente — la elección natural para quien pregunta por estilógrafos. Los mostradores de centros y las grandes papelerías son la puerta de entrada fácil.',
      priceRef: 'Desde ¥30; buenos de uso diario ¥80–300',
      whereToBuy: 'Grandes papelerías y mostradores de centros comerciales',
    },
    {
      name: 'Papel Xuan y juegos de caligrafía',
      tagline: 'Souvenirs con uso real, desde el origen',
      description: 'El consejo local que casi nadie oye: papel Xuan de Jingxian, Anhui — el papel que la caligrafía china usa desde hace un milenio — más piedras de tinta y pinceles a precio de origen. Al contrario que las teteras infladas, el material de una calle de caligrafía seria está a precio honesto. El regalo para quien escribe o dibuja.',
      priceRef: 'Papel desde ¥30/100 hojas; juegos ¥100–300',
      whereToBuy: "Calles de caligrafía (Liulichang en Pekín; Wenhua Jie en Xi'an)",
    },
    {
      name: 'Tiendas de museo (empezando por el NMC)',
      tagline: 'Réplicas y diseños que no hay en otro sitio',
      description: '«El Museo Nacional de China en Pekín, ¡excelentísimo!» — cita literal, y generaliza: los grandes museos chinos han convertido sus tiendas en estudios de diseño. Réplicas fieles, pañuelos, juegos de té y papelería ligadas a colecciones reales: regalos con historia. Entrada gratis con reserva.',
      priceRef: 'Souvenirs ¥30–300',
      whereToBuy: 'Tienda del Museo Nacional de China; grandes tiendas de museo',
    },
  ],
}

export default pack
