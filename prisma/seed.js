// 数据库种子文件 - 初始化三座城市的完整英文内容
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 城市数据 - 成都 / 西安 / 北京
const cities = [
  {
    name: 'Chengdu',
    slug: 'chengdu',
    region: 'Southwest China',
    tagline: 'The city you will never want to leave',
    tags: 'Panda Paradise,Food Capital,Ancient Alleys,Slow Living',
    heroImage: 'https://images.unsplash.com/photo-1590103513924-6be5415868c7?w=1600',
    description: 'Hometown of giant pandas and the fiery Sichuan hot pot, Chengdu is a relaxed city famed for its teahouses, spicy cuisine, and laid-back lifestyle.',
    intro: 'Chengdu, the birthplace of ancient Shu civilization, has long been celebrated as the "Land of Abundance". Here, the millennia-old cultural heritage of Wuhou Shrine and Du Fu Thatched Cottage coexists with the bustling street life of Kuanzhai Alley and Jinli. You can meet adorable giant pandas at the breeding base, or sip tea in a street-side teahouse to experience the leisure woven into the soul of every local.',
    history: 'Over 2,300 years of history',
    bestSeason: 'March to June, September to November',
    duration: '4 days recommended',
  },
  {
    name: 'Xi\'an',
    slug: 'xian',
    region: 'Northwest China',
    tagline: 'Ancient capital of thirteen dynasties',
    tags: 'Ancient Capital,Terracotta Warriors,City Wall,Tang Dynasty',
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600',
    description: 'The ancient capital of thirteen dynasties and home of the Terracotta Army. Xi\'an is where half of Chinese history was written.',
    intro: 'Once known as Chang\'an, Xi\'an served as the capital for thirteen dynasties including the Qin, Han, and Tang. It is the starting point of the Silk Road and home to the world-famous Terracotta Warriors. Walk or cycle along the best-preserved ancient city wall in China, marvel at the Big Wild Goose Pagoda, and lose yourself in the bustling flavors of the Muslim Quarter. One city, half of Chinese history.',
    history: 'Capital of thirteen dynasties, over 3,100 years',
    bestSeason: 'March to May, September to November',
    duration: '3-4 days recommended',
  },
  {
    name: 'Beijing',
    slug: 'beijing',
    region: 'North China',
    tagline: 'The imperial heart of China',
    tags: 'Imperial Capital,Great Wall,Forbidden City,Hutong Culture',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600',
    description: 'China\'s capital city, home to the Forbidden City, the Great Wall, the Temple of Heaven, and centuries of imperial history.',
    intro: 'Beijing, the capital of China, is a city where ancient imperial grandeur meets modern dynamism. From the majestic Forbidden City and the awe-inspiring Great Wall to the intimate hutong alleys and the Temple of Heaven, every corner tells a story spanning over 3,000 years. Beyond the famous landmarks, discover hidden museums, local food streets, and the authentic flavor of old Beijing.',
    history: 'Over 3,000 years of history, capital for over 800 years',
    bestSeason: 'April to May, September to October',
    duration: '4-5 days recommended',
  },
]

// 景点数据 - 每座城市 6 个
const attractions = {
  chengdu: [
    {
      name: 'Giant Panda Breeding Research Base',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
      location: 'Chenghua District',
      duration: '3-4 hours',
      ticket: '¥55',
      highlight: 'No.1 must-visit in Chengdu',
      description: 'Get up close with adorable giant pandas as they eat bamboo, roll around, and nap. The Moon Chamber lets you see super-cute panda cubs. Arrive early in the morning for the most active pandas.',
    },
    {
      name: 'Kuanzhai Alley (Wide and Narrow Alleys)',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      location: 'Qingyang District',
      duration: '2-3 hours',
      ticket: 'Free',
      highlight: 'Microcosm of old Chengdu',
      description: 'A Qing Dynasty historical district made up of Wide Alley, Narrow Alley, and Well Alley. Brimming with Sichuan food, teahouses, opera stages, and creative boutiques. Even more atmospheric at night.',
    },
    {
      name: 'Jinli Ancient Street',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      location: 'Wuhou District',
      duration: '2 hours',
      ticket: 'Free',
      highlight: 'Three Kingdoms era old street',
      description: 'Known as the first street of Western Shu, right next to Wuhou Shrine. Red lanterns and stone-paved paths create a stunning scene, especially at night when the lanterns glow and food stalls line the way.',
    },
    {
      name: 'Wuhou Shrine',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800',
      location: 'Wuhou District',
      duration: '1.5 hours',
      ticket: '¥50',
      highlight: 'Three Kingdoms sacred site',
      description: 'China\'s only memorial shrine jointly dedicated to a ruler and his minister, honoring Zhuge Liang and the heroes of Shu Han. The red walls and bamboo shadows make for iconic photos.',
    },
    {
      name: 'Du Fu Thatched Cottage',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
      location: 'Qingyang District',
      duration: '1.5 hours',
      ticket: '¥50',
      highlight: 'Home of the Poetry Sage',
      description: 'The former residence of the great Tang Dynasty poet Du Fu during his time in Chengdu. A serene, elegant garden shaded by bamboo, full of literary spirit and poetic charm.',
    },
    {
      name: 'Dujiangyan Irrigation System',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      location: 'Dujiangyan City',
      duration: 'Full day trip',
      ticket: '¥80',
      highlight: 'UNESCO World Heritage Site',
      description: 'A remarkable 2,000-year-old water conservation project that still functions today. Combine with nearby Mount Qingcheng to experience "the most serene place under heaven".',
    },
  ],
  xian: [
    {
      name: 'Terracotta Warriors Museum',
      image: 'https://picsum.photos/id/1074/800/600',
      location: 'Lintong District',
      duration: '3-4 hours',
      ticket: '¥120',
      highlight: 'Eighth Wonder of the World',
      description: 'The "Eighth Wonder of the World" and the burial pits of Emperor Qin Shi Huang. Thousands of life-sized terracotta warriors, each with a unique facial expression, stand in breathtaking formation.',
    },
    {
      name: 'Xi\'an Ancient City Wall',
      image: 'https://picsum.photos/id/1040/800/600',
      location: 'City Center',
      duration: '2-3 hours',
      ticket: '¥54',
      highlight: 'Best-preserved city wall in China',
      description: 'The largest and best-preserved ancient city wall in China. Rent a bicycle and ride along the 13.7 km perimeter for sweeping views of the old town. Sunset is especially beautiful.',
    },
    {
      name: 'Big Wild Goose Pagoda & Da Ci\'en Temple',
      image: 'https://picsum.photos/id/1041/800/600',
      location: 'Yanta District',
      duration: '2 hours',
      ticket: '¥40',
      highlight: 'Tang Dynasty landmark',
      description: 'Built under the direction of the monk Xuanzang, this is the iconic landmark of Tang Dynasty Chang\'an. The North Square features the largest musical fountain in Asia, spectacular at night.',
    },
    {
      name: 'Huaqing Palace',
      image: 'https://picsum.photos/id/1039/800/600',
      location: 'Lintong District',
      duration: '2-3 hours',
      ticket: '¥120',
      highlight: 'Imperial hot spring palace',
      description: 'The legendary romance site of Emperor Xuanzong and Lady Yang Guifei, famous for its hot springs on Mount Li. The live show "The Song of Everlasting Sorrow" is breathtaking.',
    },
    {
      name: 'Muslim Quarter (Huimin Jie)',
      image: 'https://picsum.photos/id/1080/800/600',
      location: 'Lianhu District',
      duration: '2-3 hours',
      ticket: 'Free',
      highlight: 'Food lover\'s paradise',
      description: 'Xi\'an\'s most famous food street, paved with stone and shaded by trees. Lined with halal snack stalls selling roujiamo, mutton paomo, and zenggao. Bursting with authentic local flavor.',
    },
    {
      name: 'Shaanxi History Museum',
      image: 'https://picsum.photos/id/1068/800/600',
      location: 'Yanta District',
      duration: '3-4 hours',
      ticket: 'Free (reservation required)',
      highlight: 'Treasure house of Chinese civilization',
      description: '"Give me one day, and I will give you ten thousand years." Housing over 370,000 artifacts spanning more than one million years, from prehistoric humans to the Opium Wars. Reservation required.',
    },
  ],
  beijing: [
    {
      name: 'The Forbidden City',
      image: 'https://images.unsplash.com/photo-1584432810607-4b9c2e6d8c4c?w=800',
      location: 'Dongcheng District',
      duration: '4-5 hours',
      ticket: '¥60',
      highlight: 'World\'s largest imperial palace',
      description: 'The Forbidden City is the world\'s largest and best-preserved wooden palace complex. Home to 24 Ming and Qing emperors, its golden roofs and crimson walls are the very image of imperial China.',
    },
    {
      name: 'The Great Wall (Badaling Section)',
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
      location: 'Yanqing District',
      duration: 'Full day trip',
      ticket: '¥40',
      highlight: 'Wonder of the World',
      description: 'One of the New Seven Wonders of the World, the Badaling section is the most iconic and accessible part of the Great Wall. Climb to the highest beacon tower for spectacular mountain views.',
    },
    {
      name: 'Temple of Heaven',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      location: 'Dongcheng District',
      duration: '2-3 hours',
      ticket: '¥34',
      highlight: 'Ming Dynasty sacrificial altar',
      description: 'Where Ming and Qing emperors prayed for good harvests. The Hall of Prayer for Good Harvests is an architectural masterpiece built entirely without nails. Locals gather here each morning for tai chi.',
    },
    {
      name: 'Summer Palace',
      image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
      location: 'Haidian District',
      duration: '3-4 hours',
      ticket: '¥30',
      highlight: 'Imperial garden masterpiece',
      description: 'The largest and best-preserved imperial garden in China. Stroll along the Long Corridor, take a boat on Kunming Lake, and admire the Tower of Buddhist Incense atop Longevity Hill.',
    },
    {
      name: 'Tiananmen Square',
      image: 'https://images.unsplash.com/photo-1538382336400-77c8df42c4ed?w=800',
      location: 'Dongcheng District',
      duration: '1-2 hours',
      ticket: 'Free',
      highlight: 'Heart of the nation',
      description: 'The world\'s largest public square, surrounded by monumental buildings including the National Museum of China and the Great Hall of the People. Witness the daily flag-raising ceremony at dawn.',
    },
    {
      name: 'Hutong Alleys of Nanluoguxiang',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      location: 'Dongcheng District',
      duration: '2-3 hours',
      ticket: 'Free',
      highlight: 'Authentic old Beijing',
      description: 'Wander through centuries-old hutong alleyways to experience authentic old Beijing. Visit courtyard homes, browse boutique shops, and taste traditional snacks in this charming historic neighborhood.',
    },
  ],
}

// 美食数据 - 每座城市 4-6 种
const foods = {
  chengdu: [
    {
      name: 'Sichuan Hot Pot',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: 'Soul of Chengdu cuisine',
      description: 'Rich beef tallow broth, numbing and spicy. Beef tripe, duck intestine, and yellow throat are the three must-order treasures, dipped in sesame oil and garlic for irresistible flavor.',
    },
    {
      name: 'Skewers in Cold Pot (Chuanchuan Xiang)',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      highlight: 'Street food icon',
      description: 'A variety of ingredients threaded on bamboo skewers, cooked in a secret red broth and served ready to eat. Paired with icy jelly drink, it\'s a classic Chengdu street delicacy.',
    },
    {
      name: 'Dan Dan Noodles',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      highlight: 'Centuries-old classic',
      description: 'Thin noodles topped with savory minced meat sauce, sprinkled with Sichuan pepper and scallions. Numbing, spicy, and silky smooth, it\'s a quintessential Chengdu breakfast.',
    },
    {
      name: 'Handmade Ice Jelly',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
      highlight: 'Spice quencher',
      description: 'Hand-rubbed ice jelly topped with brown sugar syrup, sticky rice cakes, hawthorn flakes, and crushed peanuts. Cool, sweet, and refreshing, the perfect partner for hot pot.',
    },
    {
      name: 'Zhong Dumplings',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: 'Time-honored brand',
      description: 'Thin-skinned, tender dumplings bathed in a signature chili oil sauce. Slightly sweet, garlicky, and rich, they are a beloved representative of traditional Chengdu snacks.',
    },
    {
      name: 'Spicy Rabbit Head',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      highlight: 'A local favorite',
      description: 'Available in five-spice or numbing-spicy flavors, the firm and flavorful meat gets tastier with every bite. A staple late-night snack and drinking companion for Chengdu locals.',
    },
  ],
  xian: [
    {
      name: 'Mutton Paomo (Pita Soaked in Mutton Soup)',
      image: 'https://picsum.photos/id/1080/800/600',
      highlight: 'The signature Xi\'an dish',
      description: 'The crown jewel of Xi\'an cuisine. Tear a flatbread into pea-sized pieces, then simmer in a rich mutton broth with glass noodles and scallions. Served with pickled garlic and chili sauce.',
    },
    {
      name: 'Roujiamo (Chinese Hamburger)',
      image: 'https://picsum.photos/id/1069/800/600',
      highlight: 'The original Chinese burger',
      description: 'Crispy-on-the-outside, soft-on-the-inside flatbread stuffed with tender, slow-stewed pork. The authentic version uses only braised meat, no peppers or herbs. A daily Xi\'an favorite.',
    },
    {
      name: 'Biangbiang Noodles',
      image: 'https://picsum.photos/id/1059/800/600',
      highlight: 'Belt-wide noodles',
      description: 'Hand-pulled noodles as wide as a belt, smothered in sizzling chili oil. Chewy, fragrant, and satisfying, they are the bold, hearty pride of Shaanxi noodle culture.',
    },
    {
      name: 'Zenggao (Steamed Glutinous Rice Cake)',
      image: 'https://picsum.photos/id/1073/800/600',
      highlight: 'Sweet traditional treat',
      description: 'Layers of glutinous rice, red dates, and honey steamed in a traditional iron pot. Sweet, sticky, and comforting, it\'s a beloved Xi\'an street dessert.',
    },
    {
      name: 'Liangpi (Cold Rice Noodles)',
      image: 'https://picsum.photos/id/1067/800/600',
      highlight: 'Refreshing classic',
      description: 'Qinzhen rice noodles served cold with vinegar, chili oil, and cucumber. Tangy, spicy, and appetizing, the perfect refreshing snack on a warm day.',
    },
    {
      name: 'Persimmon Cake',
      image: 'https://picsum.photos/id/1068/800/600',
      highlight: 'Crispy autumn delight',
      description: 'Made from Lintong osmanthus persimmons, these golden fried cakes are crispy outside and sweetly soft inside. A seasonal specialty best enjoyed fresh in autumn.',
    },
  ],
  beijing: [
    {
      name: 'Peking Roast Duck',
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
      highlight: 'The dish that defines Beijing',
      description: 'The most famous of all Beijing dishes. Crispy, lacquered skin and tender duck meat, wrapped in a thin pancake with scallion, cucumber, and sweet bean sauce. A must-try culinary icon.',
    },
    {
      name: 'Zhajiangmian (Fried Sauce Noodles)',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: 'Beijing comfort food',
      description: 'Hearty hand-pulled noodles topped with a rich sauce of ground pork and fermented yellow soybean paste, mixed with fresh shredded vegetables. A beloved everyday meal of old Beijing.',
    },
    {
      name: 'Jiaozi (Boiled Dumplings)',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: 'Northern staple',
      description: 'Plump dumplings stuffed with pork and cabbage or pork and shrimp, boiled and served with black vinegar and chili oil. A comforting classic of northern Chinese home cooking.',
    },
    {
      name: 'Tanghulu (Candied Hawthorn Sticks)',
      image: 'https://images.unsplash.com/photo-1606788075953-b2284bc6e6c1?w=800',
      highlight: 'Sweet street snack',
      description: 'Skewered hawthorn berries dipped in glossy, rock-hard sugar syrup. The perfect balance of tart and sweet, this traditional Beijing snack is a favorite for all ages.',
    },
    {
      name: 'Luzhu Huoshao (Stewed Pork Offal Bread)',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      highlight: 'Old Beijing classic',
      description: 'A traditional working-class dish of pork offal, tofu, and wheat bread wheels simmered in a rich, fragrant broth. Bold, savory, and deeply satisfying for the adventurous eater.',
    },
  ],
}

// 行程数据 - 每座城市 3 天
const itineraries = {
  chengdu: [
    {
      dayNumber: 1,
      title: 'Old Town Culture Route',
      items: [
        { timeSlot: 'Morning', content: 'Explore Wuhou Shrine and photograph the iconic red walls and bamboo' },
        { timeSlot: 'Noon', content: 'Stroll through Jinli Ancient Street and sample local snacks' },
        { timeSlot: 'Afternoon', content: 'Visit Du Fu Thatched Cottage and enjoy its serene gardens' },
        { timeSlot: 'Evening', content: 'Wander Kuanzhai Alley and experience old Chengdu street life' },
        { timeSlot: 'Night', content: 'Enjoy an authentic Sichuan beef tallow hot pot dinner' },
      ],
    },
    {
      dayNumber: 2,
      title: 'Panda & Leisure Route',
      items: [
        { timeSlot: 'Early Morning', content: 'Head to the Giant Panda Breeding Base early to see active pandas' },
        { timeSlot: 'Noon', content: 'Lunch near the base, then return to the city for a short rest' },
        { timeSlot: 'Afternoon', content: 'Sip gaiwan tea at Heming Teahouse in People\'s Park, try ear cleaning' },
        { timeSlot: 'Evening', content: 'Shop at Chunxi Road and Taikoo Li, snap the IFS climbing panda' },
        { timeSlot: 'Night', content: 'Experience Chengdu nightlife at a Yulin Road music bar' },
      ],
    },
    {
      dayNumber: 3,
      title: 'Dujiangyan Day Trip',
      items: [
        { timeSlot: 'Morning', content: 'Take the intercity train to Dujiangyan and tour the ancient water project' },
        { timeSlot: 'Noon', content: 'Try local cold-water fish and handmade ice jelly in Dujiangyan town' },
        { timeSlot: 'Afternoon', content: 'Hike the front mountain of Mount Qingcheng, the most serene place under heaven' },
        { timeSlot: 'Evening', content: 'Return to Chengdu by high-speed train to conclude your trip' },
      ],
    },
  ],
  xian: [
    {
      dayNumber: 1,
      title: 'Downtown East Route',
      items: [
        { timeSlot: 'Morning', content: 'Shaanxi History Museum (book 3 days ahead) for Zhou, Qin, Han, and Tang treasures' },
        { timeSlot: 'Noon', content: 'Big Wild Goose Pagoda area, climb Da Ci\'en Temple, watch the musical fountain' },
        { timeSlot: 'Afternoon', content: 'Rent a bike and cycle the 13.7 km Ancient City Wall from Yongning Gate' },
        { timeSlot: 'Evening', content: 'Bell and Drum Towers at night, then dinner in the Muslim Quarter' },
      ],
    },
    {
      dayNumber: 2,
      title: 'Lintong Imperial Route',
      items: [
        { timeSlot: 'Morning', content: 'Terracotta Warriors Museum: Pits 1, 2, 3 and the Bronze Chariot Hall (hire a guide)' },
        { timeSlot: 'Noon', content: 'Lunch in Lintong, try the local da pan ji and youpo noodles' },
        { timeSlot: 'Afternoon', content: 'Huaqing Palace, the imperial hot springs and the Boulders of Mt Li' },
        { timeSlot: 'Evening', content: 'Watch "The Song of Everlasting Sorrow" live show (center A zone recommended)' },
      ],
    },
    {
      dayNumber: 3,
      title: 'Culture & Leisure Route',
      items: [
        { timeSlot: 'Morning', content: 'Beilin Museum (Forest of Steles), a treasure trove of Chinese calligraphy' },
        { timeSlot: 'Noon', content: 'Yongxingfang food court, featuring delicacies from all over Shaanxi' },
        { timeSlot: 'Afternoon', content: 'Small Wild Goose Pagoda and Jianfu Temple, quiet and crowd-free' },
        { timeSlot: 'Evening', content: 'Tang Dynasty Grand Tang Mall, a brilliant Tang-style pedestrian street' },
      ],
    },
  ],
  beijing: [
    {
      dayNumber: 1,
      title: 'Imperial Heart Route',
      items: [
        { timeSlot: 'Morning', content: 'Tiananmen Square flag-raising, then enter the Forbidden City from the Meridian Gate' },
        { timeSlot: 'Noon', content: 'Lunch near the Forbidden City, rest your feet' },
        { timeSlot: 'Afternoon', content: 'Climb Jingshan Park for a panoramic view of the golden palace roofs' },
        { timeSlot: 'Evening', content: 'Stroll the hutongs of Nanluoguxiang and try old Beijing snacks' },
      ],
    },
    {
      dayNumber: 2,
      title: 'Great Wall Adventure',
      items: [
        { timeSlot: 'Morning', content: 'Depart early for the Badaling Great Wall, climb to the highest beacon tower' },
        { timeSlot: 'Noon', content: 'Lunch at the foot of the Great Wall' },
        { timeSlot: 'Afternoon', content: 'Visit the Ming Tombs, the imperial burial site of 13 Ming emperors' },
        { timeSlot: 'Evening', content: 'Return to the city for a traditional Peking Roast Duck dinner' },
      ],
    },
    {
      dayNumber: 3,
      title: 'Temples & Gardens Route',
      items: [
        { timeSlot: 'Morning', content: 'Temple of Heaven, watch locals practice tai chi, admire the Hall of Prayer' },
        { timeSlot: 'Noon', content: 'Try zhajiangmian (fried sauce noodles) at a nearby old Beijing eatery' },
        { timeSlot: 'Afternoon', content: 'Summer Palace, walk the Long Corridor and boat on Kunming Lake' },
        { timeSlot: 'Evening', content: 'Watch a Peking Opera or acrobatics show to end your Beijing journey' },
      ],
    },
  ],
}

// 贴士数据 - 每座城市 3 类
const tips = {
  chengdu: [
    {
      icon: 'transport',
      title: 'Getting Around',
      items: 'Both Shuangliu and Tianfu airports have direct metro lines to the city center|Metro covers all major attractions, get a Tianfu Transport Card|Downtown attractions are dense, taxis and shared bikes are convenient|Take the intercity train to Dujiangyan, transfer at Xipu Station',
    },
    {
      icon: 'hotel',
      title: 'Where to Stay',
      items: 'First choice: Chunxi Road / Taikoo Li area for transit and shopping|For quiet: Kuanzhai Alley or Qingyang Palace area|Yulin neighborhood is full of local life and great food|Book 1-2 weeks ahead during peak season',
    },
    {
      icon: 'tips',
      title: 'Friendly Tips',
      items: 'Visit pandas in the morning, they mostly sleep in the afternoon|Ask for mild spice when ordering hot pot, local heat is intense|Summer is humid and muggy, winter is damp and cold, pack accordingly|Teahouses are affordable, a must for experiencing local life',
    },
  ],
  xian: [
    {
      icon: 'transport',
      title: 'Getting Around',
      items: 'Xi\'an Xianyang International Airport is 47 km from downtown, use metro line 14 or airport bus|Xi\'an North Station is the main high-speed rail hub, metro lines 2 and 4 connect downtown|8 metro lines cover major sights, use Alipay or WeChat transit codes|To reach the Terracotta Warriors, take tourist bus 5 (306) from the railway station',
    },
    {
      icon: 'tips',
      title: 'Important Notes',
      items: 'Book Shaanxi History Museum 3 days in advance via official WeChat, free but in high demand|Hire a guide at the Terracotta Warriors, otherwise you only see "clay figures"|Xi\'an food is salty and spicy, request less salt and chili if you prefer mild|Beware of unofficial taxis and touts near the railway station',
    },
    {
      icon: 'hotel',
      title: 'Where to Stay',
      items: 'Bell Tower / Muslim Quarter area: convenient and full of food, great for first-timers|Big Wild Goose Pagoda area: pleasant and great for night views, mid to high-end hotels|Yongning Gate area: at the foot of the city wall, metro interchange, easy access|Xiaozhai shopping district: youthful hub, great value for money',
    },
  ],
  beijing: [
    {
      icon: 'transport',
      title: 'Getting Around',
      items: 'Beijing has two airports: Capital International and Daxing International, both connected by express metro|Beijing has multiple major railway stations, check your ticket carefully|The metro is the fastest way around, covering all major attractions|Book Forbidden City and Great Wall tickets online in advance',
    },
    {
      icon: 'tips',
      title: 'Important Notes',
      items: 'Forbidden City entry requires advance online reservation, often sold out|Great Wall visits demand lots of walking, wear comfortable shoes|Beijing winters are cold and dry, summers hot and humid, spring and autumn are best|Have translation apps ready, English is not widely spoken off the tourist trail',
    },
    {
      icon: 'hotel',
      title: 'Where to Stay',
      items: 'Wangfujing / Dongdan area: central, walk to the Forbidden City|Houhai / Nanluoguxiang area: hutong charm, perfect for culture lovers|Sanlitun / CBD area: modern, international dining and nightlife|Book early for peak seasons and national holidays',
    },
  ],
}

// 攻略文章数据 - 精选 3 篇
const guides = [
  {
    title: '3-Day Xi\'an Classic Route: Terracotta Warriors, City Wall & Muslim Quarter',
    slug: 'xian-3-day-classic-route',
    label: '3 Days 2 Nights',
    excerpt: 'First time in Xi\'an? This route covers all the must-see attractions, authentic food, and transport tips. Beginners can follow it step by step.',
    content: '<p>Xi\'an, the ancient capital of thirteen dynasties, is a city where history breathes. This 3-day itinerary covers the absolute essentials for first-time visitors.</p><h2>Day 1: The Heart of the Ancient City</h2><p>Start your morning at the Shaanxi History Museum, where over 370,000 artifacts span more than a million years of history. Be sure to book your free ticket three days in advance. Afterward, head to the Big Wild Goose Pagoda and watch the musical fountain at the North Square.</p><p>In the afternoon, rent a bicycle and ride along the 13.7-kilometer Ancient City Wall. The view of the old town at sunset is unforgettable. End your day at the Bell and Drum Towers, then dive into the Muslim Quarter for roujiamo, mutton paomo, and candied persimmon cake.</p><h2>Day 2: The Terracotta Army</h2><p>Take a bus to Lintong to witness the Eighth Wonder of the World. The Terracotta Warriors Museum features three main pits and a bronze chariot hall. Hiring a licensed guide is highly recommended, as the stories behind each warrior bring the experience to life.</p><p>In the afternoon, visit nearby Huaqing Palace, the imperial hot spring estate of Emperor Xuanzong and Lady Yang. If time permits, book tickets for the spectacular live show "The Song of Everlasting Sorrow" in the evening.</p><h2>Day 3: Calligraphy, Food, and the Tang Dynasty</h2><p>Begin at the Beilin Museum (Forest of Steles), a treasure house of Chinese calligraphy featuring the work of master calligraphers across centuries. For lunch, head to Yongxingfang, a food street gathering delicacies from every corner of Shaanxi province.</p><p>In the afternoon, visit the Small Wild Goose Pagoda and Jianfu Temple, a quiet and crowd-free alternative to its larger sibling. End your Xi\'an journey at the Grand Tang Mall, a brilliant Tang Dynasty-themed pedestrian street that comes alive after dark.</p>',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
    readTime: '8 min read',
    views: '23k reads',
    publishedAt: '3 days ago',
    featured: true,
  },
  {
    title: 'Beijing In-Depth: Off-the-Beaten-Path Guide to Avoid the Crowds',
    slug: 'beijing-off-the-beaten-path',
    label: '5 Days 4 Nights',
    excerpt: 'Beyond the Forbidden City and Great Wall, this guide takes you into the old Beijing hutongs, hidden museums, and the food streets where locals actually eat.',
    content: '<p>Beijing is far more than its headline attractions. This 5-day itinerary blends the iconic with the intimate.</p><h2>The Imperial Essentials</h2><p>No first visit is complete without the Forbidden City and the Great Wall. Arrive at Tiananmen Square at dawn to watch the flag-raising ceremony, then enter the palace through the Meridian Gate. Afterward, climb Jingshan Hill for the classic panorama of golden rooftops.</p><p>For the Great Wall, skip the busiest sections and consider Mutianyu for a quieter, restored experience with cable car access. Hire a driver for a stress-free day trip.</p><h2>Hutong Life</h2><p>The hutongs are the soul of old Beijing. Rent a bicycle and explore the alleys around Nanluoguxiang, Drum and Bell Towers, and Houhai. Stop at a courtyard cafe for a slow coffee, and visit a local family for a home-cooked lunch.</p><h2>Hidden Museums and Local Food</h2><p>Beijing is full of small, fascinating museums. Try the Capital Museum, the Beijing Planning Exhibition Hall, or the quirky Beijing Watermelon Museum. For food, skip tourist traps and head to Gui Jie (Ghost Street) for late-night crayfish, or find a tiny zhajiangmian shop tucked in a hutong. End your trip with Peking Roast Duck at a heritage restaurant and a Peking Opera performance.</p>',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
    readTime: '10 min read',
    views: '18k reads',
    publishedAt: '1 week ago',
    featured: true,
  },
  {
    title: 'Chengdu Food Guide: From Street Stalls to Time-Honored Brands',
    slug: 'chengdu-food-guide',
    label: 'Food Map',
    excerpt: 'Hot pot, skewers, dan dan noodles, spicy rabbit head... 20 hidden gem eateries cherished by locals. Follow this guide and you will never go wrong.',
    content: '<p>Chengdu is China\'s first city designated as a UNESCO City of Gastronomy. This guide takes you from sizzling hot pot to humble street snacks.</p><h2>The Soul of Chengdu: Sichuan Hot Pot</h2><p>Beef tallow broth is the hallmark of authentic Chengdu hot pot. Order the holy trinity of beef tripe, duck intestine, and yellow throat. Dip them in sesame oil with raw garlic to temper the heat. Locals favor veterans like Shu Daxia and Long Chao Shou for consistent quality.</p><h2>Street Food Treasures</h2><p>Beyond hot pot, Chengdu shines in its snacks. Try chuanchuan (cold pot skewers) in a smoky alley shop, dan dan noodles from a shoulder-pole vendor tradition, and handmade ice jelly to soothe the spice. For the adventurous, spicy rabbit head is a local obsession.</p><h2>Time-Honored Brands</h2><p>Chengdu is home to century-old eateries. Visit Long Chao Shao for wontons, Zhong Dumplings for chili oil dumplings, and Fu Qi Fei Pian for sliced beef offal. Pair your meals with gaiwan tea at Heming Teahouse for the full Chengdu experience. Remember: locals ask for mild spice, so follow their lead if you cannot handle the heat.</p>',
    image: 'https://images.unsplash.com/photo-1555217851-6141535bd773?w=800',
    readTime: '7 min read',
    views: '31k reads',
    publishedAt: '5 days ago',
    featured: true,
  },
]

// 额外非精选攻略文章
const moreGuides = [
  {
    title: 'How to Plan Your First Trip to China: A Complete Beginner\'s Guide',
    slug: 'first-trip-to-china-guide',
    label: 'Beginner Guide',
    excerpt: 'Visas, payments, apps, SIM cards, and transport. Everything you need to know before your first trip to China, all in one place.',
    content: '<p>Planning your first trip to China can feel overwhelming. This guide simplifies the essentials.</p><h2>Visas and Entry</h2><p>Most travelers need a tourist visa (L visa). Apply at a Chinese embassy or consulate with your passport, photo, itinerary, and hotel bookings. China now offers 144-hour visa-free transit in several major cities, including Beijing and Shanghai.</p><h2>Payments and Apps</h2><p>Cash is rarely used. Set up Alipay and WeChat Pay before arrival, both now accept foreign credit cards. Download WeChat for communication and Baidu Maps for navigation, since Google services require a VPN.</p><h2>Getting Around</h2><p>China\'s high-speed rail network is the world\'s largest and a joy to use. Book tickets via Trip.com or the 12306 app. Within cities, metros are clean, cheap, and extensive. Ride-hailing with DiDi is convenient and affordable.</p>',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800',
    readTime: '12 min read',
    views: '45k reads',
    publishedAt: '2 weeks ago',
    featured: false,
  },
  {
    title: 'Best Time to Visit China: Season-by-Season Travel Guide',
    slug: 'best-time-to-visit-china',
    label: 'Planning',
    excerpt: 'Spring flowers, summer mountains, autumn leaves, and winter wonderlands. Find out when to visit each region of China for the best experience.',
    content: '<p>China is vast, and the best time to visit depends on where you are going.</p><h2>Spring (March to May)</h2><p>Spring is ideal for most of China. Temperatures are mild, flowers bloom, and crowds are thinner. Beijing, Xi\'an, and the Yangtze River are at their best.</p><h2>Autumn (September to November)</h2><p>Autumn rivals spring as the best season. Crisp air, blue skies, and golden foliage make it perfect for hiking the Great Wall or exploring Beijing\'s hutongs.</p><h2>Summer and Winter</h2><p>Summer is hot and humid, but great for the mountains of Yunnan and Tibet. Winter is cold in the north but magical for the Harbin Ice Festival and fewer crowds at major sites.</p>',
    image: 'https://images.unsplash.com/photo-1525874684015-4d3e4b3a3e0a?w=800',
    readTime: '6 min read',
    views: '15k reads',
    publishedAt: '3 weeks ago',
    featured: false,
  },
]

// 主函数 - 写入所有数据
async function main() {
  console.log('开始清空数据库...')

  // 按依赖顺序删除数据
  await prisma.itineraryItem.deleteMany()
  await prisma.itinerary.deleteMany()
  await prisma.tip.deleteMany()
  await prisma.food.deleteMany()
  await prisma.attraction.deleteMany()
  await prisma.guide.deleteMany()
  await prisma.city.deleteMany()

  console.log('开始写入城市数据...')

  // 写入三座城市及其关联数据
  for (const cityData of cities) {
    const slug = cityData.slug

    // 创建城市
    const city = await prisma.city.create({ data: cityData })
    console.log(`城市已创建: ${city.name} (ID: ${city.id})`)

    // 创建景点
    const cityAttractions = attractions[slug] || []
    for (let i = 0; i < cityAttractions.length; i++) {
      await prisma.attraction.create({
        data: { ...cityAttractions[i], cityId: city.id, sortOrder: i },
      })
    }
    console.log(`  ${city.name}: ${cityAttractions.length} 个景点已创建`)

    // 创建美食
    const cityFoods = foods[slug] || []
    for (let i = 0; i < cityFoods.length; i++) {
      await prisma.food.create({
        data: { ...cityFoods[i], cityId: city.id, sortOrder: i },
      })
    }
    console.log(`  ${city.name}: ${cityFoods.length} 种美食已创建`)

    // 创建行程及行程条目
    const cityItineraries = itineraries[slug] || []
    for (let i = 0; i < cityItineraries.length; i++) {
      const it = cityItineraries[i]
      const createdIt = await prisma.itinerary.create({
        data: {
          cityId: city.id,
          dayNumber: it.dayNumber,
          title: it.title,
        },
      })
      for (let j = 0; j < it.items.length; j++) {
        await prisma.itineraryItem.create({
          data: {
            itineraryId: createdIt.id,
            timeSlot: it.items[j].timeSlot,
            content: it.items[j].content,
            sortOrder: j,
          },
        })
      }
    }
    console.log(`  ${city.name}: ${cityItineraries.length} 天行程已创建`)

    // 创建贴士
    const cityTips = tips[slug] || []
    for (let i = 0; i < cityTips.length; i++) {
      await prisma.tip.create({
        data: { ...cityTips[i], cityId: city.id, sortOrder: i },
      })
    }
    console.log(`  ${city.name}: ${cityTips.length} 类贴士已创建`)
  }

  // 写入攻略文章
  console.log('开始写入攻略文章...')
  const allGuides = [...guides, ...moreGuides]
  for (const guide of allGuides) {
    await prisma.guide.create({ data: guide })
  }
  console.log(`共 ${allGuides.length} 篇攻略文章已创建`)

  console.log('数据初始化完成！')
}

main()
  .catch((e) => {
    console.error('数据初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
