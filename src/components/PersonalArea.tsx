/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Trash2, 
  Phone, 
  Mail, 
  Send, 
  Star, 
  Layers, 
  FileText, 
  CheckCircle,
  AlertCircle,
  CornerDownLeft,
  Share2,
  Video,
  ChevronDown
} from 'lucide-react';
import { OrderState, UploadedFile, Review, SupportMessage } from '../types';
import { MOCK_VIDEOS, MockVideo } from '../data';

interface PersonalAreaProps {
  currentOrder: OrderState | null;
  onOrderReset: () => void;
  onNavigateToOrder: () => void;
  onNavigateToHome: () => void;
}

export default function PersonalArea({ 
  currentOrder, 
  onOrderReset, 
  onNavigateToOrder,
  onNavigateToHome 
}: PersonalAreaProps) {
  
  // Local state of order to allow interaction (deletion of files, support chat, review, etc)
  const [order, setOrder] = useState<OrderState | null>(null);

  // Active tab in personal workspace: 'videos' | 'files' | 'history' | 'receipts'
  const [activeTab, setActiveTab] = useState<'videos' | 'files' | 'history'>('videos');

  // Video playback simulation states
  const [selectedVideo, setSelectedVideo] = useState<MockVideo | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState('');

  // Support messages state
  const [newSupportMsg, setNewSupportMsg] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Review states
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Resend receipt state
  const [receiptSentCount, setReceiptSentCount] = useState(0);
  const [receiptToast, setReceiptToast] = useState(false);

  // Reorder popup
  const [showReorderModal, setShowReorderModal] = useState(false);

  // Setup order - either from props or fallback mock data for review
  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      // Create a gorgeous fallback mockup order so the user has fully preloaded dashboard to play with
      const fallbackOrder: OrderState = {
        id: 'POD-92430',
        packageId: 'pkg-5',
        packageName: 'חבילת זהב - 5 סרטונים',
        videosCount: 5,
        uploadedImages: [
          {
            id: 'img-1',
            name: 'תמונת_תדמית_חזיתית.jpg',
            size: '2.4 MB',
            type: 'image',
            previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            progress: 100,
            status: 'completed'
          },
          {
            id: 'img-2',
            name: 'פרופיל_ימין.png',
            size: '1.8 MB',
            type: 'image',
            previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            progress: 100,
            status: 'completed'
          },
          {
            id: 'img-3',
            name: 'תדמית_חצי_גוף.jpg',
            size: '3.1 MB',
            type: 'image',
            previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            progress: 100,
            status: 'completed'
          }
        ],
        uploadedFiles: [
          {
            id: 'aud-1',
            name: 'הקלטת_שמע_דגימה_קולית.mp3',
            size: '12.4 MB',
            type: 'audio',
            previewUrl: '#',
            progress: 100,
            status: 'completed',
            duration: '0:42'
          }
        ],
        inputText: 'אני רוצה לעשות סדר בכל מה שקשור לניהול פיננסי בעסק. תזרים מזומנים הוא המפתח לשקט נפשי...',
        goals: ['לידים', 'חיזוק המותג'],
        targetAudience: 'בעלי עסקים קטנים ובינוניים',
        customAudience: 'בעלי עסקים קטנים',
        speechStyle: 'מקצועי',
        contentEmphasis: 'סיום בהנעה ברורה להשארת פרטים.',
        clothingStyle: 'clothing-business',
        studioStyle: 'studio-warm',
        isPaid: true,
        date: '15.07.2026',
        receiptEmail: 'malkamatanel@gmail.com',
        status: 'processing', // is in processing state
        price: 924.30,
        supportMessages: [
          {
            id: 'msg-init-1',
            sender: 'system',
            text: 'שלום מלקאנתנאל! ההזמנה שלך נקלטה בהצלחה במערכת PodAI. הקבצים וההנחיות שלך הועברו למנוע ה-AI לעיבוד ראשוני.',
            timestamp: new Date()
          },
          {
            id: 'msg-init-2',
            sender: 'system',
            text: 'הסרטונים יהיו מוכנים תוך 3 ימי עסקים. בינתיים תוכל לעקוב כאן אחר הסטטוס ולצפות בדוגמאות המוכנות.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          }
        ],
        reviews: []
      };
      setOrder(fallbackOrder);
    }
  }, [currentOrder]);

  // Video subtitle timer simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedVideo && videoPlaying) {
      interval = setInterval(() => {
        setVideoTime(prev => {
          const totalSec = parseInt(selectedVideo.duration.split(':')[1]);
          const next = prev + 1 >= totalSec ? 0 : prev + 1;
          
          // find subtitle
          const sub = [...selectedVideo.subtitleTrack].reverse().find(s => s.time <= next);
          setActiveSubtitle(sub ? sub.text : '');
          
          return next;
        });
      }, 1000);
    } else {
      setVideoTime(0);
      if (selectedVideo) {
        setActiveSubtitle(selectedVideo.subtitleTrack[0]?.text || '');
      }
    }
    return () => clearInterval(interval);
  }, [selectedVideo, videoPlaying]);

  if (!order) {
    return (
      <div className="py-20 text-center" dir="rtl">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto"></div>
        <p className="text-sm text-slate-500 mt-4">טוען נתוני אזור אישי...</p>
      </div>
    );
  }

  // Handle active video selection
  const handleWatchVideo = (vid: MockVideo) => {
    setSelectedVideo(vid);
    setVideoPlaying(true);
    setVideoTime(0);
    setActiveSubtitle(vid.subtitleTrack[0]?.text || '');
  };

  // Resend receipt simulation
  const handleResendReceipt = () => {
    setReceiptSentCount(prev => prev + 1);
    setReceiptToast(true);
    setTimeout(() => {
      setReceiptToast(false);
    }, 4000);
  };

  // Submit Support Ticket simulation
  const handleSendSupportMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupportMsg.trim()) return;

    const userMsg: SupportMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: newSupportMsg,
      timestamp: new Date()
    };

    const sysResponse: SupportMessage = {
      id: `msg-sys-${Date.now() + 1}`,
      sender: 'system',
      text: 'תודה על פנייתך! פנייתך נרשמה בהצלחה (מספר פנייה: 4902). נציג תמיכה מקצועי של PodAI יחזור אליך במייל או בוואטסאפ בתוך פחות משעה.',
      timestamp: new Date(Date.now() + 1000)
    };

    setOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        supportMessages: [...prev.supportMessages, userMsg, sysResponse]
      };
    });

    setNewSupportMsg('');
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
    }, 5000);
  };

  // Submit Review simulation
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setReviewSubmitted(true);
    // show success toast or reset review text
  };

  // File Deletion simulation
  const handleDeleteFile = (id: string, isImage: boolean) => {
    if (isImage) {
      setOrder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          uploadedImages: prev.uploadedImages.filter(f => f.id !== id)
        };
      });
    } else {
      setOrder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          uploadedFiles: prev.uploadedFiles.filter(f => f.id !== id)
        };
      });
    }
  };

  // Handle reordering
  const handleConfirmReorder = (usePrevious: boolean) => {
    setShowReorderModal(false);
    if (usePrevious) {
      alert('מצוין! החומרים הקודמים (3 תמונות, קובץ שמע, תסריט, והגדרות סגנון) נשמרו וישולבו אוטומטית בהזמנה החדשה שלך.');
    }
    // Forward to Order Flow to customize or pay
    onNavigateToOrder();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12" dir="rtl" id="personal-area-root">
      
      {/* Toast Notice for Resending Receipt */}
      {receiptToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 z-50 flex items-center gap-2 animate-bounce-subtle">
          <span className="text-emerald-400">✓</span>
          <p className="text-xs font-bold">אישור הזמנה וחשבונית נשלחו מחדש לכתובת <strong>{order.receiptEmail}</strong>!</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center font-black text-indigo-700 text-xl font-display">
              {order.receiptEmail[0].toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 font-display">שלום, לקוח יקר! 👋</h1>
              <p className="text-xs text-slate-400">דוא"ל מחובר: {order.receiptEmail} | מספר לקוח: #PD-849</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={onNavigateToHome}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 rounded-xl font-bold text-xs transition-colors"
            >
              חזרה לדף הבית
            </button>
            <button 
              onClick={onOrderReset}
              className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl font-bold text-xs transition-colors"
            >
              יציאה מהחשבון
            </button>
          </div>
        </div>

        {/* Step Timeline Indicator */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
              סטטוס הזמנה פעיל: {order.status === 'processing' ? 'בעיבוד ועריכה' : 'הושלם'}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">אנחנו מתחילים לעבוד! 🎉</h2>
            <p className="text-xs text-slate-500">הסרטונים שלך יהיו מוכנים תוך 3 ימי עסקים בלבד. צוות העורכים ומנוע ה-AI עמלים על החומרים כעת.</p>
          </div>

          {/* Graphical timeline with checkmarks */}
          <div className="max-w-4xl mx-auto pt-4">
            <div className="flex items-center justify-between relative">
              
              {/* Background grey line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 translate-y-[-50%] z-0 rounded-full"></div>
              
              {/* Blue active progress line */}
              <div className="absolute top-1/2 right-0 h-1 bg-indigo-600 translate-y-[-50%] z-0 rounded-full" style={{ width: '50%' }}></div>

              {/* Node 1: Order confirmed */}
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow">
                  ✓
                </div>
                <span className="text-[11px] font-bold text-indigo-600 mt-2">אישור ההזמנה</span>
                <span className="text-[9px] text-slate-400">הושלם בהצלחה</span>
              </div>

              {/* Node 2: Processing */}
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow animate-pulse">
                  2
                </div>
                <span className="text-[11px] font-bold text-indigo-600 mt-2">בביצוע ועריכה</span>
                <span className="text-[9px] text-indigo-500 font-semibold animate-pulse">מתבצע כעת</span>
              </div>

              {/* Node 3: Quality assurance */}
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <span className="text-[11px] font-bold text-slate-400 mt-2">בקרת איכות</span>
                <span className="text-[9px] text-slate-400">טרם התחיל</span>
              </div>

              {/* Node 4: Ready */}
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <span className="text-[11px] font-bold text-slate-400 mt-2">מוכן להורדה</span>
                <span className="text-[9px] text-slate-400">טרם התחיל</span>
              </div>

            </div>
          </div>
        </div>

        {/* Workspace Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Workspace Tabs (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tab Nav */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex gap-2">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-colors ${
                  activeTab === 'videos' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                🎬 סרטונים מוכנים לצפייה ({MOCK_VIDEOS.filter(v => v.status === 'ready').length})
              </button>

              <button
                onClick={() => setActiveTab('files')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-colors ${
                  activeTab === 'files' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                📁 קבצים וחומרים שהעלית
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-colors ${
                  activeTab === 'history' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                📝 פרטי ההזמנה והעדפות
              </button>
            </div>

            {/* TAB CONTENT: VIDEOS */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                
                {/* List of mock videos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_VIDEOS.map((vid) => (
                    <div 
                      key={vid.id} 
                      className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-right space-y-4 flex flex-col justify-between"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Video Thumbnail with play icon */}
                        <div 
                          className="relative w-20 aspect-[9/16] bg-slate-950 rounded-xl overflow-hidden shrink-0 border border-slate-200 cursor-pointer group"
                          onClick={() => handleWatchVideo(vid)}
                        >
                          <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <Play className="w-5 h-5 fill-white text-white" />
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1 rounded">
                            {vid.duration}
                          </span>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          {vid.status === 'ready' ? (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-100">
                              ✓ מוכן להורדה
                            </span>
                          ) : (
                            <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100 flex items-center gap-1 w-max">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                              בעיבוד AI ועריכה פנימית
                            </span>
                          )}

                          <h4 className="text-sm font-black text-slate-900 font-display line-clamp-1">{vid.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">{vid.description}</p>
                          <p className="text-[10px] text-slate-400 font-mono">תאריך עדכון: {vid.publishDate}</p>
                        </div>
                      </div>

                      {/* Video action triggers */}
                      <div className="flex gap-2 border-t border-slate-50 pt-3">
                        {vid.status === 'ready' ? (
                          <>
                            <button 
                              onClick={() => handleWatchVideo(vid)}
                              className="flex-1 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Play className="w-3.5 h-3.5 fill-indigo-700" />
                              צפייה בסרטון
                            </button>
                            
                            <a 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`מוריד סרטון '${vid.title}' באיכות Ultra HD לרשתות חברתיות בהצלחה!`);
                              }}
                              className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              הורדת וידאו
                            </a >
                          </>
                        ) : (
                          <div className="w-full text-center py-2 text-xs text-slate-400 font-semibold bg-slate-50 rounded-lg flex items-center justify-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            סרטון זה עדיין בעבודה. נעדכן אותך ברגע שיהיה מוכן.
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

                {/* Subtitles notice */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-900 leading-relaxed text-right flex items-start gap-2.5">
                  <span className="text-base">💡</span>
                  <div>
                    <strong className="block mb-0.5">טיפ להורדה ופרסום ברשתות החברתיות:</strong>
                    כל הסרטונים מוכנים ביחס 9:16 המותאם באופן מושלם ל-Instagram Reels ול-TikTok. הכתוביות המובנות צבעוניות וברורות ועוזרות להכפיל את המעורבות של הצופים!
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: FILES */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                
                {/* Images uploaded */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display">תמונות תדמית של הדמות ({order.uploadedImages.length})</h4>
                      <p className="text-[11px] text-slate-400">תמונות אלו משמשות לאימון מודל ה-AI להנפשת הדמות שלך</p>
                    </div>
                  </div>

                  {order.uploadedImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {order.uploadedImages.map((img) => (
                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center group">
                          <img src={img.previewUrl} alt={img.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => handleDeleteFile(img.id, true)}
                              className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full shadow"
                              title="מחק קובץ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[8px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {img.size}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">לא נותרו תמונות. אנא העלה תמונות תדמית חדשות.</p>
                  )}
                </div>

                {/* Voice Clips Uploaded */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
                  <h4 className="text-base font-bold text-slate-900 font-display pb-2 border-b border-slate-100">קטעי קול ווידאו לדגימת דיבור ({order.uploadedFiles.length})</h4>
                  
                  {order.uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {order.uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{file.type === 'video' ? '🎬' : '🎵'}</span>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{file.name}</p>
                              <p className="text-[10px] text-slate-400">{file.size} • אורך: {file.duration || 'לא ידוע'}</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleDeleteFile(file.id, false)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                            title="מחק קובץ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">לא הועלו קבצי קול לדגימה.</p>
                  )}
                </div>

              </div>
            )}

            {/* TAB CONTENT: HISTORY & PREFERENCES */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-6">
                <div>
                  <h4 className="text-lg font-black text-slate-900 font-display border-b border-slate-100 pb-3">העדפות והגדרות סגנון של ההזמנה</h4>
                  <p className="text-xs text-slate-500">הנחיות אלו נשלחו ישירות למעבדי ה-AI ולצוות העריכה האנושי</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  
                  <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block">סוג חבילה:</span>
                    <strong className="text-sm text-slate-800 block">{order.packageName}</strong>
                    <span className="text-[10px] text-slate-500">מספר סרטונים: {order.videosCount} סרטונים</span>
                  </div>

                  <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block">סגנון לבוש נבחר:</span>
                    <strong className="text-sm text-slate-800 block">
                      {order.clothingStyle === 'clothing-business' ? 'עסקי נקי - חולצה מכופתרת וז׳קט' : 'קז׳ואל חכם - לבוש ניטרלי ומזמין'}
                    </strong>
                    <span className="text-[10px] text-slate-500">סגנון אלגנטי התואם את מטרת העסק שלך</span>
                  </div>

                  <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block">אולפן פודקאסט נבחר:</span>
                    <strong className="text-sm text-slate-800 block">
                      {order.studioStyle === 'studio-warm' ? 'פודקאסט חם - קיר לבנים ותאורת ON AIR' : 'יוקרתי כהה - תאורה דרמטית מעוצבת'}
                    </strong>
                    <span className="text-[10px] text-slate-500">תפאורה מקצועית המעלה את רמת האמון במותג שלך</span>
                  </div>

                  <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block">טון דיבור וקהל יעד:</span>
                    <strong className="text-sm text-slate-800 block">טון: {order.speechStyle} | קהל: {order.targetAudience}</strong>
                    <span className="text-[10px] text-slate-500">מטרות מרכזיות: {order.goals.join(', ')}</span>
                  </div>

                </div>

                <div className="space-y-2 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-900 block">תסריט ותוכן מבוקש:</span>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-white/70 p-3 rounded-xl border border-indigo-50 text-right">
                    {order.inputText}
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* Sidebar Area (Col 4) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Box 1: Email Receipt Mockup */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">אישור הזמנה וקבלה</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">נשלח למייל</span>
              </div>

              {/* Envelope graphic representation */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 text-xs text-slate-600 text-right space-y-3 font-sans relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1 bg-indigo-600"></div>
                
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <div>
                    <span className="font-bold text-slate-900">PodAI Receipt</span>
                    <p className="text-[9px] text-slate-400">היום, 10:42</p>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-bold">הודעה חדשה ✉</span>
                </div>

                <div className="space-y-1 bg-white p-2 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800 text-[11px] leading-tight mb-1">🎉 ההזמנה שלך התקבלה בהצלחה ב-PodAI</p>
                  <p className="text-[9px] text-slate-500 leading-normal">שלום, תודה על ההזמנה. אנו מתחילים לעבד את החומרים שלך לסרטוני פודקאסט AI.</p>
                  <div className="flex justify-between text-[9px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span>קוד הזמנה: {order.id}</span>
                    <span>סכום: ₪{order.price.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleResendReceipt}
                  className="w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg transition-colors text-center"
                >
                  שלח שוב את אישור ההזמנה למייל
                </button>
              </div>
            </div>

            {/* Box 2: Support Ticket Panel */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
              <h4 className="text-base font-black text-slate-900 font-display flex items-center gap-2 pb-2 border-b border-slate-100">
                <span>💬 תמיכה ופניות לצוות</span>
              </h4>

              {/* Chat timeline simulation */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto p-1 text-[11px]">
                {order.supportMessages.map((msg) => {
                  const isSys = msg.sender === 'system';
                  return (
                    <div 
                      key={msg.id} 
                      className={`p-2.5 rounded-2xl max-w-[85%] text-right leading-relaxed ${
                        isSys 
                          ? 'bg-slate-100 text-slate-800 mr-auto rounded-tl-none' 
                          : 'bg-indigo-600 text-white ml-auto rounded-tr-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-400 block mt-1 text-left">
                        {new Date(msg.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat action form */}
              <form onSubmit={handleSendSupportMsg} className="pt-2">
                <label className="text-[10px] font-bold text-slate-500 block mb-1">פנייה מהירה לנציג</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newSupportMsg}
                    onChange={(e) => setNewSupportMsg(e.target.value)}
                    placeholder="כתוב הודעה כאן..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl shrink-0"
                  >
                    <Send className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
                {supportSuccess && (
                  <p className="text-[9px] text-emerald-600 font-bold mt-1.5">✓ פנייתך נרשמה בהצלחה! נציג יחזור אליך בהקדם.</p>
                )}
              </form>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-slate-400 block mb-2">נציגים זמינים גם ישירות בנייד:</span>
                <a 
                  href="https://wa.me/97250000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  לשיחה בוואטסאפ
                </a>
              </div>

            </div>

            {/* Box 3: Order another package widget */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm text-right space-y-4">
              <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">שירות המשך</span>
              <h5 className="font-bold text-sm font-display leading-tight">צריך עוד סרטונים?</h5>
              <p className="text-xs text-indigo-200 leading-relaxed">
                באפשרותך להזמין חבילת סרטונים נוספת ולבחור האם להשתמש שוב בתמונות הקודמות ובדגימת הקול, כדי לחסוך זמן יקר!
              </p>
              
              <button 
                onClick={() => setShowReorderModal(true)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-slate-950/20 transition-all"
              >
                <span>להזמנת חבילה נוספת</span>
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Box 4: Write review widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
              <h4 className="text-base font-black text-slate-900 font-display flex items-center gap-2 pb-2 border-b border-slate-100">
                <span>⭐ כשתרצה – נשמח לביקורת שלך</span>
              </h4>

              {reviewSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-center rounded-2xl text-xs space-y-2 border border-emerald-100">
                  <span className="text-2xl">🎉</span>
                  <h6 className="font-bold">הביקורת שלך נשלחה בהצלחה!</h6>
                  <p className="text-[10px] text-slate-500 leading-normal">תודה רבה על חוות הדעת, היא עוזרת לנו לשפר את השירות עבורך ועבור כולם.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <p className="text-[11px] text-slate-500 leading-relaxed">חוות הדעת והפידבק שלך סופר חשובים לנו ומסייעים לנו לייצר סרטונים טובים יותר.</p>
                  
                  {/* Dynamic Stars */}
                  <div className="flex gap-2 justify-center py-1">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setRating(starNum)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-6 h-6 transition-colors ${
                            starNum <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    placeholder="איך הייתה החוויה שלך מהמערכת ומתוצאות הסרטונים?"
                    rows={3}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none text-right"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    שלח ביקורת על השירות
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ================= RECONCILING VIDEO PREVIEW PLAYER DIALOG ================= */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative bg-slate-950 text-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-white/10 aspect-[9/16] flex flex-col justify-between">
            
            {/* Close trigger button */}
            <button 
              onClick={() => {
                setSelectedVideo(null);
                setVideoPlaying(false);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 border border-white/20 text-sm font-bold"
            >
              ✕
            </button>

            {/* Sound Toggle */}
            <button 
              onClick={() => setVideoMuted(!videoMuted)}
              className="absolute top-4 left-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 border border-white/20"
            >
              {videoMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Video Simulator Area with selected background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b ${selectedVideo.videoGradient} flex flex-col justify-between p-6 pt-16`}>
              
              {/* Header profile info */}
              <div className="flex items-center gap-2.5 z-10 text-right">
                <div className="w-8 h-8 rounded-full bg-indigo-500 border border-white/20 flex items-center justify-center text-white font-black text-xs">
                  {order.receiptEmail[0].toUpperCase()}
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">הסרטון שלך ב-PodAI</h6>
                  <p className="text-[9px] text-indigo-300">סטודיו: פודקאסט חם • לבוש: עסקי</p>
                </div>
              </div>

              {/* Dynamic Sound Wave & Visualizing Screen */}
              <div className="my-auto text-center px-2 space-y-4 z-10">
                <div className="flex items-end justify-center gap-1.5 h-12">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 bg-indigo-400 rounded-full ${(!videoPlaying || videoMuted) ? 'h-1' : 'animate-pulse h-10'}`} 
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.5s'
                      }}
                    ></div>
                  ))}
                </div>

                {/* Subtitle simulation element */}
                <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
                  <p className="text-sm md:text-base font-bold text-indigo-100 font-display leading-relaxed">
                    {videoMuted ? (
                      <span className="text-rose-300 text-xs flex items-center justify-center gap-1.5 font-semibold">
                        <VolumeX className="w-4 h-4" /> הקש להפעלת שמע
                      </span>
                    ) : (
                      activeSubtitle || 'מפענח כתוביות...'
                    )}
                  </p>
                </div>
              </div>

              {/* Lower info and controller section */}
              <div className="space-y-4 z-10">
                <div className="bg-black/40 p-3 rounded-xl text-right">
                  <h5 className="text-xs font-bold text-white leading-tight font-display">{selectedVideo.title}</h5>
                  <p className="text-[9px] text-slate-300">קצב ואמפליטודת קול דגומים בהצלחה • Ultra HD</p>
                </div>

                {/* Video controls toolbar */}
                <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                  <button 
                    onClick={() => setVideoPlaying(!videoPlaying)}
                    className="flex items-center gap-1 bg-white/10 hover:bg-white/20 py-1.5 px-3 rounded-lg border border-white/10 text-white"
                  >
                    {videoPlaying ? <Pause className="w-3.5 h-3.5 text-indigo-300" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
                    <span>{videoPlaying ? 'עצור' : 'נגן'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      alert(`מוריד סרטון '${selectedVideo.title}' באיכות 4K לרשתות חברתיות בהצלחה!`);
                    }}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 py-1.5 px-3 rounded-lg text-white font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>הורד</span>
                  </button>
                </div>

                {/* Custom Timeline ProgressBar */}
                <div className="space-y-1">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-1000" 
                      style={{ 
                        width: `${(videoTime / parseInt(selectedVideo.duration.split(':')[1])) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                    <span>0:{videoTime < 10 ? `0${videoTime}` : videoTime}</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Click safety handle for muting */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setVideoMuted(!videoMuted)}></div>

          </div>
        </div>
      )}

      {/* ================= REORDER MODAL DIALOG ================= */}
      {showReorderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100 text-right space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 font-display">הזמנת חבילה נוספת ברשת</h3>
              <button 
                onClick={() => setShowReorderModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>המערכת מזהה שיש לך כבר חומרים ותמונות תדמית שמורות בשרת המאובטח שלנו.</p>
              <p className="font-bold text-indigo-900">כיצד תרצה להתקדם להזמנה החדשה שלך?</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleConfirmReorder(true)}
                className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-2xl border border-indigo-100 font-bold text-xs text-right leading-relaxed flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-black text-sm">השתמש בחומרים הקודמים (מומלץ!)</span>
                  <span className="text-[10px] text-slate-500">נשתמש באותן תמונות תדמית, טון קול והעדפות מההזמנה הקודמת, ותוכל רק להזין תסריטים חדשים!</span>
                </div>
              </button>

              <button
                onClick={() => handleConfirmReorder(false)}
                className="w-full p-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 font-bold text-xs text-right leading-relaxed flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>
                <div>
                  <span className="block font-black text-sm">אני רוצה להעלות חומרים חדשים לחלוטין</span>
                  <span className="text-[10px] text-slate-500">בחירה זו תפתח טופס ריק להעלאת תמונות תדמית שונות, הקלטות קול חדשות ותסריטים מגוונים.</span>
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
              <button 
                onClick={() => setShowReorderModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold"
              >
                ביטול
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Quick custom inline component for plus icon
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="1em" 
      height="1em" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
