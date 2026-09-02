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
  },
}

export default pack
