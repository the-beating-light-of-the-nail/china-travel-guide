// Deutsch (de) — Inhaltsübersetzungspaket
// ---------------------------------------------------------------
// Struktur identisch mit data/travel-data.ts; L-Felder direkt auf Deutsch.
// Kernfelder (Städte + Guide-Metadaten); alle übrigen Felder fallen beim
// Build auf Englisch zurück.
// ---------------------------------------------------------------
import type { LocalePack } from '../localize'

const pack: LocalePack = {
  cities: {
    chengdu: {
      name: 'Chengdu',
      region: 'Südwestchina',
      tagline: 'Wo das Tempo langsamer wird und das Leben besser schmeckt',
      tags: 'Pandas,Scharfes Essen,Teehauskultur,Gemächlichkeit',
      description:
        'Hauptstadt der Provinz Sichuan und Wiege der alten Shu-Kultur — Chengdu wird seit über 2.000 Jahren das „Land der Fülle“ genannt und ist die einzige chinesische Stadt, deren Standort und Name seit der Gründung unverändert blieben. Die Einheimischen nennen ein gutes Leben „bashi“ — behaglich, entspannt, genau richtig — und man spürt es, sobald man mit einer Tasse Jasminentee in einen Bambussessel sinkt. Neben Großen Pandas und der betäubend-scharfen Sichuan-Feuertopf-Küche ist Chengdu das Tor zu den Schneegipfeln Tibets und den märchenhaften Gewässern von Jiuzhaigou.',
      intro:
        'Chengdu liegt im Zentrum des Sichuan-Beckens, seit zwei Jahrtausenden genährt vom Dujiangyan-Bewässerungssystem. Eine Stadt, in der das Leben langsam fließt — Einheimische verbringen Nachmittage mit Gaiwan-Tee und klapperndem Mahjong und stürzen sich nach Einbruch der Dunkelheit in Feuertopf und die Bars an der Jiuyan-Brücke. Die UNESCO ernannte Chengdu zur Stadt der Gastronomie, und von der Panda-Aufzuchtstation bis zu den alten Gassen von Kuanzhai belohnt jede Ecke ein gemächlicheres Tempo. Kommen Sie der Pandas wegen — bleiben Sie des Tees wegen.',
      history:
        'Über 2.600 Jahre alt — die einzige chinesische Stadt, deren Standort und Name seit der Gründung unverändert sind. Der Name stammt aus der Zhou-Formel „in drei Jahren wurde es eine Stadt“; der Beiname „Hibiskusstadt“ kommt von einem Kaiser des 10. Jahrhunderts, der die Stadtmauern mit Hibiskus bepflanzen ließ.',
      bestSeason: 'März–Juni und September–November (Frühjahr und Herbst sind am mildesten; im Jahresmittel 16 °C)',
      duration: '3–4 Tage empfohlen (plus 1–2 Tage für Dujiangyan & Qingcheng-Berg)',
    },
    xian: {
      name: 'Xi’an',
      region: 'Nordwestchina',
      tagline: '3.000 Jahre Geschichte in einer Stadt erleben',
      tags: 'Terrakotta-Armee,Alte Stadtmauer,Tang-Dynastie,Seidenstraße',
      description:
        'Xi’an — das antike Chang’an — war Hauptstadt von 13 Dynastien und östlicher Startpunkt der Seidenstraße. Heimat der Terrakotta-Armee, einer riesigen, vollständig erhaltenen Stadtmauer aus der Ming-Zeit und des lebhaften Muslimerviertels: eine Stadt, in der 3.000 Jahre Geschichte lebendig geblieben sind.',
      intro:
        'Als Chang’an, die „Stadt des ewigen Friedens“, steht Xi’an im Herzen der alten chinesischen Geschichte. Dreizehn Dynastien machten sie zur Hauptstadt — von den Qin, die China erstmals einigten, bis zur Tang-Dynastie, deren Goldenes Zeitalter die kulturelle Identität des Landes bis heute prägt. Xi’an war das östliche Ende der Seidenstraße, der Handelsroute, die jahrhundertelang Ost und West verband. Heute radelt man auf der 13,7 km langen alten Stadtmauer (der größten und besterhaltenen Chinas), steht vor Tausenden lebensgroßen Terrakotta-Kriegern und isst sich durch das pulsierende Muslimerviertel. Wenige Städte machen 3.000 Jahre Geschichte so greifbar.',
      history: 'Hauptstadt von 13 Dynastien (Zhou bis Tang) für fast 1.100 Jahre; über 3.100 Jahre Stadtgeschichte',
      bestSeason: 'März bis Mai, September bis November (Frühjahr und Herbst sind ideal)',
      duration: '3–5 Tage empfohlen',
    },
    beijing: {
      name: 'Peking',
      region: 'Nordchina',
      tagline: 'Wo einst Kaiser herrschten und die Große Mauer den Himmel berührt',
      tags: 'Verbotene Stadt,Große Mauer,Hutongs,Peking-Ente,Kaiserresidenz',
      description:
        'Chinas Hauptstadt — eine Stadt kaiserlicher Paläste, der Großen Mauer, jahrhundertealter Hutong-Gassen und einer Food-Szene, die weit über die Peking-Ente hinausgeht. Dreitausend Jahre Stadtgeschichte und sechs Dynastien haben jede Ecke geprägt.',
      intro:
        'Peking ist Chinas Hauptstadt und sein politisches, kulturelles und historisches Herz — mit über 3.000 Jahren Stadtgeschichte und mehr als 850 Jahren als Kaiserresidenz. Jin-, Yuan-, Ming- und Qing-Herrlichkeit lagern über Hutong-Gassen, der Großen Mauer und einer Food-Szene, die einst zur besten des chinesischen Festlands gekürt wurde. Wie lange Sie auch bleiben: Die Stadt hütet immer noch ein Geheimnis mehr.',
      history: 'Über 3.000 Jahre Geschichte, über 850 Jahre Hauptstadt, Residenz von sechs Dynastien',
      bestSeason: 'Herbst (Sep–Nov) — klare Luft und rotes Laub in den Duftbergen; Winter-Tempelmärkte Dez–Feb',
      duration: '5 Tage empfohlen',
    },
  },
  guides: {
    'xian-3-day-classic-route': {
      title: '3 Tage in Xi’an: Terrakotta-Armee, Stadtmauer & Streetfood',
      excerpt: 'Erstmals in Xi’an? Diese 3-Tage-Route deckt alle Highlights ab, führt zu den besten Streetfood-Spots und enthält praktische Verkehrstipps. Einfach Schritt für Schritt folgen.',
      label: '3 Tage / 2 Nächte',
      readTime: '8 Min. Lesezeit',
    },
    'beijing-off-the-beaten-path': {
      title: 'Jenseits der Postkarten: 5 Tage echtes Peking',
      excerpt: 'Peking ist viel mehr als Verbotene Stadt und Große Mauer. Dieser Guide führt in die Hutongs, zu versteckten Museen und in die Food-Straßen, in denen Einheimische wirklich essen.',
      label: '5 Tage / 4 Nächte',
      readTime: '10 Min. Lesezeit',
    },
    'chengdu-food-guide': {
      title: 'Der Chengdu-Food-Guide: von Garküchen bis traditionsreiche Klassiker',
      excerpt: 'Feuertopf, Spieße, Dan-Dan-Nudeln, Kaninchenköpfe … 20 Lieblingsplätze der Einheimischen, vom Loch-in-der-Wand-Laden bis zum Jahrhundertebetrieb.',
      label: 'Food-Karte',
      readTime: '7 Min. Lesezeit',
    },
    'first-trip-to-china-guide': {
      title: 'Erste China-Reise: Der komplette Planungsguide',
      excerpt: 'Visum, Bezahl-Apps, SIM-Karten, Verkehr — alles, was Sie vor Ihrer ersten China-Reise wissen müssen, an einem Ort.',
      label: 'Einsteiger-Guide',
      readTime: '12 Min. Lesezeit',
    },
    'best-time-to-visit-china': {
      title: 'Wann nach China? Ein Guide durch alle Jahreszeiten',
      excerpt: 'Frühjahrsblüten, Sommerberge, Herbstlaub, Winterfeste — hier erfahren Sie, wann sich jede Ecke Chinas von ihrer besten Seite zeigt.',
      label: 'Reiseplanung',
      readTime: '6 Min. Lesezeit',
    },
  },
}

export default pack
