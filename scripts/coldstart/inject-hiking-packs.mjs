// 一次性脚本：向 7 个翻译包注入 hikingRoutes（14 条路线 key 字段）与 3 篇徒步指南
// 运行一次即弃；长字段（description/permit/videos/正文）按站内策略回退英文
import fs from 'node:fs'

const ts = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"

const ROUTE_COUNT = 14

const packs = {
  ko: {
    routes: [
      ['타이러핑 협곡 하이트레일(高路)', '윈난 · 리장 근교', '외국인에게 가장 유명한 중국 트레킹 1위 — 게스트하우스 숙박에 캠핑 불필요', '10월–4월(건기)'],
      ['우궁산 고산초원 횡단', '장시성 · 핑샹 근교', '구름 위 1만 헥타르 초원의 바다 — 중국에서 가장 쉬운 일출 트레킹', '5–10월; 9월 황금빛 풀원'],
      ['화산 야간 등반', '산시성 · 시안 근교', '해발 2,100m 암벽 계단 — 밤에 오르고 구름 위 일출', '4–10월(여름이 야간 등반에 최적)'],
      ['자가나(扎尕那) 돌산 트레일', '간난 티베트 지역 · 간쑤', '4,000m 암석 피라미드 아래 티베트 석성 마을', '6–10월'],
      ['위벵(雨崩) 마을과 메이리 성지 순례', '윈난 · 더친', '메이리 설산 아래 도로 없는 신성한 계곡 마을', '4–6월, 9–11월'],
      ['다오청 야딩 하늘 호수', '쓰촨 캄 지역', '4,600m 청록색 호수 위에 솟은 세 개의 6,000m봉', '9–11월 단풍'],
      ['카나스–허무 숲 트레일', '신장 · 알타이', '알타이 산맥 아래 시베리아 침엽수림과 카자흐 초원', '6–9월; 9월 중순 황금빛'],
      ['쓰구냥산 창핑–비펑 횡단', '쓰촨 · 샤오진', '"촉산의 여왕" 6,250m 암벽을 끝까지 걷다', '5–10월; 9월 하순 단풍'],
      ['궁가(미야콩카) 대환상', '쓰촨 · 캉딩', '7,556m "쓰촨의 왕"을 한 바퀴 — 빙하와 고개와 온천 골짜기', '5–6월, 9–10월'],
      ['거녜(格聂) 목장 루트', '쓰촨 · 리탕', '6,204m 미등정 거봉 아래 꽃이 만발한 고원', '6–10월; 7월 꽃 절정'],
      ['메이리 북사면 횡단', '윈난 · 더친', '메이리 설산 북벽의 매달린 빙하와 마주하다', '5–10월'],
      ['텡거리 사막 호수 횡단', '내몽골 · 알라샨', '3일간의 사구와 염호, 그리고 인생에서 가장 요란한 별하늘', '4–5월, 9–10월'],
      ['카일라시 카르라(순례)', '티베트 · 응아리', '지구에서 가장 신성한 산을 52km — 4개 종교의 성산', '5–10월; 사가다와 축제(5·6월)'],
      ['우쑨 고대로', '신장 · 일리–아커쑤', '2,000년 실크로드 톈산 횡단, 천국의 호수로 끝나는', '6–9월만'],
    ],
    guides: [
      ['타이러핑 협곡 하이트레일 완전 가이드: 2일간의 세계 10대 트레일', '윈난에 온 외국인이라면 꼭 걸어야 할 트레킹: 리장/샹그릴라 교통, 게스트하우스 선택, 28굽이 넘기와 중후차오 급류 마무리까지 — 허가·텐트·가이드 모두 불필요.', '2일 트레킹', '9분 읽기'],
      ['중국 트레킹 허가와 규정: 외국인이 걸을 수 있는 것·없는 것', '운동화만 있으면 되는 지역(윈난·쓰촨 대부분), 사전 수배가 필요한 지역(티베트 전역), 전면 금지된 루트 — 국경 지역 규정, 보험, 구조 상식까지.', '허가·규정', '10분 읽기'],
      ['중국 트레킹 고산병 가이드: 알기 쉽게 설명', '어떤 코스에서 고산병 위험이 있는지, 적응의 황금률, 지금 즉시 하산해야 할 증상, 그리고 4,400m로 직행하지 않고 단계적으로 오르는 일정 짜기.', '고도 가이드', '9분 읽기'],
    ],
  },
  ja: {
    routes: [
      ['虎跳峡ハイトレイル（高路）', '雲南 · 麗江近郊', '外国人に最も知られる中国トレッキングNo.1 — 山小屋泊でテント不要', '10月–4月（乾季）'],
      ['武功山アルパイン草原縦走', '江西省 · 萍郷近郊', '雲の上に広がる草地の海 — 中国で一番気軽な日の出トレッキング', '5–10月；9月は金色の草原'],
      ['華山ナイトクライム', '陝西省 · 西安近郊', '標高2,100mの岩壁階段 — 夜登って雲上の御来光', '4–10月（夏が夜登山に最適）'],
      ['扎尕那（ジャガナ）石山トレイル', '甘南チベット地域 · 甘粛省', '4,000mの岩ピラミッドの下のチベット石造集落', '6–10月'],
      ['雨崩村と梅里雪山巡礼', '雲南省 · 徳欽', '梅里雪山の麓、車の来ない聖なる谷の村', '4–6月・9–11月'],
      ['稲城亜丁の天空の湖', '四川カンパ地域', '4,600mの湖に映る3座の6,000m峰', '9–11月の紅葉'],
      ['カナス—禾木森林トレイル', '新疆 · アルタイ', 'アルタイ山嶺の下のシベリア針葉樹林とカザフ草原', '6–9月；9月中旬は黄金色'],
      ['四姑娘山 竜坪溝→畢棚溝縦走', '四川省 · 小金', '「蜀山の女王」6,250mの壁を端から端まで歩く', '5–10月；9月下旬は紅葉'],
      ['貢嘎（ミニヤコンカ）大環状', '四川省 · 康定', '7,556m「四川の王」を一周 — 氷河と峠と温泉の谷', '5–6月・9–10月'],
      ['格聂（ゲニエ）牧場ルート', '四川省 · 理塘', '6,204mの未登頂巨峰の下の花の高原', '6–10月；7月は花の最盛期'],
      ['梅里北坂縦走', '雲南省 · 徳欽', 'メリ雪山の北壁、吊り氷河と真正面から対峙', '5–10月'],
      ['騰格里砂漠 湖巡り縦走', '内モンゴル · アラシャン', '3日間の砂丘と塩湖と、生まれて初めて聴く星空', '4–5月・9–10月'],
      ['カイラス山巡礼（コルラ）', 'チベット · ガリ', '地球で最も神聖な山を52km — 4つの宗教の聖山', '5–10月；サガダワ祭（5・6月）'],
      ['烏孫古道', '新疆 · イリ〜アクス', 'シルクロード2,000年の天山縦断、天空の湖へ', '6–9月のみ'],
    ],
    guides: [
      ['虎跳峡ハイトレイル完全攻略：世界十大トレイルを2日で', '雲南に来た外国人なら全員歩くべきトレッキング：麗江/シャングリラからの行き方、山小屋選び、28ベンド越えから中虎跳の激流まで — 許可もテントもガイドも不要。', '2日間トレック', '9分で読めます'],
      ['中国トレッキングの許可と規定：外国人が歩けるもの・歩けないもの', '靴だけでOKの地域（雲南・四川のほとんど）、手配が必要な地域（チベット全域）、全面禁止のルート — 国境地域の規定、保険、救急の基本まで。', '許可と規定', '10分で読めます'],
      ['中国トレックの高山病：わかりやすく説明する完全ガイド', 'どのルートでAMSのリスクがあるか、順応の黄金律、今すぐ下山すべき症状、そして4,400mへ直行せず段階的に登る旅程の組み方。', '高度ガイド', '9分で読めます'],
    ],
  },
  th: {
    routes: [
      ['เส้นทางไฮเทรลหุบเขาไทเกอร์ลีปปิง', 'ยูนนาน · ใกล้ลี่เจียง', 'เส้นทางเดินป่าอันดับ 1 ของจีนที่ชาวต่างชาติรู้จัก — นอนเกสต์เฮาส์ ไม่ต้องแคมป์', 'ต.ค.–เม.ย. (ฤดูแล้ง)'],
      ['เส้นทางทุ่งหญ้าสูงอู่กงซาน', 'เจียงซี · ใกล้ผิงเซียง', 'ทะเลหญ้า 1 หมื่นเฮกตาร์เหนือเมฆ — ทริปดูพระอาทิตย์ขึ้นที่ง่ายที่สุดในจีน', 'พ.ค.–ต.ค.; ก.ย. หญ้าสีทอง'],
      ['ไต่เขาหัวซานตอนกลางคืน', 'ฉ่านซี · ใกล้ซีอาน', 'บันไดหินผาสูง 2,100 ม. — ขึ้นกลางคืน เห็นแสงแรกของวันเหนือทะเลเมฆ', 'เม.ย.–ต.ค.'],
      ['เส้นทางเขาหินจากานา', 'กานนาน (ทิเบตอัมโด) · กานซู่', 'หมู่บ้านหินทิเบตใต้ยอดหินสี่พันเมตร', 'มิ.ย.–ต.ค.'],
      ['หมู่บ้านหยวี่เปิงและการเดินรอบเขาเหมยหลี', 'ยูนนาน · เต๋อชิน', 'หมู่บ้านหุบเขาศักดิ์สิทธิ์ที่ไม่มีถนนตัดผ่าน ใต้เขาเหมยหลี', 'เม.ย.–มิ.ย. และ ก.ย.–พ.ย.'],
      ['ทะเลสาบสวรรค์เต้าเฉิงหย่าติง', 'กานซือ (คัม สื่อชวน)', 'เทือกเขาหกพันเมตรสามลูกเหนือทะเลสาบสีเขียวมรกต 4,600 ม.', 'ก.ย.–พ.ย. ใบไม้เปลี่ยนสี'],
      ['เส้นทางป่าคานาส–เหอหมู่', 'ซินเจียง · อัลไต', 'ป่าไซบีเรียและทุ่งหญ้าคาซัคใต้เทือกเขาอัลไต', 'มิ.ย.–ก.ย.; ก.ย. สีทอง'],
      ['เส้นทางข้ามเขาซือกู่เนียงซาน', 'สื่อชวน · เซี่ยวจิน', 'เดินสุดความยาวของกำแพงหิน 6,250 ม. "ราชินีแห่งขุนเขาเสฉวน"', 'พ.ค.–ต.ค.; ปลาย ก.ย. ใบไม้เหลือง'],
      ['เส้นทางวนรอบกงกา (มินยาคองกา)', 'สื่อชวน · คังติ้ง', 'อ้อมรอบ "ราชาแห่งเสฉวน" 7,556 ม. — ธารน้ำแข็ง ช่องเขา และหุบเขาน้ำพุร้อน', 'พ.ค.–มิ.ย. และ ก.ย.–ต.ค.'],
      ['เส้นทางทุ่งเลี้ยงสัตว์เกอเนี่ย', 'สื่อชวน · หลี่ถาง', 'ที่ราบดอกไม้ใต้ยอดเขา 6,204 ม. ที่ยังไม่มีใครพิชิต', 'มิ.ย.–ต.ค.; ก.ค. ดอกไม้บาน'],
      ['เส้นทางข้ามเนินเหนือเหมยหลี', 'ยูนนาน · เต๋อชิน', 'เผชิญหน้ากับธารน้ำแข็งแขวนบนเนินเหนือเขาเหมยหลี', 'พ.ค.–ต.ค.'],
      ['เส้นทางข้ามทะเลทรายเทียนเกอร์', 'มองโกเลียใน · อาลาซาน', 'สามวันแห่งเนินทราย ทะเลสาบเกลือ และท้องฟ้าดาราที่ตราตรึงที่สุดในชีวิต', 'เม.ย.–พ.ค. และ ก.ย.–ต.ค.'],
      ['การเดินรอบเขาไกลาศ', 'ทิเบต · งารี', '52 กม. รอบภูเขาศักดิ์สิทธิ์ที่สุดบนโลก — ศักดิ์สิทธิ์ของ 4 ศาสนา', 'พ.ค.–ต.ค.; เทศกาลซากาดาวา (พ.ค./มิ.ย.)'],
      ['เส้นทางโบราณอูซุน', 'ซินเจียง · อีลี–อาเค่อซู', 'เดินข้ามเทียนซานตามเส้นทางสายไหม 2,000 ปี จบที่ทะเลสาบสวรรค์', 'มิ.ย.–ก.ย. เท่านั้น'],
    ],
    guides: [
      ['ไฮเทรลหุบเขาไทเกอร์ลีปปิง: คู่มือเดิน 2 วันฉบับสมบูรณ์', 'เส้นทางที่ชาวต่างชาติทุกคนที่มายูนนานควรเดิน: การเดินทางจากลี่เจียง/ช่างกรีล่า เลือกเกสต์เฮาส์อย่างไร ข้าม 28 โค้ง และปิดท้ายที่แก่งกลางหุบเขา — ไม่ต้องมีใบอนุญาต เต็นท์ หรือไกด์', 'เดิน 2 วัน', 'อ่าน 9 นาที'],
      ['ใบอนุญาตและกฎการเดินป่าในจีน: อะไรเดินได้ อะไรเดินไม่ได้', 'พื้นที่ที่ต้องมีแค่รองเท้า (ยูนนานและเสฉวนส่วนใหญ่) พื้นที่ที่ต้องจัดการผ่านบริษัททัวร์ (ทิเบตทั้งหมด) และเส้นทางที่ถูกห้าม — พร้อมกฎเขตชายแดน ประกันภัย และการกู้ภัย', 'ใบอนุญาต·กฎ', 'อ่าน 10 นาที'],
      ['อาการเมาความสูงบนเส้นทางเดินป่าจีน: คู่มือภาษาชาวบ้าน', 'เส้นทางไหนเสี่ยง AMS กฎทองของการปรับตัว อาการที่แปลว่า "ลงเขาทันที" และวิธีวางแผนทริปที่ค่อย ๆ ขึ้นแทนที่จะบินตรงไปที่ 4,400 ม.', 'คู่มือความสูง', 'อ่าน 9 นาที'],
    ],
  },
  de: {
    routes: [
      ['Tiger-Sprung-Schlucht Höhenweg', 'Yunnan, bei Lijiang', 'Chinas bei Ausländern berühmtester Trek — Hütten statt Zelt', 'Okt–Apr (Trockenzeit)'],
      ['Wugongshan-Almwiesen-Überschreitung', 'Jiangxi, bei Pingxiang', '10.000 Hektar Grasmeer über den Wolken', 'Mai–Okt; Sep goldenes Gras'],
      ['Huashan-Nachtwanderung', 'Shaanxi, bei Xi\'an', 'Granittreppen auf 2.100 m — nachts rauf, Sonnenaufgang über den Wolken', 'Apr–Okt'],
      ['Zhagana-Steinberg-Pfade', 'Gannan (tibetisches Amdo), Gansu', 'Tibetisches Steindorf unter 4.000-m-Felspyramiden', 'Jun–Okt'],
      ['Yubeng & die Meili-Kora', 'Deqin, Yunnan', 'Straßenloses Dorf unter dem heiligen Meili-Schneeberg', 'Apr–Jun & Sep–Nov'],
      ['Daocheng-Yading-Himmelsseen', 'Garzê (Sichuan-Kham)', 'Drei 6.000er über türkisen Seen auf 4.600 m', 'Sep–Nov Herbstfarben'],
      ['Kanas–Hemu-Waldtrek', 'Altay, Xinjiang', 'Sibirischer Wald und kasachische Steppe unter den Altaigipfeln', 'Jun–Sep; Mitte Sep golden'],
      ['Mt.-Siguniang-Überschreitung (Changping→Bipeng)', 'Xiaojin, Sichuan', 'Die 6.250-m-Wand der „Königin von Sichuan“ komplett zu Fuß', 'Mai–Okt; Ende Sep Lärchengold'],
      ['Gongga (Minya Konka) Große Runde', 'Kangding, Sichuan', 'Rund um den 7.556-m-„König von Sichuan“ — Gletscher, Pässe, Thermalquellen', 'Mai–Jun & Sep–Okt'],
      ['Genie-Pastorenrunde', 'Litang, Sichuan', 'Blumenhochebene unter einem unbestiegenen 6.204er', 'Jun–Okt; Jul Blüte'],
      ['Meili-Nordhang-Überschreitung', 'Deqin, Yunnan', 'Hängenden Gletschern auf der Nordseite direkt gegenüber', 'Mai–Okt'],
      ['Tengger-Wüsten-Seenquerung', 'Alxa, Innere Mongolei', 'Drei Tage Dünen, Salzseen und die lautesten Sterne Ihres Lebens', 'Apr–Mai & Sep–Okt'],
      ['Kailash-Kora', 'Ngari, Tibet', '52 km um den heiligsten Berg der Erde — vier Religionen, ein Gipfel', 'Mai–Okt; Saga-Dawa-Fest (Mai/Jun)'],
      ['Wusun-Alter Pfad', 'Ili–Aksu, Xinjiang', '2.000 Jahre alte Seidenstraßen-Querung des Tianshan bis zum Himmelssee', 'Nur Jun–Sep'],
    ],
    guides: [
      ['Tiger-Sprung-Schlucht Höhenweg: der komplette 2-Tages-Guide', 'Der Trek, den jeder Ausländer in Yunnan gehen sollte: Anreise ab Lijiang oder Shangri-La, Hüttenwahl, die 28 Kehren und der Abschluss an den Mittleren Stromschnellen — ohne Genehmigung, Zelt oder Guide.', '2-Tage-Trek', '9 Min. Lesezeit'],
      ['Trekking-Genehmigungen in China: was Ausländer dürfen und was nicht', 'Wo nur Schuhe nötig sind (der Großteil Yunnans und Sichuans), wo organisierte Touren Pflicht sind (ganz Tibet) und was verboten ist — plus Grenzregeln, Versicherung und Rettung.', 'Genehmigungen & Regeln', '10 Min. Lesezeit'],
      ['Höhenkrankheit auf Chinas Treks: der ehrliche Leitfaden', 'Welche Routen AMS-Risiko tragen, die goldenen Regeln der Akklimatisation, Warnsignale für „jetzt absteigen“ und wie man eine Reise plant, die allmählich steigt statt direkt auf 4.400 m zu fliegen.', 'Höhen-Leitfaden', '9 Min. Lesezeit'],
    ],
  },
  fr: {
    routes: [
      ['Haut sentier des Gorges du Saut du Tigre', 'Yunnan, près de Lijiang', 'Le trek chinois le plus célèbre chez les étrangers — gîtes, pas de tente', 'oct.–avr. (saison sèche)'],
      ['Traversée des alpages du Wugongshan', 'Jiangxi, près de Pingxiang', 'Une mer d\'herbe de 10 000 ha au-dessus des nuages', 'mai–oct. ; sept. herbe dorée'],
      ['Ascension nocturne du mont Hua', 'Shaanxi, près de Xi\'an', 'Des escaliers de granit à 2 100 m — montée de nuit, lever de soleil au-dessus des nuages', 'avr.–oct.'],
      ['Sentiers de pierre de Zhagana', 'Gannan (Amdo tibétain), Gansu', 'Un village tibétain de pierre sous des pyramides rocheuses de 4 000 m', 'juin–oct.'],
      ['Yubeng et la kora du Meili', 'Deqin, Yunnan', 'Un village sans route dans la vallée sacrée du Meili', 'avr.–juin et sept.–nov.'],
      ['Lacs célestes de Daocheng Yading', 'Garzê (Kham, Sichuan)', 'Trois sommets de 6 000 m sur des lacs turquoise à 4 600 m', 'sept.–nov. couleurs d\'automne'],
      ['Traversée des forêts Kanas–Hemu', 'Altay, Xinjiang', 'Forêt sibérienne et steppe kazakhe sous les sommets de l\'Altaï', 'juin–sept. ; mi-sept. doré'],
      ['Traversée du mont Siguniang (Changping→Bipeng)', 'Xiaojin, Sichuan', 'La paroi de 6 250 m de la « reine du Sichuan », de bout en bout', 'mai–oct. ; fin sept. mélèzes d\'or'],
      ['Grande boucle du Gongga (Minya Konka)', 'Kangding, Sichuan', 'Le tour du « roi du Sichuan » à 7 556 m — glaciers, cols, vallées thermales', 'mai–juin et sept.–oct.'],
      ['Ligne des pâturages du Genie', 'Litang, Sichuan', 'Un plateau fleuri sous un géant invaincu de 6 204 m', 'juin–oct. ; juil. floraison'],
      ['Traversée du flanc nord du Meili', 'Deqin, Yunnan', 'Face à face avec les glaciers suspendus du versant nord', 'mai–oct.'],
      ['Traversée des lacs du désert du Tengger', 'Alxa, Mongolie-Intérieure', 'Trois jours de dunes, lacs salés et étoiles assourdissantes', 'avr.–mai et sept.–oct.'],
      ['Kora du mont Kailash', 'Ngari, Tibet', '52 km autour de la montagne la plus sacrée du monde — quatre religions', 'mai–oct. ; festival Saga Dawa (mai/juin)'],
      ['Ancienne piste de Wusun', 'Ili–Aksu, Xinjiang', '2 000 ans de route de la soie à travers le Tianshan, jusqu\'au lac du Ciel', 'juin–sept. seulement'],
    ],
    guides: [
      ['Haut sentier des Gorges du Saut du Tigre : le guide complet en 2 jours', 'Le trek que tout visiteur étranger au Yunnan devrait faire : transport depuis Lijiang ou Shangri-La, choix des gîtes, les 28 lacets et l\'arrivée aux rapides — sans permis, sans tente, sans guide.', 'Trek de 2 jours', '9 min de lecture'],
      ['Permis et règles de trekking en Chine : ce que les étrangers peuvent (ou non) randonner', 'Où seules les chaussures suffisent (l\'essentiel du Yunnan et du Sichuan), où tout doit passer par des agences (tout le Tibet) et ce qui est interdit — plus zones frontalières, assurance et secours.', 'Permis & règles', '10 min de lecture'],
      ['Le mal aigu des montagnes sur les treks chinois : le guide en français simple', 'Quels itinéraires présentent un risque de MAM, les règles d\'or de l\'acclimatation, les symptômes qui imposent une descente immédiate, et comment monter progressivement au lieu de voler direct à 4 400 m.', 'Guide altitude', '9 min de lecture'],
    ],
  },
  es: {
    routes: [
      ['Sendero Alto de la Garganta del Salto del Tigre', 'Yunnan, cerca de Lijiang', 'El trek chino más famoso entre extranjeros — refugios, sin tienda de campaña', 'oct.–abr. (temporada seca)'],
      ['Travesía de praderas del Wugongshan', 'Jiangxi, cerca de Pingxiang', 'Un mar de hierba de 10.000 hectáreas sobre las nubes', 'may–oct; sept. hierba dorada'],
      ['Ascenso nocturno al monte Hua', 'Shaanxi, cerca de Xi\'an', 'Escaleras de granito a 2.100 m — subida de noche, amanecer sobre las nubes', 'abr.–oct.'],
      ['Rutas de piedra de Zhagana', 'Gannan (Amdo tibetano), Gansu', 'Un pueblo tibetano de piedra bajo pirámides rocosas de 4.000 m', 'jun.–oct.'],
      ['Yubeng y la kora del Meili', 'Deqin, Yunnan', 'Un pueblo sin carretera en el valle sagrado del Meili', 'abr.–jun. y sept.–nov.'],
      ['Lagos celestes de Daocheng Yading', 'Garzê (Kham, Sichuan)', 'Tres seismiles sobre lagos turquesa a 4.600 m', 'sept.–nov. colores de otoño'],
      ['Travesía de bosques Kanas–Hemu', 'Altay, Xinjiang', 'Bosque siberiano y estepa kazaja bajo los picos del Altái', 'jun.–sept.; mediados de sept. dorado'],
      ['Travesía del monte Siguniang (Changping→Bipeng)', 'Xiaojin, Sichuan', 'La pared de 6.250 m de la «reina de Sichuan», de punta a punta', 'may–oct.; finales de sept. alerces dorados'],
      ['Gran vuelta del Gongga (Minya Konka)', 'Kangding, Sichuan', 'Rodeando al «rey de Sichuan» de 7.556 m — glaciares, puertos y valles termales', 'may–jun. y sept.–oct.'],
      ['Ruta de pastizales del Genie', 'Litang, Sichuan', 'Una meseta florida bajo un gigante de 6.204 m nunca escalado', 'jun.–oct.; jul. plena floración'],
      ['Travesía de la ladera norte del Meili', 'Deqin, Yunnan', 'Cara a cara con los glaciares colgantes de la ladera norte', 'may–oct.'],
      ['Cruce de lagos del desierto de Tengger', 'Alxa, Mongolia Interior', 'Tres días de dunas, lagos salados y las estrellas más estruendosas de tu vida', 'abr.–may. y sept.–oct.'],
      ['Kora del monte Kailash', 'Ngari, Tíbet', '52 km alrededor de la montaña más sagrada de la Tierra — cuatro religiones', 'may–oct.; festival Saga Dawa (may./jun.)'],
      ['Antiguo camino de Wusun', 'Ili–Aksu, Xinjiang', '2.000 años de ruta de la seda cruzando el Tianshan hasta el lago del Cielo', 'solo jun.–sept.'],
    ],
    guides: [
      ['Sendero Alto de la Garganta del Salto del Tigre: guía completa de 2 días', 'El trek que todo visitante extranjero debería hacer en Yunnan: transporte desde Lijiang o Shangri-La, elección de refugios, los 28 recodos y el final en los rápidos — sin permiso, sin tienda, sin guía.', 'Trek de 2 días', '9 min de lectura'],
      ['Permisos y normas de trekking en China: qué pueden (y no pueden) hacer los extranjeros', 'Dónde bastan las botas (casi todo Yunnan y Sichuan), dónde hay que ir con agencia (todo el Tíbet) y qué está prohibido — más reglas fronterizas, seguros y rescates.', 'Permisos y normas', '10 min de lectura'],
      ['El mal de altura en los treks chinos: la guía en lenguaje claro', 'Qué rutas implican riesgo de mal de altura, las reglas de oro de la aclimatación, los síntomas que exigen «descender ya» y cómo subir gradualmente en lugar de volar directo a 4.400 m.', 'Guía de altitud', '9 min de lectura'],
    ],
  },
  it: {
    routes: [
      ['Sentiero alto delle Gole del Salto della Tigre', 'Yunnan, vicino a Lijiang', 'Il trek cinese più famoso tra gli stranieri — rifugi, niente tenda', 'ott–apr (stagione secca)'],
      ['Traversata dei pascoli del Wugongshan', 'Jiangxi, vicino a Pingxiang', 'Un mare d\'erba di 10.000 ettari sopra le nuvole', 'mag–ott; set. erba dorata'],
      ['Ascensione notturna del Monte Hua', 'Shaanxi, vicino a Xi\'an', 'Scalinate di granito a 2.100 m — si sale di notte, alba sopra le nuvole', 'apr–ott'],
      ['Sentieri di pietra di Zhagana', 'Gannan (Amdo tibetano), Gansu', 'Un villaggio tibetano di pietra sotto piramidi rocciose di 4.000 m', 'giu–ott'],
      ['Yubeng e la kora del Meili', 'Deqin, Yunnan', 'Un villaggio senza strada nella valle sacra del Meili', 'apr–giu e set–nov'],
      ['Laghi celesti di Daocheng Yading', 'Garzê (Kham, Sichuan)', 'Tre seimila sui laghi turchesi a 4.600 m', 'set–nov colori d\'autunno'],
      ['Trek forestale Kanas–Hemu', 'Altay, Xinjiang', 'Foresta siberiana e steppa kazaka sotto le cime dell\'Altaj', 'giu–set; metà set. dorato'],
      ['Traversata del Monte Siguniang (Changping→Bipeng)', 'Xiaojin, Sichuan', 'La parete di 6.250 m della «regina del Sichuan», da un capo all\'altro', 'mag–ott; fine set. larici dorati'],
      ['Grande anello del Gongga (Minya Konka)', 'Kangding, Sichuan', 'Il giro del «re del Sichuan» da 7.556 m — ghiacciai, valichi e valli termali', 'mag–giu e set–ott'],
      ['Linea dei pascoli del Genie', 'Litang, Sichuan', 'Un altopiano fiorito sotto un gigante inviolato di 6.204 m', 'giu–ott; lug. fioritura'],
      ['Traversata del versante nord del Meili', 'Deqin, Yunnan', 'A faccia a faccia con i ghiacciai sospesi del lato nord', 'mag–ott'],
      ['Attraversata dei laghi del deserto del Tengger', 'Alxa, Mongolia Interna', 'Tre giorni di dune, laghi salati e le stelle più assordanti della vita', 'apr–mag e set–ott'],
      ['Kora del Monte Kailash', 'Ngari, Tibet', '52 km attorno alla montagna più sacra della Terra — quattro religioni', 'mag–ott; festa Saga Dawa (mag/giu)'],
      ['Antico sentiero di Wusun', 'Ili–Aksu, Xinjiang', '2.000 anni di Via della Seta attraverso il Tianshan, fino al Lago del Cielo', 'solo giu–set'],
    ],
    guides: [
      ['Sentiero alto delle Gole del Salto della Tigre: guida completa in 2 giorni', 'Il trek che ogni visitatore straniero dovrebbe fare nello Yunnan: trasporti da Lijiang o Shangri-La, scelta dei rifugi, i 28 tornanti e l\'arrivo alle rapide — senza permessi, tenda o guida.', 'Trek di 2 giorni', 'Lettura 9 min'],
      ['Permessi e regole del trekking in Cina: cosa possono (e non) fare gli stranieri', 'Dove bastano le scarpe (quasi tutto Yunnan e Sichuan), dove serve un\'agenzia (tutto il Tibet) e cosa è vietato — più zone di confine, assicurazioni e soccorso.', 'Permessi e regole', 'Lettura 10 min'],
      ['Il mal di montagna sui trek cinesi: la guida in parole semplici', 'Quali itinerari comportano rischio di AMS, le regole d\'oro dell\'acclimatazione, i sintomi che impongono la discesa immediata e come salire gradualmente invece di volare dritti a 4.400 m.', 'Guida all\'altitudine', 'Lettura 9 min'],
    ],
  },
}

const GUIDE_SLUGS = [
  'tiger-leaping-gorge-trek-guide',
  'china-trekking-permits-guide',
  'altitude-sickness-trekking-china',
]

for (const [code, p] of Object.entries(packs)) {
  if (p.routes.length !== ROUTE_COUNT) throw new Error(`${code}: routes ${p.routes.length} != ${ROUTE_COUNT}`)
  const file = `data/translations/${code}.ts`
  let src = fs.readFileSync(file, 'utf8')

  if (src.includes('hikingRoutes')) throw new Error(`${file}: hikingRoutes 已存在，跳过`)

  // 1) guides 对象内插入 3 篇徒步指南（紧跟 guides: { 之后，键序无关紧要）
  const guidesAnchor = '  guides: {'
  if (!src.includes(guidesAnchor)) throw new Error(`${file}: 未找到 guides 锚点`)
  const guideSnippet = p.guides.map(([title, excerpt, label, readTime], i) =>
    `    '${GUIDE_SLUGS[i]}': {\n      title: ${ts(title)},\n      excerpt: ${ts(excerpt)},\n      label: ${ts(label)},\n      readTime: ${ts(readTime)},\n    },`
  ).join('\n')
  src = src.replace(guidesAnchor, `${guidesAnchor}\n${guideSnippet}`)

  // 2) 包对象末尾追加 hikingRoutes 数组（索引与 data/hiking-data.ts 顺序对齐）
  const tailAnchor = '  ],\n}\n\nexport default pack'
  if (!src.includes(tailAnchor)) throw new Error(`${file}: 未找到包尾锚点`)
  const routesSnippet = '  hikingRoutes: [\n' + p.routes.map(([name, region, tagline, season]) =>
    `    {\n      name: ${ts(name)},\n      region: ${ts(region)},\n      tagline: ${ts(tagline)},\n      season: ${ts(season)},\n    },`
  ).join('\n') + '\n  ],'
  src = src.replace(tailAnchor, `  ],\n${routesSnippet}\n}\n\nexport default pack`)

  fs.writeFileSync(file, src, 'utf8')
  console.log(`✓ ${file} (+${p.routes.length} routes, +3 guides)`)
}
