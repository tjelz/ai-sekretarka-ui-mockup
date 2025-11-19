import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic } from 'lucide-react';

const DemoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
        audioRef.current.pause();
    } else {
        audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="demo" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        
        <div className="inline-flex items-center gap-2 mb-6 text-slate-400 text-sm font-medium uppercase tracking-widest">
            <Mic size={16} />
            Jakość Głosu
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Brzmi tak naturalnie, że <br />Twoi klienci nie poznają różnicy.
        </h2>

        {/* Sleek Audio Player Card */}
        <div className="bg-slate-900 rounded-full p-3 pl-4 flex items-center gap-4 shadow-2xl shadow-slate-300/50 max-w-lg mx-auto transition-all hover:scale-[1.02]">
            
            <button 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pauzuj nagranie" : "Odtwórz nagranie demo"}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-blue-50 transition-colors group"
            >
                {isPlaying ? (
                    <Pause className="text-slate-900 fill-slate-900" size={20} />
                ) : (
                    <Play className="text-slate-900 fill-slate-900 group-hover:text-blue-600 group-hover:fill-blue-600 transition-colors ml-1" size={20} />
                )}
            </button>

            <div className="flex-1">
                <p className="text-white font-medium text-sm text-left">Przykładowa rozmowa: Salon Beauty</p>
                {/* Fake Waveform */}
                <div className="flex items-center gap-0.5 h-6 mt-1 opacity-60" aria-hidden="true">
                     {[...Array(30)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 bg-white rounded-full transition-all duration-200 ${isPlaying ? 'animate-pulse' : ''}`}
                            style={{ 
                                height: `${20 + Math.random() * 80}%`,
                                animationDelay: `${i * 0.05}s`
                            }}
                        ></div>
                     ))}
                </div>
            </div>

            <div className="pr-4 text-slate-400 text-xs font-mono hidden sm:block">
                00:45
            </div>
        </div>
        
        <audio 
            ref={audioRef}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            onEnded={() => setIsPlaying(false)}
        />

      </div>
    </section>
  );
};

export default DemoSection;