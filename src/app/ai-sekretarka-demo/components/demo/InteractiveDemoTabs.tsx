'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, DollarSign, Play, Pause } from 'lucide-react';
import PhoneMockupLive from './PhoneMockupLive';
import AudioWaveform from './AudioWaveform';
import BehindScenesPanel from './BehindScenesPanel';
import ConversationTranscript from './ConversationTranscript';

type Scenario = 'booking' | 'pricing' | 'confirmation';

interface ScenarioData {
  id: Scenario;
  title: string;
  icon: React.ElementType;
  description: string;
  audioUrl: string;
  duration: number;
  transcript: Array<{
    time: number;
    speaker: 'customer' | 'ai';
    text: string;
  }>;
  aiThinking: Array<{
    time: number;
    process: string;
    detail: string;
  }>;
}

const scenarios: ScenarioData[] = [
  {
    id: 'booking',
    title: 'Rezerwacja Wizyty',
    icon: Calendar,
    description: 'Klient dzwoni, aby umówić wizytę w salonie',
    audioUrl: '/audio/demo-booking.mp3',
    duration: 25,
    transcript: [
      { time: 0, speaker: 'ai', text: 'Dzień dobry! Beauty Salon, w czym mogę pomóc?' },
      { time: 3, speaker: 'customer', text: 'Dzień dobry, chciałabym umówić się na strzyżenie.' },
      { time: 6, speaker: 'ai', text: 'Oczywiście! Czy ma Pani preferowany dzień i godzinę?' },
      { time: 9, speaker: 'customer', text: 'Jutro popołudniu, około 15:00 jeśli to możliwe.' },
      { time: 13, speaker: 'ai', text: 'Sprawdzam dostępność... Mam wolny termin jutro o 15:00. Czy pasuje?' },
      { time: 17, speaker: 'customer', text: 'Tak, super!' },
      { time: 19, speaker: 'ai', text: 'Świetnie! Proszę podać imię i numer telefonu do kontaktu.' },
      { time: 22, speaker: 'customer', text: 'Anna Kowalska, 555-123-456' },
      { time: 25, speaker: 'ai', text: 'Dziękuję! Potwierdzenie wyślę SMSem. Do zobaczenia jutro!' },
    ],
    aiThinking: [
      { time: 0, process: 'Rozpoznawanie języka', detail: 'Polski wykryty (99.8% pewności)' },
      { time: 3, process: 'Intencja', detail: 'Rezerwacja → przekierowanie do kalendarza' },
      { time: 13, process: 'Sprawdzanie kalendarza', detail: 'Zapytanie do systemu rezerwacji' },
      { time: 15, process: 'Przetwarzanie dostępności', detail: 'Znaleziono 3 terminy, rekomendacja: 15:00' },
      { time: 19, process: 'Zbieranie danych', detail: 'Wymagane: imię, telefon' },
      { time: 25, process: 'Potwierdzenie', detail: 'SMS wysłany, wpis dodany do kalendarza' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pytanie o Cenę',
    icon: DollarSign,
    description: 'Klient pyta o cennik usług',
    audioUrl: '/audio/demo-pricing.mp3',
    duration: 18,
    transcript: [
      { time: 0, speaker: 'ai', text: 'Dzień dobry! Beauty Salon, słucham.' },
      { time: 2, speaker: 'customer', text: 'Dzień dobry, ile kosztuje manicure hybrydowy?' },
      { time: 5, speaker: 'ai', text: 'Manicure hybrydowy to 80 zł. Trwa około 60 minut.' },
      { time: 9, speaker: 'customer', text: 'A pedicure hybrydowy?' },
      { time: 11, speaker: 'ai', text: 'Pedicure hybrydowy to 100 zł. Mamy też pakiet: manicure + pedicure za 160 zł - oszczędzasz 20 zł!' },
      { time: 16, speaker: 'customer', text: 'Super, dziękuję!' },
      { time: 18, speaker: 'ai', text: 'Czy chciałaby Pani od razu umówić wizytę?' },
    ],
    aiThinking: [
      { time: 0, process: 'Rozpoznawanie intencji', detail: 'Pytanie o cenę → baza wiedzy' },
      { time: 2, process: 'Wyszukiwanie w cenniku', detail: 'Znaleziono: manicure hybrydowy' },
      { time: 5, process: 'Prezentacja ceny', detail: 'Cena + czas trwania (zwiększa wartość)' },
      { time: 9, process: 'Kolejne pytanie', detail: 'Pedicure hybrydowy → wyszukiwanie' },
      { time: 11, process: 'Upselling', detail: 'Wykryto zainteresowanie 2 usługami → pakiet' },
      { time: 18, process: 'Lead nurturing', detail: 'Zachęta do rezerwacji (konwersja)' },
    ],
  },
  {
    id: 'confirmation',
    title: 'Potwierdzenie SMS',
    icon: MessageSquare,
    description: 'Automatyczne potwierdzenia i przypomnienia',
    audioUrl: '/audio/demo-sms.mp3',
    duration: 15,
    transcript: [
      { time: 0, speaker: 'ai', text: '[SMS] Dzień dobry Anno! Przypominamy o wizycie jutro o 15:00 w Beauty Salon.' },
      { time: 5, speaker: 'ai', text: '[SMS] Aby potwierdzić, odpowiedz TAK. Aby zmienić termin, odpowiedz ZMIANA.' },
      { time: 10, speaker: 'customer', text: '[SMS] TAK' },
      { time: 12, speaker: 'ai', text: '[SMS] Super! Widzimy się jutro. Adres: ul. Piękna 12. Mapa: [link]' },
    ],
    aiThinking: [
      { time: 0, process: 'Scheduler', detail: '24h przed wizytą → wysłanie przypomnienia' },
      { time: 5, process: 'Interaktywny SMS', detail: 'Opcje: TAK / ZMIANA / ANULUJ' },
      { time: 10, process: 'Przetwarzanie odpowiedzi', detail: 'Wykryto: potwierdzenie' },
      { time: 12, process: 'Dodatkowe informacje', detail: 'Adres + mapa (zmniejsza no-show o 35%)' },
      { time: 15, process: 'Analytics', detail: 'Wizyta potwierdzona → aktualizacja CRM' },
    ],
  },
];

export default function InteractiveDemoTabs() {
  const [activeScenario, setActiveScenario] = useState<Scenario>('booking');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const activeData = scenarios.find(s => s.id === activeScenario) || scenarios[0];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScenarioChange = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Simulate playback progress
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= activeData.duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, activeData.duration]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Play className="w-4 h-4" />
            Zobacz jak to działa
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Wypróbuj AI Sekretarkę w Akcji
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kliknij scenariusz i posłuchaj prawdziwej rozmowy z AI
          </p>
        </motion.div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const isActive = activeScenario === scenario.id;

            return (
              <motion.button
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleScenarioChange(scenario.id)}
                className={`
                  relative px-6 py-4 rounded-2xl font-bold transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">{scenario.title}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {scenario.description}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 -z-10"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Demo Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left: Phone Mockup + Audio Controls */}
            <div className="space-y-6">
              <PhoneMockupLive
                scenario={activeData}
                currentTime={currentTime}
                isPlaying={isPlaying}
              />

              {/* Audio Controls */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {activeData.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor(currentTime)}s / {activeData.duration}s
                    </div>
                  </div>
                </div>

                <AudioWaveform
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={activeData.duration}
                />

                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(currentTime / activeData.duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Conversation Transcript */}
              <ConversationTranscript
                transcript={activeData.transcript}
                currentTime={currentTime}
              />
            </div>

            {/* Right: Behind the Scenes */}
            <div>
              <BehindScenesPanel
                aiThinking={activeData.aiThinking}
                currentTime={currentTime}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Below Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Przetestuj Swoją Branżę
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold border-2 border-gray-300 hover:bg-gray-50 transition-colors">
              Pobierz Pełny Scenariusz
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
