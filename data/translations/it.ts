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
    "what-to-buy-in-china": {
      title: "Cosa comprare in Cina: cosa conviene davvero (e cosa no)",
      excerpt: "Powerbank, occhiali, lino Uniqlo, seta, gadget anime, tè — costruito su centinaia di resoconti reali di viaggiatori, con prezzi reali e il mito DJI smontato.",
      label: "Guida shopping",
      readTime: "Lettura di 11 min",
      content: "<p>«Cosa dovrei comprare in Cina?» è una delle domande più frequenti tra chi visita per la prima volta — un solo thread recente ha raccolto oltre cento risposte in due giorni. Risposta breve: la Cina è la fabbrica del mondo, ma non tutto è un affare. Questa guida mappa ciò che i viaggiatori esperti indicano all'unanimità come davvero più economico o impossibile da trovare a casa — e cosa saltare.</p><h2>Piccola elettronica e accessori</h2><p>Il punto dolce. Powerbank, caricabatterie GaN, cavi USB-C e batterie MagSafe di marchi cinesi (Anker, Ugreen, Baseus) costano il 30–50% in meno che in Europa o Nord America. Gli auricolari open-ear FreeClip di Huawei girano attorno a ¥1.200–1.400 (circa 170–190 $) e negli Stati Uniti semplicemente non si vendono ufficialmente. Un SSD NVMe 2 TB di marca costa circa ¥600–900. Per l'autenticità garantita: negozi di marca nei centri commerciali o JD con badge «自营». Trucco nei negozi Xiaomi di Shenzhen: comprate più cose e chiedete gentilmente uno sconto extra.</p><h2>Il mito DJI e Insta360</h2><p>La sorpresa: i prezzi DJI sono praticamente uniformi in tutto il mondo — parola di un ex dipendente dell'ufficio di Shenzhen. Le promozioni all'estero sono spesso migliori del prezzo cinese. Il calcolo onesto di un drone: stesso prezzo che a casa, meno l'11% circa di rimborso fiscale all'uscita dal paese. Su una fotocamera da ¥5.000 è denaro vero — la nostra <a href=\"/it/guides/china-tax-refund-guide\">guida al tax refund</a> spiega tutto passo passo.</p><h2>Occhiali pronti in 20 minuti</h2><p>Se portate occhiali, è forse l'affare migliore della Cina. Al Glasses City di Pechino — un intero centro commerciale di soli ottici — coppie complete (montatura più lenti) partono da ¥150–400, spesso pronte in 20 minuti. L'equivalente costa da cinque a dieci volte più in USA o Europa. Portate la ricetta (basta una foto dei parametri) o fate l'esame sul posto; chiude verso le 17.</p><h2>Uniqlo, piumini e seta</h2><p>Uniqlo in Cina è misurabilmente più economico che in Europa — una acquirente appena rientrata dall'UE ha rilevato circa il 40% in meno sul lino e il 20% sul resto, e ogni estate si ripete. I piumini Anta, 361° o Uniqlo sono un ottimo affare se venite da un paese senza inverni rigidi. Il più cinese dei souvenir: la seta. Il marchio familiare Xiuniang (绣娘), in via Pingjiang a Suzhou, vende seta di gelso che i locali garantiscono — senza alcun negozio online.</p><h2>Tè, cibo e negozi di museo</h2><p>Il buon tè in Cina costa drammaticamente meno che quasi ovunque. Comprate dove potete assaggiare (mercati del tè, negozi di marca) e saltate le lattine turistiche sovraconfezionate. Come souvenir commestibile, le specialità regionali — cofanetti di noodles al corallo di granchio, kit di spezie, pasticceria storica — battono tutto. E non sottovalutate i negozi dei musei: quello del Museo Nazionale della Cina è famosamente eccellente.</p><h2>Gadget ACG: la scelta degli addetti ai lavori</h2><p>Se amate anime, fumetti o videogiochi, la Cina è silenziosamente il miglior mercato del mondo. I stand acrilici per Genshin Impact, Honkai: Star Rail, ZZZ, Arknights costano da un terzo a metà del prezzo giapponese — spesso meglio fatti, con la stampa annegata nell'acrilico e design multistrato reattivi alla luce. I marchi cinesi di figure (Hasuki, Snail Shell, Animester, Apex) si esportano ufficialmente in Giappone a circa il doppio. Stilografiche e carta Xuan di Jingxian, Anhui, sono souvenir che la gente usa davvero.</p><h2>Cosa NON comprare</h2><p>Adidas e Nike costano come a casa; il lusso è semmai più caro. Le teiere in argilla viola delle strade turistiche sono gonfissime. Il «prezzo all'ingrosso» di 1688.com richiede il cinese e una lotteria sulla qualità — inutile in un viaggio breve. E i mercati del falso, beh, non ci pensavate comunque.</p><h2>Dove fare shopping, città per città</h2><p>Shenzhen per la tech — Huaqiangbei è il mercato di elettronica più denso della Terra. Pechino per occhiali e regali da museo. Shanghai per flagship store e grandi centri. Suzhou per la seta. Poco tempo? Taobao e JD consegnano in hotel — a volte entro un'ora — la nostra <a href=\"/it/guides/taobao-jd-for-tourists\">guida allo shopping online</a> mostra come. Tutti i consigli con prezzi di riferimento: la nostra <a href=\"/it/shopping\">directory shopping</a>.</p>",
    },
    "china-tax-refund-guide": {
      title: "Tax refund in uscita dalla Cina: guida passo passo",
      excerpt: "¥200 nello stesso negozio, circa l'11% indietro — all'aeroporto o subito in negozio. Chi ne ha diritto, la sequenza esatta degli sportelli e gli errori che costano denaro vero.",
      label: "Tax refund",
      readTime: "Lettura di 7 min",
      content: "<p>Un viaggiatore ha comprato il nuovissimo Insta360 X6 a Shanghai, compilato ogni modulo di rimborso correttamente — e poi all'aeroporto è rimasto senza tempo, ha mancato lo sportello giusto e ha rischiato di perdere l'11% su una fotocamera da ¥4.000. Il rimborso fiscale in uscita (离境退税) è davvero generoso dal restyling di aprile 2025 — ma il processo ha spigoli vivi. Tutto il sistema in cinque minuti.</p><h2>Chi ne ha diritto</h2><p>Detentori di passaporto straniero e residenti di Hong Kong, Macao e Taiwan con permanenza continua di massimo 183 giorni nella Cina continentale. Gli acquisti devono provenire da negozi convenzionati, restare inutilizzati e uscire dal paese con voi — a mano o stivati — entro 90 giorni dall'acquisto.</p><h2>I numeri che contano</h2><p>Minimo: ¥200 nello stesso negozio convenzionato lo stesso giorno (prima di aprile 2025 erano ¥500). Importo: circa l'11% del prezzo (8% su alcune categorie), al netto delle commissioni. Rimborso in contanti fino a ¥20.000 a persona; quello immediato in negozio arriva ormai a ¥220.000.</p><h2>Passo 1 — Comprare nei negozi convenzionati</h2><p>Cercate il logo ufficiale «离境退税 TAX REFUND» all'ingresso o in cassa. I grandi negozi dei centri commerciali (Huawei, DJI, Insta360, grandi marchi di seta e tè) di solito sono registrati; le bancarelle mai. Al pagamento, mostrate il passaporto e chiedete il modulo di richiesta (离境退税申请单) insieme alla fattura dettagliata (发票). Niente passaporto, niente modulo. Gli acquisti online (Taobao/JD) non sono ammessi.</p><h2>Passo 2 — Fare le valigie con intelligenza</h2><p>La merce deve restare inutilizzata e ispezionabile. Ciò che va in stiva deve essere ispezionato dalla dogana PRIMA del check-in — decidete la sera prima, e tenete moduli, fatture e acquisti in un'unica cartelletta.</p><h2>Passo 3 — All'aeroporto</h2><p>Mettete in conto 30–45 minuti extra. Sequenza: prima verifica doganale (merce in stiva allo sportello landside prima del check-in, bagaglio a mano dopo i controlli pasaporti), poi lo sportello dell'agenzia o i chioschi automatici. Rimborso in contanti RMB o su carta. Dal 2026, gli acquisti sotto ¥10.000 vengono ispezionati a campione — più veloce, ma la merce deve restare mostrabile.</p><h2>«即买即退»: rimborso immediato in negozio</h2><p>Dal 2025 i negozi aderenti rimborsano sul posto: firmate un accordo, lasciate una pre-autorizzazione su carta di credito come garanzia e incassate subito. Se la merce poi non esce dal paese con voi, la carta viene addebitata. Disponibile in molti grandi magazzini — chiedete «支持即买即退吗?».</p><h2>Gli errori che costano denaro</h2><p>I classici: perdere il modulo (niente modulo, niente rimborso); stivare gli acquisti prima che la dogana li veda; arrivare tardi all'aeroporto; comprare in negozi non registrati; sforare i 90 giorni nei lunghi viaggi. L'acquirente dell'Insta360 sopra ha fatto tutto giusto e ha comunque rischiato per uno sportello non trovato e un orologio tiranno — lasciatevi margine.</p><h2>Checklist rapida</h2><p>Passaporto addosso quando si compra ✓ · logo «TAX REFUND» ✓ · modulo + fatture in una cartelletta ✓ · merce inutilizzata e a portata ✓ · 45 minuti extra in aeroporto ✓ · prima la dogana, poi lo sportello ✓. Da abbinare alla <a href=\"/it/guides/what-to-buy-in-china\">guida su cosa comprare</a> e alla <a href=\"/it/shopping\">directory shopping</a>.</p>",
    },
    "taobao-jd-for-tourists": {
      title: "Taobao e JD per turisti: fare shopping online come un locale",
      excerpt: "Il vero eldorado dello shopping cinese è online: più economico e in hotel entro poche ore. Configurare i pagamenti, riconoscere le recensioni false, resi indolore — più il trucco della reception senza alcun account.",
      label: "Shopping online",
      readTime: "Lettura di 8 min",
      content: "<p>Chiedete ai visitatori esperti dov'è il vero eldorado dello shopping cinese: la risposta è quasi unanime, online. Prezzi più bassi, consegne assurde — a volte sotto l'ora nelle grandi città — e resi spietatamente a favore del cliente. L'unico ostacolo: app pensate per i locali. Ecco il manuale completo, incluso un trucco che non richiede alcun account.</p><h2>JD vs Taobao vs 1688</h2><p>JD.com è la vendita diretta di Amazon fatta cinese: gli articoli col badge «自营» sono autentici e assurdamente rapidi — un viaggiatore ha ricevuto la consegna in meno di un'ora a Chongqing. Taobao è un megamarketplace con tutta la gamma di qualità, ma i flagship store di marca (旗舰店) — Xiaomi, Huawei, perfino brand boutique come Songmont — sono ufficiali e di solito un po' più economici del negozio fisico. 1688.com è la fonte all'ingrosso dietro a tutto; serve il cinese e una lotteria sulla qualità — inutile in due settimane.</p><h2>Configurazione (10 minuti)</h2><p>Installate Alipay e collegate la vostra Visa/Mastercard internazionale — paga sia su Taobao che su JD. L'app Taobao ha l'interfaccia in inglese (lingua nelle impostazioni); per le pagine ostinate, la traduzione della fotocamera. jd.com funziona bene con il traduttore del browser. Per l'indirizzo, fatevi scrivere dalla reception quello cinese e incollatelo — le consegne in hotel in Cina sono la norma.</p><h2>Giudicare la qualità come un locale</h2><p>I cinesi leggono le recensioni a modo loro: aprite prima le schede 差评 (recensioni negative) e 最新 (più recenti) — la freschezza è difficile da falsificare. Distinguete il tono macchina dal dettaglio genuino, e trattate le recensioni con foto come oro. Preferite gli annunci con 运费险 (assicurazione reso). Delusi? Richiedete il reso in app; un corriere ritira in hotel e il rimborso arriva in giorni. Questa rete di sicurezza è il motivo per cui i locali ordinano senza paura.</p><h2>Il trucco della reception</h2><p>Nessun account, nessun problema — con una mossa a cui gli hotel sono abituatissimi: mostrate alla reception esattamente cosa volete (foto o link) e chiedete di ordinarlo in hotel. Saldate in contanti o via bonifico WeChat/Alipay. La consegna richiede in genere 3–4 giorni — fatelo nei primi giorni, non nell'ultimo.</p><h2>Cosa conviene ordinare</h2><p>I classici: una valigia Xiaomi 20 pollici (circa ¥315 su Taobao) o l'equivalente 90go (circa ¥254) — online quasi sempre meno che in negozio; cavi, caricabatterie GaN e supporti per poche decine di yuan; cofanetti di dolciumi regionali. La nostra <a href=\"/it/shopping\">directory shopping</a> elenca tutto con prezzi di riferimento — screenshot da mostrare alla reception.</p><h2>Attenzioni</h2><p>Quando l'autenticità conta: solo flagship store o JD 自营. Le taglie vanno piccole — guardate i centimetri, non le lettere. La garanzia dell'elettronica di solito vale solo in Cina. E ricordate: gli acquisti online non danno diritto al tax refund — per capi costosi come le fotocamere, comprate in un negozio fisico convenzionato seguendo la nostra <a href=\"/it/guides/china-tax-refund-guide\">guida al tax refund</a>.</p>",
    },
  },
  shoppingItems: [
    {
      name: "Powerbank, caricabatterie GaN e cavi",
      tagline: "Scelta n. 1 dei viaggiatori — 30–50% in meno che a casa",
      description: "Gli accessori Anker, Ugreen e Baseus costano drasticamente meno che in Europa o Nord America — viaggiatori dall'Italia e Singapore dicono lo stesso. Caricabatterie 65W + powerbank 10.000 mAh + cavi intrecciati possono costare meno di un solo caricabatterie a casa. Pensate anche alla batteria MagSafe.",
      priceRef: "Cavi da ¥20; caricabatterie ¥60–150; powerbank ¥80–200",
      whereToBuy: "JD 自营, negozi Anker o il piano digitale di ogni centro commerciale",
    },
    {
      name: "Valigia Xiaomi (la famosa valigia da ¥315)",
      tagline: "Cabin trolley 20 pollici ben costruito, a prezzo sano",
      description: "Le valigie Xiaomi hanno fama tra i viaggiatori — c'è chi ne ha due di taglie diverse. La 20 pollici costa circa ¥315 su Taobao, l'equivalente 90go dell'ecosistema Xiaomi circa ¥254. Online quasi sempre un po' meno che in negozio; consegna in hotel in 3–4 giorni. Al negozio Xiaomi: comprate più cose e chiedete gentilmente uno sconto extra.",
      priceRef: "20 pollici: ¥315 (equivalente 90go ¥254)",
      whereToBuy: "Flagship Xiaomi su Taobao o negozi Mi Home",
    },
    {
      name: "Auricolari Huawei FreeClip",
      tagline: "Circa 170 $ — e negli USA non si trovano",
      description: "Gli open-ear FreeClip di Huawei sono diventati il souvenir virale: un visitatore americano li ha pagati circa 177 $ e tutta la famiglia era invidiosa. Negli Stati Uniti non ci sono vendite ufficiali. Due avvertenze oneste: audio un gradino sotto gli AirPods, garanzia solo Cina.",
      priceRef: "≈¥1.200–1.400 (circa 170–190 $)",
      whereToBuy: "Negozi Huawei nei centri commerciali o JD 自营",
    },
    {
      name: "SSD e archiviazione",
      tagline: "2 TB per una frazione del prezzo occidentale",
      description: "Un viaggiatore indiano è stato diretto: i dischi da 2 e perfino 5 TB costano «una frazione» che a casa. Restate su marchi noti (Samsung, WD, Crucial, Kingston) via JD 自营 — lì c'è la garanzia di autenticità.",
      priceRef: "2 TB NVMe: ¥600–900",
      whereToBuy: "Solo JD 自营 (badge «自营»)",
    },
    {
      name: "E-reader",
      tagline: "Modelli correnti ¥500–1.500",
      description: "Gli e-reader cinesi come iReader partono da ¥500–1.500 per i modelli correnti, top di gamma oltre ¥2.000. Un visitatore britannico si poneva esattamente la domanda: l'hardware è più economico, ma verificate prima che lingua del firmware ed ecosistema libreria vi convincono.",
      priceRef: "Modelli correnti ¥500–1.500",
      whereToBuy: "JD 自营 o negozi di marca",
    },
    {
      name: "Huaqiangbei: il mercato di elettronica più denso del mondo",
      tagline: "Tanta tecnologia in un solo posto non esiste altrove",
      description: "Se amate la tecnologia, il Huaqiangbei di Shenzhen è una destinazione in sé — mercati di componenti, cultura della riparazione, banchi di gadget e flagship store isolato dopo isolato. Andate per l'esperienza, i piccoli accessori e le riparazioni; per i capi costosi, ricordate la verità DJI: marchi globali, prezzi globali. Contrattate forte, verificate prima di pagare.",
      priceRef: "Gironzare gratis; accessori da ¥10",
      whereToBuy: "Huaqiangbei, Shenzhen (metro Huaqiang Lu)",
    },
    {
      name: "Occhiali pronti in 20 minuti",
      tagline: "Coppie complete da ¥150–400 — 5–10× meno che in Occidente",
      description: "Forse il miglior affare della Cina per chi porta occhiali. Il Glasses City di Pechino è un centro commerciale fatto solo di ottici; il paio di un visitatore era pronto in 20 minuti. Portate la ricetta (basta una foto dei parametri) o fate l'esame sul posto. Chiusura verso le 17.",
      priceRef: "Coppie complete ¥150–400 (montatura + lenti)",
      whereToBuy: "Beijing Glasses City (北京眼镜城)",
    },
    {
      name: "Lino e basics Uniqlo",
      tagline: "Lino ~40% sotto l'UE, il resto ~20%",
      description: "Misurato, non sensazioni: un'acquirente con base UE ha rilevato circa il 40% in meno sul lino e il 20% sul resto — ogni estate la stessa conclusione. Uniqlo è in ogni centro commerciale: il risparmio più garantito della lista. Adidas e Nike, invece, costano come a casa.",
      priceRef: "Camicie lino ¥99–199; t-shirt AIRism ¥79",
      whereToBuy: "Qualsiasi Uniqlo nei centri; stesso prezzo in tutta la Cina",
    },
    {
      name: "Piumini (Anta, 361°, Uniqlo)",
      tagline: "Calore serio, prezzo non serio",
      description: "I piumini Anta, 361° o Uniqlo sono molto ben prezzati nei centri commerciali cinesi — interessante se andate verso il freddo o venite da un paese dove il piumino costa una fortuna. L'imbottitura varia per modello: confrontate le etichette. Se vivete a Singapore, saltatelo.",
      priceRef: "Anta/361°: ¥300–700; Uniqlo: ¥499–799",
      whereToBuy: "Negozi di marca nei centri commerciali",
    },
    {
      name: "Seta di gelso di Suzhou",
      tagline: "Marchio familiare senza alcun negozio online",
      description: "Una viaggiatrice ha comprato «tantissima» seta dal marchio familiare Xiuniang (绣娘), in via Pingjiang a Suzhou — alta qualità, più negozi in città e, apposta, nessuno store online. Proprio il tipo di trovato che si fa solo di persona. La vera seta di gelso (etichetta 100% e certificato) costa una frazione delle boutique estere.",
      priceRef: "Sciarpe da ¥100–300; capi da ¥400",
      whereToBuy: "Xiuniang (绣娘), via Pingjiang, Suzhou — e gli altri negozi in città",
    },
    {
      name: "Hanfu, abiti Tang e sciarpe di seta",
      tagline: "Souvenir indossabili con carattere vero",
      description: "Il consiglio dei locali: oltre i ninnoli — un vero abito Tang, un set hanfu o belle sciarpe di seta sono regali che si continuano a usare. La qualità varia enormemente tra atelier; dal vivo toccate tessuto e cuciture, cosa impossibile su AliExpress. Suzhou e Xi'an sono i classici.",
      priceRef: "Sciarpe ¥80–300; set hanfu ¥300–800",
      whereToBuy: "Vie hanfu di Xi'an/Suzhou, negozi di seta, negozi di museo",
    },
    {
      name: "Buon tè (davvero più economico)",
      tagline: "Il tè di qualità a una frazione del prezzo mondiale",
      description: "«Il buon tè in Cina costa molto meno che quasi ovunque» — una delle risposte più votate, ed è vero. La chiave è sapere cosa comprate: dove si assaggia (mercati del tè, negozi di marca come Tenfu), sfuso e in quantità bevibile, via le lattine turistiche.",
      priceRef: "Qualità quotidiana da ¥60–150 / 500 g",
      whereToBuy: "Mercati del tè con degustazione; negozi di marca; evitate le lattine d'aeroporto",
    },
    {
      name: "Regali gastronomici regionali",
      tagline: "Dai noodles al corallo di granchio ai kit di spezie",
      description: "A un thread di viaggiatori stagionati, la prima risposta è stata una parola: «Cibo!». Le specialità regionali — cofanetti di noodles al corallo di granchio di Suzhou, kit di spezie del Sichuan, pasticceria storica — sono leggere, economiche e davvero benvenute a casa. Comprate da marche o laozihao, non dai banchi turistici.",
      priceRef: "Cofanetti ¥30–150",
      whereToBuy: "Negozi laozihao (老字号) e flagship di marca",
    },
    {
      name: "Gadget ACG: stand acrilici e badge",
      tagline: "1/3–1/2 del prezzo giapponese, spesso meglio fatti",
      description: "La scelta degli addetti ai lavori per chi ama anime e giochi. Stand acrilici per Genshin Impact, Star Rail, ZZZ, Arknights a un terzo o metà del prezzo giapponese — spesso con stampa interna e design multistrato. Attenzione: molti negozi di gadget non sono convenzionati per il tax refund; per il rimborso, negozi registrati nei centri commerciali.",
      priceRef: "Stand acrilici ¥20–60; badge ¥10–30",
      whereToBuy: "Negozi di gadget (谷子店) nei centri delle grandi città; flagship su Taobao",
    },
    {
      name: "Figure e modelli cinesi",
      tagline: "Esportati ufficialmente in Giappone a ~2× il prezzo",
      description: "I marchi cinesi di figure — Hasuki, Snail Shell, Animester, Apex — e i produttori di modelli sono diventati seriamente bravi, e in Giappone si esportano ufficialmente a circa il doppio. Comprate direttamente dai flagship Taobao dei marchi o nei negozi specializzati. Occhio ai bootleg dei venditori terzi.",
      priceRef: "Figure ¥100–600; modelli ¥80–400",
      whereToBuy: "Flagship Taobao dei marchi; negozi specializzati",
    },
    {
      name: "Stilografiche e cancelleria",
      tagline: "Una penna da ¥30 con la scrittura di una da ¥100 all'estero",
      description: "La Cina produce gran parte delle penne del mondo, e le stilografiche del mercato interno (Hero, linee cinesi di Pilot, marchi d'atelier) hanno un rapporto qualità-prezzo eccellente — la scelta naturale per chi chiede proprio di stilografiche. I reparti cancelleria dei centri e le grandi cartolerie sono l'ingresso facile.",
      priceRef: "Da ¥30; buone penne quotidiane ¥80–300",
      whereToBuy: "Grandi cartolerie e banchi nei centri commerciali",
    },
    {
      name: "Carta Xuan e set di calligrafia",
      tagline: "Souvenir davvero utili, dal luogo di produzione",
      description: "Il consiglio locale che quasi nessuno sente: carta Xuan di Jingxian, Anhui — la carta su cui la calligrafia cinese scrive da un millennio — più pietre d'inchiostro e pennelli a prezzo di fonte. Al contrario delle teiere gonfiate, la cancelleria di una vera via d'arte è prezzata onestamente. Il regalo per chi scrive o disegna.",
      priceRef: "Carta da ¥30/100 fogli; set ¥100–300",
      whereToBuy: "Vie della calligrafia (Liulichang a Pechino; Wenhua Jie a Xi'an)",
    },
    {
      name: "Negozi di museo (a partire dal NMC)",
      tagline: "Repliche e design introvabili altrove",
      description: "«Il Museo Nazionale della Cina a Pechino — eccellentissimo!» è una citazione testuale, e vale in generale: i grandi musei cinesi hanno trasformato i loro negozi in studi di design. Repliche fedeli, sciarpe, servizi da tè e cancelleria legate a collezioni reali: regali con una storia. Ingresso gratis su prenotazione.",
      priceRef: "Souvenir ¥30–300",
      whereToBuy: "Negozio del Museo Nazionale della Cina; grandi negozi di museo",
    },
  ],
}

export default pack
