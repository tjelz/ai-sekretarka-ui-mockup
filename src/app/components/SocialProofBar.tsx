'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function SocialProofBar() {
  // Avatar placeholders (using colored circles with initials)
  const avatars = [
    { bg: 'bg-blue-500', text: 'JK' },
    { bg: 'bg-green-500', text: 'AM' },
    { bg: 'bg-purple-500', text: 'PW' },
    { bg: 'bg-orange-500', text: 'MN' },
    { bg: 'bg-pink-500', text: 'KS' },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`${avatar.bg} w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold shadow-md`}
          >
            {avatar.text}
          </div>
        ))}
      </div>

      {/* Trust Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-700">
          Zaufało nam <span className="text-[#007BFF]">50+ firm</span>
        </p>
      </div>
    </div>
  );
}
