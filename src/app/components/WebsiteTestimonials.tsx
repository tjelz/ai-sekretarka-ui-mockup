'use client';

import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anna Kowalska",
    role: "Właścicielka",
    company: "Salon Kosmetyczny Beauty Pro",
    content: "Strona od Yieldo całkowicie zmieniła mój biznes. Rezerwacje online automatycznie trafiają do kalendarza, a liczba klientów wzrosła o 150%. Profesjonalizm i szybka realizacja!",
    rating: 5,
    avatar: "AK"
  },
  {
    id: 2,
    name: "Marek Nowak",
    role: "Właściciel",
    company: "Warsztat AutoFix",
    content: "Wreszcie mam stronę, która wygląda tak samo dobrze na telefonie jak na komputerze. Klienci łatwo znajdują mnie w Google. Świetny zwrot z inwestycji!",
    rating: 5,
    avatar: "MN"
  },
  {
    id: 3,
    name: "Katarzyna Wiśniewska",
    role: "Radca Prawny",
    company: "Kancelaria LexPro",
    content: "Profesjonalna, elegancka strona która buduje zaufanie klientów. Blog prawny automatycznie przyciąga nowych klientów. Yieldo to najlepsza decyzja dla mojej kancelarii.",
    rating: 5,
    avatar: "KW"
  }
];

export default function WebsiteTestimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4" />
            Opinie Klientów
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Co Mówią Nasi Klienci?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dołącz do zadowolonych przedsiębiorców, którzy rozwinęli swoje biznesy dzięki nam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-purple-100 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-purple-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 justify-end">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-purple-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-black mb-2">4.9/5</div>
              <div className="text-purple-200 text-sm">Średnia ocena</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">20+</div>
              <div className="text-purple-200 text-sm">Zadowolonych klientów</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">100%</div>
              <div className="text-purple-200 text-sm">Ukończonych projektów</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">2 tyg</div>
              <div className="text-purple-200 text-sm">Średni czas realizacji</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
