'use client';

import { useState } from 'react';
import { Star, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface PortfolioItem {
  id: number;
  name: string;
  industry: string;
  description: string;
  results: string[];
  image: string;
  rating: number;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    name: "Salon Kosmetyczny Beauty Pro",
    industry: "Kosmetyka",
    description: "Nowoczesna strona z systemem rezerwacji online",
    results: ["+150% więcej rezerwacji", "+85% ruch organiczny", "4.9/5 ocena klientów"],
    image: "/portfolio/beauty.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Warsztat Samochodowy AutoFix",
    industry: "Motoryzacja",
    description: "Responsywna strona z kalkulatorem kosztów naprawy",
    results: ["+200% zapytań", "+120% konwersja", "Top 3 w Google"],
    image: "/portfolio/autofix.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Kancelaria Prawna LexPro",
    industry: "Prawo",
    description: "Profesjonalna strona kancelarii z blogiem prawnym",
    results: ["+180% leadów", "+90% czas na stronie", "10k odwiedzin/mies."],
    image: "/portfolio/law.jpg",
    rating: 5
  }
];

export default function WebsitePortfolioShowcase() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Projekty, Które Napędzają Wyniki
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Zobacz jak pomogliśmy innym firmom rosnąć dzięki profesjonalnym stronom
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Showcase Display */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 shadow-2xl border-2 border-purple-200">
              {/* Browser Chrome */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-3 h-3 text-green-500">🔒</div>
                    {portfolioItems[activeItem].name.toLowerCase().replace(/\s+/g, '-')}.pl
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>

                {/* Website Preview - Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold mb-2">{portfolioItems[activeItem].name}</h3>
                    <p className="text-purple-200">{portfolioItems[activeItem].industry}</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-4 border-2 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {portfolioItems[activeItem].results[0].split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-600">wzrost wyników</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            {/* Project Selector */}
            <div className="space-y-3">
              {portfolioItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(index)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    activeItem === index
                      ? 'bg-purple-50 border-purple-600 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.industry}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                  {activeItem === index && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {item.results.map((result, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900">{result}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Chcesz takie same wyniki?</h3>
              <p className="text-purple-100 mb-6">
                Dołącz do zadowolonych klientów i rozwijaj swój biznes z profesjonalną stroną internetową
              </p>
              <a
                href="https://forms.fillout.com/t/xityvM2L42us"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                  Rozpocznij Swój Projekt
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "20+", label: "Zadowolonych klientów" },
            { number: "100%", label: "Responsywne" },
            { number: "2 tyg", label: "Średni czas realizacji" },
            { number: "4.9/5", label: "Średnia ocena" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
              <div className="text-4xl font-black text-purple-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
