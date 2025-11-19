'use client';

import React from 'react';
import { Check, HelpCircle, Phone, Users, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'Solo',
      price: '299',
      desc: '1 osoba / działalność jednoosobowa',
      isPopular: false,
      features: [
          { name: '100 rozmów w cenie', sub: '(ok. 200 minut)', bold: true },
          { name: '1,50 zł dodatkowa rozmowa', bold: false },
          { name: 'Odbiera 1 klienta na raz', bold: false, icon: <Phone size={14} className="text-slate-400" /> },
          { name: 'Obsługa połączeń 24/7', bold: false },
          { name: 'Integracja z Kalendarzem', bold: false },
          { name: 'Zaawansowane raporty', bold: false },
          { name: 'SMS z podsumowaniem', bold: false },
      ]
    },
    {
      name: 'Ekipa',
      price: '599',
      isPopular: true,
      desc: '2–4 osoby w terenie',
      features: [
          { name: '225 rozmów w cenie', sub: '(ok. 450 minut)', bold: true },
          { name: '1,50 zł dodatkowa rozmowa', bold: false },
          { name: 'Odbiera 3 klientów na raz', bold: true, icon: <Users size={14} className="text-blue-600" /> },
          { name: 'Obsługa połączeń 24/7', bold: false },
          { name: 'Integracja z Kalendarzem', bold: false },
          { name: 'Zaawansowane raporty', bold: false },
          { name: 'SMS z podsumowaniem', bold: false },
          { name: 'Wsparcie priorytetowe', bold: false },
      ]
    },
    {
      name: 'Firma',
      price: '999',
      desc: 'Większa firma / stały ruch',
      isPopular: false,
      features: [
          { name: '500 rozmów w cenie', sub: '(ok. 1000 minut)', bold: true },
          { name: '1,50 zł dodatkowa rozmowa', bold: false },
          { name: 'Nielimitowane rozmowy na raz', bold: true, icon: <Zap size={14} className="text-amber-500" /> },
          { name: 'Obsługa połączeń 24/7', bold: false },
          { name: 'Integracja z Kalendarzem', bold: false },
          { name: 'Zaawansowane raporty', bold: false },
          { name: 'SMS z podsumowaniem', bold: false },
          { name: 'Dedykowany opiekun', bold: false },
      ]
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-slate-50 rounded-full blur-3xl -z-10"></div>
      
      {/* Subtle moving blob behind pricing */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Prosty cennik</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Żadnych ukrytych opłat instalacyjnych. Umowa na czas nieokreślony z 1-miesięcznym okresem wypowiedzenia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-[2rem] flex flex-col transition-all duration-500 group ${
                tier.isPopular 
                  ? 'bg-white z-10 transform hover:-translate-y-2 border-2 border-blue-600' 
                  : 'bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-xl shadow-sm hover:-translate-y-1'
              }`}
            >
              {/* Animated Gradient Border for Popular Plan */}
              {tier.isPopular && (
                  <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-border-rotate -z-10 opacity-30">
                       <div className="absolute inset-0 bg-white rounded-[2rem]"></div>
                  </div>
              )}
              
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-md flex items-center gap-1.5">
                  Najczęściej wybierany
                </div>
              )}
              
              <div className="mb-8 text-center relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-6">{tier.desc}</p>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">{tier.price} zł</span>
                  <span className="font-medium text-slate-500">/mc</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-8 bg-slate-200/60 relative z-10"></div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm group-hover:pl-1 transition-all duration-300">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tier.isPopular ? 'bg-blue-100 text-blue-600' : 'bg-white border border-slate-200 text-slate-400'
                    }`}>
                         <Check size={12} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-slate-900 ${f.bold ? 'font-bold' : ''}`}>
                            {f.name}
                        </span>
                        {/* Subtext for estimate */}
                        {f.sub && (
                           <span className="text-[10px] text-slate-400">
                               {f.sub}
                           </span>
                        )}
                        {/* Optional sub-text or highlighting icon for concurrency */}
                        {f.icon && (
                            <span className="flex items-center gap-1 text-[10px] mt-0.5 opacity-70 font-medium">
                                {f.icon}
                                {tier.name === 'Solo' ? 'Brak kolejkowania' : 'Brak sygnału zajętości'}
                            </span>
                        )}
                    </div>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110 relative z-10 overflow-hidden group/btn ${
                  tier.isPopular 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-600/20' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-600/20'
              }`}>
                {/* Shine effect on button hover */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-full transition-all duration-500 ease-in-out"></div>
                Wybierz {tier.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 transition-transform hover:scale-105">
                <HelpCircle size={16} className="text-blue-600" />
                <p className="text-slate-600 text-sm">
                    Potrzebujesz więcej minut lub wdrożenia Enterprise? <a href="#contact" className="text-blue-700 font-bold hover:underline">Napisz do nas.</a>
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
