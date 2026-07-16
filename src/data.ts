/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, ClothingOption, StudioOption, Review } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'pkg-3',
    name: 'חבילת ארד - 3 סרטונים',
    description: 'התחלה מצוינת לרשתות החברתיות. נהדר לבדיקת סגנון והעלאת מודעות ראשונית.',
    videosCount: 3,
    averageDuration: 'עד 60 שניות',
    hasSubtitles: true,
    deliveryDays: 3,
    correctionsCount: 0,
    originalPrice: 790,
    price: 590,
    features: [
      '3 סרטוני AI באיכות Ultra HD',
      'כתוביות בעברית מעוצבות ומתוזמנות',
      'התאמה מלאה לאינסטגרם Reels ו-TikTok',
      'בחירת סגנון לבוש אחד מהקטלוג',
      'סט פודקאסט אחד לבחירה',
      'שפה ועיצוב אחידים ומדויקים בסטנדרט גבוה',
      'קבלה דיגיטלית ואישור במייל'
    ]
  },
  {
    id: 'pkg-5',
    name: 'חבילת זהב - 5 סרטונים',
    description: 'הבחירה הפופולרית ביותר! מאפשרת פריסת תוכן שבועית יציבה ומקצועית.',
    videosCount: 5,
    averageDuration: '60 עד 90 שניות',
    hasSubtitles: true,
    deliveryDays: 3,
    correctionsCount: 0,
    originalPrice: 1190,
    price: 790,
    isPopular: true,
    features: [
      '5 סרטוני AI באיכות Ultra HD',
      'כתוביות בעברית עם הדגשות צבעים',
      'התאמה מלאה לאינסטגרם, TikTok ויוטיוב Shorts',
      'שילוב של 2 סגנונות לבוש לבחירה',
      'בחירה חופשית של מראה הסט (פודקאסט)',
      'עיצוב ברמת גימור מושלמת',
      'תמיכת עריכה מזורזת וליווי אישי',
      'עוזר AI לכתיבת התסריט כלול'
    ]
  },
  {
    id: 'pkg-10',
    name: 'חבילת פלטינום - 10 סרטונים',
    description: 'פתרון מקיף לחודש שלם של תוכן. נוכחות דיגיטלית חזקה, מהירה ורציפה.',
    videosCount: 10,
    averageDuration: 'עד 2 דקות',
    hasSubtitles: true,
    deliveryDays: 5,
    correctionsCount: 0,
    originalPrice: 1990,
    price: 1390,
    features: [
      '10 סרטוני AI ברמת הגימור הגבוהה ביותר',
      'כתוביות דינמיות מונפשות (סטייל טיקטוקרס)',
      'התאמה לכל הפלטפורמות כולל פייסבוק ולינקדאין',
      'שילוב של עד 4 סגנונות לבוש שונים',
      'מגוון סטים וחדרי פודקאסט שונים',
      'גימור מקצועי באיכות הגבוהה ביותר',
      'עדיפות בתור העיבוד (אספקה מזורזת)',
      'ייעוץ אסטרטגי קצר לכתיבת התוכן והמסרים'
    ]
  }
];

export const FAQS = [
  {
    question: 'האם אני צריך להגיע ליום צילום או להצטלם בפועל?',
    answer: 'ממש לא! כל הרעיון של PodAI הוא לחסוך לך את יום הצילומים היקר. כל מה שצריך זה להעלות מספר תמונות סטילס שלך (תמונות תדמית) והקלטת קול קצרה או סרטון ישן כדי שנלמד את הקול והתווי פנים שלך. המערכת שלנו יוצרת דמות דיגיטלית מדויקת שלך הדוברת את הטקסט שתזין, בתוך אולפן פודקאסט מושלם.'
  },
  {
    question: 'אילו תמונות תדמית מומלץ להעלות?',
    answer: 'מומלץ להעלות בין 3 ל-8 תמונות תדמית שונות, ברזולוציה גבוהה. חשוב שהפנים שלך יהיו ברורות, מוארות היטב וללא משקפי שמש או כובעים שמסתירים. עדיף שילוב של זוויות קלות (מבט ישר, 3/4 פנים) ועם הבעות פנים ניטרליות או חיוך עדין. תמונות איכותיות מהסמארטפון יעבדו מעולה!'
  },
  {
    question: 'האם אפשר להשתמש בהקלטת קול בלבד או רק בטקסט?',
    answer: 'כן, בהחלט. באפשרותך להעלות הקלטת קול קיימת (למשל הודעה קולית בוואטסאפ או פודקאסט שהקלטת) ואנו ניצור את הוידאו הדובר על פיה. לחילופין, תוכל פשוט להזין טקסט כתוב, ואנו ניצור דיבור ממוחשב מדויק של הקול שלך (על בסיס דגימת הקול שהעלית) או קול קריינות מקצועי לפי העדפתך.'
  },
  {
    question: 'כמה זמן לוקח לקבל את הסרטונים המוכנים?',
    answer: 'זמן האספקה המשוער לחבילות הקטנות והבינוניות הוא עד 3 ימי עסקים בלבד. חבילת ה-10 סרטונים מסופקת תוך 5 ימי עסקים. ברגע שהסרטונים מוכנים, יישלח אליך מייל עדכון עם קישור ישיר לצפייה והורדה באזור האישי שלך.'
  },
  {
    question: 'האם הסרטונים כוללים כתוביות מובנות?',
    answer: 'כן, כל הסרטונים מגיעים עם כתוביות בעברית מעוצבות ומתוזמנות ברמה הגבוהה ביותר. הכתוביות עוזרות לשפר את אחוז הצפייה ברשתות החברתיות (מאחר ורוב האנשים צופים בסרטונים על השתק).'
  },
  {
    question: 'האם מותר לי להשתמש בסרטונים בפרסום ממומן?',
    answer: 'כן, בהחלט! עם קבלת הסרטונים, מלוא הזכויות המסחריות שייכות לך. תוכל להשתמש בהם לפרסום אורגני או ממומן באינסטגרם, פייסבוק, טיקטוק, יוטיוב, לינקדאין או בכל פלטפורמה אחרת.'
  },
  {
    question: 'האם התמונות והקול שלי נשמרים בצורה מאובטחת?',
    answer: 'הפרטיות שלך היא בראש סדר העדיפויות שלנו. כל החומרים שמועלים למערכת (תמונות, קבצי שמע ותסריטים) נשמרים באחסון מוצפן ומאובטח. השימוש בהם נעשה אך ורק לצורך יצירת הסרטונים שהזמנת. אנו מתחייבים לא להעביר את החומרים לאף גורם שלישי ולא לעשות בהם שימוש למטרות אימון מודלים ציבוריים. באפשרותך לבקש מחיקה מלאה של כל הקבצים שלך מהשרתים שלנו בכל עת בלחיצת כפתור אחת באזור האישי.'
  },
  {
    question: 'האם ניתן לבקש תיקונים לאחר קבלת הסרטונים?',
    answer: 'לא, השירות עובד בשיטה של "מה שאתה רואה זה מה שאתה מקבל" (What You See Is What You Get). הסרטונים מופקים לפי דוגמאות מוגדרות מראש, שפה עיצובית אחידה ותבניות מקצועיות ספציפיות שהן המוצר. רמת הגימור והדיוק של מנוע ה-AI יחד עם העריכה המובנית הן מהגבוהות בשוק ומותאמות ישירות לרשתות החברתיות, ולכן המוצר מסופק כחבילה סופית ללא סבבי תיקונים או שינויים לאחר האספקה.'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    name: 'שני אברהם',
    businessType: 'יועצת עסקית ומנטורית',
    rating: 5,
    comment: 'הסרטונים נראים מדהים, מושכים מלא תשומת לב באינסטגרם ובטיקטוק. לא צריך לצלם כלום - פשוט תהליך מושלם ומהיר!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    name: 'אורי כהן',
    businessType: 'מייסד סוכנות נדל״ן',
    rating: 5,
    comment: 'תוך 24 שעות קיבלתי סרטונים ברמה קולנועית. שירות ברמה אחרת ותוצאות שמדברות בעד עצמן. פתר לי את כל בעיית הפקת התוכן.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    name: 'נועה לוי',
    businessType: 'מרצה ומלווה בעלי עסקים',
    rating: 5,
    comment: 'הפתרון המושלם למי שאין זמן לצלם. התוכן שלי נראה מקצועי, מדויק ומוכן לפרסום בכל הרשתות. מומלץ מאוד!',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  }
];

export const CLOTHING_OPTIONS: ClothingOption[] = [
  {
    id: 'clothing-business',
    name: 'עסקי נקי',
    description: 'חולצה מכופתרת, ז׳קט או לבוש עסקי רגוע ומכובד.',
    imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'clothing-casual',
    name: 'קז׳ואל חכם',
    description: 'חולצה חלקה או ז׳קט קליל, מראה מקצועי אך נגיש.',
    imageUrl: 'https://images.unsplash.com/photo-1513829096999-4978602297f7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'clothing-creator',
    name: 'יוצר תוכן',
    description: 'לבוש צעיר, מודרני, טי-שירט חלקה ואופנתית או סוודר ניטרלי.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'clothing-elegant',
    name: 'אלגנטי כהה',
    description: 'בגדים בצבעים כהים, מראה יוקרתי, רציני ומעודן.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'
  }
];

export const STUDIO_OPTIONS: StudioOption[] = [
  {
    id: 'studio-warm',
    name: 'פודקאסט חם',
    description: 'תאורה חמימה, קיר לבנים, מנורות וינטג׳, מיקרופון מקצועי ושלט ON AIR זוהר.',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'studio-luxury',
    name: 'יוקרתי כהה',
    description: 'רקע אקוסטי כהה, תאורה דרמטית בגווני כחול-סגול, פאנלים מעוצבים ומראה פרימיום.',
    imageUrl: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'studio-clean',
    name: 'נקי ומואר',
    description: 'סביבה בהירה, מינימליסטית ומודרנית, צמחייה ירוקה קלה ורקע משרדי נעים.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'studio-dynamic',
    name: 'דינמי לרילס',
    description: 'תאורת LED ניאון צבעונית בולטת (סגול/פינק/כחול), רקע היפסטרי מודרני המושך את העין.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
  }
];

// Seed databases/mockups for personal area with interactive simulated videos
export interface MockVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  status: 'processing' | 'ready' | 'pending';
  publishDate: string;
  aspectRatio: '9:16' | '16:9';
  subtitleTrack: { time: number; text: string }[];
  videoGradient: string; // Dynamic visual simulator gradient
  description: string;
}

export const MOCK_VIDEOS: MockVideo[] = [
  {
    id: 'vid-1',
    title: 'סרטון 1 - הקדמה למוצר ומשיכת קהל',
    duration: '0:29',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80',
    status: 'ready',
    publishDate: '15.07.2026',
    aspectRatio: '9:16',
    videoGradient: 'from-purple-900 via-slate-900 to-indigo-950',
    description: 'מיועד לאינסטגרם Reels ו-TikTok. מתמקד בהצגת הבעיה המרכזית של לקוחות הקצה.',
    subtitleTrack: [
      { time: 0, text: 'היי לכולם! ידעתם שרוב בעלי העסקים מפסידים לקוחות רק בגלל...' },
      { time: 4, text: 'שאין להם נוכחות יציבה ברשתות החברתיות?' },
      { time: 8, text: 'נכון, למי יש זמן ללכת לאולפן, להצטלם, ללמוד לערוך ולשלם אלפי שקלים?' },
      { time: 13, text: 'מהיום יש פתרון מהפכני שמשנה את כל חוקי המשחק.' },
      { time: 17, text: 'אתם מעלים רק תמונות ורעיון פשוט בטקסט או בקול...' },
      { time: 21, text: 'ומקבלים סרטוני AI מקצועיים שלכם בתוך חדר פודקאסט מעוצב!' },
      { time: 25, text: 'רוצים לדעת איך זה עובד? לחצו כאן לפרטים!' }
    ]
  },
  {
    id: 'vid-2',
    title: 'סרטון 2 - פתרונות ויתרונות השירות',
    duration: '0:28',
    thumbnail: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=200&q=80',
    status: 'ready',
    publishDate: '15.07.2026',
    aspectRatio: '9:16',
    videoGradient: 'from-blue-950 via-gray-900 to-slate-950',
    description: 'סרטון תועלות מעמיק, המדגיש את החיסכון בזמן, כסף ואולפנים פיזיים.',
    subtitleTrack: [
      { time: 0, text: 'החיסרון הכי גדול של הפקת סרטונים הוא ההתעסקות המסובכת.' },
      { time: 4, text: 'במקום לשכור צלם, לערוך כתוביות ולבזבז יום עבודה שלם...' },
      { time: 8, text: 'אנחנו מייצרים עבורכם סרטוני AI ברמת גימור מושלמת.' },
      { time: 13, text: 'הדמות שלכם דוברת בדיוק את התסריט והמסר שלכם.' },
      { time: 17, text: 'הלבוש שלכם תמיד ייצוגי וחדר הפודקאסט נראה פשוט מיליון דולר!' },
      { time: 22, text: 'הסרטונים מגיעים מוכנים להורדה עם כתוביות צבעוניות.' },
      { time: 25, text: 'השאירו פרטים עכשיו ונשמח להתחיל לעבוד!' }
    ]
  },
  {
    id: 'vid-3',
    title: 'סרטון 3 - סיום והנעה ברורה לפעולה',
    duration: '0:26',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
    status: 'processing',
    publishDate: '15.07.2026',
    aspectRatio: '9:16',
    videoGradient: 'from-indigo-900 via-zinc-900 to-fuchsia-950',
    description: 'מיועד לסגירת מכירה והנעה להשארת פרטים או כניסה לאתר.',
    subtitleTrack: [
      { time: 0, text: 'השורה התחתונה היא פשוטה ביותר.' },
      { time: 4, text: 'עסקים שמשלבים סרטונים קצרים מגדילים את המכירות שלהם פי 3!' },
      { time: 8, text: 'אל תישאר מאחור בזמן שהמתחרים שלך כבר בטיקטוק וברילס.' },
      { time: 13, text: 'הזמן את החבילה המתאימה לך עוד היום,' },
      { time: 17, text: 'העלה את החומרים ותוך 3 ימי עסקים בלבד...' },
      { time: 21, text: 'הסרטונים המוכנים יחכו לך באזור האישי שלך!' },
      { time: 24, text: 'לחצו על הקישור והתחילו עכשיו!' }
    ]
  }
];
