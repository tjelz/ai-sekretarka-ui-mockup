'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, UserCheck, Zap, Puzzle } from 'lucide-react';

export const CTASection: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

  return (
    <section id="contact" className="bg-white py-24 border-t border-slate-100 relative scroll-mt-16 overflow-hidden">
      {/* Right Side Noise Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none mix-blend-multiply bg-slate-100" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            
            {/* Left Side: Value Prop */}
            <div className="lg:col-span-2 pt-4 lg:pt-8">
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                    Wdrożenie AI <br/>
                    <span className="text-blue-600">szyte na miarę.</span>
                </h2>
                <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                    Nie sprzedajemy pudełkowych rozwiązań. Jesteśmy Twoim partnerem technologicznym. Wypełnij formularz, a przygotujemy dedykowaną strategię.
                </p>

                <div className="space-y-8">
                    <div className="flex gap-4 group">
                        <div className="mt-1">
                            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors duration-300 shadow-lg shadow-slate-200 group-hover:shadow-blue-200 group-hover:scale-110 transform">
                                <Puzzle size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">Custom AI Solutions</h4>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                Twój biznes jest unikalny? Budujemy dedykowane automatyzacje i modele AI od zera, idealnie dopasowane do Twoich potrzeb.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 group">
                        <div className="mt-1">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                                <Zap size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">Analiza Potencjału</h4>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">Wskazujemy procesy, gdzie AI da największy i najszybszy zwrot z inwestycji (ROI).</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 group">
                         <div className="mt-1">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                                <UserCheck size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">Dedykowany Opiekun</h4>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">Pełne wsparcie we wdrożeniu, konfiguracji i szkoleniu Twojego zespołu.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-100">
                     <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Kontakt bezpośredni</p>
                     <a href="mailto:info@yieldo.pl" className="text-slate-900 font-bold text-xl hover:text-blue-600 transition-colors decoration-blue-200 underline decoration-2 underline-offset-4 hover:decoration-blue-600">info@yieldo.pl</a>
                </div>
            </div>

            {/* Right Side: Application Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 transition-shadow duration-500 ring-1 ring-slate-100">
                {isSubmitted ? (
                     <div className="text-center py-20 flex flex-col items-center justify-center h-full animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 border border-green-100 shadow-md animate-in zoom-in duration-300">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Zgłoszenie przyjęte!</h3>
                        <p className="text-slate-500 max-w-xs mx-auto text-lg">Nasz konsultant przeanalizuje Twoje potrzeby i skontaktuje się w ciągu 24h.</p>
                     </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 group/form">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-slate-900">Formularz Zgłoszeniowy</h3>
                            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full tracking-wide uppercase border border-blue-200">Bezpłatnie</span>
                        </div>
                        <p className="text-slate-500 text-sm mb-6">Wypełnij poniższe dane, abyśmy mogli przygotować się do rozmowy.</p>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Imię</label>
                                <input required type="text" className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 text-sm font-medium placeholder:text-slate-300" placeholder="Jan" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Nazwisko</label>
                                <input required type="text" className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 text-sm font-medium placeholder:text-slate-300" placeholder="Kowalski" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">E-mail Firmowy</label>
                            <input required type="email" className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 text-sm font-medium placeholder:text-slate-300" placeholder="jan@twojafirma.pl" />
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Wielkość Firmy</label>
                            <div className="relative">
                                <select className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 text-sm font-medium appearance-none cursor-pointer">
                                    <option>Mikro (1-10 osób)</option>
                                    <option>Mała (11-50 osób)</option>
                                    <option>Średnia (51-200 osób)</option>
                                    <option>Duża (200+ osób)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                             <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Opis potrzeb (Opcjonalne)</label>
                            <textarea className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 resize-none h-32 text-sm font-medium placeholder:text-slate-300" placeholder="Opisz krótko problem lub proces, który chcesz zautomatyzować (np. obsługa klienta, generowanie leadów)..."></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-slate-200 hover:shadow-blue-600/20 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={22} className="animate-spin" /> : <>Wyślij Zgłoszenie <ArrowRight size={20} /></>}
                        </button>
                        
                        <p className="text-center text-[10px] text-slate-400">
                            Klikając przycisk, akceptujesz naszą Politykę Prywatności.
                        </p>
                    </form>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};
