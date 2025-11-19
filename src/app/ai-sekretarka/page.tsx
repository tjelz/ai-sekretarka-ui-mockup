import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Process from './components/Process';

export default function AISekretarkaPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <Process />
        <Calculator />
        <Pricing />
        
        {/* CTA Final Section */}
        <section className="py-20 relative overflow-hidden bg-slate-50">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[80px]"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
                  Skaluj biznes, nie personel.
                </h2>
                <p className="text-slate-600 mb-10 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                  Dołącz do firm, które zautomatyzowały obsługę telefoniczną i przestały tracić klientów.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-1">
                    Rozpocznij darmowy okres próbny
                </button>
                <p className="mt-6 text-sm text-slate-500">Brak opłat wstępnych. 14 dni testów bez zobowiązań.</p>
            </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

