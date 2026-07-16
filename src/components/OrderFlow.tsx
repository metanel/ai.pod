/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Lock, 
  Phone,
  FileText,
  AlertCircle,
  HelpCircle as HelpIcon,
  Briefcase,
  Layers,
  Image as ImageIcon,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { Package, UploadedFile, OrderState, ClothingOption, StudioOption } from '../types';
import { CLOTHING_OPTIONS, STUDIO_OPTIONS, PACKAGES } from '../data';

interface OrderFlowProps {
  selectedPackage: Package;
  onOrderCompleted: (completedOrder: OrderState) => void;
  onCancel: () => void;
  onNavigateToPackages: () => void;
}

export default function OrderFlow({ 
  selectedPackage, 
  onOrderCompleted, 
  onCancel,
  onNavigateToPackages 
}: OrderFlowProps) {
  // Current step: 1 = Upload, 2 = Content & Style, 3 = Payment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [autoSaveText, setAutoSaveText] = useState('נשמר אוטומטית לפני מספר שניות');

  // STEP 1 STATES
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([
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
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: 'aud-1',
      name: 'הקלטת_שמע_דגימה_קולית.mp3',
      size: '12.4 MB',
      type: 'audio',
      previewUrl: '#',
      progress: 100,
      status: 'completed',
      duration: '0:42'
    },
    {
      id: 'vid-ref',
      name: 'סרטון_קצר_סגנון.mp4',
      size: '48.2 MB',
      type: 'video',
      previewUrl: '#',
      progress: 100,
      status: 'completed',
      duration: '0:15'
    }
  ]);

  const [inputText, setInputText] = useState(
    'שלום לכולם, אני רוצה לעשות סדר בכל מה שקשור לניהול פיננסי בעסק. הרבה בעלי עסקים חושבים שהבעיה שלהם היא חוסר במכירות, אבל האמת היא שלרוב חסר להם סדר בניהול תזרים המזומנים ובחישוב הרווח האמיתי. בסדרת הסרטונים הזו נעבור צעד-צעד על הכלים שיעזרו לכם לשמור על רווחיות גבוהה וראש שקט.'
  );

  // AI Assistant Modal state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiBusiness, setAiBusiness] = useState('');
  const [aiAudience, setAiAudience] = useState('');
  const [aiCoreMessage, setAiCoreMessage] = useState('');
  const [aiCta, setAiCta] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // STEP 2 STATES
  const [goals, setGoals] = useState<string[]>(['לידים', 'חיזוק המותג']);
  const [targetAudience, setTargetAudience] = useState('בעלי עסקים קטנים ובינוניים בתחומי השירותים');
  const [speechStyle, setSpeechStyle] = useState('מקצועי');
  const [contentEmphasis, setContentEmphasis] = useState(
    'חשוב להדגיש את החיסכון בזמן ובמשאבים, לפשט מילים מסובכות, ולסיים בהזמנה להוריד מדריך במתנה.'
  );
  const [clothingStyle, setClothingStyle] = useState('clothing-business');
  const [studioStyle, setStudioStyle] = useState('studio-warm');

  // STEP 3 STATES
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'apple' | 'google'>('credit');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [receiptEmail, setReceiptEmail] = useState('malkamatanel@gmail.com');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeUsage, setAgreeUsage] = useState(true);
  const [agreeRights, setAgreeRights] = useState(true);

  // Transaction Processing State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Guidelines overlay modal
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  // Step 1 Validation errors
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  // Step 2 Validation errors
  const [step2Errors, setStep2Errors] = useState<string[]>([]);
  // Step 3 Validation errors
  const [step3Errors, setStep3Errors] = useState<string[]>([]);

  // Auto save simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
      setAutoSaveText(`נשמר אוטומטית ב-${timeStr}`);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Calculate pricing
  const subtotal = selectedPackage.price;
  const discount = couponApplied ? subtotal * 0.25 : 0; // 25% discount
  const beforeVat = subtotal - discount;
  const vat = beforeVat * 0.17; // 17% VAT in Israel
  const totalWithVat = beforeVat + vat;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'PODAI25' || couponCode.trim().toUpperCase() === 'SPECIAL25') {
      setCouponApplied(true);
      setDiscountAmount(subtotal * 0.25);
    } else {
      alert('קוד קופון לא תקין. נסה את הקופון SPECIAL25 או PODAI25 לקבלת 25% הנחה!');
    }
  };

  // Step 1 validation
  const validateStep1 = () => {
    const errors: string[] = [];
    if (uploadedImages.length < 3) {
      errors.push('על פי הנחיות ה-AI, יש להעלות לפחות 3 תמונות תדמית ברורות על מנת ליצור מודל פנים מדויק.');
    }
    if (uploadedFiles.length === 0 && !inputText.trim()) {
      errors.push('יש להזין תסריט כתוב בשדה התוכן, או להעלות קובץ שמע/וידאו לדגימת הדיבור.');
    }
    setStep1Errors(errors);
    return errors.length === 0;
  };

  const handleNextStep1 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Step 2 validation
  const validateStep2 = () => {
    const errors: string[] = [];
    if (goals.length === 0) {
      errors.push('יש לבחור לפחות מטרת סרטון אחת מרכזית.');
    }
    if (!targetAudience.trim()) {
      errors.push('נא להזין מי קהל היעד המרכזי של הסרטונים.');
    }
    setStep2Errors(errors);
    return errors.length === 0;
  };

  const handleNextStep2 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo(0, 0);
    }
  };

  // Handle image upload simulation
  const handleImageUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImg: UploadedFile = {
        id: `img-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: 'image',
        previewUrl: URL.createObjectURL(file),
        progress: 100,
        status: 'completed'
      };
      setUploadedImages(prev => [...prev, newImg]);
    }
  };

  // Handle audio/video upload simulation
  const handleAudioVideoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isVideo = file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.mov');
      const newFile: UploadedFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isVideo ? 'video' : 'audio',
        previewUrl: '#',
        progress: 100,
        status: 'completed',
        duration: isVideo ? '0:10' : '0:35'
      };
      setUploadedFiles(prev => [...prev, newFile]);
    }
  };

  // Delete uploaded item
  const handleDeleteUploaded = (id: string, isImage: boolean) => {
    if (isImage) {
      setUploadedImages(prev => prev.filter(item => item.id !== id));
    } else {
      setUploadedFiles(prev => prev.filter(item => item.id !== id));
    }
  };

  // AI Content Writer simulation
  const handleGenerateAiContent = () => {
    if (!aiBusiness.trim()) {
      alert('אנא הזן מהו העסק או תחום העיסוק שלך');
      return;
    }
    setIsGeneratingAi(true);
    
    setTimeout(() => {
      // Craft a highly relevant mock podcast content script
      const audienceName = aiAudience || 'לקוחות פוטנציאליים';
      const coreMsg = aiCoreMessage || 'העסק שלנו נותן שירות מעולה ומקצועי';
      const ctaVal = aiCta || 'להשאיר פרטים כאן באתר';

      const generatedScript = `🎙️ סדרת סרטוני פודקאסט AI מיוחדת עבור: ${aiBusiness}

סרטון 1: משיכת תשומת לב קהל היעד (${audienceName})
"היי לכם, אם אתם פועלים בתור ${audienceName}, כנראה שגם אתם מרגישים שאתם משקיעים המון אנרגיה במקומות הלא נכונים. הבעיה המרכזית היא שרובכם לא יודעים ש-${coreMsg}. בסרטון הבא אני הולך לחשוף את השיטה ששינתה הכל!"

סרטון 2: הפתרון המקצועי שלנו
"אחרי שחקרנו את הצרכים של ${audienceName}, פיתחנו פתרון מדויק שחוסך זמן וכסף ומביא תוצאות אמיתיות. המפתח הוא פשוט - להפסיק לעבוד קשה ולעבוד חכם עם ${aiBusiness}. הנה 3 שלבים שיעזרו לכם להתחיל כבר מחר..."

סרטון 3: ההנעה לפעולה והסגירה
"אם נמאס לכם לדרוך במקום ואתם מוכנים לעשות את קפיצת המדרגה שלכם, הצעד הבא שלכם הוא פשוט ביותר. לחצו על הקישור למטה כדי ${ctaVal} ונבנה עבורכם תוכנית עבודה מנצחת!"`;

      setInputText(generatedScript);
      setIsGeneratingAi(false);
      setShowAiModal(false);
    }, 15000); // 1.5 seconds mock generation
  };

  // Handle Payment Submit
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (paymentMethod === 'credit') {
      if (!cardName.trim()) errors.push('נא להזין את שם בעל כרטיס האשראי.');
      if (cardNumber.replace(/\s/g, '').length < 16) errors.push('מספר כרטיס האשראי שהוזן אינו תקין.');
      if (!cardExpiry.trim()) errors.push('נא להזין את תוקף הכרטיס (MM/YY).');
      if (cardCvv.length < 3) errors.push('קוד CVV אינו תקין (3 ספרות בגב הכרטיס).');
    }

    if (!receiptEmail.trim() || !receiptEmail.includes('@')) {
      errors.push('נא להזין כתובת אימייל תקינה לקבלת הקבלה וקישור האזור האישי.');
    }

    if (!agreeTerms || !agreeUsage || !agreeRights) {
      errors.push('יש לאשר את תנאי השימוש, הסכם השימוש בחומרי AI וזכויות הקבצים על מנת להמשיך.');
    }

    setStep3Errors(errors);

    if (errors.length === 0) {
      setIsProcessingPayment(true);
      
      // Simulate real bank api call delay
      setTimeout(() => {
        const orderId = `POD-${Math.floor(10000 + Math.random() * 90000)}`;
        setGeneratedOrderId(orderId);
        setIsProcessingPayment(false);
        setShowSuccessModal(true);
      }, 2000);
    }
  };

  const handleFinalRedirect = () => {
    // Construct the finalized OrderState
    const newOrder: OrderState = {
      id: generatedOrderId,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      videosCount: selectedPackage.videosCount,
      uploadedImages: uploadedImages,
      uploadedFiles: uploadedFiles,
      inputText: inputText,
      goals: goals,
      targetAudience: targetAudience,
      customAudience: targetAudience,
      speechStyle: speechStyle,
      contentEmphasis: contentEmphasis,
      clothingStyle: clothingStyle,
      studioStyle: studioStyle,
      isPaid: true,
      date: new Date().toLocaleDateString('he-IL'),
      receiptEmail: receiptEmail,
      status: 'processing', // starts in processing
      price: totalWithVat,
      couponCode: couponApplied ? 'SPECIAL25' : undefined,
      couponApplied: couponApplied,
      supportMessages: [
        {
          id: 'msg-init-1',
          sender: 'system',
          text: 'שלום! ההזמנה שלך נקלטה בהצלחה במערכת PodAI. החומרים שלך הועברו לבדיקה של צוות בקרת האיכות וה-AI שלנו.',
          timestamp: new Date()
        }
      ],
      reviews: []
    };

    onOrderCompleted(newOrder);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12" dir="rtl" id="order-flow-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold font-display text-xl">🎙️</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-display">הזמנת סרטוני AI • {selectedPackage.name}</h2>
              <p className="text-xs text-slate-500">יוצרים דמות AI דוברת בתוך אולפן פודקאסט מקצועי</p>
            </div>
          </div>

          {/* Auto Save Badge */}
          <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{autoSaveText}</span>
          </div>

          <button 
            onClick={onCancel}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            חזרה לדף הבית
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 translate-y-[-50%] z-0 rounded-full"></div>
            
            {/* Active Highlight Line */}
            <div 
              className="absolute top-1/2 right-0 h-1 bg-indigo-600 translate-y-[-50%] z-0 rounded-full transition-all duration-500"
              style={{ 
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                right: 0
              }}
            ></div>

            {/* Step 1 Node */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= 1 ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className={`text-xs mt-2 font-bold ${currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>1. העלאת חומרים</span>
            </div>

            {/* Step 2 Node */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= 2 ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-300 text-slate-500'
              }`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className={`text-xs mt-2 font-bold ${currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>2. תוכן ולבוש</span>
            </div>

            {/* Step 3 Node */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= 3 ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-300 text-slate-500'
              }`}>
                '3'
              </div>
              <span className={`text-xs mt-2 font-bold ${currentStep >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>3. תשלום</span>
            </div>

          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main content pane (Col 8) */}
          <div className="lg:col-span-8 space-y-6">

            {/* ================= STEP 1: UPLOAD MATERIALS ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">

                {/* Validation Errors Step 1 */}
                {step1Errors.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>לא ניתן להמשיך בשל חוסר במידע הכרחי:</span>
                    </div>
                    <ul className="list-disc pr-6 space-y-1">
                      {step1Errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Box 1: Photos Upload */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-display">העלה את תמונות התדמית שלך</h3>
                      <p className="text-xs text-slate-500">תמונות אלו ישמשו ליצירת מודל פנים מונפש ברזולוציה גבוהה</p>
                    </div>
                    
                    <button 
                      onClick={() => setShowGuidelinesModal(true)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <HelpIcon className="w-3.5 h-3.5" />
                      הנחיות לצילום תמונות תקינות
                    </button>
                  </div>

                  {/* Drag and Drop Zone */}
                  <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/10">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUploadSim}
                    />
                    <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-700">גרור לכאן קבצי תמונות תדמית</p>
                    <p className="text-xs text-slate-400 mt-1">או לחץ לבחירה מהמחשב/גלריה (JPG, PNG • מקסימום 10MB לקובץ)</p>
                  </label>

                  {/* Preview Thumbnails */}
                  {uploadedImages.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                        <span>תמונות שהועלו בהצלחה ({uploadedImages.length})</span>
                        <span className="text-emerald-600 flex items-center gap-1">✓ מאובטח ומאושר ל-AI</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {uploadedImages.map((img) => (
                          <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                            <img src={img.previewUrl} alt={img.name} className="w-full h-full object-cover" />
                            <div className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleDeleteUploaded(img.id, true)}
                                className="text-rose-400 hover:text-rose-600 focus:outline-none"
                                title="מחיקת תמונה"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">מוכן</span>
                          </div>
                        ))}

                        {/* Add more photo card */}
                        <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 flex flex-col items-center justify-center cursor-pointer transition-colors text-slate-400 hover:text-indigo-600">
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUploadSim} />
                          <span className="text-2xl font-bold">+</span>
                          <span className="text-[10px] font-bold">הוסף עוד</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-amber-50 text-amber-800 rounded-xl text-xs flex items-center gap-2 justify-center border border-amber-100">
                      <AlertCircle className="w-4 h-4" />
                      טרם הועלו תמונות תדמית. מומלץ להעלות לפחות 3 תמונות.
                    </div>
                  )}

                </div>

                {/* Box 2: Audio/Video File Upload */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display">העלה סרטון קיים או הקלטת קול שלך</h3>
                    <p className="text-xs text-slate-500">נשתמש בקובץ זה כדי לדגום את טון וקצב הדיבור שלך בצורה מדויקת</p>
                  </div>

                  {/* Drag and Drop Zone files */}
                  <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/10">
                    <input 
                      type="file" 
                      accept="audio/*,video/*" 
                      className="hidden" 
                      onChange={handleAudioVideoUploadSim}
                    />
                    <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-700">גרור לכאן קטע קול או סרטון קודם שלך</p>
                    <p className="text-xs text-slate-400 mt-1">או לחץ לבחירה (MP3, WAV, M4A, MP4, MOV • עד 100MB לקובץ)</p>
                  </label>

                  {/* List of uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-400">קבצי קול ווידאו שהועלו ({uploadedFiles.length})</p>
                      <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-right">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                {file.type === 'video' ? '🎬' : '🎵'}
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-bold text-slate-800 line-clamp-1">{file.name}</p>
                                <p className="text-[10px] text-slate-400">{file.size} • אורך: {file.duration || 'לא ידוע'}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> הועלה בהצלחה
                              </span>
                              <button 
                                onClick={() => handleDeleteUploaded(file.id, false)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="מחק קובץ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Box 3: Text Input */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-display">הזן את התוכן לסרטונים</h3>
                      <p className="text-xs text-slate-500">הזן כאן את הטקסט המלא, נקודות עיקריות, או תסריט לסרטונים שלך</p>
                    </div>

                    {/* AI Assistant Button Trigger */}
                    <button 
                      type="button"
                      onClick={() => setShowAiModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                      עזור לי לכתוב את התוכן עם AI ✨
                    </button>
                  </div>

                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={6}
                    placeholder="הקלד כאן את הטקסט או את הרעיונות המרכזיים לסרטונים שלך. למשל: 'סרטון 1 יעסוק בחשיבות ניהול תזרים מזומנים...'"
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:outline-none text-sm text-slate-800 leading-relaxed font-sans text-right"
                  />

                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>טיפ: דקה אחת של וידאו מקבילה לכ-130 עד 150 מילים בעברית.</span>
                    <span>{inputText.length} תווים</span>
                  </div>

                </div>

                {/* Navigation Buttons Step 1 */}
                <div className="flex justify-between items-center pt-4">
                  <button 
                    onClick={handleNextStep1}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center gap-2 transform active:scale-95 transition-all mr-auto"
                  >
                    המשך לשלב הבא: סגנון ולבוש
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* ================= STEP 2: CONTENT, STYLE & STUDIO ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">

                {/* Validation Errors Step 2 */}
                {step2Errors.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>אנא מלא את פרטי הסגנון המבוקשים:</span>
                    </div>
                    <ul className="list-disc pr-6 space-y-1">
                      {step2Errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Box 1: Content Goals */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-6">
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900 font-display">אסטרטגיית תוכן</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 block">מהי מטרת הסרטונים המרכזית? (ניתן לבחור מספר אפשרויות)</label>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          'יצירת לידים ומכירות',
                          'חיזוק המותג האישי',
                          'הגדלת עוקבים וחשיפה',
                          'הסבר על שירות מורכב',
                          'חינוך והעברת ידע',
                          'בניית אמון אצל הקהל'
                        ].map((goalOption) => {
                          const isSelected = goals.includes(goalOption);
                          return (
                            <button
                              key={goalOption}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setGoals(prev => prev.filter(g => g !== goalOption));
                                } else {
                                  setGoals(prev => [...prev, goalOption]);
                                }
                              }}
                              className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                                isSelected 
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {goalOption}
                              {isSelected && ' ✓'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">מי קהל היעד של הסרטונים?</label>
                        <input 
                          type="text"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          placeholder="למשל: בעלי עסקים קטנים, אמהות טריות, יזמים..."
                          className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">סגנון דיבור וטון הדמות</label>
                        <div className="flex flex-wrap gap-2">
                          {['מקצועי', 'קליל ונגיש', 'סמכותי', 'אישי וחברי', 'מרגש', 'חד וישיר'].map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => setSpeechStyle(style)}
                              className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all ${
                                speechStyle === style 
                                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-bold text-slate-500 block">דגשים ודברים שחשוב לנו לדעת (מסרים מיוחדים, מילים שאסור להגיד וכו׳)</label>
                      <textarea 
                        value={contentEmphasis}
                        onChange={(e) => setContentEmphasis(e.target.value)}
                        rows={3}
                        placeholder="רשום כאן דגשים מיוחדים, משפט סיום קבוע או הנעה ממוקדת לפעולה..."
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none leading-relaxed"
                      />
                    </div>

                  </div>

                </div>

                {/* Box 2: Clothing Selection */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display">בחירת סגנון לבוש לדמות</h3>
                    <p className="text-xs text-slate-500">בחר את סגנון הלבוש שבו תרצה שהדמות הדיגיטלית שלך תופיע בסרטונים</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {CLOTHING_OPTIONS.map((cloth) => {
                      const isSelected = clothingStyle === cloth.id;
                      return (
                        <div 
                          key={cloth.id}
                          onClick={() => setClothingStyle(cloth.id)}
                          className={`rounded-2xl border-2 overflow-hidden cursor-pointer bg-slate-50/50 hover:bg-slate-100/30 transition-all text-right relative flex flex-col justify-between ${
                            isSelected ? 'border-indigo-600 shadow-md scale-102 bg-white' : 'border-slate-100'
                          }`}
                        >
                          <div className="aspect-[4/3] w-full bg-slate-200 overflow-hidden relative">
                            <img src={cloth.imageUrl} alt={cloth.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-indigo-900/10 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="bg-indigo-600 text-white rounded-full p-1.5 shadow">
                                  <Check className="w-4 h-4" />
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 space-y-1 bg-white">
                            <h5 className="font-bold text-xs text-slate-900 flex items-center justify-between">
                              <span>{cloth.name}</span>
                              {isSelected && <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">נבחר</span>}
                            </h5>
                            <p className="text-[10px] text-slate-500 leading-tight leading-relaxed">{cloth.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Box 3: Studio Style Selection */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display">בחירת מראה הסט (חדר פודקאסט)</h3>
                    <p className="text-xs text-slate-500">בחר את הרקע והעיצוב של אולפן הפודקאסט שבו יתבצעו הסרטונים שלך</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {STUDIO_OPTIONS.map((studio) => {
                      const isSelected = studioStyle === studio.id;
                      return (
                        <div 
                          key={studio.id}
                          onClick={() => setStudioStyle(studio.id)}
                          className={`rounded-2xl border-2 overflow-hidden cursor-pointer bg-slate-50/50 hover:bg-slate-100/30 transition-all text-right relative flex flex-col justify-between ${
                            isSelected ? 'border-indigo-600 shadow-md scale-102 bg-white' : 'border-slate-100'
                          }`}
                        >
                          <div className="aspect-[4/3] w-full bg-slate-200 overflow-hidden relative">
                            <img src={studio.imageUrl} alt={studio.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-indigo-900/10 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="bg-indigo-600 text-white rounded-full p-1.5 shadow">
                                  <Check className="w-4 h-4" />
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 space-y-1 bg-white">
                            <h5 className="font-bold text-xs text-slate-900 flex items-center justify-between">
                              <span>{studio.name}</span>
                              {isSelected && <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">נבחר</span>}
                            </h5>
                            <p className="text-[10px] text-slate-500 leading-tight leading-relaxed">{studio.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons Step 2 */}
                <div className="flex justify-between items-center pt-4">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                    חזור לשלב הקודם
                  </button>

                  <button 
                    onClick={handleNextStep2}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center gap-2 transform active:scale-95 transition-all"
                  >
                    המשך לתשלום והזמנה
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* ================= STEP 3: PAYMENT ================= */}
            {currentStep === 3 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">

                {/* Validation Errors Step 3 */}
                {step3Errors.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>שגיאה בפרטי התשלום:</span>
                    </div>
                    <ul className="list-disc pr-6 space-y-1">
                      {step3Errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-right space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display">תשלום מאובטח והשלמת ההזמנה</h3>
                    <p className="text-xs text-slate-500">אנו משתמשים בספק סליקה חיצוני מאובטח. פרטי כרטיס האשראי שלך לא יישמרו במערכת.</p>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 block">בחר אמצעי תשלום</label>
                    <div className="grid grid-cols-3 gap-3">
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'credit' 
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-800 font-bold' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-xl">💳</span>
                        <span className="text-xs">כרטיס אשראי</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'apple' 
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-800 font-bold' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-xl">🍎</span>
                        <span className="text-xs">Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('google')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'google' 
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-800 font-bold' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-xl">🤖</span>
                        <span className="text-xs">Google Pay</span>
                      </button>

                    </div>
                  </div>

                  {/* Credit Card Fields */}
                  {paymentMethod === 'credit' ? (
                    <div className="space-y-4 pt-2">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 block">שם בעל הכרטיס (באנגלית או עברית)</label>
                        <input 
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="ישראל ישראלי"
                          className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 block">מספר כרטיס אשראי</label>
                        <input 
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            // simple format with space
                            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 rounded-xl border border-slate-200 text-sm tracking-wider focus:border-indigo-500 focus:outline-none ltr text-right font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 block">תוקף הכרטיס</label>
                          <input 
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none text-center font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 block">קוד CVV (בגב הכרטיס)</label>
                          <input 
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none text-center font-mono"
                          />
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center text-sm font-bold text-slate-600">
                      תשלום מאובטח באמצעות {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} יופעל ישירות בלחיצה על כפתור התשלום למטה.
                    </div>
                  )}

                  {/* Receipt Email */}
                  <div className="space-y-1 pt-2">
                    <label className="text-xs font-bold text-slate-500 block">אימייל למשלוח הקבלה והתחברות לאזור האישי</label>
                    <input 
                      type="email"
                      required
                      value={receiptEmail}
                      onChange={(e) => setReceiptEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none text-left"
                    />
                    <p className="text-[10px] text-slate-400">האזור האישי נגיש באמצעות קישור חד-פעמי שיישלח למייל זה מיד לאחר התשלום.</p>
                  </div>

                  {/* Terms Checkboxes */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    
                    <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
                      <input 
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4.5 h-4.5 shrink-0 mt-0.5"
                      />
                      <span className="text-slate-600 leading-relaxed font-semibold">אני מאשר את <a href="#" className="text-indigo-600 underline">תנאי השימוש ומדיניות הביטולים</a> של שירות PodAI.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
                      <input 
                        type="checkbox"
                        checked={agreeUsage}
                        onChange={(e) => setAgreeUsage(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4.5 h-4.5 shrink-0 mt-0.5"
                      />
                      <span className="text-slate-600 leading-relaxed font-semibold">אני מאשר לעשות שימוש בתמונות, בקול ובחומרים שהעליתי לצורך יצירת סרטוני ה-AI שהזמנתי.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
                      <input 
                        type="checkbox"
                        checked={agreeRights}
                        onChange={(e) => setAgreeRights(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4.5 h-4.5 shrink-0 mt-0.5"
                      />
                      <span className="text-slate-600 leading-relaxed font-semibold">אני מצהיר כי יש לי את מלוא הזכויות על החומרים, התסריטים וקבצי המדיה שהעליתי למערכת.</span>
                    </label>

                  </div>

                  {/* Action row */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                      חזור לסגנון ולבוש
                    </button>

                    <button 
                      type="submit"
                      disabled={isProcessingPayment}
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-100 hover:shadow-emerald-200 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          <span>מעבד תשלום מאובטח...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                          <span>בצע תשלום מאובטח של ₪{totalWithVat.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </form>
            )}

          </div>

          {/* ================= SIDEBAR: ORDER SUMMARY (Col 4) ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Summary Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-right space-y-4">
              <h4 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2 font-display">
                <span>📋 סיכום ההזמנה שלך</span>
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-800">{selectedPackage.name}</span>
                  <button 
                    onClick={onNavigateToPackages}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    שנה חבילה
                  </button>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  הפקת {selectedPackage.videosCount} סרטוני וידאו קצרים ברמת Ultra HD מותאמים לרילס ולטיקטוק.
                </p>
              </div>

              {/* Dynamic checklist details based on choices */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
                
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span className="text-slate-700 font-medium">זמן אספקה משוער: עד {selectedPackage.deliveryDays} ימי עסקים</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span className="text-slate-700 font-medium">כתוביות בעברית מעוצבות ומתוזמנות</span>
                </div>

                {/* Show Step 2 selected preferences */}
                {goals.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold shrink-0">❖</span>
                    <span className="text-slate-700 font-medium line-clamp-1">מטרה: {goals.join(', ')}</span>
                  </div>
                )}

                {clothingStyle && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold shrink-0">❖</span>
                    <span className="text-slate-700 font-medium">
                      לבוש: {CLOTHING_OPTIONS.find(c => c.id === clothingStyle)?.name || 'מותאם אישית'}
                    </span>
                  </div>
                )}

                {studioStyle && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold shrink-0">❖</span>
                    <span className="text-slate-700 font-medium">
                      סט: {STUDIO_OPTIONS.find(s => s.id === studioStyle)?.name || 'פודקאסט חם'}
                    </span>
                  </div>
                )}

              </div>

              {/* Promo code field */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5">יש לך קוד קופון?</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="SPECIAL25"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none uppercase text-center font-bold"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0"
                  >
                    החל
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-emerald-600 font-bold mt-1.5 text-right">✓ קוד קופון הוחל בהצלחה! 25% הנחה</p>
                )}
                {!couponApplied && (
                  <p className="text-[9px] text-indigo-400 mt-1.5 text-right">טיפ: נסה להזין קוד SPECIAL25 לקבלת 25% הנחה להשקה!</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
                
                <div className="flex justify-between items-center text-slate-500">
                  <span>מחיר חבילה (לפני מע"מ):</span>
                  <span>₪{subtotal.toFixed(2)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between items-center text-emerald-600 font-bold">
                    <span>הנחת קופון (25%-):</span>
                    <span>₪{discount.toFixed(2)}-</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-500">
                  <span>מע"מ (17%):</span>
                  <span>₪{vat.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>סה"כ לתשלום:</span>
                  <span>₪{totalWithVat.toFixed(2)}</span>
                </div>

              </div>

            </div>

            {/* Box 2: Sidebar Support Widget */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm text-right space-y-4">
              <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">זקוק לעזרה?</span>
              <h5 className="font-bold text-sm font-display leading-tight">צוות המומחים שלנו כאן כדי ללוות אותך</h5>
              <p className="text-xs text-indigo-200 leading-relaxed">
                רוצה להתייעץ לגבי כתיבת התוכן? לא בטוח אילו תמונות להעלות? דברו איתנו בוואטסאפ לכל שאלה.
              </p>
              
              <a 
                href="https://wa.me/97250000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                צור קשר מהיר בוואטסאפ
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ================= DETAILED GUIDELINES MODAL ================= */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 text-right space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 font-display">הנחיות להעלאת תמונות תקינות</h3>
              <button 
                onClick={() => setShowGuidelinesModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-indigo-900 bg-indigo-50 p-3 rounded-xl text-xs">
                על מנת שמנוע ה-AI יבנה דמות דיגיטלית שנראית בדיוק כמוך ומדברת בצורה טבעית, אנא הקפד על הכללים הבאים:
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>איכות גבוהה:</strong> העלה תמונות חדות ברזולוציה טובה (צילום מהסמארטפון באור יום הוא מעולה).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>זוויות שונות:</strong> מומלץ להעלות לפחות תמונה אחת שמביטה ישירות למצלמה, ותמונות נוספות מזוויות קלות (מבט של 3/4 פנים).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>תאורה נכונה:</strong> ודא שהפנים שלך מוארות היטב וללא צללים חזקים המכסים חלקים מהעיניים או מהפה.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✗</span>
                  <span><strong>הימנע מהסתרות:</strong> אל תעלה תמונות עם משקפי שמש, כובעים, או שיער שמסתיר את קו הלסת או העיניים.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✗</span>
                  <span><strong>ללא תמונות קבוצתיות:</strong> ודא שרק אתה מופיע בתמונות, על מנת שהאלגוריתם יזהה נכון את דמות היעד.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowGuidelinesModal(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm"
              >
                הבנתי, תודה!
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= AI WRITING WRITER MODAL ================= */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 text-right space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                <h3 className="text-lg font-black text-slate-900 font-display">עוזר כתיבה חכם עם AI ✨</h3>
              </div>
              <button 
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {isGeneratingAi ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                <h5 className="font-bold text-slate-800">ה-AI של PodAI מנסח את התוכן שלך...</h5>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">אנו מנתחים את פרופיל העסק, קהל היעד והמסר המרכזי כדי ליצור עבורך תסריט פודקאסט סוחף ומקצועי המותאם לרילס ולטיקטוק בעברית.</p>
                <div className="w-48 bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 animate-pulse" style={{ width: '80%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">ענה על ארבע שאלות פשוטות וה-AI ייצר עבורך באופן מיידי נוסח ראשוני של תסריטים סוחפים עבור החבילה שלך!</p>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">מה העסק שלך או תחום העיסוק?</label>
                    <input 
                      type="text"
                      value={aiBusiness}
                      onChange={(e) => setAiBusiness(e.target.value)}
                      placeholder="למשל: יועץ משכנתאות, קוסמטיקאית פרא-רפואית, חנות בגדי אופנה..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">למי הסרטון מיועד? (קהל היעד)</label>
                    <input 
                      type="text"
                      value={aiAudience}
                      onChange={(e) => setAiAudience(e.target.value)}
                      placeholder="למשל: זוגות צעירים לקראת רכישת דירה, נשים שרוצות לשקם את עור הפנים..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">מה המסר המרכזי שתרצה להעביר?</label>
                    <input 
                      type="text"
                      value={aiCoreMessage}
                      onChange={(e) => setAiCoreMessage(e.target.value)}
                      placeholder="למשל: אל תיקחו משכנתא לבד בלי ייעוץ כי הבנק דואג קודם לעצמו, טיפול פנים לא חייב להכאיב..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">מה תרצה שהצופה יעשה בסוף הסרטון? (קריאה לפעולה)</label>
                    <input 
                      type="text"
                      value={aiCta}
                      onChange={(e) => setAiCta(e.target.value)}
                      placeholder="למשל: להשאיר פרטים לשיחת ייעוץ ראשונה חינם, להיכנס לקישור להזמנת טיפול מראש..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowAiModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold"
                  >
                    ביטול
                  </button>
                  <button 
                    type="button"
                    onClick={handleGenerateAiContent}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    צור תסריט פודקאסט AI ✨
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= SUCCESS CONFIRMATION MODAL ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center space-y-6 animate-bounce-subtle">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-inner animate-pulse">
              ✓
            </div>

            <div className="space-y-2 text-center">
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                התשלום בוצע בהצלחה!
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display">תודה! ההזמנה התקבלה 🎉</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                שלחנו אישור הזמנה, פירוט קבלה ופרטי גישה למייל שלך (<strong>{receiptEmail}</strong>). אנו מתחילים לעבוד על סרטוני הפודקאסט שלך מיד!
              </p>
            </div>

            {/* Quick Summary list in modal */}
            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 border border-slate-100 text-right">
              <div className="flex justify-between">
                <span className="text-slate-400">מספר הזמנה:</span>
                <span className="font-bold text-slate-800">{generatedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">חבילה שהוזמנה:</span>
                <span className="font-bold text-slate-800">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">סכום ששולם כולל מע"מ:</span>
                <span className="font-bold text-emerald-600">₪{totalWithVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">זמן אספקה משוער:</span>
                <span className="font-bold text-slate-800">עד {selectedPackage.deliveryDays} ימי עסקים</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={handleFinalRedirect}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                <span>כניסה לאזור האישי שלך</span>
                <ArrowLeft className="w-4 h-4 text-indigo-100" />
              </button>

              <button 
                onClick={onCancel}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
              >
                חזרה לדף הבית
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
