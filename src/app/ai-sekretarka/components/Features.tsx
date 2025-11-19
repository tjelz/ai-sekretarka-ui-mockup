'use client';

import React from 'react';
import { BarChart3, Globe, MessageSquare, TrendingUp, CheckCircle2, Calendar, Mic, Play, RefreshCw } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            Wszystko, czego potrzebujesz
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            Kompletny system do obsługi połączeń. Zaprojektowany, by oszczędzać Twój czas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Feature 1: Advanced Analytics (Row 1, Left - 7 cols) */}
            <div className="md:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 h-full">
                    {/* Left: Stats Text */}
                    <div className="flex-1 flex flex-col justify-between relative z-20">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-blue-600">
                                <BarChart3 size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Analityka 360°</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Wiedz, o co pytają</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 text-[13px]">
                                Yieldo analizuje każdą rozmowę i tworzy raporty. Zobaczysz, ile osób dzwoni o cennik, a ile chce umówić wizytę.
                            </p>
                        </div>
                        
                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                             <div className="bg-white rounded-lg p-2.5 border border-slate-100 shadow-sm">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Odebrane</div>
                                <div className="text-lg font-bold text-slate-900">128</div>
                            </div>
                             <div className="bg-white rounded-lg p-2.5 border border-slate-100 shadow-sm">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Uratowane</div>
                                <div className="text-lg font-bold text-slate-900 text-green-600">19.2k zł</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Chart & Topics */}
                    <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative group-hover:translate-x-1 transition-transform flex flex-col justify-between">
                        
                        {/* Top: Call Topics stats */}
                        <div className="mb-4">
                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-2">Powody dzwonienia</div>
                            <div className="space-y-2.5">
                                <div>
                                    <div className="flex justify-between text-[10px] font-medium text-slate-700 mb-1">
                                        <span>Umówienie wizyty</span>
                                        <span>62%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[62%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-medium text-slate-700 mb-1">
                                        <span>Pytanie o cennik</span>
                                        <span>24%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-300 w-[24%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Activity Chart */}
                        <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase mb-1.5 flex justify-between items-center">
                                <span>Aktywność (7 dni)</span>
                                <span className="text-green-600 flex items-center gap-0.5"><TrendingUp size={8} /> +12%</span>
                            </div>
                            <div className="flex items-end justify-between h-12 gap-1.5">
                                {[35, 55, 40, 85, 60, 75, 45].map((h, i) => (
                                    <div key={i} className="flex-1 h-full bg-slate-50 rounded-t-sm relative overflow-hidden">
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-blue-600 rounded-t-sm transition-all duration-1000 ease-out group-hover:bg-blue-500" 
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 2: Web Scraping / Booksy (Row 1, Right - 5 cols) */}
            <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative flex flex-col">
                <div className="relative z-20 mb-4">
                    <div className="flex items-center gap-2 mb-2 text-blue-600">
                        <Globe size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Szybka Konfiguracja</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Masz Booksy lub stronę?</h3>
                    <p className="text-slate-500 text-sm mt-2 text-[13px]">
                        Wklej link do swojej strony. AI automatycznie nauczy się Twojej oferty i cennika w kilka sekund.
                    </p>
                </div>

                {/* Compact Browser UI */}
                <div className="mt-auto relative bg-slate-50 rounded-xl border border-slate-100 p-3 overflow-hidden group-hover:border-blue-100 transition-colors">
                    <div className="bg-white border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-2 mb-3 shadow-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-[10px] text-slate-400 truncate font-mono flex-1">booksy.com/twoja-firma</span>
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 opacity-60">
                            <div className="h-1.5 w-20 bg-slate-200 rounded"></div>
                            <div className="h-1.5 w-6 bg-slate-200 rounded"></div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 opacity-40">
                            <div className="h-1.5 w-24 bg-slate-200 rounded"></div>
                            <div className="h-1.5 w-8 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                     {/* Success Overlay */}
                     <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold border border-green-100 flex items-center gap-1 shadow-sm scale-90 group-hover:scale-100 transition-transform">
                            <CheckCircle2 size={10} /> Pobrano usługi
                         </div>
                    </div>
                </div>
            </div>

            {/* Feature 3: Calendar Sync (Row 2, Left - 5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-white to-blue-50 rounded-3xl p-5 border border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col ring-1 ring-blue-100/50">
                 <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-20">KLUCZOWA FUNKCJA</div>
                 
                 {/* Text Content */}
                 <div className="relative z-20 mb-2">
                    <div className="flex items-center gap-2 mb-1 text-blue-600 drop-shadow-sm">
                        <Calendar size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Synchronizacja</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">Widzi Twój kalendarz</h3>
                    <p className="text-slate-600 text-sm text-[13px] leading-snug">
                        Yieldo sprawdza dostępność w Twoim kalendarzu w czasie rzeczywistym.
                    </p>
                </div>

                {/* Center Filler - Status & Background */}
                <div className="flex-1 flex flex-col justify-center relative min-h-[120px]">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
                    
                    {/* Live Status Indicator */}
                     <div className="flex items-center justify-center gap-1.5 mb-6 opacity-70">
                        <RefreshCw size={10} className="text-blue-500 animate-spin" />
                        <span className="text-[9px] font-medium text-blue-600/80 uppercase tracking-wide">Połączono</span>
                    </div>

                    {/* Logos - HUGE SIZE */}
                    <div className="relative flex items-center justify-center gap-8 z-10">
                        {/* Booksy Logo Container */}
                        <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 group-hover:scale-110 transition-transform duration-300 hover:shadow-md hover:border-blue-200">
                            <div className="w-4 h-4 bg-black rounded-full"></div>
                            <span className="font-sans font-extrabold text-2xl text-black tracking-tighter">booksy</span>
                        </div>

                        {/* Google Calendar Logo Container */}
                        <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 group-hover:scale-110 transition-transform duration-300 delay-75 hover:shadow-md hover:border-blue-200">
                            <div className="w-8 h-8 bg-white border-[2px] border-blue-500 rounded-lg text-xs font-bold text-blue-500 flex items-center justify-center pt-[2px] shadow-sm">31</div>
                            <span className="font-sans font-extrabold text-2xl text-slate-700 tracking-tight">Google</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 4: Human-Like AI / Voice (Row 2, Right - 7 cols) */}
            <div className="md:col-span-7 bg-slate-50 rounded-3xl p-5 border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 h-full items-center">
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 text-purple-600">
                            <Mic size={18} />
                            <span className="text-xs font-bold uppercase tracking-wider">Technologia Premium</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">Ludzki głos AI</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-3 text-[13px]">
                            Korzystamy z najlepszych modeli głosowych na świecie. Setki głosów do wyboru - męskie, żeńskie, młode, energiczne.
                        </p>

                        {/* Voice Selector UI */}
                        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm max-w-xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Aktywny Lektor</span>
                                <div className="flex gap-1">
                                     <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                                     <span className="text-[9px] font-medium text-purple-600">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:border-purple-200 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                    <Play size={12} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Kasia (Profesjonalna)</div>
                                    <div className="text-[10px] text-slate-500">Polski, Naturalny</div>
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* Waveform Visual */}
                     <div className="flex-1 flex items-center justify-center">
                         <div className="flex items-center gap-1 h-10">
                             {[45, 72, 35, 84, 55, 92, 30, 68, 42, 78, 50, 62].map((height, i) => (
                                 <div 
                                    key={i} 
                                    className="w-1.5 bg-purple-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"
                                    style={{ 
                                        height: `${height}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                 ></div>
                             ))}
                         </div>
                     </div>
                </div>
            </div>

            {/* Feature 5: Transcripts (Row 3, Full Width - 12 cols) */}
            <div className="md:col-span-12 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden group hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 relative z-20">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                            <MessageSquare size={18} />
                            <span className="text-xs font-bold uppercase tracking-wider">Transparentność</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pełna historia rozmów</h3>
                        <p className="text-slate-400 text-sm max-w-lg text-[13px]">
                            Masz dostęp do nagrania i transkrypcji każdej rozmowy w panelu klienta. Nic Ci nie umknie. Możesz odsłuchać rozmowę lub szybko przeczytać podsumowanie.
                        </p>
                    </div>
                    
                    {/* Chat Bubbles Visual */}
                    <div className="flex-1 w-full space-y-3 relative z-10 opacity-90">
                         <div className="flex gap-3 items-end group-hover:translate-x-1 transition-transform duration-500">
                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">K</div>
                            <div className="bg-white/10 backdrop-blur-sm text-white/90 text-xs p-3 rounded-2xl rounded-bl-none max-w-[80%]">
                                 Dzień dobry, czy macie wolne terminy na jutro po południu?
                             </div>
                         </div>
                         <div className="flex gap-3 items-end justify-end group-hover:translate-x-[-4px] transition-transform duration-500 delay-100">
                             <div className="bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-br-none max-w-[80%] shadow-lg">
                                 Tak, mamy wolne miejsce o 14:30 oraz 16:00. Która godzina Pani odpowiada?
                             </div>
                             <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">AI</div>
                         </div>
                    </div>
                </div>

                {/* Background Gradient */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
            </div>
            
        </div>
      </div>
    </section>
  );
};

export default Features;
