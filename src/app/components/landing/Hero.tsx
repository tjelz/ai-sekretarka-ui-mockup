
import React from 'react';
import { Phone, Globe, LineChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section id="products" className="relative pt-36 pb-32 overflow-hidden bg-white min-h-screen flex flex-col justify-center">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none"></div>
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Hero Header with Staggered Animation */}
        <div className="flex flex-col items-center text-center mb-20">
          
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Yieldo Intelligence</span>
          </div>

          <h1 className="opacity-0 animate-fade-in-up delay-100 text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-6 leading-[1.1] max-w-4xl">
            Yieldo — AI dla Firm, <br />
            <span className="text-blue-600">Które Chcą Więcej.</span>
          </h1>
          
          <p className="opacity-0 animate-fade-in-up delay-200 text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Systemy, które same pracują na Twój zysk.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch perspective-1000">
          
          {/* CARD 1: AI SEKRETARKA (ACTIVE) - Enhanced Smooth Hover */}
          <Link href="/ai-sekretarka">
          <div className="opacity-0 animate-fade-in-up delay-300 group relative bg-gradient-to-b from-white via-white to-blue-50 rounded-2xl border-2 border-blue-600 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.25)] overflow-hidden transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)] cursor-pointer ring-1 ring-blue-100/50">
             <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors z-10"></div>
             {/* Gloss effect on top */}
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50"></div>

             <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 border border-blue-100 shadow-sm">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">Dostępne Teraz</span>
                </div>
             </div>

             <div className="p-8 h-full flex flex-col relative z-20">
                <div className="mb-6">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                        <Phone size={28} strokeWidth={2} />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors duration-300">AI Sekretarka</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium">
                    Wirtualna recepcjonistka odbierająca 100% połączeń. Umawia spotkania, odpowiada na pytania i wysyła SMS-y.
                </p>

                <div className="mt-auto bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 p-4 relative overflow-hidden group-hover:border-blue-200 transition-colors duration-300 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-[10px] font-bold">AI</div>
                             <div className="text-xs font-bold text-slate-700">Połączenie aktywne...</div>
                         </div>
                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                    </div>
                    <div className="flex items-center justify-center gap-1 h-8 mb-2">
                         {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-1 bg-slate-800 rounded-full transition-all duration-300 ease-in-out group-hover:bg-blue-600" style={{ 
                                height: `${20 + Math.random() * 80}%`,
                                animation: `pulse 1s infinite ${i * 0.05}s`
                            }}></div>
                        ))}
                    </div>
                    
                    <div className="mt-3 w-full bg-white border border-blue-100 text-blue-600 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 uppercase tracking-wide relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer group-hover:animate-none"></div>
                        Sprawdź Teraz <ArrowRight size={14} />
                    </div>
                </div>
             </div>
          </div>
          </Link>

          {/* CARD 2: DIGITAL PRESENCE (COMING SOON) - Subtle Interactive Hover */}
          <div className="opacity-0 animate-fade-in-up delay-400 group relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 ease-out opacity-80 hover:opacity-100 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl hover:border-blue-200">
             <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 z-20 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Wkrótce</span>
             </div>

             <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 mb-6 grayscale group-hover:grayscale-0 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-500">
                    <Globe size={24} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">Cyfrowy Wizerunek</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                    Kompleksowa automatyzacja SEO. AI tworzy treści, które pozycjonują Twoją firmę na szczycie.
                </p>

                <div className="mt-auto bg-slate-50 rounded-lg border border-slate-100 p-3 relative overflow-hidden group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all duration-500">
                    <div className="flex gap-1.5 mb-3 opacity-50">
                        <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-400 transition-colors"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-400 transition-colors"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                             <div className="w-1/3 h-12 bg-white border border-slate-200 rounded-md group-hover:border-blue-200 transition-colors"></div>
                             <div className="w-2/3 space-y-2">
                                 <div className="h-2 bg-slate-200 rounded w-full group-hover:bg-blue-200/50 transition-colors"></div>
                                 <div className="h-2 bg-slate-200 rounded w-4/5 group-hover:bg-blue-200/50 transition-colors"></div>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          {/* CARD 3: AI GRANTS (COMING SOON) - Subtle Interactive Hover */}
          <div className="opacity-0 animate-fade-in-up delay-500 group relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 ease-out opacity-80 hover:opacity-100 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl hover:border-blue-200">
             <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 z-20 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Wkrótce</span>
             </div>

             <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 mb-6 grayscale group-hover:grayscale-0 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-500">
                    <LineChart size={24} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">Finansowanie AI</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                    Inteligentny skaner dotacji unijnych i rządowych. Znajduje środki dla Twojej branży.
                </p>

                <div className="mt-auto bg-slate-50 rounded-lg border border-slate-100 p-0 relative overflow-hidden h-[90px] flex items-end group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all duration-500">
                    <div className="w-full px-4 pb-0 pt-4 flex items-end justify-between gap-2 h-full">
                        <div className="w-full bg-slate-200 rounded-t-sm h-[30%] group-hover:bg-blue-200 transition-colors duration-700 delay-75"></div>
                        <div className="w-full bg-slate-200 rounded-t-sm h-[50%] group-hover:bg-blue-300 transition-colors duration-700 delay-100"></div>
                        <div className="w-full bg-blue-600 rounded-t-sm h-[80%] relative opacity-50 group-hover:opacity-100 transition-all duration-700">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">ROI</div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* Custom Solutions Banner */}
        <div className="mt-16 text-center opacity-0 animate-fade-in-up delay-700">
            <p className="inline-flex items-center gap-2 text-slate-500 font-medium text-sm md:text-base bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-default group">
                <span className="text-blue-600 font-bold text-xl leading-none group-hover:rotate-90 transition-transform duration-300">+</span> 
                <span>Oferujemy również <span className="text-slate-900 font-bold">Customowe Rozwiązania AI</span> dla Twojego biznesu. Nie ograniczamy się.</span>
            </p>
        </div>

      </div>
    </section>
  );
};
