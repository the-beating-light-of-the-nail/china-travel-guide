// Italiano (it) — pacchetto di traduzione dei contenuti
// ---------------------------------------------------------------
// Struttura identica a data/travel-data.ts; i campi L sono scritti
// direttamente in italiano. Solo campi principali (città + metadati
// delle guide); il resto ricade sull'inglese in fase di build.
// ---------------------------------------------------------------
import type { LocalePack } from '../localize'

const pack: LocalePack = {
  cities: {
    chengdu: {
      name: "Chengdu",
      region: "Sudovest della Cina",
      tagline: "Dove il ritmo rallenta e la vita ha un sapore migliore",
      tags: "Panda,Cucina piccante,Cultura delle case da tè,Vita lenta",
      description:
        "Capitale del Sichuan e culla dell'antica civiltà Shu, Chengdu è chiamata «Terra dell'Abbondanza» da oltre 2.000 anni — l'unica città cinese il cui sito e nome sono rimasti invariati dalla fondazione. I locali chiamano la bella vita «bashi» — comoda, serena, semplicemente perfetta — e lo sentirete appena vi lascerete cadere su una sedia di bambuto con una tazza di tè al gelsomino. Oltre ai panda giganti e al fuoco intorpidente dell'hot pot del Sichuan, Chengdu è la porta verso le vette innevate del Tibet e le acque da fiaba di Jiuzhaigou.",
      intro:
        "Chengdu siede al centro del bacino del Sichuan, nutrita per due millenni dalle opere idriche di Dujiangyan. È una città dove la vita scorre lenta: i locali passano i pomeriggi tra tè in gaiwan e mahjong scoppiettante, e la sera si tuffano nell'hot pot e nei bar del ponte Jiuyan. L'UNESCO l'ha nominata Città della Gastronomia, e dalla base dei panda ai vicoli antichi di Kuanzhai ogni angolo premia chi va piano. Venite per i panda, restate per il tè.",
      history:
        "Oltre 2.600 anni di storia: l'unica città cinese con sito e nome invariati dalla fondazione. Il nome viene dalla frase dei Zhou «in tre anni divenne una città»; il soprannome «Città dell'Ibisco» nasce da un imperatore del X secolo che fece piantare ibischi lungo le mura.",
      bestSeason: "Marzo–giugno e settembre–novembre (primavera e autunno sono i più miti; media annua di 16 °C)",
      duration: "Consigliati 3–4 giorni (più 1–2 per Dujiangyan e il monte Qingcheng)",
    },
    xian: {
      name: "Xi'an",
      region: "Nordovest della Cina",
      tagline: "Cammina tra 3.000 anni di storia in una sola città",
      tags: "Esercito di Terracotta,Mura antiche,Dinastia Tang,Via della Seta",
      description:
        "Xi'an — l'antica Chang'an — fu capitale di 13 dinastie e punto di partenza orientale della Via della Seta. Casa dell'Esercito di Terracotta, di un'imponente cinta muraria Ming intatta e dello vivace quartiere musulmano: una città dove 3.000 anni di storia restano vividamente vivi.",
      intro:
        "Nota un tempo come Chang'an, la «Città della Pace Eterna», Xi'an è il cuore della storia cinese antica. Tredici dinastie vi fissarono la capitale, dai Qin che per primi unificarono la Cina ai Tang, la cui età dell'oro definisce ancora l'identità culturale del Paese. Fu il capolinea orientale della Via della Seta, la rotta che per secoli collegò Oriente e Occidente. Oggi si pedala lungo i 13,7 km di mura antiche (le più grandi e meglio conservate della Cina), ci si ferma davanti a migliaia di guerrieri di terracotta a grandezza naturale e si mangia attraverso il vivace quartiere musulmano. Poche città rendono la storia così presente.",
      history: "Capitale di 13 dinastie (da Zhou a Tang) per quasi 1.100 anni; oltre 3.100 anni di storia urbana",
      bestSeason: "Da marzo a maggio e da settembre a novembre (primavera e autunno sono ideali)",
      duration: "Consigliati 3–5 giorni",
    },
    beijing: {
      name: "Pechino",
      region: "Nord della Cina",
      tagline: "Dove gli imperatori regnavano e la Grande Muraglia incontra il cielo",
      tags: "Città Proibita,Grande Muraglia,Hutong,Anatra di Pechino,Capitale imperiale",
      description:
        "La capitale della Cina: una città di palazzi imperiali, della Grande Muraglia, di hutong secolari e di una scena gastronomica che va ben oltre l'anatra laccata. Tremila anni di storia e sei dinastie hanno lasciato il segno in ogni angolo.",
      intro:
        "Pechino è la capitale della Cina e il suo cuore politico, culturale e storico, con oltre 3.000 anni di storia urbana e più di 850 da capitale imperiale. Sopra lo splendore di Jin, Yuan, Ming e Qing si stratificano gli hutong, la Grande Muraglia e una scena culinaria un tempo votata la migliore della Cina continentale. Per quanto a lungo restiate, la città avrà sempre un segreto in più da svelare.",
      history: "Oltre 3.000 anni di storia, capitale per oltre 850 anni, città di sei dinastie",
      bestSeason: "Autunno (set–nov) — aria frizzante e foglie rosse alla Collina Profumata; fiere templari in inverno (dic–feb)",
      duration: "Consigliati 5 giorni",
    },
  },
  guides: {
    "xian-3-day-classic-route": {
      title: "3 giorni a Xi'an: Esercito di Terracotta, mura e street food",
      excerpt:
        "Prima volta a Xi'an? Questo itinerario di 3 giorni copre tutti i must, i migliori punti di street food e consigli pratici sui trasporti. Seguitelo passo passo.",
      label: "3 giorni / 2 notti",
      readTime: "Lettura di 8 min",
    },
    "beijing-off-the-beaten-path": {
      title: "Oltre le cartoline: 5 giorni di vera Pechino",
      excerpt:
        "Pechino è molto più della Città Proibita e della Grande Muraglia. Questa guida vi porta negli hutong, nei musei nascosti e nelle strade del cibo dove mangiano davvero i locali.",
      label: "5 giorni / 4 notti",
      readTime: "Lettura di 10 min",
    },
    "chengdu-food-guide": {
      title: "Guida gastronomica di Chengdu: dalle bancarelle ai classici centenari",
      excerpt:
        "Hot pot, spiedini, noodle dandan, teste di coniglio… 20 locali adorati dagli abitanti, dai buchi nel muro ai ristoranti centenari.",
      label: "Mappa gastronomica",
      readTime: "Lettura di 7 min",
    },
    "first-trip-to-china-guide": {
      title: "Primo viaggio in Cina: guida completa alla pianificazione",
      excerpt:
        "Visti, app di pagamento, SIM, trasporti — tutto quello che serve sapere prima del primo viaggio in Cina, in un unico posto.",
      label: "Guida per principianti",
      readTime: "Lettura di 12 min",
    },
    "best-time-to-visit-china": {
      title: "Quando andare in Cina: guida stagione per stagione",
      excerpt:
        "Fioriture primaverili, montagne estive, fogliami autunnali, festival invernali. Il periodo migliore per ogni angolo della Cina.",
      label: "Pianificazione",
      readTime: "Lettura di 6 min",
    },
  },
}

export default pack
