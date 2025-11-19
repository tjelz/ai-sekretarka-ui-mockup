import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-2">
            <svg width="100" height="26" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity">
                <text x="36" y="24" fontFamily="'Inter', sans-serif" fontSize="28" fontWeight="600" letterSpacing="-1.5" fill="#0F172A">yieldo</text>

                <g>
                    <circle cx="8" cy="8" r="4" stroke="#2563EB" strokeWidth="2.5"/>
                    <circle cx="24" cy="24" r="4" stroke="#2563EB" strokeWidth="2.5"/>
                    <path d="M26 6L6 26" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                </g>
            </svg>
          </div>

          <div className="flex gap-6">
             <a href="#" className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">Polityka Prywatności</a>
             <a href="#" className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">Regulamin</a>
             <a href="#contact" className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">Kontakt</a>
          </div>

          <p className="text-[10px] text-slate-400 font-medium">
            © {new Date().getFullYear()} Yieldo Sp. z o.o.
          </p>

        </div>
      </div>
    </footer>
  );
};