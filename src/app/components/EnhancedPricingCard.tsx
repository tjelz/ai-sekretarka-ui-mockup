'use client';

import React from 'react';
import { CheckCircle2, Users, Sparkles, TrendingUp } from 'lucide-react';

interface EnhancedPricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export default function EnhancedPricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
}: EnhancedPricingCardProps) {
  // Calculate profit metrics
  // Format PLN with no decimals
  const formatPLN = (num: number): string => {
    return Math.floor(num).toLocaleString('pl-PL');
  };

  // Determine card styling
  const isBlueCard = isPopular;
  const cardBg = isBlueCard
    ? 'bg-gradient-to-br from-[#007BFF] to-[#0056b3]'
    : 'bg-white';
  const cardBorder = isBlueCard ? '' : 'border-2 border-gray-200';
  const textColor = isBlueCard ? 'text-white' : 'text-gray-900';
  const subTextColor = isBlueCard ? 'text-blue-100' : 'text-gray-600';
  const iconBg = isBlueCard ? 'bg-white/20' : 'bg-purple-50';
  const iconColor = isBlueCard ? 'text-white' : 'text-purple-600';
  const checkColor = isBlueCard ? 'text-white' : 'text-green-500';

  return (
    <div className={`${cardBg} ${cardBorder} p-8 rounded-2xl shadow-xl transition-shadow hover:shadow-2xl relative`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            POPULARNE
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
        <Users className={`w-7 h-7 ${iconColor}`} />
      </div>

      {/* Plan Name */}
      <h3 className={`text-2xl font-bold ${textColor} mb-2`}>
        {name}
      </h3>

      {/* Description */}
      <p className={`text-sm ${subTextColor} mb-4`}>
        {description}
      </p>

      {/* Price */}
      <div className="mb-6">
        <span className={`text-5xl font-bold ${textColor}`}>{formatPLN(price)} zł</span>
        <span className={`${subTextColor} ml-2`}>/miesiąc</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center gap-2 ${isBlueCard ? 'text-white' : 'text-gray-700'}`}>
            <CheckCircle2 className={`w-5 h-5 ${checkColor}`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
