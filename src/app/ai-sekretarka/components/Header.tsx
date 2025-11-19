'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Funkcje', href: '#features' },
    { name: 'Kalkulator', href: '#calculator' },
    { name: 'Cennik', href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' 
          : 'bg-white/50 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <div className="flex items-center gap-1 group cursor-pointer select-none">
           {/* Logo: Outfit font (Codec Pro alternative) */}
           {/* % Symbol: Medium weight, Blue */}
           <span className="font-codec text-[28px] font-medium text-blue-600 leading-none pb-1">%</span>
           {/* yieldo Text: Normal weight (No Bulk), Dark Slate */}
           <span className="font-codec text-[28px] font-normal tracking-tight text-slate-900 leading-none pb-1">
             yieldo
           </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Zaloguj
          </Link>
          <Link 
            href="#pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
          >
            Darmowy Test
          </Link>
        </div>

        <button 
          className="md:hidden text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-800 hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-slate-100">
             <Link href="#login" className="text-center text-slate-600 font-medium py-2">Zaloguj</Link>
             <Link href="#pricing" className="bg-blue-600 text-white text-center py-3 rounded-xl font-medium">Darmowy Test</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
