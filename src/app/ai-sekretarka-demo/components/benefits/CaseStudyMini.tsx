'use client';

import React from 'react';
import { Quote, TrendingUp } from 'lucide-react';

interface CaseStudyMiniProps {
  caseStudy: {
    business: string;
    stat: string;
  };
}

export default function CaseStudyMini({ caseStudy }: CaseStudyMiniProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-200 p-5">
      <div className="flex items-start gap-3">
        {/* Quote Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Quote className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
              Studium Przypadku
            </span>
          </div>
          <h5 className="text-lg font-bold text-gray-900 mb-2">
            {caseStudy.business}
          </h5>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-200">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-gray-900">
              {caseStudy.stat}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
