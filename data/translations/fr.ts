// Français (fr) — pack de traduction de contenu
// ---------------------------------------------------------------
// Structure identique à data/travel-data.ts ; les champs L sont écrits
// directement en français. Champs principaux uniquement (villes +
// métadonnées des guides) ; le reste revient à l'anglais au build.
// ---------------------------------------------------------------
import type { LocalePack } from '../localize'

const pack: LocalePack = {
  cities: {
    chengdu: {
      name: "Chengdu",
      region: "Sud-Ouest de la Chine",
      tagline: "Là où le rythme ralentit et où la vie a meilleur goût",
      tags: "Pandas,Cuisine épicée,Culture des maisons de thé,Douceur de vivre",
      description:
        "Capitale du Sichuan et berceau de l'ancienne civilisation Shu, Chengdu est surnommée « Pays d'Abondance » depuis plus de 2 000 ans — la seule ville chinoise dont le site et le nom n'ont jamais changé depuis sa fondation. Les habitants qualifient la bonne vie de « bashi » — confortable, facile, tout simplement juste — et vous le ressentirez dès que vous vous affalerez dans un fauteuil en bambou, tasse de thé au jasmin à la main. Au-delà des pandas géants et du feu vert piquant de la marmite sichuanaise, Chengdu est la porte d'entrée vers les sommets enneigés du Tibet et les eaux de conte de fées de Jiuzhaigou.",
      intro:
        "Chengdu siège au centre du bassin du Sichuan, nourrie depuis deux millénaires par le système d'irrigation de Dujiangyan. C'est une ville où la vie avance lentement — les locaux passent les après-midis autour d'un thé en gaiwan et de mahjong bruyant, puis filent vers la marmite et les bars du pont Jiuyan à la nuit tombée. L'UNESCO l'a nommée Ville de la Gastronomie, et de la base d'élevage des pandas aux ruelles anciennes de Kuanzhai, chaque coin récompense un rythme posé. Venez pour les pandas, restez pour le thé.",
      history:
        "Plus de 2 600 ans d'histoire — la seule ville chinoise dont le site et le nom sont restés inchangés depuis la fondation. Le nom vient de la phrase des Zhou « en trois ans, ce fut une cité » ; le surnom de « Ville de l'Hibiscus » remonte à un empereur du Xe siècle qui fit planter des hibiscus le long des remparts.",
      bestSeason: "Mars–juin et septembre–novembre (le printemps et l'automne sont les plus doux ; moyenne annuelle 16 °C)",
      duration: "3 à 4 jours recommandés (+1 à 2 jours pour Dujiangyan et le mont Qingcheng)",
    },
    xian: {
      name: "Xi'an",
      region: "Nord-Ouest de la Chine",
      tagline: "Parcourir 3 000 ans d'histoire en une seule ville",
      tags: "Armée en terre cuite,Remparts anciens,Dynastie Tang,Route de la Soie",
      description:
        "Xi'an — l'antique Chang'an — fut la capitale de 13 dynasties et le point de départ oriental de la Route de la Soie. Armée en terre cuite, immense enceinte Ming parfaitement préservée et quartier musulman bouillonnant : une ville où 3 000 ans d'histoire restent étonnamment vivants.",
      intro:
        "Connue jadis sous le nom de Chang'an, la « Ville de la Paix Éternelle », Xi'an est au cœur de l'histoire chinoise ancienne. Treize dynasties y établirent leur capitale, des Qin qui unifièrent la Chine pour la première fois jusqu'aux Tang dont l'âge d'or définit encore l'identité culturelle du pays. Ce fut le terminus oriental de la Route de la Soie, cette artère qui relia l'Orient et l'Occident pendant des siècles. Aujourd'hui, on fait à vélo le tour des 13,7 km de remparts anciens (les plus vastes et mieux conservés de Chine), on se tient devant des milliers de guerriers en terre cuite grandeur nature et l'on mange son chemin dans le quartier musulman. Peu de villes rendent 3 000 ans d'histoire aussi présents.",
      history: "Capitale de 13 dynasties (des Zhou aux Tang) pendant près de 1 100 ans ; plus de 3 100 ans d'histoire urbaine",
      bestSeason: "Mars à mai, septembre à novembre (le printemps et l'automne sont idéaux)",
      duration: "3 à 5 jours recommandés",
    },
    beijing: {
      name: "Pékin",
      region: "Nord de la Chine",
      tagline: "Là où régnaient les empereurs, où la Grande Muraille touche le ciel",
      tags: "Cité Interdite,Grande Muraille,Hutongs,Canard de Pékin,Capitale impériale",
      description:
        "La capitale de la Chine — une ville de palais impériaux, de Grande Muraille, de hutongs centenaires et d'une scène gastronomique qui va bien au-delà du canard de Pékin. Trois mille ans d'histoire et six dynasties ont laissé leur marque à chaque coin de rue.",
      intro:
        "Pékin est la capitale de la Chine et son cœur politique, culturel et historique : plus de 3 000 ans d'histoire urbaine et plus de 850 ans en tant que capitale impériale. À la splendeur des Jin, Yuan, Ming et Qing se superposent les ruelles hutong, la Grande Muraille et une scène culinaire naguère élue meilleure de Chine continentale. Quelle que soit la durée de votre séjour, la ville garde toujours un secret de plus à révéler.",
      history: "Plus de 3 000 ans d'histoire, capitale pendant plus de 850 ans, ville de six dynasties",
      bestSeason: "Automne (sept.–nov.) — air sec et feuilles rouges aux Collines Parfumées ; foires de temples en hiver (déc.–févr.)",
      duration: "5 jours recommandés",
    },
  },
  guides: {
    "xian-3-day-classic-route": {
      title: "3 jours à Xi'an : Armée en terre cuite, remparts et street food",
      excerpt:
        "Première fois à Xi'an ? Cet itinéraire de 3 jours couvre tous les incontournables, les meilleures adresses de street food et des conseils de transport pratiques. Suivez-le étape par étape.",
      label: "3 jours / 2 nuits",
      readTime: "8 min de lecture",
    },
    "beijing-off-the-beaten-path": {
      title: "Au-delà des cartes postales : 5 jours de vrai Pékin",
      excerpt:
        "Pékin est bien plus que la Cité Interdite et la Grande Muraille. Ce guide vous emmène dans les hutongs, les musées cachés et les rues gourmandes où mangent vraiment les Pékinois.",
      label: "5 jours / 4 nuits",
      readTime: "10 min de lecture",
    },
    "chengdu-food-guide": {
      title: "Le guide gastronomique de Chengdu : des gargotes aux maisons centenaires",
      excerpt:
        "Marmite, brochettes, nouilles dandan, têtes de lapin… 20 adresses chéries des locaux, des trous dans le mur aux institutions centenaires.",
      label: "Carte gourmande",
      readTime: "7 min de lecture",
    },
    "first-trip-to-china-guide": {
      title: "Premier voyage en Chine : le guide de préparation complet",
      excerpt:
        "Visas, applications de paiement, SIM, transports — tout ce qu'il faut savoir avant un premier voyage en Chine, réuni au même endroit.",
      label: "Guide débutant",
      readTime: "12 min de lecture",
    },
    "best-time-to-visit-china": {
      title: "Quand partir en Chine : le guide saison par saison",
      excerpt:
        "Fleurs de printemps, montagnes d'été, feuillages d'automne, festivals d'hiver. Voici la meilleure période pour chaque région de Chine.",
      label: "Préparer le voyage",
      readTime: "6 min de lecture",
    },
    "what-to-buy-in-china": {
      title: "Acheter en Chine : ce qui vaut vraiment le coup (et ce qui non)",
      excerpt: "Batteries externes, lunettes, lin Uniqlo, soie, goodies anime, thé — compilé à partir de centaines de retours de voyageurs, avec des prix réels et le mythe DJI démonté.",
      label: "Guide shopping",
      readTime: "11 min de lecture",
      content: "<p>« Qu'est-ce que j'achète en Chine ? » est l'une des questions les plus fréquentes des primo-visiteurs — un seul fil récent y a attiré plus de cent réponses en deux jours. Réponse courte : la Chine est l'usine du monde, mais tout n'y est pas une affaire. Ce guide cartographie ce que les voyageurs expérimentés citent comme vraiment moins cher ou introuvable ailleurs — et ce qu'il faut éviter.</p><h2>Petite électronique & accessoires</h2><p>Le cœur de la cible. Batteries externes, chargeurs GaN, câbles USB-C et batteries MagSafe des marques chinoises (Anker, Ugreen, Baseus) coûtent souvent 30 à 50 % de moins qu'en Europe ou en Amérique du Nord. Les écouteurs open-ear FreeClip de Huawei tournent autour de ¥1 200–1 400 (environ 170–190 $) et sont tout simplement introuvables officiellement aux États-Unis. Un SSD NVMe 2 To de marque coûte environ ¥600–900. Pour une authenticité garantie : boutiques de marque en centre commercial ou JD badge « 自营 » (vendu par JD). Astuce dans les boutiques Xiaomi de Shenzhen : achetez plusieurs articles et demandez poliment une remise supplémentaire.</p><h2>Le mythe DJI & Insta360</h2><p>La surprise : les prix DJI sont quasi identiques dans le monde entier — selon un ancien salarié du bureau de Shenzhen. Les promos à l'étranger sont souvent meilleures qu'en Chine. Le calcul honnête pour un drone : prix identique à chez vous, moins environ 11 % de détaxe à la sortie du territoire. Sur un appareil à ¥5 000, c'est de l'argent réel — notre <a href=\"/fr/guides/china-tax-refund-guide\">guide de la détaxe</a> détaille tout.</p><h2>Des lunettes prêtes en 20 minutes</h2><p>Pour les porteurs de lunettes, probablement la meilleure affaire de Chine. Le Glasses City de Pékin — un centre commercial entièrement composé d'opticiens — propose des paires complètes (monture + verres) dès ¥150–400, souvent prêtes en 20 minutes. L'équivalent coûte cinq à dix fois plus aux États-Unis ou en Europe. Apportez votre ordonnance (une photo de vos paramètres de verres suffit) ou faites un examen sur place ; fermeture vers 17 h.</p><h2>Uniqlo, doudounes & soie</h2><p>Uniqlo est mesurablement moins cher en Chine qu'en Europe — une shopper fraîchement rentrée d'Europe a constaté environ 40 % de moins sur le lin et 20 % sur le reste. Les doudounes Anta, 361° ou Uniqlo sont une excellente affaire si vous venez d'un pays sans hivers rudes. Le plus chinois des achats : la soie. La marque familiale Xiuniang (绣娘), rue Pingjiang à Suzhou, vend de la soie de mûrier que les locaux cautionnent — sans aucune boutique en ligne.</p><h2>Thé, gastronomie & boutiques de musée</h2><p>Le très bon thé est dramatiquement moins cher en Chine que presque partout ailleurs. Achetez là où l'on peut déguster (marchés au thé, boutiques de marque) et sautez les boîtes sur-emballées pour touristes. Pour les souvenirs gourmands, les spécialités régionales — coffrets de nouilles au corail de crabe, kits d'épices, pâtisseries de maisons centenaires — battent tout. Et ne négligez pas les boutiques de musée : celle du Musée national de Chine est célèbre pour son excellence.</p><h2>Goodies ACG : le choix des initiés</h2><p>Si vous aimez anime, comics ou jeux, la Chine est discrètement le meilleur marché du monde. Les stands acryliques pour Genshin Impact, Honkai: Star Rail, ZZZ ou Arknights coûtent un tiers à la moitié du prix japonais — souvent mieux fabriqués, avec l'impression noyée dans l'acrylique et des designs multicouches réactifs à la lumière. Les marques chinoises de figurines (Hasuki, Snail Shell, Animester, Apex) s'exportent officiellement au Japon à environ le double du prix chinois. Stylos-plumes et papier Xuan de Jingxian (Anhui) sont des souvenirs que l'on utilise vraiment.</p><h2>Ce qu'il ne faut PAS acheter</h2><p>Adidas et Nike sont au prix de chez vous, le luxe y est plutôt plus cher. Les théières en argile pourpre des rues touristiques sont gonflées. Le « prix de gros » de 1688.com exige de lire le chinois et de jouer à la loterie qualité — à éviter sur un court séjour. Et les marchés de contrefaçons, vous n'y pensiez déjà pas.</p><h2>Où shopper, ville par ville</h2><p>Shenzhen pour la tech — Huaqiangbei est le marché d'électronique le plus dense de la planète. Pékin pour les lunettes et les cadeaux de musée. Shanghai pour les flagship stores et les grands centres. Suzhou pour la soie. Emploi du temps serré ? Taobao et JD livrent à votre hôtel — parfois en moins d'une heure — notre <a href=\"/fr/guides/taobao-jd-for-tourists\">guide shopping en ligne</a> montre comment. Toutes nos recommandations avec prix de référence : notre <a href=\"/fr/shopping\">répertoire shopping</a>.</p>",
    },
    "china-tax-refund-guide": {
      title: "Détaxe à la sortie de Chine : le guide étape par étape",
      excerpt: "¥200 dépensés dans le même magasin, environ 11 % remboursés — à l'aéroport ou immédiatement en boutique. Conditions, enchaînement exact des guichets et erreurs qui coûtent cher.",
      label: "Détaxe",
      readTime: "7 min de lecture",
      content: "<p>Un voyageur a acheté le tout nouvel Insta360 X6 à Shanghai, rempli chaque formulaire de détaxe sans faute — puis, à l'aéroport, a manqué de temps, raté le bon guichet et failli perdre les 11 % de remboursement sur un appareil à ¥4 000. La détaxe de sortie chinoise (离境退税) est réellement généreuse depuis la refonte d'avril 2025 — mais le processus a des angles vifs. Voici tout le système en cinq minutes.</p><h2>Qui y a droit</h2><p>Les titulaires d'un passeport étranger et les résidents de Hong Kong, Macao et Taïwan, présents moins de 183 jours consécutifs en Chine continentale. Les achats doivent provenir de magasins agréés détaxe, rester inutilisés et sortir du pays avec vous dans les 90 jours suivant l'achat.</p><h2>Les chiffres qui comptent</h2><p>Seuil minimum : ¥200 dans le même magasin agréé le même jour (contre ¥500 avant avril 2025). Montant remboursé : environ 11 % du prix (8 % sur certaines catégories), frais d'agence déduits. Remboursement en espèces plafonné à ¥20 000 par personne ; remboursement immédiat en boutique désormais jusqu'à ¥220 000.</p><h2>Étape 1 — Acheter dans un magasin détaxe</h2><p>Repérez le logo officiel « 离境退税 TAX REFUND » à l'entrée ou en caisse. Les grandes boutiques de centres commerciaux (Huawei, DJI, Insta360, grandes marques de soie et de thé) sont généralement enregistrées ; les étals de marché, jamais. Au paiement, présentez votre passeport et demandez le formulaire de demande de remboursement (离境退税申请单) avec la facture détaillée (发票). Pas de passeport, pas de formulaire. Les achats en ligne (Taobao/JD) ne sont pas éligibles.</p><h2>Étape 2 — Emballez malin</h2><p>Les marchandises doivent rester inutilisées et présentables au contrôle. Tout ce qui partira en soute doit être inspecté par la douane AVANT l'enregistrement des bagages — décidez la veille. Formulaires, factures et achats dans un même dossier.</p><h2>Étape 3 — À l'aéroport</h2><p>Prévoyez 30 à 45 minutes de plus. L'ordre : contrôle douanier d'abord (articles en soute au guichet douane avant enregistrement, bagage à main après le contrôle passeport), puis guichet de l'organisme de remboursement ou kiosque automatique. Remboursement en espèces RMB ou sur carte. Depuis 2026, les achats sous ¥10 000 sont contrôlés par sondage — plus rapide, mais les articles doivent rester montrables.</p><h2>« 即买即退 » : remboursement immédiat en boutique</h2><p>Depuis 2025, les boutiques participantes remboursent sur place : vous signez une convention, laissez une pré-autorisation de carte bancaire en garantie et touchez le remboursement immédiatement. Si les marchandises ne quittent pas le pays avec vous, la carte est débitée. Disponible dans beaucoup de grands magasins — demandez « 你们支持即买即退吗 ? ».</p><h2>Les erreurs qui coûtent de l'argent</h2><p>Les classiques : perdre le formulaire (pas de formulaire, pas de remboursement) ; mettre les achats en soute avant le passage douane ; arriver trop tard à l'aéroport ; acheter dans un magasin non agréé ; dépasser les 90 jours sur un long voyage. Le acheteur d'Insta360 ci-dessus avait tout fait droit et a failli tout perdre sur un guichet introuvable et une horloge trop courte — gardez de la marge.</p><h2>Check-list rapide</h2><p>Passeport sur soi pour shopping ✓ · logo « TAX REFUND » ✓ · formulaire + factures dans un dossier ✓ · marchandises inutilisées et accessibles ✓ · 45 minutes de marge à l'aéroport ✓ · douane d'abord, guichet ensuite ✓. À combiner avec notre <a href=\"/fr/guides/what-to-buy-in-china\">guide des achats</a> et le <a href=\"/fr/shopping\">répertoire shopping</a>.</p>",
    },
    "taobao-jd-for-tourists": {
      title: "Taobao & JD pour touristes : shopper en ligne comme un local",
      excerpt: "Le vrai eldorado shopping chinois est en ligne : moins cher, livré à l'hôtel en quelques heures. Configuration du paiement, détection des faux avis, retours sans douleur — et l'astuce de la réception sans aucun compte.",
      label: "Achat en ligne",
      readTime: "8 min de lecture",
      content: "<p>Demandez aux visiteurs expérimentés où se trouve le vrai eldorado du shopping chinois : la réponse est quasi unanime, en ligne. Prix plus bas, livraison absurde — parfois moins d'une heure dans les grandes villes — et retours impitoyablement en faveur du client. Seul obstacle : des applications pensées pour les locaux. Voici le manuel complet, avec une astuce qui ne demande aucun compte.</p><h2>JD vs Taobao vs 1688</h2><p>JD.com est ce qui ressemble le plus à Amazon en vente directe : les articles badge « 自营 » (exploité par JD) sont authentiques et d'une rapidité choc — un voyageur a reçu sa commande en moins d'une heure à Chongqing. Taobao est un gigantesque marketplace où la qualité couvre tout le spectre, mais les boutiques officielles (旗舰店) — Xiaomi, Huawei, même des marques confidentielles comme Songmont — sont officielles et souvent un peu moins chères qu'en boutique. 1688.com est la source de gros derrière tout ça ; il faut lire le chinois et jouer à la loterie qualité — inutile sur deux semaines.</p><h2>Configuration (10 minutes)</h2><p>Installez Alipay et liez votre Visa/Mastercard international — il paie aussi bien sur Taobao que JD. L'app Taobao a une interface anglaise (langue dans les réglages) ; pour les pages rétives, la traduction caméra. jd.com fonctionne très bien avec la traduction automatique du navigateur. Pour l'adresse, demandez à la réception de l'hôtel de l'écrire en chinois et collez-la — les livraisons à l'hôtel sont parfaitement banales en Chine.</p><h2>Juger la qualité comme un local</h2><p>Les Chinois lisent les avis autrement : ouvrez d'abord les onglets 差评 (avis négatifs) et 最新 (les plus récents) — la fraîcheur est difficile à truquer. Distinguez le ton machine du détail authentique, et traitez les avis photo comme de l'or. Privilégiez les annonces avec 运费险 (assurance retour). Déçu ? Déclarez le retour dans l'app, un coursier vient le chercher à l'hôtel, remboursement en quelques jours. Ce filet de sécurité explique pourquoi les locaux commandent sans peur.</p><h2>L'astuce de la réception</h2><p>Pas de compte, pas de souci — un réflexe auquel les hôtels sont habitués : montrez à la réception exactement ce que vous voulez (photo ou lien) et demandez de le commander à l'hôtel. Vous règlez en espèces ou par virement WeChat/Alipay. Livraison en 3 à 4 jours en général — faites-le dans vos premiers jours, pas le dernier.</p><h2>Ça vaut le coup de commander</h2><p>Les classiques : une valise Xiaomi 20 pouces (environ ¥315 sur Taobao) ou l'équivalent 90go (environ ¥254) — en ligne souvent moins cher qu'en boutique ; câbles, chargeurs GaN et supports pour quelques dizaines de yuans ; coffrets de spécialités régionales. Notre <a href=\"/fr/shopping\">répertoire shopping</a> liste tout avec prix de référence — capture d'écran à tendre à la réception.</p><h2>Points de vigilance</h2><p>Pour tout ce dont l'authenticité compte : uniquement boutiques officielles ou JD 自营. Les tailles taillent petit — regardez les centimètres, pas les lettres. La garantie électronique est en général valable en Chine seulement. Et rappelez-vous : les achats en ligne ne donnent pas droit à la détaxe — pour les gros tickets comme les appareils photo, achetez en boutique physique agréée en suivant notre <a href=\"/fr/guides/china-tax-refund-guide\">guide détaxe</a>.</p>",
    },
  },
  shoppingItems: [
    {
      name: "Batteries externes, chargeurs GaN & câbles",
      tagline: "Choix n° 1 des voyageurs — 30 à 50 % de moins que chez vous",
      description: "Les accessoires Anker, Ugreen et Baseus coûtent nettement moins cher qu'en Europe ou en Amérique du Nord — des voyageurs d'Italie et de Singapour en disent autant. Chargeur 65 W + batterie 10 000 mAh + câbles tressés peuvent coûter moins qu'un seul chargeur chez vous. Pensez aussi à la batterie MagSafe.",
      priceRef: "Câbles dès ¥20 ; chargeurs ¥60–150 ; batteries ¥80–200",
      whereToBuy: "JD 自营, boutiques Anker ou l'étage numérique de tout centre commercial",
    },
    {
      name: "Valise Xiaomi (la célèbre valise à ¥315)",
      tagline: "Valise cabine 20 pouces bien construite, à un prix sain",
      description: "Les valises Xiaomi ont la cote auprès des voyageurs — certains en possèdent deux tailles. Le 20 pouces est à environ ¥315 sur Taobao, l'équivalent 90go de l'écosystème Xiaomi à ¥254. En ligne, souvent un peu moins cher qu'en boutique ; livraison à l'hôtel en 3–4 jours. En boutique Xiaomi, achetez plusieurs articles et demandez poliment une remise.",
      priceRef: "20 pouces : ¥315 (90go équivalent ¥254)",
      whereToBuy: "Boutique flagship Xiaomi sur Taobao ou magasins Mi Home",
    },
    {
      name: "Écouteurs Huawei FreeClip",
      tagline: "Environ 170 $ — et introuvables aux États-Unis",
      description: "Les FreeClip open-ear de Huawei sont devenus le souvenir viral : un visiteur américain les a payés environ 177 $, toute la famille était jalouse. Ils ne sont pas vendus officiellement aux États-Unis. Deux réserves honnêtes : son un cran sous les AirPods, garantie Chine uniquement.",
      priceRef: "≈¥1 200–1 400 (environ 170–190 $)",
      whereToBuy: "Magasins Huawei en centre commercial ou JD 自营",
    },
    {
      name: "SSD & stockage",
      tagline: "2 To pour une fraction du prix occidental",
      description: "Un voyageur indien résume : les disques 2 To et même 5 To coûtent « une fraction » du prix local. Restez sur les grandes marques (Samsung, WD, Crucial, Kingston) via JD 自营 — c'est là que se trouve la garantie d'authenticité.",
      priceRef: "SSD NVMe 2 To : ¥600–900",
      whereToBuy: "Uniquement JD 自营 (badge « 自营 »)",
    },
    {
      name: "Liseuses",
      tagline: "Modèles courants ¥500–1 500",
      description: "Les liseuses chinoises comme iReader démarrent vers ¥500–1 500 pour les modèles courants, haut de gamme au-delà de ¥2 000. Un visiteur britannique s'est posé exactement la question : le matériel est vraiment moins cher, mais vérifiez d'abord que la langue du firmware et l'écosystème de librairie vous conviennent.",
      priceRef: "Modèles courants ¥500–1 500",
      whereToBuy: "JD 自营 ou boutiques de marque",
    },
    {
      name: "Huaqiangbei : le marché d'électronique le plus dense du monde",
      tagline: "Nulle part ailleurs autant de tech au même endroit",
      description: "Si vous aimez la tech, le Huaqiangbei de Shenzhen est une destination en soi — marchés de composants, culture de la réparation, stands de gadgets et flagship stores bloc après bloc. Venez pour l'expérience, les petits accessoires et les réparations ; pour les gros achats, rappelez-vous la vérité DJI : marques mondiales, prix mondiaux. Marchandez ferme, vérifiez avant de payer.",
      priceRef: "Flâner gratuitement ; accessoires dès ¥10",
      whereToBuy: "Huaqiangbei, Shenzhen (métro Huaqiang Lu)",
    },
    {
      name: "Lunettes prêtes en 20 minutes",
      tagline: "Paires complètes dès ¥150–400 — 5 à 10× moins cher qu'en Occident",
      description: "Peut-être la meilleure affaire de Chine pour les porteurs de lunettes. Le Glasses City de Pékin est un centre commercial entièrement d'opticiens ; la paire d'un visiteur a été montée en 20 minutes. Apportez votre ordonnance (une photo des paramètres suffit) ou faites examiner sur place. Fermeture vers 17 h.",
      priceRef: "Paires complètes ¥150–400 (monture + verres)",
      whereToBuy: "Beijing Glasses City (北京眼镜城)",
    },
    {
      name: "Lin & basics Uniqlo",
      tagline: "Lin environ 40 % de moins qu'en UE, 20 % sur le reste",
      description: "Mesuré, pas au feeling : une acheteuse basée en UE a constaté environ 40 % de moins sur le lin et 20 % sur le reste — et chaque été les visiteurs confirment. Uniqlo est dans chaque centre commercial : l'économie la plus sûre de cette liste. Adidas et Nike, eux, sont au prix de chez vous.",
      priceRef: "Chemises lin ¥99–199 ; t-shirts AIRism ¥79",
      whereToBuy: "N'importe quel Uniqlo en centre commercial ; même prix partout",
    },
    {
      name: "Doudounes (Anta, 361°, Uniqlo)",
      tagline: "Chaleur sérieuse, prix pas sérieux",
      description: "Les doudounes Anta, 361° ou Uniqlo sont très raisonnablement tarifées dans les centres chinois — intéressant si vous allez au froid ou venez d'un pays où la doudoune coûte une fortune. Le garnissage varie selon les modèles : comparez les étiquettes. Vous vivez à Singapour ? Passez.",
      priceRef: "Anta/361° : ¥300–700 ; Uniqlo : ¥499–799",
      whereToBuy: "Boutiques de marque en centre commercial",
    },
    {
      name: "Soie de mûrier de Suzhou",
      tagline: "Marque familiale sans aucune boutique en ligne",
      description: "Une visiteuse a acheté « énormément » de soie chez la marque familiale Xiuniang (绣娘), rue Pingjiang à Suzhou — grande qualité, plusieurs adresses en ville, et volontairement aucun magasin en ligne. Exactement le genre de trouvaille qu'on ne fait qu'en personne. La vraie soie de mûrier (label 100 % et certificat) coûte une fraction des prix des boutiques à l'étranger.",
      priceRef: "Écharpes dès ¥100–300 ; vêtements dès ¥400",
      whereToBuy: "Xiuniang (绣娘), rue Pingjiang, Suzhou — et autres boutiques de Suzhou",
    },
    {
      name: "Hanfu, costumes Tang & écharpes en soie",
      tagline: "Des souvenirs portables avec du caractère",
      description: "Le conseil des locaux : passez aux bibelots — un vrai costume Tang, un ensemble hanfu ou de fines écharpes en soie sont des cadeaux qu'on continue d'utiliser. La qualité varie énormément d'un atelier à l'autre ; sur place, vous touchez le tissu et vérifiez les coutures, impossible sur AliExpress. Suzhou et Xi'an sont les classiques.",
      priceRef: "Écharpes ¥80–300 ; ensembles hanfu ¥300–800",
      whereToBuy: "Rues hanfu de Xi'an/Suzhou, boutiques de soie, boutiques de musée",
    },
    {
      name: "Bon thé (vraiment moins cher)",
      tagline: "Le thé de qualité à une fraction des prix mondiaux",
      description: "« Le vraiment bon thé est bien moins cher en Chine que presque partout » — l'une des réponses les plus appréciées, et c'est exact. La clé est de savoir ce qu'on achète : achetez là où on déguste (marchés au thé, boutiques de marque comme Tenfu), en vrac et en quantité buvable, et sautez les boîtes sur-emballées.",
      priceRef: "Qualité buvable dès ¥60–150 / 500 g",
      whereToBuy: "Marchés au thé avec dégustation ; boutiques de marque ; éviter les boîtes d'aéroport",
    },
    {
      name: "Cadeaux gourmands régionaux",
      tagline: "Des nouilles au corail de crabe aux kits d'épices — des souvenirs convoités",
      description: "À une brosse de voyageurs aguerris, la toute première réponse fut un mot : « la nourriture ! » Les spécialités régionales — coffrets de nouilles au corail de crabe de Suzhou, kits d'épices du Sichuan, pâtisseries de maisons centenaires — sont légères, bon marché et vraiment bien reçues. Achetez en boutique de marque ou chez les laozihao, pas aux étals touristiques.",
      priceRef: "Coffrets ¥30–150",
      whereToBuy: "Boutiques laozihao (老字号) et flagships de marque",
    },
    {
      name: "Goodies ACG : stands acryliques & badges",
      tagline: "1/3 à 1/2 du prix japonais, souvent mieux faits",
      description: "Le choix des initiés pour les fans d'anime, comics et jeux. Stands acryliques pour Genshin Impact, Star Rail, ZZZ, Arknights à un tiers ou une moitié du prix japonais — souvent avec impression interne et designs multicouches. Attention : beaucoup de boutiques de goodies ne sont pas agréées détaxe ; pour la détaxe, restez sur les boutiques de centre commercial enregistrées.",
      priceRef: "Stands acryliques ¥20–60 ; badges ¥10–30",
      whereToBuy: "Boutiques goodies (谷子店) des centres des grandes villes ; flagships Taobao",
    },
    {
      name: "Figurines & maquettes chinoises",
      tagline: "Exportées officiellement au Japon à ~2× le prix",
      description: "Les marques chinoises de figurines — Hasuki, Snail Shell, Animester, Apex — et les fabricants de maquettes sont devenus très bons, et s'exportent officiellement au Japon à environ le double. Achetez en direct via les flagships Taobao des marques ou en boutique spécialisée. Méfiez-vous des contrefaçons chez les vendeurs tiers.",
      priceRef: "Figurines ¥100–600 ; maquettes ¥80–400",
      whereToBuy: "Flagships Taobao des marques ; boutiques spécialisées",
    },
    {
      name: "Stylos-plumes & papeterie",
      tagline: "Un stylo à ¥30 avec l'écriture d'un ¥100 à l'étranger",
      description: "La Chine fabrique une grande partie des stylos du monde, et les stylos-plumes du marché intérieur (Hero, lignes chinoises de Pilot, marques d'atelier) sont d'un excellent rapport qualité-prix — le choix naturel pour le visiteur qui demande précisément des stylos-plumes. Comptoirs de papeterie en centre commercial et grandes papeteries sont la porte d'entrée facile.",
      priceRef: "Dès ¥30 ; bons stylos quotidiens ¥80–300",
      whereToBuy: "Grandes papeteries et comptoirs de centre commercial",
    },
    {
      name: "Papier Xuan & ensembles de calligraphie",
      tagline: "Souvenirs réellement utiles, au prix de la source",
      description: "La recommandation locale que la plupart n'entendent jamais : le papier Xuan de Jingxian (Anhui) — celui de la calligraphie chinoise depuis un millénaire — avec pierres à encre et pinceaux au prix producteur. Contrairement aux théières gonflées des rues touristiques, la papeterie d'une vraie rue d'art est honnêtement tarifée. Le cadeau pour quiconque écrit ou dessine.",
      priceRef: "Papier dès ¥30/100 feuilles ; ensembles ¥100–300",
      whereToBuy: "Rues de calligraphie (Liulichang à Pékin ; Wenhua Jie à Xi'an)",
    },
    {
      name: "Boutiques de musée (commencez par le NMC)",
      tagline: "Répliques et designs introuvables ailleurs",
      description: "« Le Musée national de Chine à Pékin — excellent ! » est une citation directe, et ça se généralise : les grands musées chinois ont transformé leurs boutiques en studios de design. Répliques fidèles, écharpes, services à thé et papeteries liées aux collections réelles : des cadeaux avec une histoire. Musées gratuits sur réservation.",
      priceRef: "Souvenirs ¥30–300",
      whereToBuy: "Boutique du Musée national de Chine ; grandes boutiques de musée",
    },
  ],
}

export default pack
