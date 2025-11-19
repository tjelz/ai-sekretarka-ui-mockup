'use client';

import React, { useState } from 'react';
import { TrendingUp, Calculator as CalcIcon, ArrowRight, Wallet } from 'lucide-react';

const Calculator: React.FC = () => {
  // Inputs
  const [dailyMissedCalls, setDailyMissedCalls] = useState(3); // Default 3 per day
  const [ticketValue, setTicketValue] = useState(150);

  // Constants / Market Assumptions
  const daysInMonth = 30; // Assuming 24/7 operation or general monthly average
  const employeeCost = 5500; // Total employer cost (ZUS + salary)
  const yieldoCost = 299; // Base plan
  const conversionRate = 0.45; // 45% conversion

  // Calculations
  const monthlyLeads = Math.round(dailyMissedCalls * daysInMonth);
  const monthlyRecoveredRevenue = Math.round(monthlyLeads * ticketValue * conversionRate);
  const yearlyRecoveredRevenue = monthlyRecoveredRevenue * 12;
  
  // Cost Savings Calculation
  const yearlyEmployeeCost = employeeCost * 12;
  const yearlyYieldoCost = yieldoCost * 12;
  const yearlySavings = yearlyEmployeeCost - yearlyYieldoCost;

  // ROI Calculation (Revenue / Subscription Cost)
  const revenueMultiplier = Math.max(1, Math.floor(monthlyRecoveredRevenue / yieldoCost));

  // Dynamic background styles for sliders (to fix blue track visibility)
  const getSliderStyle = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #2563eb ${percentage}%, #e2e8f0 ${percentage}%)`
    };
  };

  // Calculate max reasonable revenue for bar visualization
  const maxYearlyRevenue = 200000;
  const barPercentage = Math.min(100, Math.max(5, (yearlyRecoveredRevenue / maxYearlyRevenue) * 100));

  return (
    <section id="calculator" className="py-10 bg-slate-50 relative overflow-hidden">
      {/* Decorational Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[5%] w-60 h-60 bg-purple-100/40 rounded-full blur-[60px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <CalcIcon size={14} />
              Kalkulator Zysków
            </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            Ile tracisz przez nieodebrane telefony?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Każdy nieodebrany telefon to potencjalny klient. Sprawdź, ile możesz odzyskać.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          
          {/* LEFT: Inputs & Costs Panel */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Sliders Card */}
            <div className="bg-white rounded-[1.5rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-6 flex-1 transition-all hover:shadow-xl hover:shadow-slate-200/60">
                <div className="space-y-8">
                
                    {/* Input 1: Missed Calls (DAILY) */}
                    <div>
                        <div className="flex justify-between items-end mb-4">
                        <label className="text-slate-800 font-bold text-base flex flex-col">
                            Nieodebrane telefony
                            <span className="text-xs text-slate-400 font-medium mt-0.5">Dziennie</span>
                        </label>
                        <div className="flex items-center justify-center w-14 h-9 bg-blue-50 rounded-lg border border-blue-100 text-lg font-bold text-blue-700 shadow-inner">
                            {dailyMissedCalls}
                        </div>
                        </div>
                        <div className="relative h-6 flex items-center">
                          <input 
                            id="slider-phone"
                            type="range" 
                            min="0" max="20" step="1"
                            value={dailyMissedCalls}
                            onChange={(e) => setDailyMissedCalls(Number(e.target.value))}
                            style={getSliderStyle(dailyMissedCalls, 0, 20)}
                            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer hover:opacity-90 transition-opacity"
                            aria-label="Liczba nieodebranych połączeń dziennie"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium px-0.5">
                            <span>0</span>
                            <span>10</span>
                            <span>20+</span>
                        </div>
                    </div>

                    {/* Input 2: Ticket Value */}
                    <div>
                        <div className="flex justify-between items-end mb-4">
                        <label className="text-slate-800 font-bold text-base flex flex-col">
                            Średnia wartość wizyty
                            <span className="text-xs text-slate-400 font-medium mt-0.5">Ile klient zostawia (PLN)?</span>
                        </label>
                        <div className="flex items-center justify-center min-w-[80px] h-9 bg-blue-50 rounded-lg border border-blue-100 text-lg font-bold text-blue-700 px-2 shadow-inner">
                            {ticketValue} <span className="text-[10px] text-blue-400 ml-0.5 font-medium relative top-0.5">zł</span>
                        </div>
                        </div>
                        <div className="relative h-6 flex items-center">
                          <input 
                            id="slider-money"
                            type="range" 
                            min="50" max="1000" step="10"
                            value={ticketValue}
                            onChange={(e) => setTicketValue(Number(e.target.value))}
                            style={getSliderStyle(ticketValue, 50, 1000)}
                            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer hover:opacity-90 transition-opacity"
                            aria-label="Średnia wartość usługi"
                          />
                        </div>
                         <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium px-0.5">
                            <span>50 zł</span>
                            <span>500 zł</span>
                            <span>1000 zł+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cost Savings Micro-Card */}
            <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden hover:shadow-md transition-shadow">
                 <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-green-50 to-transparent pointer-events-none"></div>
                 
                 <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 shadow-sm">
                        <Wallet size={18} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wide mb-0.5">Oszczędność na etacie</p>
                        <p className="text-slate-900 font-bold text-base leading-tight">
                            Zatrzymujesz <span className="text-green-600">{yearlySavings.toLocaleString()} zł</span>
                        </p>
                    </div>
                 </div>
                 <div className="text-center sm:text-right relative z-10 w-full sm:w-auto bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-0">
                    <p className="text-[10px] text-slate-400">Koszt pracownika: {yearlyEmployeeCost.toLocaleString()} zł/rok</p>
                    <p className="text-[10px] text-blue-600 font-bold mt-0.5">Koszt Yieldo: {yearlyYieldoCost.toLocaleString()} zł/rok</p>
                 </div>
            </div>

          </div>

          {/* RIGHT: Big Results Card (Luxury Dark Blue) */}
          <div className="lg:col-span-5 h-full">
            <div className="h-full bg-gradient-to-br from-slate-900 to-blue-950 rounded-[1.5rem] p-6 sm:p-8 text-white shadow-2xl shadow-slate-900/20 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
               {/* Background Decoration */}
               <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>

               <div className="relative z-10">
                 <div className="flex items-center gap-2 text-blue-200 mb-5">
                   <TrendingUp size={18} />
                   <span className="font-bold tracking-wide text-xs uppercase">Prognozowany Zysk</span>
                 </div>
                 
                 <div className="space-y-1 mb-6">
                   <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-lg tabular-nums">
                     {monthlyRecoveredRevenue.toLocaleString()} <span className="text-2xl text-blue-300">zł</span>
                   </p>
                   <p className="text-blue-200/80 text-sm font-medium">Dodatkowego przychodu miesięcznie</p>
                 </div>
                 
                 {/* ROI Comparison - EXCLUSIVE & ELEGANT */}
                 <div className="mt-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border-l-2 border-green-400/80 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none"></div>
                    
                    <div className="flex flex-col gap-1 relative z-10">
                        <span className="text-blue-100 text-xs font-medium opacity-90">
                            Koszt subskrypcji Recepcjonistki zwraca się
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200 drop-shadow-sm">
                                {revenueMultiplier} razy
                            </span>
                            <span className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                                każdego miesiąca
                            </span>
                        </div>
                    </div>
                 </div>
               </div>

               <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
                 <div className="flex justify-between items-end mb-2">
                    <div className="text-xs text-blue-300 font-medium">Rocznie to aż:</div>
                    <div className="text-xl font-bold text-white tabular-nums">{yearlyRecoveredRevenue.toLocaleString()} zł</div>
                 </div>
                 {/* Functional Bar Visualization with Shimmer */}
                 <div className="w-full bg-slate-800 rounded-full h-1.5 mb-5 overflow-hidden">
                    <div 
                        className="bg-blue-400 h-full rounded-full transition-all duration-300 ease-out relative"
                        style={{ width: `${barPercentage}%` }}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_linear_infinite]"></div>
                    </div>
                 </div>
                 
                 <a href="#pricing" className="w-full bg-white text-slate-900 py-3.5 rounded-xl font-bold text-sm text-center hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                   Zacznij Zarabiać
                   <ArrowRight size={16} />
                 </a>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;
