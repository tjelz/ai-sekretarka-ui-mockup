'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-1 mb-4 text-white select-none">
                    {/* Footer Logo matching Header */}
                    <span className="font-codec text-[28px] font-medium text-blue-500 leading-none pb-1">%</span>
                    <span className="font-codec text-[28px] font-normal tracking-tight text-white leading-none pb-1">
                      yieldo
                    </span>
                </div>
                <p className="max-w-sm text-slate-400 leading-relaxed">
                    Automatyzujemy komunikację telefoniczną dla nowoczesnych firm. 
                    Odbieramy 100% połączeń, zwiększamy przychody i oszczędzamy Twój czas.
                </p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4">Produkt</h4>
                <ul className="space-y-3">
                    <li><Link href="#features" className="hover:text-blue-400 transition-colors">Funkcje</Link></li>
                    <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Cennik</Link></li>
                    <li><Link href="#demo" className="hover:text-blue-400 transition-colors">Demo</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Firma</h4>
                <ul className="space-y-3">
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">O nas</Link></li>
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Kontakt</Link></li>
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Polityka Prywatności</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Yieldo Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
             <Link href="#" className="text-slate-500 hover:text-white transition-colors">Regulamin</Link>
             <Link href="#" className="text-slate-500 hover:text-white transition-colors">RODO</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
