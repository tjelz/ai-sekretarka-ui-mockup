'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Phone, Signal, Battery, PhoneOff, Volume2, MicOff, Grid3x3, Video, User, Plus, Calendar, Bell } from 'lucide-react';

const Hero: React.FC = () => {
  const [callStatus, setCallStatus] = useState<'incoming' | 'active'>('incoming');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleAnswerCall = () => {
    setCallStatus('active');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleEndCall = () => {
    setCallStatus('incoming');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
        @keyframes wallpaper-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes vibrate {
          0% { transform: rotate(0deg) scale(0.75); }
          25% { transform: rotate(1deg) scale(0.75); }
          50% { transform: rotate(0deg) scale(0.75); }
          75% { transform: rotate(-1deg) scale(0.75); }
          100% { transform: rotate(0deg) scale(0.75); }
        }
        .animate-vibrate {
          animation: vibrate 0.4s linear infinite;
        }
      `}</style>

      {/* Hidden Audio Element for Demo */}
      <audio 
        ref={audioRef} 
        src="/audio-call-1.mp3"
        onEnded={handleEndCall}
      />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Ambient Moving Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-[20%] w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-12 items-center min-h-[600px]">
          
          {/* LEFT COLUMN: Copy & CTA */}
          <div className="flex flex-col justify-center animate-fadeInUp relative z-20 mb-16 lg:mb-0 text-center lg:text-left mx-auto lg:mx-0 max-w-xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 w-fit mx-auto lg:mx-0 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              AI Voice Receptionist
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15] drop-shadow-sm">
              Przestań tracić pieniądze przez{' '}
              <br className="hidden sm:block" />
              <span className="text-blue-600 relative whitespace-nowrap inline-block">
                nieodebrane telefony.
                <svg className="absolute w-full h-3 -bottom-1 sm:-bottom-2 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg font-light mx-auto lg:mx-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Yieldo to wirtualna recepcja, która pracuje 24/7. Odbiera 100% telefonów, umawia wizyty i udziela informacji o ofercie, gdy Ty zajmujesz się biznesem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <a href="#pricing" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-button-shine pointer-events-none"></div>
                Zacznij Teraz
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-100 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden transition-transform hover:-translate-y-1 duration-300 relative z-0 hover:z-10">
                      {/* Using placeholder images if local assets aren't available, or use a service */}
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                   </div>
                 ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400 mb-0.5 justify-center lg:justify-start">
                   {[1,2,3,4,5].map(i => (
                       <svg key={i} className="w-3.5 h-3.5 fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                   ))}
                </div>
                <p className="text-xs font-medium text-slate-500"><span className="text-slate-900 font-bold">4.9/5</span> od zadowolonych firm</p>
              </div>
            </div>

            {/* Integration Badges (Smaller) */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3 opacity-90 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2 py-1 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 group cursor-default">
                   <span className="font-bold text-[10px] text-black font-sans tracking-tight group-hover:scale-105 transition-transform">booksy</span>
                   <span className="text-[8px] font-medium text-slate-400 px-1 py-0.5 bg-slate-50 rounded">Wspieramy</span>
                </div>
                 <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2 py-1 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 group cursor-default">
                    <div className="w-2.5 h-2.5 bg-white border border-blue-500 rounded text-[4px] font-bold text-blue-500 flex items-center justify-center pt-[1px] relative group-hover:rotate-12 transition-transform">
                        <span className="absolute top-0 w-full h-[1px] bg-blue-500 left-0 rounded-t-[1px]"></span>
                        31
                    </div>
                    <span className="font-bold text-[10px] text-slate-700">Google Calendar</span>
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Phone Demo */}
          <div className="relative h-[600px] flex flex-col items-center justify-center perspective-[2000px]">
            
            {/* Animated Background Blob behind Phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-purple-100/30 rounded-full blur-[80px] animate-pulse-slow pointer-events-none z-0"></div>

            {/* Floating Notifications Container - z-10 to be BEHIND the phone (which is z-30) */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                 <div className="relative w-full max-w-[350px] sm:max-w-[550px] h-full">
                     
                     {/* Calendar Notification - Left Side */}
                     <div className="absolute top-[25%] left-[-40px] md:left-[-60px] scale-[0.65] origin-center">
                        <div className="animate-float">
                            <div className="bg-white rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.18)] border border-white/50 flex items-center gap-3 w-52 transform -rotate-6 hover:rotate-0 transition-transform duration-300 ring-1 ring-slate-900/5 backdrop-blur-sm bg-white/90">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 shadow-inner">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Rezerwacja</p>
                                <p className="text-sm font-bold text-slate-900">Jutro, 14:00</p>
                            </div>
                            </div>
                        </div>
                      </div>

                      {/* Lead Notification - Right Side */}
                      <div className="absolute bottom-[32%] right-[-40px] md:right-[-60px] scale-[0.65] origin-center">
                        <div className="animate-float-delayed">
                            <div className="bg-white rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.18)] border border-white/50 flex items-center gap-3 w-48 transform rotate-6 hover:rotate-0 transition-transform duration-300 ring-1 ring-slate-900/5 backdrop-blur-sm bg-white/90">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-inner">
                                <Bell size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Nowy Lead</p>
                                <p className="text-sm font-bold text-slate-900">+1 Klient</p>
                            </div>
                            </div>
                        </div>
                      </div>

                 </div>
            </div>

            {/* Phone Device Container - iPhone 16 Pro Dimensions - z-30 to be IN FRONT */}
            <div className={`relative w-[290px] h-[620px] bg-[#121212] rounded-[55px] border-[6px] border-[#2a2a2a] shadow-[0_0_0_2px_#4a4a4a,0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-500 transform ${callStatus === 'incoming' ? 'scale-[0.75] animate-vibrate' : 'scale-[0.75]'} z-30`}>
              
              {/* Screen Content */}
              <div className="w-full h-full bg-black relative rounded-[49px] overflow-hidden ring-1 ring-white/5">
                  
                  {/* Status Bar & Dynamic Island */}
                  <div className="absolute top-0 w-full h-14 z-50 flex justify-between items-start px-7 pt-4">
                       <span className="text-white text-[15px] font-semibold tracking-wide pl-1">12:34</span>
                       
                       {/* Dynamic Island */}
                       <div className="absolute left-1/2 -translate-x-1/2 top-[11px] w-[96px] h-[26px] bg-black rounded-full flex items-center justify-center z-50">
                          <div className="w-full h-full bg-black rounded-full flex items-center justify-end pr-2 gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] shadow-inner"></div>
                              {callStatus === 'active' && <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>}
                          </div>
                       </div>

                       <div className="flex gap-1.5 text-white pr-1">
                           <Signal size={15} />
                           <Battery size={15} />
                       </div>
                  </div>

                  {/* Background Wallpaper (Black/Dark with Pulse) */}
                  <div className="absolute inset-0 bg-black"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                  {callStatus === 'incoming' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-slate-800/10 to-transparent animate-[wallpaper-pulse_2s_ease-in-out_infinite]"></div>
                  )}

                  {/* INCOMING CALL STATE */}
                  {callStatus === 'incoming' && (
                      <div className="relative z-10 h-full flex flex-col pt-24 pb-12 px-6 justify-between items-center text-center">
                           
                           <div className="flex flex-col items-center mt-4">
                               {/* Client Avatar (Simple Letter K) */}
                               <div className="w-28 h-28 rounded-full bg-slate-600 p-0.5 shadow-2xl shadow-black/50 mb-5 ring-4 ring-white/5 flex items-center justify-center relative overflow-hidden">
                                   {/* Glare effect on avatar */}
                                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                                   <span className="text-5xl font-medium text-white">K</span>
                               </div>

                               <h3 className="text-3xl font-semibold text-white mb-1.5 tracking-tight">Twój Klient</h3>
                               <p className="text-white/60 text-base font-medium">Komórka</p>
                           </div>

                           {/* iPhone Action Buttons */}
                           <div className="w-full flex justify-between items-center px-4 mb-6">
                               {/* Decline Button */}
                               <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                   <button 
                                    onClick={handleEndCall}
                                    className="w-[72px] h-[72px] rounded-full bg-[#ff3b30] flex items-center justify-center shadow-lg active:scale-95 transition-transform group-hover:scale-105"
                                   >
                                        <PhoneOff size={32} className="text-white fill-white" />
                                   </button>
                                   <span className="text-white text-[13px] font-medium">Odrzuć</span>
                               </div>

                               {/* Answer Button */}
                               <div className="flex flex-col items-center gap-2 relative group cursor-pointer">
                                   <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                                   <button 
                                    onClick={handleAnswerCall}
                                    className="w-[72px] h-[72px] relative z-10 rounded-full bg-[#34c759] flex items-center justify-center shadow-lg shadow-green-900/30 active:scale-95 transition-transform group-hover:scale-105"
                                   >
                                        <Phone size={32} className="text-white fill-white" />
                                   </button>
                                   <span className="text-white text-[13px] font-medium mt-2">Odbierz</span>
                               </div>
                           </div>
                      </div>
                  )}

                  {/* ACTIVE CALL STATE */}
                  {callStatus === 'active' && (
                      <div className="relative z-10 h-full flex flex-col pt-16 pb-10 px-6 items-center text-center">
                           
                           {/* Header Info */}
                           <div className="flex flex-col items-center w-full mb-8 mt-4">
                               {/* Client Avatar Small */}
                               <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center mb-3 shadow-lg">
                                   <span className="text-2xl font-medium text-white">K</span>
                               </div>
                               
                               <h3 className="text-2xl font-bold text-white mb-1">Twój Klient</h3>
                               <p className="text-white/60 text-xs animate-pulse">00:05</p>
                           </div>

                           {/* 6 Button Grid (iOS Style) */}
                           <div className="grid grid-cols-3 gap-x-3 gap-y-4 w-full px-1 mb-auto max-w-[240px]">
                                {/* Row 1 */}
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                                        <MicOff size={26} />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">wycisz</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                                        <Grid3x3 size={26} />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">klawiatura</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg cursor-pointer">
                                        <Volume2 size={26} fill="currentColor" />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">głośnik</span>
                                </div>

                                {/* Row 2 */}
                                <div className="flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
                                        <Plus size={26} />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">dodaj</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
                                        <Video size={26} />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">wideo</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
                                        <User size={26} />
                                    </div>
                                    <span className="text-[10px] text-white/90 font-medium">kontakty</span>
                                </div>
                           </div>

                           {/* Hang Up Button */}
                           <button 
                            onClick={handleEndCall}
                            className="w-[72px] h-[72px] rounded-full bg-[#ff3b30] hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40 transition-transform hover:scale-105 mt-2 active:scale-95"
                           >
                                <PhoneOff size={32} className="text-white fill-white" />
                           </button>
                      </div>
                  )}

              </div>
            </div>

             {/* Annotation: Bottom Left - SHARPENED TEXT - In Front (z-40) */}
            {callStatus === 'incoming' && (
                <div className="absolute bottom-4 -left-4 sm:-left-12 z-40 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <div className="relative group cursor-pointer transition-transform hover:scale-105" onClick={handleAnswerCall}>
                         {/* Arrow Pointing UP and RIGHT towards the Answer Button */}
                        <svg className="w-24 h-20 text-blue-600 absolute -top-12 -right-20 transform rotate-0 drop-shadow-sm pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M10,80 Q 40,80 80,40" /> 
                             <path d="M80,40 L 68,42 M 80,40 L 78,55" /> 
                        </svg>
                        
                        {/* Solid background, no blur, for maximum text sharpness */}
                        <div className="font-handwriting text-2xl sm:text-3xl font-bold text-slate-900 whitespace-nowrap relative bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-lg -rotate-2 transform-gpu antialiased hover:rotate-0 transition-all duration-300">
                            Odbierz! Zobacz jak brzmi.
                        </div>
                    </div>
                </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
