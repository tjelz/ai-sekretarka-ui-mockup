import React from 'react';
import { Header } from './components/landing/Header';
import { Hero } from './components/landing/Hero';
import { WhyUs } from './components/landing/WhyUs';
import { CTASection } from './components/landing/CTASection';
import { Footer } from './components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-white relative">
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-multiply" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }}>
      </div>

      <Header />
      <main className="flex-grow">
        <Hero />
        <WhyUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}