/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import OrderFlow from './components/OrderFlow';
import PersonalArea from './components/PersonalArea';
import { Package, OrderState } from './types';
import { PACKAGES } from './data';
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  User, 
  ShoppingBag, 
  HelpCircle, 
  FileText,
  Lock,
  Compass,
  Zap
} from 'lucide-react';

export default function App() {
  // Navigation route: 'home' | 'order' | 'dashboard'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'order' | 'dashboard'>('home');
  
  // Active package chosen for order flow (default to the gold 5-video package)
  const [selectedPackage, setSelectedPackage] = useState<Package>(PACKAGES[1]);

  // Current active order state (synced upon successful checkout)
  const [currentOrder, setCurrentOrder] = useState<OrderState | null>(null);

  // Auto-scroll to pricing section
  const handleScrollToSection = (sectionId: string) => {
    setCurrentRoute('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Launch order with selected package
  const handleSelectPackageAndOrder = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentRoute('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete payment and register order
  const handleOrderCompleted = (completedOrder: OrderState) => {
    setCurrentOrder(completedOrder);
    // Redirect instantly to the personal area dashboard
    setCurrentRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout / clear active order
  const handleOrderReset = () => {
    setCurrentOrder(null);
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white" dir="rtl" id="app-root">
      
      {/* Dynamic Top Promo Announcement Banner */}
      <div className="bg-indigo-900 text-white text-xs font-bold py-2.5 px-4 text-center border-b border-indigo-950 flex items-center justify-center gap-2 select-none animate-pulse">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
        <span>מבצע השקה מיוחד: קבלו 25% הנחה על כל החבילות עם קוד הקופון: <strong className="bg-white/15 px-2 py-0.5 rounded text-amber-300 tracking-wider font-mono">SPECIAL25</strong></span>
        <span className="hidden md:inline">• הזמן היום וקבל סרטונים תוך 3 ימי עסקים!</span>
      </div>

      {/* Global Navigation Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-40" id="global-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <div 
            onClick={() => setCurrentRoute('home')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold font-display shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
              🎙️
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 font-display tracking-tight flex items-center gap-1">
                Pod<span className="text-indigo-600">AI</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">בטא</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">סרטוני פודקאסט AI מקצועיים ברשת</p>
            </div>
          </div>

          {/* Nav Links for Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
            <button 
              onClick={() => {
                setCurrentRoute('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-indigo-600 transition-colors ${currentRoute === 'home' ? 'text-indigo-600 font-bold' : ''}`}
            >
              דף הבית
            </button>
            <button 
              onClick={() => handleScrollToSection('how-it-works')}
              className="hover:text-indigo-600 transition-colors"
            >
              איך זה עובד?
            </button>
            <button 
              onClick={() => handleScrollToSection('pricing-section')}
              className="hover:text-indigo-600 transition-colors"
            >
              חבילות ומחירים
            </button>
            <button 
              onClick={() => handleScrollToSection('faq-section')}
              className="hover:text-indigo-600 transition-colors"
            >
              שאלות נפוצות
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            
            {/* Direct Personal Area Button */}
            <button 
              onClick={() => {
                setCurrentRoute('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRoute === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>אזור אישי ללקוח</span>
              {currentOrder && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              )}
            </button>

            {/* Premium CTA Button */}
            <button 
              onClick={() => handleSelectPackageAndOrder(PACKAGES[1])}
              className="hidden sm:flex px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>הזמן סרטונים עכשיו</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main Switch Router */}
      <main id="main-content">
        {currentRoute === 'home' && (
          <LandingPage 
            onSelectPackage={handleSelectPackageAndOrder}
            onNavigateToOrder={() => {
              setCurrentRoute('order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToPersonalArea={() => {
              setCurrentRoute('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentRoute === 'order' && (
          <OrderFlow 
            selectedPackage={selectedPackage}
            onOrderCompleted={handleOrderCompleted}
            onCancel={() => {
              setCurrentRoute('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToPackages={() => handleScrollToSection('pricing-section')}
          />
        )}

        {currentRoute === 'dashboard' && (
          <PersonalArea 
            currentOrder={currentOrder}
            onOrderReset={handleOrderReset}
            onNavigateToOrder={() => {
              setCurrentRoute('order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToHome={() => {
              setCurrentRoute('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Quick Floating Contact Button (WhatsApp) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <a 
          href="https://wa.me/97250000000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105"
          title="ייעוץ בוואטסאפ"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        </a>
      </div>

    </div>
  );
}
