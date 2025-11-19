'use client';

import React from 'react';
import { Phone, ArrowRight, Check } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-16 bg-slate-50/50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Uruchomienie zajmuje <span className="text-blue-600">5 minut</span>
          </h2>
          <p className="text-slate-600 text-lg">Bez skomplikowanych wdrożeń IT. Poradzisz sobie sam.</p>
        </div>

        <div className="relative">
          {/* Connecting Pipeline (Desktop Only) */}
          <div className="hidden md:block absolute top-[5.5rem] left-0 w-full h-16 -z-10">
             <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
               <path d="M100,50 C300,50 400,50 600,50 C800,50 900,50 1100,50" stroke="#e2e8f0" strokeWidth="3" fill="none" />
               <path d="M100,50 C300,50 400,50 600,50 C800,50 900,50 1100,50" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
               <defs>
                 <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.2" />
                   <stop offset="50%" stopColor="#3b82f6" />
                   <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            
            {/* Step 1: Register & Link */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-44 h-44 relative mb-8 flex items-center justify-center">
                 {/* Glow Background */}
                 <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 {/* Illustration */}
                 <div className="relative z-10 w-32 h-32 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Header bar */}
                    <div className="absolute top-0 w-full h-3 bg-slate-100 border-b border-slate-200"></div>
                    
                    {/* Form Lines */}
                    <div className="space-y-2 w-16 flex flex-col items-center">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                        <div className="h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
                    </div>
                    
                    {/* Floating User Badge */}
                    <div className="absolute bottom-5 right-5 w-10 h-10 bg-blue-600 rounded-xl shadow-md flex items-center justify-center transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                 </div>
                 
                 {/* Number Badge */}
                 <div className="absolute -top-2 -right-2 md:right-4 w-12 h-12 bg-white border-[3px] border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-md z-20">1</div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Załóż konto</h3>
              <p className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
                Wklej link do swojej strony www lub Booksy, aby AI automatycznie nauczyła się Twojej oferty i cennika.
              </p>
            </div>

            {/* Step 2: Configure */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-44 h-44 relative mb-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10 w-32 h-32 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                    
                    {/* Gear Ring */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <svg className="w-20 h-20 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                             <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                             <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                        </svg>
                    </div>

                    {/* Central Brain/Sliders */}
                    <div className="flex gap-1.5 items-end h-10">
                        <div className="w-2 bg-blue-500 rounded-full h-4 group-hover:h-8 transition-all duration-300 ease-out"></div>
                        <div className="w-2 bg-purple-500 rounded-full h-7 group-hover:h-4 transition-all duration-300 ease-out delay-75"></div>
                        <div className="w-2 bg-pink-500 rounded-full h-3 group-hover:h-6 transition-all duration-300 ease-out delay-150"></div>
                    </div>
                 </div>

                 {/* Number Badge */}
                 <div className="absolute -top-2 -right-2 md:right-4 w-12 h-12 bg-white border-[3px] border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-md z-20">2</div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Dostosuj AI</h3>
              <p className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
                Skonfiguruj resztę danych w panelu. Wybierz lektora, ustal godziny pracy i połącz swój kalendarz.
              </p>
            </div>

            {/* Step 3: Forward */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-44 h-44 relative mb-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10 w-32 h-32 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                    
                    {/* Phone */}
                    <div className="w-10 h-16 border-[2.5px] border-slate-800 rounded-lg flex flex-col items-center pt-1.5 relative bg-slate-900 z-10">
                        <div className="w-3 h-0.5 bg-slate-600 rounded-full mb-0.5"></div>
                        <div className="w-full h-full bg-white rounded-b-[6px] opacity-10"></div>
                        
                        {/* Call Active Indicator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <Phone size={10} className="text-white fill-white" />
                        </div>
                    </div>

                    {/* Forwarding Animation */}
                    <div className="absolute -right-5 top-2">
                         <div className="w-12 h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center justify-center relative z-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                             <div className="relative">
                                <Phone size={16} className="text-blue-600" />
                                <ArrowRight size={12} className="absolute -right-2 -top-1 text-blue-600 bg-white rounded-full" strokeWidth={3} />
                             </div>
                             <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Check size={10} className="text-white" strokeWidth={4} />
                             </div>
                         </div>
                         <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 animate-ping z-10"></div>
                    </div>

                 </div>

                 {/* Number Badge */}
                 <div className="absolute -top-2 -right-2 md:right-4 w-12 h-12 bg-white border-[3px] border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-md z-20">3</div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Przekieruj numer</h3>
              <p className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
                Włącz przekierowanie połączeń na numer Yieldo, gdy jesteś zajęty. Twój obecny numer pozostaje bez zmian!
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
