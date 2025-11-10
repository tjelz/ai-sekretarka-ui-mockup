'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

export default function WebsiteAnimatedMockup() {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveDevice(prev => {
          if (prev === 'desktop') return 'tablet';
          if (prev === 'tablet') return 'mobile';
          return 'desktop';
        });
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Device Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveDevice('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            activeDevice === 'desktop'
              ? 'bg-purple-600 text-white shadow-lg scale-110'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm font-medium">Desktop</span>
        </button>
        <button
          onClick={() => setActiveDevice('tablet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            activeDevice === 'tablet'
              ? 'bg-purple-600 text-white shadow-lg scale-110'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          <Tablet className="w-4 h-4" />
          <span className="text-sm font-medium">Tablet</span>
        </button>
        <button
          onClick={() => setActiveDevice('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            activeDevice === 'mobile'
              ? 'bg-purple-600 text-white shadow-lg scale-110'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm font-medium">Mobile</span>
        </button>
      </div>

      {/* Animated Container */}
      <div className={`transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {/* Desktop View */}
        {activeDevice === 'desktop' && (
          <div className="relative bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 shadow-2xl border border-purple-200 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-3 h-3 text-green-500">🔒</div>
                  www.twoja-firma.pl
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded w-2/3 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="h-24 bg-purple-100 rounded-lg animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-24 bg-purple-100 rounded-lg animate-pulse" style={{ animationDelay: '200ms' }}></div>
                  <div className="h-24 bg-purple-100 rounded-lg animate-pulse" style={{ animationDelay: '400ms' }}></div>
                </div>
                <div className="h-12 bg-purple-600 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Floating Speed Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-bounce">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">99</div>
                  <div className="text-xs text-gray-600">PageSpeed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tablet View */}
        {activeDevice === 'tablet' && (
          <div className="max-w-md mx-auto relative bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 shadow-2xl border border-purple-200 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-2 flex items-center gap-2 border-b">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-20 bg-purple-100 rounded animate-pulse"></div>
                  <div className="h-20 bg-purple-100 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
                </div>
                <div className="h-10 bg-purple-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile View */}
        {activeDevice === 'mobile' && (
          <div className="max-w-xs mx-auto relative bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl p-4 shadow-2xl border border-purple-200 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center border-b">
                <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto"></div>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded w-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div className="space-y-2 pt-3">
                  <div className="h-16 bg-purple-100 rounded animate-pulse"></div>
                  <div className="h-16 bg-purple-100 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
                </div>
                <div className="h-9 bg-purple-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600 font-medium">
          Automatycznie dostosowuje się do każdego urządzenia
        </p>
      </div>
    </div>
  );
}
