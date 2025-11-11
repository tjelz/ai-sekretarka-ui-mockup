'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Clock, Zap, type LucideProps } from 'lucide-react';
import type React from 'react';

interface StatCardProps {
  icon: React.FC<LucideProps>;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: 'purple' | 'blue' | 'green' | 'orange';
  delay: number;
}

function AnimatedStatCard({ icon: Icon, value, suffix, label, sublabel, color, delay }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    setTimeout(() => {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.min(increment * currentStep, value));
        if (currentStep >= steps) clearInterval(timer);
      }, stepDuration);

      return () => clearInterval(timer);
    }, delay);
  }, [value, delay]);

  const colorClasses = {
    purple: 'from-purple-600 to-purple-800',
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    orange: 'from-orange-600 to-orange-800'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100">
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-black text-gray-900">
          {displayValue.toFixed(suffix === 's' ? 1 : 0)}{suffix}
        </div>
        <div className="text-sm font-bold text-gray-900">{label}</div>
        <div className="text-xs text-gray-600">{sublabel}</div>
      </div>
    </div>
  );
}

export default function WebsiteAnimatedStats() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Strony, Które Dostarczają Wyniki
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Statystyki, które mówią same za siebie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedStatCard
            icon={Users}
            value={20}
            suffix="+"
            label="Zadowolonych klientów"
            sublabel="i stale rośnie"
            color="purple"
            delay={0}
          />
          <AnimatedStatCard
            icon={Clock}
            value={14}
            suffix=" dni"
            label="Średni czas realizacji"
            sublabel="od konsultacji do publikacji"
            color="blue"
            delay={200}
          />
          <AnimatedStatCard
            icon={TrendingUp}
            value={150}
            suffix="%"
            label="Wzrost konwersji"
            sublabel="średnio u naszych klientów"
            color="green"
            delay={400}
          />
          <AnimatedStatCard
            icon={Zap}
            value={99}
            suffix="/100"
            label="PageSpeed Score"
            sublabel="szybkie i wydajne strony"
            color="orange"
            delay={600}
          />
        </div>
      </div>
    </section>
  );
}
