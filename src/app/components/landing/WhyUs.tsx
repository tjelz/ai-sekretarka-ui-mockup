
import React from 'react';
import { TrendingUp, BarChart3, ShieldCheck, Zap, ArrowRight, MessageSquare, BrainCircuit } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="tech" className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* High Contrast CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-10 md:px-12 md:py-12 shadow-2xl shadow-blue-600/30 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 group transition-transform hover:scale-[1.01] duration-500">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    Nie wiesz, od czego zacząć?
                </h3>
                <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed">
                    Każdy biznes jest inny. Porozmawiajmy o Twoich wyzwaniach i dobierzmy narzędzia, które realnie zwiększą Twój zysk.
                </p>
            </div>
            
            <a 
                href="#contact" 
                className="relative z-10 shrink-0 bg-white text-blue-700 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 group-hover:gap-4"
            >
                <MessageSquare size={20} className="fill-blue-700/20" />
                Skontaktuj się z nami
                <ArrowRight size={20} className="text-blue-400" />
            </a>
        </div>

        {/* Dense Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            
            {/* Tile 1 - Scalability (Large) */}
            <div className="md:col-span-2 md:row-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 group flex flex-col">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <TrendingUp size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Nieskończona Skalowalność</h3>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                    Nasz system eliminuje problem "wąskiego gardła". Niezależnie czy masz 10 czy 1000 zapytań dziennie, AI obsługuje je z tą samą precyzją, bez zmęczenia i opóźnień.
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100">
                     <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        <span>Wydajność Systemu</span>
                        <span className="text-blue-600">100%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-full origin-left animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]"></div>
                     </div>
                </div>
            </div>

            {/* Tile 2 - CUSTOM SOLUTIONS (Premium Glow) */}
            <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg shadow-blue-900/20 hover:shadow-blue-600/20 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse"></div>
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                     <div className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300">
                        <BrainCircuit size={22} />
                    </div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                        Custom AI Solutions
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold tracking-wide shadow-[0_0_10px_rgba(37,99,235,0.5)]">PREMIUM</span>
                    </h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed relative z-10 group-hover:text-slate-300 transition-colors">
                    Masz unikalny proces? Nie ograniczamy się do gotowych produktów. Projektujemy i wdrażamy dedykowane systemy AI skrojone pod specyfikę Twojej firmy.
                </p>
            </div>

            {/* Tile 3 - Analytics */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                     <div className="bg-slate-50 p-2.5 rounded-lg text-blue-600 group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 size={22} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Twarda Analityka</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                     Pełny wgląd w dane w czasie rzeczywistym. Wiesz, dlaczego klienci dzwonią, kiedy rezygnują i co ich przekonuje.
                </p>
            </div>

            {/* Bottom Row Small Tiles */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all duration-300 justify-center group">
                <ShieldCheck size={32} className="text-green-600 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                <h4 className="font-bold text-slate-900 text-sm">RODO Compliant</h4>
            </div>

             <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-8 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
                <div className="text-right group-hover:-translate-x-1 transition-transform">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">24/7</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Dostępność</div>
                </div>
                <div className="h-10 w-px bg-slate-100 group-hover:bg-blue-200 transition-colors"></div>
                <div className="text-left group-hover:translate-x-1 transition-transform">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">100%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Automatyzacji</div>
                </div>
            </div>

            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all duration-300 justify-center group">
                <Zap size={32} className="text-amber-500 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                <h4 className="font-bold text-slate-900 text-sm">Wdrożenie 48h</h4>
            </div>

        </div>

      </div>
    </section>
  );
};