'use client';

import React from 'react';
import { CheckCircle2, Users, Sparkles, TrendingUp } from 'lucide-react';

interface EnhancedPricingCardProps {
  name: string;
  price: number;
  calls: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  avgPrice: number;
  conversion: number;
}

export default function EnhancedPricingCard({
  name,
  price,
  calls,
  description,
  features,
  isPopular = false,
  avgPrice,
  conversion,
}: EnhancedPricingCardProps) {
  // Calculate profit metrics
  const visits = Math.floor(calls * (conversion / 100));
  const revenue = visits * avgPrice;
  const profit = revenue - price;
  const isProfitable = profit > 0;

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

      {/* Profit Calculator Section */}
      <div className={`mt-6 pt-6 border-t-2 ${isBlueCard ? 'border-white/20' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`w-5 h-5 ${isBlueCard ? 'text-white' : 'text-[#007BFF]'}`} />
          <h4 className={`text-sm font-bold ${textColor} uppercase tracking-wide`}>
            Twój Potencjalny Zysk
          </h4>
        </div>

        <div className="space-y-3">
          {/* Visits */}
          <div className={`flex justify-between items-center ${isBlueCard ? 'text-blue-100' : 'text-gray-600'}`}>
            <span className="text-sm">Wizyty miesięcznie:</span>
            <span className={`text-lg font-bold ${textColor}`}>{visits}</span>
          </div>

          {/* Revenue */}
          <div className={`flex justify-between items-center ${isBlueCard ? 'text-blue-100' : 'text-gray-600'}`}>
            <span className="text-sm">Przychód:</span>
            <span className={`text-lg font-bold ${isBlueCard ? 'text-white' : 'text-[#007BFF]'}`}>
              {formatPLN(revenue)} zł
            </span>
          </div>

          {/* Profit - Highlighted */}
          <div className={`rounded-lg p-3 ${isBlueCard ? 'bg-white/10' : 'bg-green-50'} border-2 ${isBlueCard ? 'border-white/20' : 'border-green-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-5 h-5 ${isBlueCard ? 'text-white' : 'text-green-600'}`} />
                <span className={`text-sm font-semibold ${isBlueCard ? 'text-white' : 'text-gray-700'}`}>
                  Zysk netto:
                </span>
              </div>
              <span className={`text-2xl font-black ${isProfitable ? (isBlueCard ? 'text-white' : 'text-green-600') : 'text-red-600'}`}>
                {isProfitable ? '+' : ''}{formatPLN(profit)} zł
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
