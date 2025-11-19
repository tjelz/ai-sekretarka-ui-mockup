'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Produkty', href: '#products' },
    { name: 'Dlaczego My', href: '#tech' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-6 left-0 right-0 z-50 px-4 flex justify-center transition-all duration-500`}
      >
        <div className={`
          relative flex items-center justify-between px-6 md:px-8 py-3.5 rounded-full transition-all duration-500
          ${isScrolled 
            ? 'w-full max-w-6xl bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-slate-200/60 shadow-xl shadow-slate-200/10' 
            : 'w-full max-w-7xl bg-white/60 backdrop-blur-md backdrop-saturate-100 border border-transparent'
          }
        `}>
          
          {/* Logo - High Precision Vector %yieldo */}
          <a href="#" className="flex items-center gap-2 z-10 group shrink-0" aria-label="Yieldo Home">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                {/* Text Part 'yieldo' */}
                <text x="36" y="24" fontFamily="'Inter', sans-serif" fontSize="28" fontWeight="600" letterSpacing="-1.5" fill="#0F172A">yieldo</text>
                
                {/* Icon Part % */}
                <g className="group-hover:opacity-90 transition-opacity">
                    {/* Top Left Circle */}
                    <circle cx="8" cy="8" r="4" stroke="#2563EB" strokeWidth="2.5"/>
                    {/* Bottom Right Circle */}
                    <circle cx="24" cy="24" r="4" stroke="#2563EB" strokeWidth="2.5"/>
                    {/* Slash Line (Top Right to Bottom Left) */}
                    <path d="M26 6L6 26" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                </g>
            </svg>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-semibold text-sm transition-colors tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block z-10">
            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
            >
              Darmowa Konsultacja
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-900 z-10 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-32 px-8 flex flex-col items-center transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-6 text-center w-full max-w-sm">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 w-full hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Umów Konsultację
            </a>
          </div>
        </div>
      )}
    </>
  );
};
