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
    'what-to-buy-in-china': {
      title: 'Shopping in China: Was sich wirklich lohnt (und was nicht)',
      excerpt: 'Powerbanks, Brillen, Uniqlo-Leinen, Seide, Anime-Goods, Tee — aus Hunderten echten Reisberichten, mit realen Preisen und dem entlarvten DJI-Mythos.',
      label: 'Shopping-Guide',
      readTime: '11 Min. Lesezeit',
      content: '<p>„Was soll ich in China kaufen?“ ist eine der häufigsten Fragen von Erstbesuchern — ein einziger aktueller Thread dazu zog in zwei Tagen über hundert Antworten. Die kurze Antwort: China ist die Fabrik der Welt, aber nicht alles ist ein Schnäppchen. Dieser Guide zeigt, was erfahrene Reisende einstimmig als wirklich günstiger oder nur vor Ort erhältlich empfehlen — und was Sie auslassen sollten.</p><h2>Kleine Elektronik & Zubehör</h2><p>Das Kernstück. Powerbanks, GaN-Ladegeräte, USB-C-Kabel und MagSafe-Akkus von chinesischen Marken (Anker, Ugreen, Baseus) kosten oft 30–50 % weniger als in Europa oder Nordamerika. Huaweis Open-Ear-Kopfhörer FreeClip kosten etwa ¥1.200–1.400 (ca. $170–190) und sind in den USA schlicht nicht regulär erhältlich. Eine Marken-2TB-NVMe-SSD gibt es für rund ¥600–900. Für garantierte Echtheit: Markenläden im Einkaufszentrum oder JD mit „自营“-Kennzeichnung. Tipp für Xiaomis Läden in Shenzhen: mehrere Dinge kaufen und höflich nach Extra-Rabatt fragen.</p><h2>Der DJI- & Insta360-Mythos</h2><p>Die Überraschung: DJI-Preise sind weltweit praktisch vereinheitlicht — so ein ehemaliger DJI-Mitarbeiter aus Shenzhen. Ausländische Aktionen sind oft besser als der chinesische Ladenpreis. Die ehrliche Drohnen-Rechnung: gleicher Preis wie zu Hause, minus rund 11 % Ausfuhr-Steuerrückerstattung beim Verlassen des Landes. Bei einer ¥5.000-Kamera ist das echtes Geld — Schritt für Schritt in unserem <a href="/de/guides/china-tax-refund-guide">Steuerrückerstattungs-Guide</a>.</p><h2>Brillen in 20 Minuten fertig</h2><p>Wer eine Brille trägt: möglicherweise das beste Angebot Chinas überhaupt. In Pekings Glasses City — einem ganzen Einkaufszcenter nur mit Optikergeschäften — gibt es Komplettbrillen (Fassung plus Gläser) ab etwa ¥150–400, oft in 20 Minuten fertig während Sie warten. In den USA oder Europa kostet das Fünf- bis Zehnfaches. Rezept mitbringen oder vor Ort messen lassen; geschlossen wird gegen 17 Uhr.</p><h2>Uniqlo, Daunenjacken & Seide</h2><p>Uniqlo ist in China messbar günstiger als in Europa — eine frisch aus der EU zurückgekehrte Einkäuferin meldete rund 40 % Rabatt bei Leinen und 20 % beim Rest, und jeder Sommer bestätigt es. Daunenjacken von Anta, 361° oder Uniqlo sind ein echter Deal, wenn Sie aus einem Land ohne harte Winter kommen. Das typischste Mitbringsel: Seide. Die familiengeführte Marke Xiuniang (绣娘) an der Pingjiang-Straße in Suzhou verkauft Maulbeerseide, für die Einheimische bürgen — ohne jeglichen Online-Shop.</p><h2>Tee, Essen & Museumsshops</h2><p>Wirklich guter Tee ist in China dramatisch günstiger als fast überall. Kaufen Sie dort, wo Sie verkosten können (Teemärkte, Markenläden), und lassen Sie die überteuerten Touristen-Dosen stehen. Als Essensmitbringsel schlagen regionale Spezialitäten — Krabbenroe-Nudel-Geschenkboxen, Gewürzsets, Gebäck von Traditionsfirmen — alles. Und unterschätzen Sie die Museumsshops nicht: Der des Nationalmuseums China ist legendär gut.</p><h2>ACG-Goods: der Insider-Tipp</h2><p>Wer Anime, Comics oder Games liebt, für den ist China still der weltbeste Markt. Acryl-Ständer für Genshin Impact, Honkai: Star Rail, ZZZ u. a. kosten ein Drittel bis die Hälfte des japanischen Preises — oft besser verarbeitet, mit innenliegendem Druck und mehrschichtigen, lichtreaktiven Designs. Chinesische Figurenmarken (Hasuki, Snail Shell, Animester, Apex) werden in Japan offiziell zum rund doppelten Preis verkauft. Füllfederhalter und Xuan-Papier aus Jingxian, Anhui, sind Mitbringsel, die wirklich benutzt werden.</p><h2>Was Sie NICHT kaufen sollten</h2><p>Adidas und Nike kosten wie zu Hause, Luxus eher mehr. Yixing-Tonkannen in Touristenstraßen sind maßlos überteuert. Der 1688.com-„Großhandelspreis“ erfordert Chinesischkenntnisse und eine Qualitätslotterie — auf kurzer Reise unsinnig. Und die Fake-Märkte skippen Sie eh.</p><h2>Wo shoppen, Stadt für Stadt</h2><p>Shenzhen für Technik — Huaqiangbei ist der dichteste Elektronikmarkt der Erde. Peking für Brillen und Museumsgeschenke. Shanghai für Flagship-Stores und große Malls. Suzhou für Seide. Zeit knapp? Taobao und JD liefern ins Hotel — teils innerhalb einer Stunde — unser <a href="/de/guides/taobao-jd-for-tourists">Online-Shopping-Guide</a> zeigt wie. Alle Empfehlungen mit Richtpreisen: unser <a href="/de/shopping">Shopping-Verzeichnis</a>.</p>',
    },
    'china-tax-refund-guide': {
      title: 'Ausfuhr-Steuerrückerstattung in China: Schritt-für-Schritt-Guide',
      excerpt: '¥200 im selben Laden ausgeben, rund 11 % zurück — am Flughafen oder sofort im Geschäft. Wer qualifiziert ist, die genaue Schalter-Reihenfolge und die Fehler, die Reisende echtes Geld kosten.',
      label: 'Steuerrückerstattung',
      readTime: '7 Min. Lesezeit',
      content: '<p>Ein Reisender kaufte die brandneue Insta360 X6 in Shanghai, füllte jedes Steuerrückerstattungsformular korrekt aus — und verpasste dann am Flughafen den richtigen Schalter, weil die Zeit knapp wurde. Fast 11 % Rückerstattung auf eine ¥4.000-Kamera futsch. Chinas Ausfuhr-Steuerrückerstattung (离境退税) ist seit der Reform vom April 2025 richtig großzügig — aber der Prozess hat scharfe Kanten. Das ganze System in fünf Minuten.</p><h2>Wer qualifiziert ist</h2><p>Inhaber ausländischer Pässe sowie Einwohner von Hongkong, Macau und Taiwan mit ununterbrochenem Aufenthalt von höchstens 183 Tagen. Die Ware muss in zugelassenen Refund-Geschäften gekauft, unbenutzt und innerhalb von 90 Tagen nach dem Kauf von Ihnen selbst ausgeführt werden.</p><h2>Die entscheidenden Zahlen</h2><p>Mindestbetrag: ¥200 im selben Refund-Geschäft am selben Tag (vor April 2025: ¥500). Rückerstattung: rund 11 % des Warenpreises (manche Kategorien 8 %) nach Agenturgebühren. Barerstattung bis ¥20.000 pro Person; sofortige Erstattung im Laden inzwischen bis ¥220.000.</p><h2>Schritt 1 — In Refund-Geschäften kaufen</h2><p>Achten Sie auf das offizielle „离境退税 TAX REFUND“-Logo. Große Markenläden in Malls (Huawei, DJI, Insta360, große Seiden- und Teemarken) sind meist registriert, Marktstände nie. Legen Sie beim Bezahlen den Pass vor und fordern Sie das Rückerstattungsformular (离境退税申请单) zusammen mit der detaillierten Rechnung (发票). Ohne Pass kein Formular. Online-Käufe bei Taobao/JD qualifizieren nicht.</p><h2>Schritt 2 — Klug packen</h2><p>Die Ware muss unbenutzt und prüffähig sein. Alles, das in den aufzugebenden Koffer soll, muss VOR dem Check-in vom Zoll inspiziert werden — entscheiden Sie also am Vorabend. Formulare, Rechnungen und Ware gehören in einen Ordner.</p><h2>Schritt 3 — Am Flughafen</h2><p>Planen Sie 30–45 Minuten extra. Reihenfolge: erst Zollprüfung (aufzugebende Waren vor dem Check-in am Landside-Zollschalter, Handgepäck nach der Ausreisekontrolle), dann der Rückerstattungsschalter der Agentur oder der Automaten. Auszahlung in RMB-Bar oder zurück auf die Karte. Seit 2026 werden Käufe unter ¥10.000 stichprobenartig statt vollständig geprüft — schneller, aber die Ware muss trotzdem vorzeigbar sein.</p><h2>„即买即退“ — Sofortrückerstattung im Laden</h2><p>Seit 2025 erstatten teilnehmende Geschäfte direkt an der Kasse: Sie unterschreiben eine Vereinbarung, hinterlegen eine Kreditkarten-Vorautorisierung als Garantie und erhalten die Erstattung sofort. Verlässt die Ware das Land dann doch nicht mit Ihnen, wird die Karte belastet. In vielen Kaufhäusern und Markenläden verfügbar — fragen Sie einfach „支持即买即退吗?“.</p><h2>Fehler, die Reisende Geld kosten</h2><p>Die Klassiker: Formular verloren (kein Formular, keine Erstattung); Refund-Waren vor der Zollkontrolle aufgegeben; zu spät am Flughafen; in unregistrierten Läden gekauft; die 90-Tage-Frist auf langen Reisen verpasst. Der Insta360-Käufer von oben machte alles richtig und verlor fast trotzdem — planen Sie Puffer ein.</p><h2>Checkliste</h2><p>Pass beim Shoppen dabeihaben ✓ · „TAX REFUND“-Logo im Laden ✓ · Formular + Rechnung in einem Ordner ✓ · Ware unbenutzt und griffbereit ✓ · 45 Minuten extra am Flughafen ✓ · erst Zoll, dann Erstattungsschalter ✓. Kombiniert mit unserem <a href="/de/guides/what-to-buy-in-china">Was-lohnt-sich-Guide</a> und dem <a href="/de/shopping">Shopping-Verzeichnis</a>.</p>',
    },
    'taobao-jd-for-tourists': {
      title: 'Taobao & JD für Touristen: Online shoppen wie ein Einheimischer',
      excerpt: 'Das echte Shopping-Highlight Chinas ist online: günstiger, innerhalb von Stunden im Hotel. Zahlung einrichten, Fake-Rezensionen erkennen, mühelos zurücksenden — plus der Reception-Trick ganz ohne Konto.',
      label: 'Online-Shopping',
      readTime: '8 Min. Lesezeit',
      content: '<p>Fragt man erfahrene China-Reisende nach dem echten Shopping-Geheimtipp, fällt die Antwort fast einstimmig aus: online. Preise sind niedriger, die Lieferung absurd schnell — in Großstädten teils unter einer Stunde — und Rückgaben sind gnadenlos kundenfreundlich. Einziges Hindernis: Die Apps sind für Einheimische gebaut. Hier das komplette Touristen-Handbuch, inklusive eines Tricks, der gar kein Konto braucht.</p><h2>JD vs. Taobao vs. 1688</h2><p>JD.com ist Amazons Eigenhandel am ähnlichsten: Artikel mit „自营“-Badge sind echt und schnell — ein Reisender meldete Zustellung in unter einer Stunde in Chongqing. Taobao ist ein Riesenmarktplatz mit voller Qualitätsspanne, aber Marken-Flagship-Stores (旗舰店) — Xiaomi, Huawei, sogar Boutique-Marken wie Songmont — sind offiziell und meist etwas günstiger als der Laden. 1688.com ist die Großhandelsquelle hinter allem; Chinesischkenntnisse und Qualitätslotterie — für zwei Wochen Reise unsinnig.</p><h2>Einrichtung (10 Minuten)</h2><p>Alipay installieren und internationale Visa/Mastercard hinterlegen — zahlt auf Taobao und JD gleichermaßen. Die Taobao-App hat eine englische Oberfläche (Sprache in den Einstellungen); hartnäckige Seiten übersetzt die Kamera. jd.com funktioniert mit Browser-Autoübersetzung. Für die Adresse lassen Sie sich von der Hotelrezeption die chinesische Adresse aufschreiben und fügen sie ein — Pakete ans Hotel sind in China völlig normal.</p><h2>Qualität einschätzen wie ein Einheimischer</h2><p>Chinesische Käufer lesen Rezensionen anders: zuerst die Tabs 差评 (schlechte Bewertungen) und 最新 (neueste) — Aktualität lässt sich kaum fälschen. Unterscheiden Sie Maschinen- von echtem Ton, Foto-Rezensionen sind Gold. Bevorzugen Sie Angebote mit 运费险 (Rücksende-Versicherung). Enttäuscht? Rückgabe in der App einreichen, der Kurier holt im Hotel ab, Erstattung binnen Tagen. Genau dieses Sicherheitsnetz ist der Grund, warum Einheimische so furchtlos bestellen.</p><h2>Der Reception-Trick</h2><p>Kein Konto, kein Problem — mit einem Griff, an den Hotels längst gewöhnt: Zeigen Sie der Rezeption genau, was Sie wollen (Foto oder Link), und bitten Sie, es ans Hotel zu bestellen. Beglichen in bar oder per WeChat/Alipay-Transfer. Lieferung dauert meist 3–4 Tage — also in den ersten, nicht den letzten Tagen erledigen.</p><h2>Was sich zu bestellen lohnt</h2><p>Klassiker: ein Xiaomi-Koffer 20 Zoll (Taobao ca. ¥315) oder das 90go-Pendant (ca. ¥254) — online meist günstiger als der Laden; Kabel, GaN-Ladegeräte und Halterungen für ein paar Dutzend Yuan; regionale Snack-Geschenkboxen. Unser <a href="/de/shopping">Shopping-Verzeichnis</a> listet alles mit Richtpreisen — einfach abfotografieren und der Rezeption hinhalten.</p><h2>Achtung</h2><p>Wo Echtheit zählt: nur Flagship-Stores oder JD 自营. Kleidung fällt klein aus — Zentimeter statt Buchstaben. Elektronik-Garantie gilt meist nur in China. Und Online-Käufe qualifizieren nicht für die Steuerrückerstattung — Großes wie Kameras kaufen Sie in einem physischen Refund-Laden nach unserem <a href="/de/guides/china-tax-refund-guide">Rückerstattungs-Guide</a>.</p>',
    },
  },
  shoppingItems: [
    {
      name: 'Powerbanks, GaN-Ladegeräte & Kabel',
      tagline: 'Reisenden-Pick Nr. 1 — 30–50 % günstiger als zu Hause',
      description: 'Anker-, Ugreen- und Baseus-Zubehör ist in China drastisch günstiger als in Europa oder Nordamerika — Reisende aus Italien und Singapore berichten dasselbe. 65W-Ladegerät + 10.000-mAh-Powerbank + geflochtene Kabel können zusammen weniger kosten als ein einzelnes Ladegerät zu Hause.',
      priceRef: 'Kabel ab ¥20; Ladegeräte ¥60–150; Powerbanks ¥80–200',
      whereToBuy: 'JD 自营, Anker-Markenläden oder die Digital-Etage jeder Mall',
    },
    {
      name: 'Xiaomi-Koffer (der berühmte ¥315-Koffer)',
      tagline: 'Solider 20-Zöller zu einem wahnsinnig vernünftigen Preis',
      description: 'Xiamis Koffer haben unter Reisenden einen Ruf — manche besitzen zwei in verschiedenen Größen. Der 20-Zöller kostet auf Taobao rund ¥315, das Ökosystem-Pendant 90go etwa ¥254. Online ist meist etwas günstiger; Lieferung ins Hotel in 3–4 Tagen. Im Xiaomi-Laden: mehr kaufen und höflich nach Extra-Rabatt fragen.',
      priceRef: '20 Zoll: ¥315 (90go-Pendant ¥254)',
      whereToBuy: 'Taobao Xiaomi Flagship-Store oder Mi-Home-Läden',
    },
    {
      name: 'Huawei FreeClip-Kopfhörer',
      tagline: 'Etwa $170 — und in den USA schlicht nicht kaufbar',
      description: 'Huaweis Open-Ear-FreeClip wurde zum viralen Mitbringsel: Ein US-Reisender zahlte rund $177 — die ganze Familie war neidisch. Offiziell in den USA gar nicht erhältlich. Ehrliche Einschränkungen: Klang eine Klasse unter AirPods, Garantie nur in China.',
      priceRef: '≈¥1.200–1.400 (ca. $170–190)',
      whereToBuy: 'Huawei-Läden in Malls oder JD 自营',
    },
    {
      name: 'SSDs & Speicher',
      tagline: '2TB für einen Bruchteil westlicher Preise',
      description: 'Ein Reisender aus Indien brachte es auf den Punkt: 2TB- und 5TB-Laufwerke kosten „einen Bruchteil“ des heimischen Preises. Bleiben Sie bei Marken wie Samsung, WD, Crucial, Kingston über JD 自营 — dort kommt die Echtheitsgarantie her.',
      priceRef: '2TB NVMe: ¥600–900',
      whereToBuy: 'Nur JD 自营 („自营“-Badge)',
    },
    {
      name: 'E-Reader',
      tagline: 'Mainstream-Modelle ¥500–1.500',
      description: 'Chinesische E-Reader wie iReader beginnen bei ¥500–1.500 für Mainstream-Modelle; High-End über ¥2.000. Ein UK-Reisender wog genau diese Frage: Die Hardware ist tatsächlich günstiger — aber prüfen Sie vorher, ob Firmware-Sprache und Store-Ökosystem zu Ihnen passen.',
      priceRef: 'Mainstream-Modelle ¥500–1.500',
      whereToBuy: 'JD 自营 oder Markenläden',
    },
    {
      name: 'Huaqiangbei: der dichteste Elektronikmarkt der Welt',
      tagline: 'So viel Technik an einem Ort gibt es nirgends sonst',
      description: 'Wer Technik liebt, für den ist Shenzhens Huaqiangbei selbst das Ziel — Komponentenmärkte, Reparaturkultur, Gadget-Stände und Flagship-Stores Block um Block. Kommen Sie für das Erlebnis, Kleinteile und Reparaturen; bei Teurem gilt die DJI-Wahrheit: globale Marken, globale Preise. Hart feilschen, vor dem Zahlen prüfen.',
      priceRef: 'Bummeln gratis; Zubehör ab ¥10',
      whereToBuy: 'Huaqiangbei, Shenzhen (Metro Huaqiang Lu)',
    },
    {
      name: 'Brillen, fertig in 20 Minuten',
      tagline: 'Komplett ab ¥150–400 — 5–10× günstiger als im Westen',
      description: 'Vielleicht das beste Einzelangebot Chinas für Brillenträger. Pekings Glasses City ist eine ganze Mall voller Optiker; die Brille eines Besuchers war in 20 Minuten fertig. Rezept mitbringen (Foto der Glaswerte genügt) oder vor Ort messen lassen. Schließt gegen 17 Uhr.',
      priceRef: 'Komplett ¥150–400 (Fassung + Gläser)',
      whereToBuy: 'Beijing Glasses City (北京眼镜城)',
    },
    {
      name: 'Uniqlo Leinen & Basics',
      tagline: 'Leinen ~40 % unter EU, Rest ~20 %',
      description: 'Gemessen, nicht gefühlt: Ein EU-Shopper fand Leinen rund 40 % günstiger und alles andere etwa 20 % — jeden Sommer dasselbe Fazit. Uniqlo gibt es in jeder Mall; der leichteste gesicherte Spar-Effekt dieser Liste. Adidas und Nike kosten dagegen wie zu Hause.',
      priceRef: 'Leinenhemden ¥99–199; AIRism-Shirts ¥79',
      whereToBuy: 'Jeder Uniqlo-Laden in Malls; bundesweit gleiche Preise',
    },
    {
      name: 'Daunenjacken (Anta, 361°, Uniqlo)',
      tagline: 'Ernstes Warm, unernster Preis',
      description: 'Daunenjacken von Anta, 361° oder Uniqlo sind in chinesischen Malls sehr vernünftig bepreist — lohnend, wenn es in Ihr Reiseziel kalt geht oder Daunen zu Hause ein Vermögen kosten. Füllmenge variiert pro Modell, Etiketten vergleichen. In Singapur wohnend? Überspringen.',
      priceRef: 'Anta/361°: ¥300–700; Uniqlo: ¥499–799',
      whereToBuy: 'Markenläden in Einkaufszentren',
    },
    {
      name: 'Suzhou-Maulbeerseide',
      tagline: 'Familienmarke ohne jeden Online-Shop',
      description: 'Eine Reisende kaufte „so viel Seide“ bei der Familienmarke Xiuniang (绣娘) an der Pingjiang-Straße in Suzhou — hohe Qualität, mehrere Läden in der Stadt, bewusst kein Online-Shop. Genau die Sorte Fund, die es nur persönlich gibt. Echte Maulbeerseide (100-%-Label plus Prüfsiegel) kostet einen Bruchteil der Boutiquen daheim.',
      priceRef: 'Tücher ab ¥100–300; Kleidung ab ¥400',
      whereToBuy: 'Xiuniang (绣娘), Pingjiang-Straße, Suzhou — und weitere Suzhou-Läden',
    },
    {
      name: 'Hanfu, Tang-Anzüge & Seidentücher',
      tagline: 'Tragbare Mitbringsel mit echtem Charakter',
      description: 'Einheimische raten über Nippes hinweg: ein solider Tang-Anzug, ein Hanfu-Set oder feine Seidentücher sind Geschenke, die benutzt werden. Die Qualität variiert stark — vor Ort fühlen Sie Stoff und Naht, genau das, was auf AliExpress unmöglich ist. Suzhou und Xi’an sind die Klassiker.',
      priceRef: 'Tücher ¥80–300; Hanfu-Sets ¥300–800',
      whereToBuy: 'Hanfu-Straßen in Xi’an/Suzhou, Seidenläden, Museumsshops',
    },
    {
      name: 'Guter Tee (wirklich günstiger)',
      tagline: 'Qualitätstee für einen Bruchteil der Weltmarktpreise',
      description: '„Wirklich guter Tee ist in China viel günstiger als fast überall“ — eine der meist-upgevoteten Antworten, und sie stimmt. Der Schlüssel ist zu wissen, was Sie kaufen: dort kaufen, wo verkostet wird (Teemärkte, Markenläden wie Tenfu), lose Ware in trinkbarer Menge, die überpackten Touristen-Dosen auslassen.',
      priceRef: 'Trinkqualität ab ¥60–150 / 500 g',
      whereToBuy: 'Teemärkte mit Verkostung; Markenläden; Airport-Dosen meiden',
    },
    {
      name: 'Regionale Essensgeschenke',
      tagline: 'Von Krabbenroe-Nudeln bis Gewürzsets — begehrte Mitbringsel',
      description: 'Auf die Frage erfahrener Reisender kam als allererste Antwort ein Wort: „Essen!“ Regionale Spezialitäten — Krabbenroe-Nudel-Boxen aus Suzhou, Sichuan-Gewürzsets, Gebäck von Traditionsfirmen — sind leicht, günstig und werden daheim wirklich gebraucht. Kaufen Sie bei Marken-Flagships oder Laozihao, nicht an Touristenständen.',
      priceRef: 'Geschenkboxen ¥30–150',
      whereToBuy: 'Laozihao-Läden (老字号) und Marken-Flagships',
    },
    {
      name: 'ACG-Goods: Acryl-Ständer & Badges',
      tagline: '1/3–1/2 des japanischen Preises, oft besser gemacht',
      description: 'Der Insider-Pick für Anime-, Comic- und Game-Fans. Acryl-Ständer für Genshin Impact, Star Rail, ZZZ, Arknights u. a. kosten ein Drittel bis die Hälfte des japanischen Preises — oft mit innenliegendem Druck und mehrschichtigen Designs. Achtung: Viele Goods-Läden sind nicht als Refund-Geschäft registriert — für die Rückerstattung in registrierte Mall-Läden.',
      priceRef: 'Acryl-Ständer ¥20–60; Badges ¥10–30',
      whereToBuy: 'Goods-Läden (谷子店) in Big-City-Malls; Taobao-Flagships',
    },
    {
      name: 'Chinesische Figuren & Modellkits',
      tagline: 'In Japan offiziell zum ~2-fachen Preis',
      description: 'Chinesische Figurenmarken — Hasuki, Snail Shell, Animester, Apex — und Modellkit-Hersteller sind ernsthaft gut und werden nach Japan zum rund doppelten Preis exportiert. Direkt in China kaufen: über die Taobao-Flagships der Marken oder Fachläden. Vorsicht vor Bootlegs bei Drittanbietern.',
      priceRef: 'Figuren ¥100–600; Modellkits ¥80–400',
      whereToBuy: 'Marken-Taobao-Flagships; Figuren-Fachläden',
    },
    {
      name: 'Füllfederhalter & Schreibwaren',
      tagline: 'Ein ¥30-Stift mit dem Schreibgefühl eines ¥100-Stifts',
      description: 'China fertigt einen großen Teil der Stifte der Welt, und die Inlands-Füllfederhalter (Hero, Pilot China-Linien, Werkstattmarken) sind hervorragend im Preis — die natürliche Wahl für den Besucher, der gezielt nach Füllfederhaltern fragt. Schreibwaren-Counter in Malls und große Schreibwarenläden sind der einfache Einstieg.',
      priceRef: 'Ab ¥30; gute Alltagsstifte ¥80–300',
      whereToBuy: 'Große Schreibwarenläden und Mall-Counter',
    },
    {
      name: 'Xuan-Papier & Kalligrafie-Sets',
      tagline: 'Mitbringsel mit echtem Nutzen, ab Quelle',
      description: 'Ein Einheimischen-Tipp, den die meisten nie hören: Xuan-Papier aus Jingxian, Anhui — das Reisigpapier, auf dem chinesische Kalligrafie seit einem Jahrtausend schreibt — plus Tuschesteine und Pinsel zum Quellenpreis. Anders als die aufgeblasenen Touristen-Tonkannen sind Schreibwaren aus einer echten Kalligrafie-Straße ehrlich bepreist. Das Geschenk für alle, die schreiben oder zeichnen.',
      priceRef: 'Papier ab ¥30/100 Blatt; Sets ¥100–300',
      whereToBuy: 'Kalligrafie-Straßen (Liulichang in Peking; Wenhuajie in Xi’an)',
    },
    {
      name: 'Museumsshops (beginnend mit dem NMC)',
      tagline: 'Replikate und Designs, die es sonst nirgends gibt',
      description: '„Nationalmuseum China in Peking — exzellent!“ ist ein Zitat aus einem Reiseforum, und es verallgemeinert: Chinas große Museen haben ihre Shops zu Designstudios gemacht. Getreue Replikate, Tücher, Teeservices und Schreibwaren mit Bezug zu echten Sammlungen sind Geschenke mit Geschichte. Eintritt frei mit Reservierung.',
      priceRef: 'Souvenirs ¥30–300',
      whereToBuy: 'Museumsshop des Nationalmuseums China; große Museumsshops',
    },
  ],
}

export default pack
