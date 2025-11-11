"use client"

import { CheckCircle2, TrendingUp, Clock, Users } from "lucide-react"
import { useState } from "react"

interface MessagingChannelCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  metrics: {
    [key: string]: string
  }
  color: "blue" | "green" | "purple" | "orange"
  isPopular?: boolean
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
    hover: "hover:border-blue-300"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    gradient: "from-green-500 to-green-600",
    hover: "hover:border-green-300"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
    hover: "hover:border-purple-300"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    gradient: "from-orange-500 to-orange-600",
    hover: "hover:border-orange-300"
  }
}

/**
 * Individual messaging channel card component
 * Displays channel information, features, and key metrics
 */
export function MessagingChannelCard({
  icon,
  title,
  description,
  features,
  metrics,
  color,
  isPopular = false
}: MessagingChannelCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = colorClasses[color]

  return (
    <div
      className={`relative bg-white border-2 ${colors.border} ${colors.hover} rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          ⭐ Najpopularniejszy
        </div>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{description}</p>

      {/* Features List */}
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className={`${colors.bg} rounded-xl p-4 space-y-2 border ${colors.border}`}>
        <p className={`text-xs font-semibold ${colors.text} uppercase tracking-wider mb-2`}>
          Kluczowe Metryki
        </p>
        {Object.entries(metrics).map(([key, value], index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className={`text-sm font-bold ${colors.text}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Hover Effect - Bottom Gradient Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-b-2xl transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
