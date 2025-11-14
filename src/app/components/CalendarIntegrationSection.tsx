'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Star,
  TrendingUp,
  Lock,
  RefreshCw
} from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  logo: string;
  description: string;
  features: string[];
  badge?: string;
  isPremium?: boolean;
  delay?: number;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  logo,
  description,
  features,
  badge,
  isPremium = false,
  delay = 0
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden ${
        isPremium ? 'ring-2 ring-[#007BFF] border-2 border-[#007BFF]' : 'border border-gray-200'
      }`}
    >
      {/* Premium Gradient Overlay */}
      {isPremium && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 via-transparent to-blue-500/5 pointer-events-none" />
      )}

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
            isPremium
              ? 'bg-gradient-to-r from-[#007BFF] to-blue-600 text-white shadow-lg'
              : 'bg-green-100 text-green-700'
          }`}
        >
          <span className="flex items-center gap-1">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Logo Container */}
      <div className="relative mb-4">
        <motion.div
          className={`w-20 h-20 rounded-xl flex items-center justify-center mb-4 ${
            isPremium ? 'bg-gradient-to-br from-[#007BFF]/10 to-blue-500/10' : 'bg-gray-100'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl">{logo}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#007BFF] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.3 + (index * 0.1) }}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                isPremium ? 'text-[#007BFF]' : 'text-green-500'
              }`} />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isPremium ? 'bg-gradient-to-t from-[#007BFF]/5 to-transparent' : 'bg-gradient-to-t from-gray-100/50 to-transparent'
      } pointer-events-none`} />
    </motion.div>
  );
};

const CalendarIntegrationSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const integrations: IntegrationCardProps[] = [
    {
      name: 'Booksy',
      logo: '📅',
      description: 'Pełna, dwukierunkowa integracja z najpopularniejszym systemem rezerwacji dla salonów i gabinetów w Polsce. Jesteśmy jedną z nielicznych, jeśli nie jedyną AI sekretarką z taką integracją.',
      features: [
        'Automatyczna synchronizacja wizyt w czasie rzeczywistym',
        'Dwukierunkowa wymiana danych (kalendarz ↔ Booksy)',
        'Inteligentne zarządzanie dostępnością terminów',
        'Automatyczne przypomnienia dla klientów',
        'Pełna obsługa rezerwacji, przesunięć i anulacji',
        'Ekskluzywna integracja - jedyna taka na rynku'
      ],
      badge: 'EKSKLUZYWNA INTEGRACJA',
      isPremium: true,
      delay: 0
    },
    {
      name: 'Google Calendar',
      logo: '📆',
      description: 'Bezproblemowa integracja z najpopularniejszym kalendarzem na świecie.',
      features: [
        'Synchronizacja zdarzeń w czasie rzeczywistym',
        'Wsparcie dla wielu kalendarzy',
        'Automatyczne blokowanie terminów',
        'Integracja z Gmail i Google Workspace'
      ],
      badge: 'Popularne',
      delay: 0.1
    },
    {
      name: 'Microsoft Outlook',
      logo: '📧',
      description: 'Profesjonalna integracja dla firm korzystających z ekosystemu Microsoft.',
      features: [
        'Synchronizacja z Office 365',
        'Zarządzanie spotkaniami Teams',
        'Integracja z Exchange Server',
        'Wsparcie dla kalendarzy korporacyjnych'
      ],
      badge: 'Profesjonalne',
      delay: 0.2
    },
    {
      name: 'Calendly',
      logo: '🗓️',
      description: 'Zaawansowana integracja z popularnym systemem planowania spotkań.',
      features: [
        'Automatyczne umawianie spotkań',
        'Synchronizacja dostępności',
        'Integracja z wieloma kalendarzami',
        'Personalizowane linki rezerwacyjne'
      ],
      badge: 'Biznesowe',
      delay: 0.3
    }
  ];

  const trustSignals = [
    { icon: RefreshCw, text: 'Synchronizacja w czasie rzeczywistym', color: 'text-[#007BFF]' },
    { icon: Lock, text: '100% bezpieczne połączenie SSL', color: 'text-green-600' },
    { icon: Zap, text: 'Natychmiastowa aktualizacja', color: 'text-orange-600' },
    { icon: Shield, text: 'Zgodność z RODO i ISO 27001', color: 'text-purple-600' }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#007BFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#007BFF] to-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg mb-6"
          >
            <Star className="w-5 h-5 fill-current animate-pulse" />
            Jedyna AI Sekretarka z Pełną Integracją Booksy
            <TrendingUp className="w-5 h-5" />
          </motion.div>

          {/* Main Heading - SEO Optimized */}
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Integracja z Booksy i Innymi <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-blue-600">
              Kalendarzami
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Jesteśmy <strong>jedną z nielicznych, jeśli nie jedyną</strong> AI sekretarką na rynku, która oferuje pełną, 
            dwukierunkową integrację z <strong>systemem Booksy</strong> – najważniejszym narzędziem dla salonów i gabinetów w Polsce.
            Dodatkowo wspieramy wszystkie popularne kalendarze.
          </p>
          
          {/* Exclusive Booksy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full font-semibold text-xs shadow-md mb-6"
          >
            <Sparkles className="w-4 h-4" />
            EKSKLUZYWNA INTEGRACJA BOOKSY - JEDYNA TAKA NA RYNKU
          </motion.div>
        </motion.div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className={`${signal.color} group-hover:scale-110 transition-transform`}>
                  <signal.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {signal.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,123,255,0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#007BFF] to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Calendar className="w-6 h-6" />
            Zobacz Jak Działa Integracja
            <Zap className="w-5 h-5 animate-pulse" />
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4 inline mr-1" />
            Konfiguracja w mniej niż 5 minut • Wsparcie techniczne 24/7
          </p>
        </motion.div>

        {/* SEO Additional Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="prose prose-lg mx-auto text-gray-600"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dlaczego Integracja z Booksy Jest Tak Ważna?
            </h3>
            <p className="leading-relaxed">
              System <strong>Booksy</strong> jest używany przez tysiące salonów fryzjerskich, kosmetycznych,
              gabinetów masażu i innych usługodawców w całej Polsce. Nasza <strong>ekskluzywna integracja</strong>
              pozwala na pełną automatyzację procesu rezerwacji – od przyjęcia telefonu, przez sprawdzenie
              dostępności, aż po zarezerwowanie terminu w systemie Booksy i wysłanie potwierdzenia do klienta.
            </p>
            <p className="leading-relaxed mt-4">
              Jesteśmy <strong>jedną z nielicznych, jeśli nie jedyną AI sekretarką</strong> na rynku, która oferuje 
              pełną integrację z systemem Booksy. Ta unikalna funkcjonalność wyróżnia nas spośród konkurencji i 
              pozwala na kompleksowe podejście do zarządzania kalendarzem i rezerwacjami. Nie musisz już ręcznie przenosić
              rezerwacji z telefonu do systemu – wszystko dzieje się automatycznie, w czasie rzeczywistym.
            </p>
            <p className="leading-relaxed mt-4 font-semibold text-[#007BFF]">
              ⭐ <strong>Dlaczego to ważne?</strong> Integracja z Booksy jest kluczowa dla salonów i gabinetów, które 
              chcą zautomatyzować proces rezerwacji. Dzięki naszej ekskluzywnej integracji, możesz być pewien, że każda 
              rozmowa telefoniczna zostanie automatycznie przekonwertowana na rezerwację w Twoim systemie Booksy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalendarIntegrationSection;
