'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ImpactGraphProps {
  graph: {
    before: number;
    after: number;
    label: string;
  };
  color: string;
}

export default function ImpactGraph({ graph, color }: ImpactGraphProps) {
  const maxValue = Math.max(graph.before, graph.after);
  const beforePercent = (graph.before / maxValue) * 100;
  const afterPercent = (graph.after / maxValue) * 100;
  const improvement = ((graph.after - graph.before) / graph.before) * 100;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
      <h4 className="text-lg font-bold text-gray-900 mb-6">Wpływ na Twój Biznes</h4>

      <div className="space-y-6">
        {/* Before Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Przed AI Sekretarką</span>
            <span className="text-lg font-bold text-red-600">{graph.before}</span>
          </div>
          <div className="h-12 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${beforePercent}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-end pr-4"
            >
              <span className="text-white text-sm font-bold">{graph.label}</span>
            </motion.div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-12 h-12 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full flex items-center justify-center shadow-lg`}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* After Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Z AI Sekretarką</span>
            <span className={`text-lg font-bold text-${color}-600`}>{graph.after}</span>
          </div>
          <div className="h-12 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${afterPercent}%` }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-500 flex items-center justify-end pr-4`}
            >
              <span className="text-white text-sm font-bold">{graph.label}</span>
            </motion.div>
          </div>
        </div>

        {/* Improvement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`bg-gradient-to-r from-${color}-50 to-${color}-100 border-2 border-${color}-300 rounded-xl p-4 text-center`}
        >
          <div className="text-xs text-gray-600 font-semibold uppercase mb-1">Poprawa</div>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-3xl font-black text-${color}-700`}>
              {improvement > 0 ? '+' : ''}{improvement.toFixed(0)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
