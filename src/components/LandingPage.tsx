/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Check, 
  ChevronDown, 
  Heart, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Users, 
  Award,
  Clock,
  Phone,
  Mail,
  HelpCircle,
  Video,
  UploadCloud,
  ArrowLeft
} from 'lucide-react';
import { PACKAGES, FAQS, TESTIMONIALS } from '../data';
import { Package } from '../types';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectPackage: (pkg: Package) => void;
  onNavigateToOrder: () => void;
  onNavigateToPersonalArea: () => void;
}

export default function LandingPage({ 
  onSelectPackage, 
  onNavigateToOrder, 
  onNavigateToPersonalArea 
}: LandingPageProps) {
  // Video player state in hero reels
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  // FAQ states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Simulated subtitles state for the active preview modal
  const [subtitleText, setSubtitleText] = useState('');
  const [modalTimer, setModalTimer] = useState(0);

  // Custom Reels Data
  const REELS = [
    {
      id: 0,
      title: 'מותג חזק מתחיל בסיפור נכון',
      gradient: 'from-violet-900 via-indigo-950 to-slate-900',
      person: 'אביב גבאי - יועץ פיננסי',
      likes: '1.2K',
      comments: '32',
      shares: '87',
      duration: '0:29',
      subtitles: [
        { time: 0, text: 'איך עסקים קטנים מכפילים את המחזור?' },
        { time: 3, text: 'הם לא עובדים יותר קשה, הם עובדים נכון.' },
        { time: 6, text: 'הם מייצרים סרטוני וידאו קצרים שמביאים לקוחות.' },
        { time: 10, text: 'בלי להצטלם ובלי להשקיע אלפי שקלים ביום צילום.' },
        { time: 14, text: 'עכשיו הגיע התור שלכם לעשות את השינוי הזה.' }
      ]
    },
    {
      id: 1,
      title: 'תוכן טוב לא קורה במקרה',
      gradient: 'from-amber-900 via-stone-900 to-rose-950',
      person: 'קרן אלוני - מלווה סטארטאפים',
      likes: '942',
      comments: '24',
      shares: '56',
      duration: '0:28',
      subtitles: [
        { time: 0, text: 'אל תבזבזו זמן יקר על כתיבת תסריטים ועריכה...' },
        { time: 4, text: 'תנו לטכנולוגיית ה-AI שלנו לעשות את כל העבודה בשבילכם!' },
        { time: 8, text: 'תמונת תדמית אחת והקלטת קול של 10 שניות...' },
        { time: 12, text: 'ואנחנו יוצרים לכם סט סרטונים שלם ומעוצב לטיקטוק ולרילס.' }
      ]
    },
    {
      id: 2,
      title: 'הסט המושלם לתוכן שמוכר',
      gradient: 'from-blue-900 via-emerald-950 to-neutral-900',
      person: 'רון דניאל - מייסד מותג איקומרס',
      likes: '821',
      comments: '18',
      shares: '43',
      duration: '0:27',
      subtitles: [
        { time: 0, text: 'מכירות בדיגיטל זה הכל עניין של אמון.' },
        { time: 3, text: 'וכשאנשים רואים אתכם בתוך חדר פודקאסט מקצועי...' },
        { time: 7, text: 'רמת האמון במותג שלכם מזנקת מיידית!' },
        { time: 10, text: 'מבלי שהייתם צריכים לצאת מהבית או לשכור אולפן.' }
      ]
    },
    {
      id: 3,
      title: 'פותחים פער על המתחרים שלכם',
      gradient: 'from-fuchsia-900 via-zinc-950 to-blue-950',
      person: 'שירה חדד - מנכ״לית סוכנות דיגיטל',
      likes: '1.5K',
      comments: '49',
      shares: '102',
      duration: '0:30',
      subtitles: [
        { time: 0, text: 'בזמן שהמתחרים שלכם עדיין מתלבטים מה לכתוב בפוסט...' },
        { time: 4, text: 'הלקוחות שלנו כבר מפרסמים 3 סרטונים בשבוע ברילס.' },
        { time: 8, text: 'הם מביאים לידים איכותיים, בונים סמכות וסוגרים עסקאות.' },
        { time: 12, text: 'תתחילו עוד היום והשאירו להם אבק!' }
      ]
    }
  ];

  // Simulated running of subtitles for the modal/active video player
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeReelIndex !== null) {
      const reel = REELS.find(r => r.id === activeReelIndex);
      if (reel) {
        interval = setInterval(() => {
          setModalTimer(prev => {
            const nextTime = (prev + 1) % 15; // Loop every 15s
            // find appropriate subtitle
            const sub = [...reel.subtitles].reverse().find(s => s.time <= nextTime);
            setSubtitleText(sub ? sub.text : '');
            return nextTime;
          });
        }, 1000);
      }
    } else {
      setModalTimer(0);
      setSubtitleText('');
    }
    return () => clearInterval(interval);
  }, [activeReelIndex]);

  const togglePlay = (id: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenReel = (id: number) => {
    setActiveReelIndex(id);
    setModalTimer(0);
    // set first subtitle immediately
    const firstSub = REELS[id].subtitles[0];
    setSubtitleText(firstSub ? firstSub.text : '');
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans" dir="rtl" id="landing-page-root">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20 lg:pt-10 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right Reels Mockups (Col 3) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:grid lg:col-span-3 grid-cols-1 gap-6"
            >
              {REELS.slice(0, 2).map((reel) => (
                <div 
                  key={reel.id} 
                  id={`hero-reel-${reel.id}`}
                  className="relative group rounded-3xl overflow-hidden aspect-[9/16] shadow-xl bg-slate-950 border-4 border-slate-900 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleOpenReel(reel.id)}
                >
                  {/* Dynamic Gradient Simulator showing podcast character concept */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-80 flex flex-col justify-between p-4`}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-center text-white/80 text-xs">
                      <span className="bg-black/40 px-2 py-1 rounded-full text-[10px] backdrop-blur-md">מצב פודקאסט</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {reel.duration}
                      </span>
                    </div>

                    {/* Visual Center Placeholder to feel like podcast room */}
                    <div className="my-auto flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 animate-pulse">
                        <Video className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="text-[10px] text-indigo-200 uppercase tracking-widest">דמות AI באולפן</span>
                      <div className="h-1.5 w-16 bg-indigo-500/50 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-indigo-400 animate-infinite animate-pulse rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="space-y-2">
                      <div className="bg-black/40 p-2 rounded-lg backdrop-blur-md text-white">
                        <p className="text-xs font-semibold leading-tight line-clamp-2 text-right">{reel.title}</p>
                        <p className="text-[10px] text-slate-300 mt-1 text-right">{reel.person}</p>
                      </div>

                      {/* Mock Interactive Bar */}
                      <div className="flex justify-between items-center text-white text-[11px] px-1">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {reel.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-slate-200" /> {reel.comments}</span>
                        <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5 text-slate-200" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-indigo-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-indigo-900 translate-x-[-1px]" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Central Hero text (Col 6) */}
            <div className="lg:col-span-6 text-center space-y-8">
              
              {/* Main Headings */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight max-w-md mx-auto">
                  סרטוני AI<br />
                  לרשתות שלך<br />
                  <span className="text-indigo-600 underline decoration-indigo-200 decoration-8">בלי לצלם!</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-600 max-w-sm mx-auto font-normal leading-relaxed">
                  אנחנו הופכים את התוכן,<br />
                  הקול והתמונות שלך<br />
                  לסרטוני וידאו קצרים<br />
                  בסט פודקאסט יוקרתי.<br />
                  מוכנים לפרסום מיידי<br />
                  באינסטגרם, טיקטוק ופייסבוק.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto"
              >
                <button 
                  id="hero-cta-order"
                  onClick={onNavigateToOrder}
                  className="w-full sm:w-auto px-5 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                  להזמנת הסרטונים שלך
                </button>
                <a 
                  href="#pricing-section"
                  className="w-full sm:w-auto px-5 py-3 sm:px-8 sm:py-4 bg-white hover:bg-slate-50 text-indigo-700 border-2 border-indigo-200 font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all text-center"
                >
                  צפייה בחבילות מחירים
                </a>
              </motion.div>

              {/* Security Small Print */}
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                החומרים שלך נשמרים באופן מאובטח ומוצפן. ללא שימוש צד שלישי.
              </p>

              {/* Video Player Sample Trigger Banner */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden text-right border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <div className="space-y-1 z-10 max-w-xs">
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">דוגמה חיה מהמערכת</span>
                  <h4 className="text-lg font-bold text-white font-display leading-tight">רוצים לראות דוגמה סופית?</h4>
                  <p className="text-xs text-slate-300">הקליקו על אחד מכרטיסי הרילס או כאן כדי לפתוח נגן אינטראקטיבי.</p>
                </div>
                <button 
                  onClick={() => handleOpenReel(0)}
                  className="w-full md:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-colors border border-white/20 flex items-center justify-center gap-2 z-10 shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  לסרטון הדגמה ראשון
                </button>
              </motion.div>

            </div>

            {/* Left Reels Mockups (Col 3) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:grid lg:col-span-3 grid-cols-1 gap-6"
            >
              {REELS.slice(2, 4).map((reel) => (
                <div 
                  key={reel.id} 
                  id={`hero-reel-${reel.id}`}
                  className="relative group rounded-3xl overflow-hidden aspect-[9/16] shadow-xl bg-slate-950 border-4 border-slate-900 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleOpenReel(reel.id)}
                >
                  {/* Dynamic Gradient Simulator */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-80 flex flex-col justify-between p-4`}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-center text-white/80 text-xs">
                      <span className="bg-black/40 px-2 py-1 rounded-full text-[10px] backdrop-blur-md">מראה יוקרתי</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {reel.duration}
                      </span>
                    </div>

                    {/* Visual Center Placeholder */}
                    <div className="my-auto flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 animate-pulse">
                        <Video className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="text-[10px] text-indigo-200 uppercase tracking-widest">דמות AI באולפן</span>
                      <div className="h-1.5 w-16 bg-indigo-500/50 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-indigo-400 animate-infinite animate-pulse rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="space-y-2">
                      <div className="bg-black/40 p-2 rounded-lg backdrop-blur-md text-white">
                        <p className="text-xs font-semibold leading-tight line-clamp-2 text-right">{reel.title}</p>
                        <p className="text-[10px] text-slate-300 mt-1 text-right">{reel.person}</p>
                      </div>

                      {/* Mock Interactive Bar */}
                      <div className="flex justify-between items-center text-white text-[11px] px-1">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {reel.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-slate-200" /> {reel.comments}</span>
                        <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5 text-slate-200" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-indigo-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-indigo-900 translate-x-[-1px]" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Mobile Reels Slider/Scroll */}
          <div className="mt-12 lg:hidden">
            <p className="text-sm font-bold text-slate-500 text-center mb-4">לחצו לצפייה בדוגמאות סרטוני AI מהאולפנים שלנו 👇</p>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {REELS.map((reel) => (
                <div 
                  key={reel.id} 
                  className="relative rounded-2xl overflow-hidden aspect-[9/16] w-64 shrink-0 snap-center shadow-lg bg-slate-950 border-2 border-slate-900 cursor-pointer"
                  onClick={() => handleOpenReel(reel.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-85 flex flex-col justify-between p-4`}>
                    <div className="flex justify-between items-center text-white/80 text-xs">
                      <span className="bg-black/40 px-2 py-1 rounded-full text-[9px] backdrop-blur-sm">דוגמת פודקאסט AI</span>
                      <span className="flex items-center gap-1 text-[9px]"><Clock className="w-3 h-3" /> {reel.duration}</span>
                    </div>

                    <div className="text-center text-white my-auto flex flex-col items-center">
                      <Play className="w-8 h-8 opacity-70 mb-1" />
                      <span className="text-[10px] text-slate-300">הפעלת וידאו</span>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-black/40 p-2 rounded-lg text-white">
                        <p className="text-xs font-semibold leading-tight text-right">{reel.title}</p>
                        <p className="text-[9px] text-slate-300 mt-1 text-right">{reel.person}</p>
                      </div>
                      <div className="flex justify-between items-center text-white text-[10px] px-1">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {reel.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-slate-200" /> {reel.comments}</span>
                        <span className="text-[9px] text-indigo-300">לחץ לצפייה</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Guarantees Badges Grid */}
      <section className="bg-white border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Zap className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-slate-800">ללא ימי צילום</h5>
              <p className="text-xs text-slate-500 max-w-[170px] mx-auto">מעלים פעם אחת את הגלם ויוצרים לכל השנה.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Clock className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-slate-800">אספקה מהירה</h5>
              <p className="text-xs text-slate-500 max-w-[170px] mx-auto">תוך 3 ימים בלבד, הסרטונים אצלך בנייד.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-slate-800">אמינות ופרטיות</h5>
              <p className="text-xs text-slate-500 max-w-[170px] mx-auto">הקבצים שמורים באופן מאובטח, ללא שום העברה.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Award className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-slate-800">עריכה כלולה</h5>
              <p className="text-xs text-slate-500 max-w-[170px] mx-auto">בקרת איכות ועריכה ידנית מושלמת לעברית.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-md mx-auto space-y-4 mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">פשוט, קל ומהיר</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">איך זה עובד?</h2>
            <p className="text-slate-600 text-sm max-w-[280px] mx-auto leading-relaxed">
              ארבעה שלבים קצרים שמפרידים בינך לבין נוכחות דיגיטלית מושלמת.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden text-right flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="absolute top-4 left-4 text-4xl font-black text-indigo-100 font-display">01</div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-6">
                  <UploadCloud className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">מעלים חומרים</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                מעלים מספר תמונות ודגימת קול קצרה.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden text-right flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="absolute top-4 left-4 text-4xl font-black text-indigo-100 font-display">02</div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">מגדירים סגנון</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                בוחרים בגדים ומראה לאולפן שלכם.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden text-right flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="absolute top-4 left-4 text-4xl font-black text-indigo-100 font-display">03</div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-6">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">אנחנו מייצרים</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                האלגוריתם והעורכים שלנו מפיקים סרטון מושלם.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden text-right flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="absolute top-4 left-4 text-4xl font-black text-indigo-100 font-display">04</div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-6">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">מורידים ונהנים</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                הסרטון מוכן להורדה ישירה לנייד שלכם.
              </p>
            </div>

          </div>

          {/* CTA under workflow */}
          <div className="mt-12 text-center">
            <button 
              onClick={onNavigateToOrder}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              בוא נתחיל, זה לוקח פחות מ-5 דקות
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Packages Section */}
      <section id="pricing-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-sm mx-auto space-y-4 mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">חבילות מחירים מותאמות</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">החבילה שלך לעסק</h2>
            <p className="text-slate-600 text-sm leading-relaxed">כל החבילות כוללות עיבוד AI, כתוביות ועריכה מקצועית בעברית.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {PACKAGES.map((pkg, idx) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  pkg.isPopular 
                    ? 'border-4 border-indigo-600 bg-white shadow-2xl scale-105 z-10' 
                    : 'border border-slate-100 bg-slate-50/60 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute top-0 right-1/2 translate-y-[-50%] translate-x-[50%] bg-indigo-600 text-white font-bold text-xs py-1 px-4 rounded-full tracking-wider uppercase">
                    הבחירה הפופולרית ביותר 🔥
                  </span>
                )}

                <div className="space-y-6 text-right">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-black text-slate-900">{pkg.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Pricing block */}
                  <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">₪{pkg.price}</span>
                    <span className="text-sm text-slate-400 line-through">₪{pkg.originalPrice}</span>
                    <span className="text-xs text-slate-500 mr-auto bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md font-bold">חיסכון של {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%</span>
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-bold bg-slate-100/50 p-3 rounded-xl">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>אספקה: {pkg.deliveryDays} ימי עסקים</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>מה שרואים זה מה שמקבלים</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">מה כלול בחבילה:</p>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 font-medium leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button 
                    id={`select-pkg-btn-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all transform active:scale-95 ${
                      pkg.isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    הזמנת חבילה זו עכשיו
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2.5">חשבונית מס וקבלה יישלחו אוטומטית למייל לאחר התשלום</p>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* Testimonials (מה אומרים עלינו) */}
      <section className="py-16 md:py-24 bg-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-sm mx-auto space-y-4 mb-16">
            <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">לקוחות מרוצים מספרים</span>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight">מה אומרים עלינו?</h2>
            <p className="text-indigo-200 text-sm leading-relaxed">בעלי עסקים ויוצרי תוכן שכבר הפסיקו לבזבז זמן יקר ועברו אלינו.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-8 text-right space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>

                  <p className="text-slate-100 text-base leading-relaxed italic">
                    ״{t.comment}״
                  </p>
                </div>

                {/* Profile info */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  {t.avatarUrl ? (
                    <img 
                      src={t.avatarUrl} 
                      alt={t.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold border-2 border-indigo-400">
                      {t.name[0]}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-white text-sm">{t.name}</h5>
                    <p className="text-xs text-indigo-300 font-medium">{t.businessType}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Accordion FAQ (שאלות נפוצות) */}
      <section id="faq-section" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16 max-w-sm mx-auto">
            <HelpCircle className="w-10 h-10 text-indigo-600 mx-auto" />
            <h2 className="text-3xl font-display font-black text-slate-900 leading-tight">שאלות נפוצות</h2>
            <p className="text-slate-600 text-sm leading-relaxed">כל מה שרצית לדעת על הפקת הסרטונים שלך ב-AI.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-right font-bold text-slate-800 hover:text-indigo-600 transition-colors focus:outline-none"
                  >
                    <span className="text-base font-display">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 text-sm text-slate-600 leading-relaxed text-right whitespace-pre-line bg-slate-50/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Support Card */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center space-y-4">
            <h4 className="text-lg font-bold text-slate-900 font-display">לא מצאת תשובה לשאלה שלך?</h4>
            <p className="text-sm text-slate-500">נציגי התמיכה שלנו זמינים עבורך בוואטסאפ או במייל לכל שאלה, התייעצות או הכוונה.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="https://wa.me/97250000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4" />
                שיחה מהירה בוואטסאפ
              </a>
              <a 
                href="mailto:support@podai.co.il"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4" />
                פנייה במייל
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Elegant Interactive Reels Player Overlay Modal */}
      {activeReelIndex !== null && (() => {
        const activeReel = REELS.find(r => r.id === activeReelIndex);
        if (!activeReel) return null;
        return (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" dir="rtl">
            <div className="relative bg-slate-950 text-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-white/10 aspect-[9/16] flex flex-col justify-between">
              
              {/* Closing Trigger button */}
              <button 
                onClick={() => setActiveReelIndex(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 border border-white/20 text-sm font-bold font-display"
              >
                ✕
              </button>

              {/* Sound Toggle */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 left-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 border border-white/20"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Video Gradient/Visual Simulator Content */}
              <div className={`absolute inset-0 bg-gradient-to-b ${activeReel.gradient} flex flex-col justify-between p-6 pt-16`}>
                
                {/* Header info */}
                <div className="flex items-center gap-3 z-10">
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs border border-white/20">
                    {activeReel.person[0]}
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white">{activeReel.person}</h6>
                    <p className="text-[9px] text-indigo-300">נוצר על ידי PodAI</p>
                  </div>
                </div>

                {/* Subtitle Display Screen Container */}
                <div className="my-auto text-center px-4 space-y-4 z-10">
                  {/* Subtle Sound Waves Simulation */}
                  <div className="flex items-end justify-center gap-1.5 h-12">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 bg-indigo-400 rounded-full ${isMuted ? 'h-1' : 'animate-pulse h-10'}`} 
                        style={{ 
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '0.6s'
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Synchronized Subtitles (Simulated) */}
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
                    <p className="text-base font-bold text-indigo-100 font-display leading-relaxed">
                      {isMuted ? (
                        <span className="text-rose-300 text-sm flex items-center justify-center gap-1.5 font-medium">
                          <VolumeX className="w-4 h-4" /> הקש להפעלת שמע
                        </span>
                      ) : (
                        subtitleText || 'סורק קול...'
                      )}
                    </p>
                  </div>
                </div>

                {/* Bottom Details Row */}
                <div className="space-y-4 z-10">
                  <div className="space-y-1 bg-black/40 p-3 rounded-xl">
                    <h5 className="text-sm font-bold text-white text-right font-display">{activeReel.title}</h5>
                    <p className="text-[10px] text-slate-300 text-right">אולפן פודקאסט AI מקצועי • ללא צילום פיזי</p>
                  </div>

                  {/* Action/Progress Row */}
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> {activeReel.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-slate-200" /> {activeReel.comments}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">לופ אינטראקטיבי: {modalTimer} שניות</span>
                  </div>

                  {/* Horizontal Progress Timeline */}
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(modalTimer / 15) * 100}%` }}></div>
                  </div>
                </div>

              </div>

              {/* Safe click handle background */}
              <div 
                className="absolute inset-0 cursor-pointer" 
                onClick={() => setIsMuted(!isMuted)}
              ></div>

            </div>
          </div>
        );
      })()}

      {/* Footer Area */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1 - Brand & Description */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">🎙️</div>
                <span className="text-xl font-display font-black text-white">PodAI</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                הדרך הקלה, המהירה והמקצועית ביותר לייצור סרטוני פודקאסט לרשתות החברתיות מבלי לצאת מהבית. כל חומרי הגלם שלך מעובדים ומאובטחים בעזרת AI חכם ועריכה ידנית יסודית.
              </p>
              <div className="text-xs text-slate-500 flex flex-col gap-1">
                <span>© {new Date().getFullYear()} PodAI. כל הזכויות שמורות.</span>
                <span>מערכת הזמנות פודקאסטים ודמויות AI לרשתות חברתיות.</span>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-base font-display">קישורים שימושיים</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">איך זה עובד?</a>
                </li>
                <li>
                  <a href="#pricing-section" className="hover:text-indigo-400 transition-colors">חבילות ומחירים</a>
                </li>
                <li>
                  <a href="#faq-section" className="hover:text-indigo-400 transition-colors">שאלות נפוצות</a>
                </li>
                <li>
                  <button onClick={onNavigateToPersonalArea} className="hover:text-indigo-400 transition-colors text-right">כניסה לאזור האישי</button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Safety & Support */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-base font-display">תמיכה ופרטיות</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-xs text-emerald-400 flex items-center gap-1 justify-end">
                    <Check className="w-3.5 h-3.5" /> שמירה על זכויות ופרטיות הקול והתמונות
                  </span>
                </li>
                <li>
                  <span className="text-xs text-indigo-300 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" /> תקנון סודיות מוצפן
                  </span>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 text-xs text-slate-400 transition-colors block">תנאי שימוש ומדיניות ביטולים</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 text-xs text-slate-400 transition-colors block">הצהרת נגישות והגנה על הקבצים</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
            נבנה בהתאם למפרט האפיון - המערכת מאובטחת באמצעות SSL.
          </div>

        </div>
      </footer>

    </div>
  );
}
