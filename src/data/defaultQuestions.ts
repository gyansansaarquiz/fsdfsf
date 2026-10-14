import { Category, Question } from '../types/quiz';

export const CATEGORIES: Category[] = [
  {
    id: 'nepal-gk',
    name: 'नेपालको सामान्य ज्ञान',
    nameEn: 'Nepal General Knowledge',
    icon: '🏔️',
    description: 'नेपालको राष्ट्रिय प्रतीक, संविधान, महत्वपूर्ण तथ्यहरू र विविध जानकारी।',
    color: 'from-amber-500 to-red-600',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30'
  },
  {
    id: 'history-geography',
    name: 'नेपालको इतिहास र भूगोल',
    nameEn: 'Nepal History & Geography',
    icon: '🗺️',
    description: 'एकीकरण, शाह तथा राणाकाल, हिमाल, नदीनाला, ताल र राष्ट्रिय निकुञ्जहरू।',
    color: 'from-emerald-500 to-teal-700',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'science-tech',
    name: 'विज्ञान तथा प्रविधि',
    nameEn: 'Science & Technology',
    icon: '🔬',
    description: 'भौतिक, जैविक र रासायनिक विज्ञान, नयाँ आविष्कार र अनुसन्धान।',
    color: 'from-blue-500 to-indigo-700',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    id: 'sports',
    name: 'खेलकुद',
    nameEn: 'Sports',
    icon: '⚽',
    description: 'फुटबल, क्रिकेट, भलिबल, ओलम्पिक, राष्ट्रिय तथा अन्तर्राष्ट्रिय खेलकुद।',
    color: 'from-orange-500 to-amber-600',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  },
  {
    id: 'world-gk',
    name: 'विश्व सामान्य ज्ञान',
    nameEn: 'World General Knowledge',
    icon: '🌍',
    description: 'संयुक्त राष्ट्रसंघ, महादेश, विश्वका प्रमुख देश, राजधानी र ऐतिहासिक घटनाहरू।',
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'computer-internet',
    name: 'कम्प्युटर तथा इन्टरनेट',
    nameEn: 'Computer & Internet',
    icon: '💻',
    description: 'सफ्टवेयर, हार्डवेयर, इन्टरनेट प्रोटोकल, एआई र साइबर सुरक्षा।',
    color: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    id: 'math',
    name: 'गणित',
    nameEn: 'Mathematics',
    icon: '📐',
    description: 'अंकगणित, प्रतिशत, नाफा-नोक्सान, ज्यामिति र तार्किक समस्याहरू।',
    color: 'from-yellow-500 to-orange-600',
    badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
  },
  {
    id: 'nepali-language',
    name: 'नेपाली भाषा',
    nameEn: 'Nepali Language & Literature',
    icon: '✍️',
    description: 'नेपाली व्याकरण, साहित्यकारहरू, कृति, शब्दार्थ र उखान-टुक्का।',
    color: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  },
  {
    id: 'current-affairs',
    name: 'समसामयिक विषय',
    nameEn: 'Current Affairs',
    icon: '📰',
    description: 'हालसालैका महत्वपूर्ण राष्ट्रिय तथा अन्तर्राष्ट्रिय घटनाक्रम र समाचार।',
    color: 'from-sky-500 to-teal-600',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
  }
];

export const DEFAULT_QUESTIONS: Question[] = [
  // १. नेपालको सामान्य ज्ञान
  {
    id: 'q-gk-1',
    question: 'नेपालको राष्ट्रिय फूल कुन हो?',
    options: ['गुलाब', 'लालीगुराँस', 'कमल', 'चमेली'],
    correctAnswer: 1,
    categoryId: 'nepal-gk',
    difficulty: 'easy',
    explanation: 'नेपालको राष्ट्रिय फूल लालीगुराँस (Rhododendron) हो। यो पहाडी भूभागमा पाइन्छ।',
    hint: 'यो पहाडमा फुल्ने रातो रङको फूल हो।'
  },
  {
    id: 'q-gk-2',
    question: 'नेपालको राष्ट्रिय पंक्षी डाँफे कुन परिवारमा पर्दछ?',
    options: ['काग परिवार', 'मजुर परिवार (Phasianidae)', 'ढुकुर परिवार', 'चील परिवार'],
    correctAnswer: 1,
    categoryId: 'nepal-gk',
    difficulty: 'medium',
    explanation: 'डाँफे (Lophophorus impejanus) मजुर परिवार (Phasianidae) को सुन्दर हिमाली पंक्षी हो।',
    hint: 'यसलाई अंग्रेजीमा Himalayan Monal भनिन्छ र यो मजुर परिवारमा पर्छ।'
  },
  {
    id: 'q-gk-3',
    question: 'नेपालको संविधान २०७२ कहिले जारी गरिएको थियो?',
    options: ['२०७२ असोज ३ गते', '२०७२ वैशाख १२ गते', '२०७२ मंसिर १ गते', '२०७२ माघ १० गते'],
    correctAnswer: 0,
    categoryId: 'nepal-gk',
    difficulty: 'easy',
    explanation: 'नेपालको वर्तमान संविधान २०७२ साल असोज ३ गते संविधान सभाबाट पारित भई जारी गरिएको हो। यस दिनलाई संविधान दिवसका रूपमा मनाइन्छ।',
    hint: 'प्रत्येक वर्ष यस दिन संविधान दिवस मनाइन्छ।'
  },
  {
    id: 'q-gk-4',
    question: 'नेपालको राष्ट्रिय गान "सयौं थुँगा फूलका हामी" का रचनाकार को हुन्?',
    options: ['गोपालप्रसाद रिमाल', 'अम्बर गुरुङ', 'प्रदीप कुमार राई (व्याकुल माइला)', 'माधवप्रसाद घिमिरे'],
    correctAnswer: 2,
    categoryId: 'nepal-gk',
    difficulty: 'medium',
    explanation: 'राष्ट्रिय गानका गीतकार प्रदीप कुमार राई (व्याकुल माइला) हुन् भने यसमा संगीत स्वर्गीय अम्बर गुरुङले भरेका हुन्।',
    hint: 'उहाँ ओखलढुङ्गाका बासिन्दा हुनुहुन्छ र व्याकुल माइला उपनामले चिनिनुहुन्छ।'
  },
  {
    id: 'q-gk-5',
    question: 'नेपालको कुल क्षेत्रफल कति वर्ग किलोमिटर रहेको छ?',
    options: ['१,४७,१८१ वर्ग कि.मी.', '१,४७,५१६ वर्ग कि.मी.', '१,५०,००० वर्ग कि.मी.', '१,४०,२१० वर्ग कि.मी.'],
    correctAnswer: 1,
    categoryId: 'nepal-gk',
    difficulty: 'medium',
    explanation: 'नेपालको नयाँ प्रशासनिक तथा राजनीतिक नक्सा अनुसार कुल क्षेत्रफल १,४७,५१६ वर्ग किलोमिटर कायम भएको छ।',
    hint: 'कालापानी र लिपुलेक समावेश गरिएको नयाँ नक्सापछिको क्षेत्रफल हो।'
  },

  // २. नेपालको इतिहास र भूगोल
  {
    id: 'q-hg-1',
    question: 'नेपालको एकीकरण गर्ने राजा को हुन्?',
    options: ['राजा जनक', 'पृथ्वीनारायण शाह', 'रणबहादुर शाह', 'प्रताप मल्ल'],
    correctAnswer: 1,
    categoryId: 'history-geography',
    difficulty: 'easy',
    explanation: 'गोरखाका राजा पृथ्वीनारायण शाहले स-साना बाइसे र चौबिसे राज्यहरूलाई एकीकरण गरी आधुनिक नेपालको जग बसालेका हुन्।',
    hint: 'गोरखाका राजा जसले काठमाडौं उपत्यका विजय गरेका थिए।'
  },
  {
    id: 'q-hg-2',
    question: 'संसारको सर्वोच्च शिखर सगरमाथाको नयाँ उचाइ कति कायम गरिएको छ?',
    options: ['८८४८ मिटर', '८८४८.८६ मिटर', '८८५० मिटर', '८८४०.५० मिटर'],
    correctAnswer: 1,
    categoryId: 'history-geography',
    difficulty: 'easy',
    explanation: 'नेपाल र चीन सरकारले संयुक्त रूपमा २०७७ मंसिर २३ (८ डिसेम्बर २०२०) मा घोषणा गरेको नयाँ उचाइ ८८४८.८६ मिटर हो।',
    hint: 'अघिल्लो उचाइभन्दा ८६ सेन्टिमिटर बढी छ।'
  },
  {
    id: 'q-hg-3',
    question: 'नेपालको सबैभन्दा गहिरो ताल कुन हो?',
    options: ['रारा ताल', 'फेवा ताल', 'शे-फोक्सुण्डो ताल', 'तिलिचो ताल'],
    correctAnswer: 2,
    categoryId: 'history-geography',
    difficulty: 'medium',
    explanation: 'डोल्पा जिल्लामा अवस्थित शे-फोक्सुण्डो ताल नेपालको सबैभन्दा गहिरो (१४५ मिटर) ताल मानिन्छ।',
    hint: 'यो ताल डोल्पा जिल्लामा पर्दछ।'
  },
  {
    id: 'q-hg-4',
    question: 'नेपालमा राणा शासनको स्थापना कसले गरेका थिए?',
    options: ['भीमसेन थापा', 'जङ्गबहादुर राणा', 'चन्द्र शमशेर', 'रणोद्दीप सिंह'],
    correctAnswer: 1,
    categoryId: 'history-geography',
    difficulty: 'easy',
    explanation: 'वि.सं. १९०३ को कोतपर्वपछि जङ्गबहादुर राणाले नेपालमा १०४ वर्षे जहाँनिया राणा शासनको सुरुआत गरेका थिए।',
    hint: 'कोतपर्वबाट शक्तिमा आएका शक्तिशाली प्रधानमन्त्री।'
  },
  {
    id: 'q-hg-5',
    question: 'नेपालको सबैभन्दा ठूलो राष्ट्रिय निकुञ्ज कुन हो?',
    options: ['चितवन राष्ट्रिय निकुञ्ज', 'शे-फोक्सुण्डो राष्ट्रिय निकुञ्ज', 'सगरमाथा राष्ट्रिय निकुञ्ज', 'बर्दिया राष्ट्रिय निकुञ्ज'],
    correctAnswer: 1,
    categoryId: 'history-geography',
    difficulty: 'hard',
    explanation: 'शे-फोक्सुण्डो राष्ट्रिय निकुञ्ज ३,५५५ वर्ग किलोमिटर क्षेत्रफल ओगटेको नेपालको सबैभन्दा ठूलो राष्ट्रिय निकुञ्ज हो।',
    hint: 'यसको क्षेत्रफल ३,५५५ वर्ग कि.मी. छ र यो डोल्पा तथा मुगुमा फैलिएको छ।'
  },

  // ३. विज्ञान तथा प्रविधि
  {
    id: 'q-st-1',
    question: 'पानीको रासायनिक सूत्र (Chemical Formula) के हो?',
    options: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctAnswer: 1,
    categoryId: 'science-tech',
    difficulty: 'easy',
    explanation: 'पानी दुई भाग हाइड्रोजन र एक भाग अक्सिजन मिलेर बनेको हुन्छ, जसको सूत्र H2O हो।',
    hint: 'दुईवटा हाइड्रोजन र एउटा अक्सिजन परमाणु।'
  },
  {
    id: 'q-st-2',
    question: 'सूर्यको प्रकाश पृथ्वीसम्म आइपुग्न लगभग कति समय लाग्छ?',
    options: ['२ मिनेट', '५ मिनेट', '८ मिनेट २० सेकेन्ड', '१५ मिनेट'],
    correctAnswer: 2,
    categoryId: 'science-tech',
    difficulty: 'medium',
    explanation: 'सूर्यको प्रकाश पृथ्वीसम्म आइपुग्न करिब ५०० सेकेन्ड अर्थात् ८ मिनेट २० सेकेन्डको समय लाग्छ।',
    hint: 'करिब ५०० सेकेन्ड अर्थात् आठ मिनेटभन्दा केही बढी।'
  },
  {
    id: 'q-st-3',
    question: 'गुरुत्वाकर्षण (Gravity) को नियम कसले प्रतिपादन गरेका थिए?',
    options: ['अल्बर्ट आइन्स्टाइन', 'सर आइज्याक न्युटन', 'ग्यालिलियो ग्यालिली', 'थोमस एल्भा एडिसन'],
    correctAnswer: 1,
    categoryId: 'science-tech',
    difficulty: 'easy',
    explanation: 'स्याउ खसेको देखेर गुरुत्वाकर्षणको सर्वव्यापी नियम पत्ता लगाउने वैज्ञानिक सर आइज्याक न्युटन हुन्।',
    hint: 'स्याउ रूखबाट भुइँमा खसेको देखेर नियम पत्ता लगाउने वैज्ञानिक।'
  },
  {
    id: 'q-st-4',
    question: 'मानव शरीरमा सबैभन्दा ठूलो ग्रन्थि (Gland) कुन हो?',
    options: ['कलेजो (Liver)', 'मुटु (Heart)', 'मृगौला (Kidney)', 'फोक्सो (Lungs)'],
    correctAnswer: 0,
    categoryId: 'science-tech',
    difficulty: 'medium',
    explanation: 'मानव शरीरको सबैभन्दा ठूलो आन्तरिक अङ्ग र ग्रन्थि कलेजो (Liver) हो।',
    hint: 'यो पाचन प्रणालीमा पित्त (Bile) उत्पादन गर्ने अङ्ग हो।'
  },
  {
    id: 'q-st-5',
    question: 'नेपालले प्रक्षेपण गरेको पहिलो नानो भू-उपग्रहको नाम के हो?',
    options: ['सगरमाथा-१', 'नेपालीस्याट-१ (NepaliSat-1)', 'गौतमबुद्ध-१', 'काठमाडौं-१'],
    correctAnswer: 1,
    categoryId: 'science-tech',
    difficulty: 'hard',
    explanation: 'नेपालले २०७६ वैशाख ५ (१७ अप्रिल २०१९) मा अमेरिकाको भर्जिनियाबाट "नेपालीस्याट-१" प्रक्षेपण गरेको थियो।',
    hint: 'यो नास्ट (NAST) र नेपाली वैज्ञानिकहरू आभास मास्के तथा हरिराम श्रेष्ठद्वारा तयार पारिएको थियो।'
  },

  // ४. खेलकुद
  {
    id: 'q-sp-1',
    question: 'नेपालको राष्ट्रिय खेल कुन हो?',
    options: ['डन्डीबियो', 'फुटबल', 'भलिबल', 'क्रिकेट'],
    correctAnswer: 2,
    categoryId: 'sports',
    difficulty: 'easy',
    explanation: 'नेपाल सरकारले २०७४ जेठ ८ गते भलिबललाई नेपालको आधिकारिक राष्ट्रिय खेल घोषणा गरेको हो।',
    hint: '६ जना खेलाडीले जाली माथिबाट बल हानेर खेल्ने खेल।'
  },
  {
    id: 'q-sp-2',
    question: 'नेपाली राष्ट्रिय क्रिकेट टोलीका चर्चित लेग स्पिनर को हुन्?',
    options: ['पारस खड्का', 'सन्दीप लामिछाने', 'ज्ञानेन्द्र मल्ल', 'रोहित पौडेल'],
    correctAnswer: 1,
    categoryId: 'sports',
    difficulty: 'easy',
    explanation: 'सन्दीप लामिछाने विश्वका प्रमुख T20 लिगहरू (IPL, BBL, CPL आदि) खेलिसकेका नेपालका चर्चित स्पिनर हुन्।',
    hint: 'विश्वप्रसिद्ध आईपीएल र बिग ब्यास खेलेका नेपाली बलर।'
  },
  {
    id: 'q-sp-3',
    question: 'फिफा विश्वकप २०२२ को विजेता राष्ट्र कुन हो?',
    options: ['फ्रान्स', 'अर्जेन्टिना', 'ब्राजिल', 'क्रोएसिया'],
    correctAnswer: 1,
    categoryId: 'sports',
    difficulty: 'easy',
    explanation: 'कतारमा सम्पन्न फिफा विश्वकप २०२२ को फाइनलमा फ्रान्सलाई पेनाल्टी सुटआउटमा पराजित गर्दै अर्जेन्टिनाले उपाधि जितेको थियो।',
    hint: 'लियोनेल मेस्सी कप्तान रहेको देश।'
  },
  {
    id: 'q-sp-4',
    question: 'ओलम्पिक खेलकुद कति कति वर्षको अन्तरालमा आयोजना गरिन्छ?',
    options: ['२ वर्ष', '३ वर्ष', '४ वर्ष', '५ वर्ष'],
    correctAnswer: 2,
    categoryId: 'sports',
    difficulty: 'medium',
    explanation: 'ग्रीष्मकालीन तथा शीतकालीन ओलम्पिक खेलकुद प्रत्येक ४/४ वर्षको अन्तरालमा आयोजना हुने गर्दछ।',
    hint: 'लिप इयर (Leap year) जस्तै हरेक चार वर्षमा।'
  },
  {
    id: 'q-sp-5',
    question: 'नेपालले पहिलो पटक एकदिवसीय अन्तर्राष्ट्रिय (ODI) मान्यता कहिले प्राप्त गरेको थियो?',
    options: ['सन् २०१८', 'सन् २०१४', 'सन् २०२०', 'सन् २०२२'],
    correctAnswer: 0,
    categoryId: 'sports',
    difficulty: 'hard',
    explanation: 'जिम्बावेमा भएको सन् २०१८ को विश्वकप छनोट प्रतियोगिता मार्फत नेपालले पहिलोपटक ४ वर्षका लागि एकदिवसीय मान्यता प्राप्त गरेको थियो।',
    hint: 'जिम्बावेमा सम्पन्न आईसीसी विश्वकप छनोट प्रतियोगिताको वर्ष।'
  },

  // ५. विश्व सामान्य ज्ञान
  {
    id: 'q-wg-1',
    question: 'संयुक्त राष्ट्रसंघ (UNO) को स्थापना कहिले भएको थियो?',
    options: ['सन् १९४५ अक्टोबर २४', 'सन् १९१४ जुलाई २८', 'सन् १९३९ सेप्टेम्बर १', 'सन् १९५० जनवरी २६'],
    correctAnswer: 0,
    categoryId: 'world-gk',
    difficulty: 'medium',
    explanation: 'दोस्रो विश्वयुद्धपछि विश्व शान्ति र सुरक्षा कायम राख्न सन् १९४५ अक्टोबर २४ मा संयुक्त राष्ट्रसंघको स्थापना भएको हो।',
    hint: 'प्रत्येक वर्ष २४ अक्टोबरमा संयुक्त राष्ट्रसंघ दिवस मनाइन्छ।'
  },
  {
    id: 'q-wg-2',
    question: 'विश्वको सबैभन्दा ठूलो महादेश कुन हो?',
    options: ['अफ्रिका', 'एसिया', 'उत्तर अमेरिका', 'युरोप'],
    correctAnswer: 1,
    categoryId: 'world-gk',
    difficulty: 'easy',
    explanation: 'एसिया क्षेत्रफल र जनसंख्या दुवै हिसाबले विश्वको सबैभन्दा ठूलो महादेश हो, जहाँ नेपाल पनि पर्दछ।',
    hint: 'नेपाल, भारत र चीन अवस्थित रहेको महादेश।'
  },
  {
    id: 'q-wg-3',
    question: 'जापानको राजधानी सहर कुन हो?',
    options: ['बेइजिङ', 'सियोल', 'टोकियो', 'बैंकक'],
    correctAnswer: 2,
    categoryId: 'world-gk',
    difficulty: 'easy',
    explanation: 'जापानको राजधानी र संसारको सबैभन्दा बढी जनघनत्व भएको सहर टोकियो हो।',
    hint: '२०२० को ओलम्पिक खेलकुद आयोजना भएको सहर।'
  },
  {
    id: 'q-wg-4',
    question: 'विश्वको सबैभन्दा लामो नदी कुन हो?',
    options: ['अमेजन नदी', 'नाइल नदी', 'याङ्त्से नदी', 'मिसिसिपी नदी'],
    correctAnswer: 1,
    categoryId: 'world-gk',
    difficulty: 'medium',
    explanation: 'अफ्रिका महादेशमा बग्ने नाइल नदी (६,६५० कि.मी.) विश्वको सबैभन्दा लामो नदी हो।',
    hint: 'इजिप्ट (मिश्र) सभ्यतालाई यसै नदीको वरदान भनिन्छ।'
  },
  {
    id: 'q-wg-5',
    question: 'नोबेल पुरस्कार कतिवटा विधामा प्रदान गरिन्छ?',
    options: ['५ विधा', '६ विधा', '७ विधा', '४ विधा'],
    correctAnswer: 1,
    categoryId: 'world-gk',
    difficulty: 'hard',
    explanation: 'नोबेल पुरस्कार ६ विधामा दिइन्छ: भौतिकशास्त्र, रसायनशास्त्र, चिकित्साशास्त्र, साहित्य, शान्ति, र अर्थशास्त्र।',
    hint: 'अर्थशास्त्र थपिएपछि हाल कुल ६ विधामा यो सम्मान दिइन्छ।'
  },

  // ६. कम्प्युटर तथा इन्टरनेट
  {
    id: 'q-ci-1',
    question: 'कम्प्युटरको "मस्तिष्क" (Brain of Computer) भनेर केलाई चिनिन्छ?',
    options: ['RAM', 'Hard Disk', 'CPU', 'Monitor'],
    correctAnswer: 2,
    categoryId: 'computer-internet',
    difficulty: 'easy',
    explanation: 'CPU (Central Processing Unit) ले कम्प्युटरका सम्पूर्ण गणना र निर्देशनहरू प्रशोधन गर्ने भएकाले यसलाई कम्प्युटरको मस्तिष्क भनिन्छ।',
    hint: 'Central Processing Unit को संक्षिप्त रूप।'
  },
  {
    id: 'q-ci-2',
    question: 'इन्टरनेटमा वेबसाइट खोज्न प्रयोग गरिने "WWW" को पूरा रूप के हो?',
    options: ['World Wide Web', 'World With Web', 'Wide World Web', 'Web World Wide'],
    correctAnswer: 0,
    categoryId: 'computer-internet',
    difficulty: 'easy',
    explanation: 'WWW को पूरा रूप "World Wide Web" हो, जसको आविष्कार टिम बर्नर्स-लीले सन् १९८९ मा गरेका थिए।',
    hint: 'संसारभरिका वेब पृष्ठहरूको सञ्जाल।'
  },
  {
    id: 'q-ci-3',
    question: '१ गीगाबाइट (1 GB) मा कति मेगाबाइट (MB) हुन्छ?',
    options: ['१००० MB', '१०२४ MB', '५१२ MB', '२०४८ MB'],
    correctAnswer: 1,
    categoryId: 'computer-internet',
    difficulty: 'medium',
    explanation: 'डिजिटल डेटा मापनमा बाइनरी प्रणाली अनुसार १ GB बराबर १०२४ MB (MegaBytes) हुन्छ।',
    hint: '२ को पावर १० (2^10) सँग सम्बन्धित संख्या।'
  },
  {
    id: 'q-ci-4',
    question: 'कुनै पनि वेब ठेगानामा प्रयोग हुने "HTTP" को पूरा रूप के हो?',
    options: ['HyperText Transfer Protocol', 'HighText Transfer Process', 'Hyper Transfer Text Program', 'Hyperlink Test Protocol'],
    correctAnswer: 0,
    categoryId: 'computer-internet',
    difficulty: 'medium',
    explanation: 'HTTP को पूरा रूप "HyperText Transfer Protocol" हो जसले वेब ब्राउजर र सर्भर बीच डेटा आदानप्रदान गर्दछ।',
    hint: 'वेबसाइटमा टेक्स्ट र मिडिया आदानप्रदान गर्ने प्रोटोकल।'
  },
  {
    id: 'q-ci-5',
    question: 'कम्प्युटर प्रोग्रामिङमा "AI" को पूर्ण रूप के हो?',
    options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Internet', 'Action Information'],
    correctAnswer: 1,
    categoryId: 'computer-internet',
    difficulty: 'easy',
    explanation: 'AI को पूरा रूप "Artificial Intelligence" (कृत्रिम बौद्धिकता) हो, जसले मेसिनलाई मानिसजस्तै सिक्न र सोच्न सक्षम बनाउँछ।',
    hint: 'कृत्रिम बौद्धिकता जसले अहिले विश्व प्रविधिमा क्रान्ति ल्याएको छ।'
  },

  // ७. गणित
  {
    id: 'q-ma-1',
    question: 'यदि कुनै वस्तुलाई रु. ५०० मा किनेर रु. ६०० मा बेच्दा कति प्रतिशत नाफा हुन्छ?',
    options: ['१०%', '१५%', '२०%', '२५%'],
    correctAnswer: 2,
    categoryId: 'math',
    difficulty: 'medium',
    explanation: 'नाफा = ६०० - ५०० = रु १००। नाफा प्रतिशत = (१०० / ५००) * १००% = २०% हुन्छ।',
    hint: 'नाफा १०० रुपैयाँ हो, यसलाई ५०० को तुलनामा प्रतिशत निकाल्नुहोस्।'
  },
  {
    id: 'q-ma-2',
    question: 'त्रिभुजका तीनवटै भित्री कोणहरूको योगफल कति डिग्री हुन्छ?',
    options: ['९० डिग्री', '१८० डिग्री', '२७० डिग्री', '३६० डिग्री'],
    correctAnswer: 1,
    categoryId: 'math',
    difficulty: 'easy',
    explanation: 'कुनै पनि समतलीय त्रिभुजका तीनवटै कोणहरूको योगफल सधैं १८०° हुन्छ।',
    hint: 'एक सरल रेखाको कोण बराबर।'
  },
  {
    id: 'q-ma-3',
    question: 'सबैभन्दा सानो र एक मात्र जोर अविभाज्य संख्या (Even Prime Number) कुन हो?',
    options: ['०', '१', '२', '४'],
    correctAnswer: 2,
    categoryId: 'math',
    difficulty: 'easy',
    explanation: '२ सबैभन्दा सानो अविभाज्य संख्या हो र यो एक मात्र जोर संख्या हो जुन अविभाज्य छ।',
    hint: '१ भन्दा ठूलो पहिलो जोर संख्या जसलाई १ र आफूले बाहेक अरुले भाग जाँदैन।'
  },
  {
    id: 'q-ma-4',
    question: 'वृत्तको परिधिको सूत्र कुन हो? (जहाँ r = अर्धव्यास)',
    options: ['πr²', '2πr', '4/3πr³', '2πr²'],
    correctAnswer: 1,
    categoryId: 'math',
    difficulty: 'medium',
    explanation: 'वृत्तको परिधि (Circumference) = २πr हुन्छ, जबकि क्षेत्रफल πr² हुन्छ।',
    hint: 'व्यास (२r) लाई पाई (π) ले गुणन गर्दा आउने सूत्र।'
  },
  {
    id: 'q-ma-5',
    question: 'श्रेणी क्रम: २, ६, १२, २०, ३०, ? मा अर्को संख्या कुन हुन्छ?',
    options: ['३६', '४०', '४२', '४८'],
    correctAnswer: 2,
    categoryId: 'math',
    difficulty: 'hard',
    explanation: 'फरक हेर्दा: +४, +६, +८, +१०, +१२ थपिँदै गएको छ। अतः ३० + १२ = ४२ हुन्छ।',
    hint: 'अघिल्लो फरकहरू क्रमश: ४, ६, ८, १० छन्, अब १२ जोड्नुहोस्।'
  },

  // ८. नेपाली भाषा
  {
    id: 'q-nl-1',
    question: 'नेपाली साहित्यमा "महाकवि" उपाधिले कसलाई चिनिन्छ?',
    options: ['भानुभक्त आचार्य', 'लक्ष्मीप्रसाद देवकोटा', 'माधवप्रसाद घिमिरे', 'लेखनाथ पौड्याल'],
    correctAnswer: 1,
    categoryId: 'nepali-language',
    difficulty: 'easy',
    explanation: '"मुनामदन" लगायतका अमर कृतिका सर्जक लक्ष्मीप्रसाद देवकोटालाई नेपाली साहित्यका महाकवि भनिन्छ।',
    hint: 'मुनामदन र शाकुन्तल महाकाव्यका रचयिता।'
  },
  {
    id: 'q-nl-2',
    question: 'नेपाली भाषाको आदिकवि कसलाई मानिन्छ?',
    options: ['मोतीराम भट्ट', 'भानुभक्त आचार्य', 'बालकृष्ण सम', 'पारिजात'],
    correctAnswer: 1,
    categoryId: 'nepali-language',
    difficulty: 'easy',
    explanation: 'रामायणलाई सरल नेपाली पद्यमा अनुवाद गरी नेपाली भाषालाई समृद्ध बनाउने भानुभक्त आचार्यलाई आदिकवि भनिन्छ।',
    hint: 'घाँसीको प्रेरणाबाट रामायण उल्था गर्ने तनहुँ चुँदी रम्घाका कवि।'
  },
  {
    id: 'q-nl-3',
    question: '"आकाश" शब्दको पर्यायवाची शब्द कुन हो?',
    options: ['धर्ती', 'गगन', 'सागर', 'पवन'],
    correctAnswer: 1,
    categoryId: 'nepali-language',
    difficulty: 'easy',
    explanation: 'आकाशको पर्यायवाची शब्द गगन, नभ, अम्बर, व्योम आदि हुन्।',
    hint: 'नभ, अम्बर वा व्योम पनि भनिन्छ।'
  },
  {
    id: 'q-nl-4',
    question: 'नेपाली व्याकरणमा पदवर्ग कति प्रकारका हुन्छन्?',
    options: ['५', '७', '९', '११'],
    correctAnswer: 2,
    categoryId: 'nepali-language',
    difficulty: 'medium',
    explanation: 'नेपाली व्याकरणमा पदवर्ग ९ प्रकारका हुन्छन्: नाम, सर्वनाम, विशेषण, क्रियापद, क्रियायोगी, नामयोगी, संयोजक, विस्मयादिबोधक र निपात।',
    hint: 'नाम, सर्वनाम, विशेषण, क्रियापद लगायतका भेदहरू।'
  },
  {
    id: 'q-nl-5',
    question: 'मदन पुरस्कार प्राप्त गर्ने प्रसिद्ध उपन्यास "शिरीषको फूल" का लेखक को हुन्?',
    options: ['विश्वेश्वरप्रसाद कोइराला', 'पारिजात', 'डायमण्ड शमशेर', 'शङ्कर लामिछाने'],
    correctAnswer: 1,
    categoryId: 'nepali-language',
    difficulty: 'medium',
    explanation: '"शिरीषको फूल" वि.सं. २०२२ को मदन पुरस्कार प्राप्त उपन्यास हो, जसकी स्रष्टा पारिजात (विष्णु कुमारी वाइवा) हुन्।',
    hint: 'नेपाली साहित्यकी प्रसिद्ध विद्रोही र प्रगतिशील नारी स्रष्टा।'
  },

  // ९. समसामयिक विषय
  {
    id: 'q-ca-1',
    question: 'नेपालमा हाल कतिवटा प्रदेशहरू रहेका छन्?',
    options: ['५ वटा', '६ वटा', '७ वटा', '८ वटा'],
    correctAnswer: 2,
    categoryId: 'current-affairs',
    difficulty: 'easy',
    explanation: 'नेपालको संविधान २०७२ बमोजिम नेपालमा कोशी, मधेश, बागमती, गण्डकी, लुम्बिनी, कर्णाली र सुदूरपश्चिम गरी जम्मा ७ प्रदेश रहेका छन्।',
    hint: 'कोशीदेखि सुदूरपश्चिमसम्म।'
  },
  {
    id: 'q-ca-2',
    question: 'पोखरा अन्तर्राष्ट्रिय विमानस्थलको औपचारिक उद्घाटन कहिले गरिएको थियो?',
    options: ['सन् २०२३ जनवरी १ (२०७९ पुस १७)', 'सन् २०२२ डिसेम्बर १५', 'सन् २०२३ मार्च १०', 'सन् २०२१ अक्टोबर ५'],
    correctAnswer: 0,
    categoryId: 'current-affairs',
    difficulty: 'medium',
    explanation: 'नेपालको तेस्रो अन्तर्राष्ट्रिय विमानस्थलको रूपमा पोखरा अन्तर्राष्ट्रिय विमानस्थल सन् २०२३ जनवरी १ तारिखमा सञ्चालनमा आएको हो।',
    hint: 'अंग्रेजी नयाँ वर्ष २०२३ को पहिलो दिन (जनवरी १)।'
  },
  {
    id: 'q-ca-3',
    question: 'नेपालको राष्ट्रिय जनगणना २०७८ अनुसार नेपालको कुल जनसंख्या कति पुगेको छ?',
    options: ['२ करोड ६४ लाख', '२ करोड ९१ लाख ६४ हजार ५७८', '३ करोड १५ लाख', '२ करोड ८० लाख'],
    correctAnswer: 1,
    categoryId: 'current-affairs',
    difficulty: 'medium',
    explanation: 'राष्ट्रिय जनगणना २०७८ को अन्तिम नतिजा अनुसार नेपालको जनसंख्या २,९१,६४,५७८ रहेको छ।',
    hint: 'करिब २ करोड ९२ लाखको हाराहारीमा।'
  },
  {
    id: 'q-ca-4',
    question: 'जलवायु परिवर्तन सम्बन्धी संयुक्त राष्ट्रसंघीय सम्मेलनलाई छोटकरीमा के भनिन्छ?',
    options: ['COP (Conference of the Parties)', 'WHO', 'UNESCO', 'G20'],
    correctAnswer: 0,
    categoryId: 'current-affairs',
    difficulty: 'medium',
    explanation: 'जलवायु परिवर्तन सम्बन्धी पक्ष राष्ट्रहरूको वार्षिक शिखर सम्मेलनलाई COP (Conference of the Parties) भनिन्छ।',
    hint: 'Conference of the Parties को संक्षिप्त रूप।'
  },
  {
    id: 'q-ca-5',
    question: 'नेपालमा स्थानीय तहको संख्या कति रहेको छ?',
    options: ['७४४', '७५३', '७६०', '७६५'],
    correctAnswer: 1,
    categoryId: 'current-affairs',
    difficulty: 'easy',
    explanation: 'नेपालमा ६ महानगरपालिका, ११ उपमहानगरपालिका, २७६ नगरपालिका र ४६० गाउँपालिका गरी कुल ७५३ स्थानीय तह रहेका छन्।',
    hint: 'कुल ७७ जिल्लाभित्र पर्ने स्थानीय तहहरूको संख्या।'
  }
];

export const DEMO_LEADERBOARD_ENTRIES = [
  {
    id: 'lead-1',
    playerName: 'आयुश शर्मा',
    score: 480,
    totalQuestions: 20,
    correctAnswers: 19,
    wrongAnswers: 1,
    percentage: 95,
    totalTimeSeconds: 112,
    categoryName: 'नेपालको सामान्य ज्ञान',
    difficulty: 'मध्यम',
    date: '२०८१-०१-१५'
  },
  {
    id: 'lead-2',
    playerName: 'सुनिता गुरुङ',
    score: 460,
    totalQuestions: 20,
    correctAnswers: 18,
    wrongAnswers: 2,
    percentage: 90,
    totalTimeSeconds: 125,
    categoryName: 'विज्ञान तथा प्रविधि',
    difficulty: 'कठिन',
    date: '२०८१-०१-१४'
  },
  {
    id: 'lead-3',
    playerName: 'प्रशान्त अधिकारी',
    score: 440,
    totalQuestions: 20,
    correctAnswers: 18,
    wrongAnswers: 2,
    percentage: 90,
    totalTimeSeconds: 138,
    categoryName: 'इतिहास र भूगोल',
    difficulty: 'मध्यम',
    date: '२०८१-०१-१६'
  },
  {
    id: 'lead-4',
    playerName: 'सङ्गीता श्रेष्ठ',
    score: 410,
    totalQuestions: 20,
    correctAnswers: 17,
    wrongAnswers: 3,
    percentage: 85,
    totalTimeSeconds: 140,
    categoryName: 'विश्व सामान्य ज्ञान',
    difficulty: 'मध्यम',
    date: '२०८१-०१-१२'
  },
  {
    id: 'lead-5',
    playerName: 'रोशन थापा',
    score: 390,
    totalQuestions: 20,
    correctAnswers: 16,
    wrongAnswers: 4,
    percentage: 80,
    totalTimeSeconds: 148,
    categoryName: 'कम्प्युटर तथा इन्टरनेट',
    difficulty: 'सजिलो',
    date: '२०८१-०१-१३'
  },
  {
    id: 'lead-6',
    playerName: 'पूजा खड्का',
    score: 370,
    totalQuestions: 20,
    correctAnswers: 15,
    wrongAnswers: 5,
    percentage: 75,
    totalTimeSeconds: 155,
    categoryName: 'नेपाली भाषा',
    difficulty: 'मध्यम',
    date: '२०८१-०१-१४'
  },
  {
    id: 'lead-7',
    playerName: 'बिपिन पोखरेल',
    score: 350,
    totalQuestions: 20,
    correctAnswers: 14,
    wrongAnswers: 6,
    percentage: 70,
    totalTimeSeconds: 160,
    categoryName: 'खेलकुद',
    difficulty: 'कठिन',
    date: '२०८१-०१-१०'
  },
  {
    id: 'lead-8',
    playerName: 'मनिषा दाहाल',
    score: 330,
    totalQuestions: 20,
    correctAnswers: 13,
    wrongAnswers: 7,
    percentage: 65,
    totalTimeSeconds: 168,
    categoryName: 'समसामयिक विषय',
    difficulty: 'मध्यम',
    date: '२०८१-०१-०८'
  }
];
