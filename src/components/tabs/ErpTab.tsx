import React, { useState } from 'react';
import { ErpGantry } from '../../types';

interface ErpTabProps {
  gantries: ErpGantry[];
  onOpenErpGuide: () => void;
}

export const ErpTab: React.FC<ErpTabProps> = ({ gantries, onOpenErpGuide }) => {
  const [selectedExpressway, setSelectedExpressway] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedTime, setSimulatedTime] = useState('08:30');

  const filteredGantries = gantries.filter((g) => {
    if (selectedExpressway !== 'all' && !g.expressway.toLowerCase().includes(selectedExpressway.toLowerCase())) {
      return false;
    }
    if (searchQuery && !g.gantryName.toLowerCase().includes(searchQuery.toLowerCase()) && !g.expressway.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Hero & Live Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#252631] p-5 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
              LTA Electronic Road Pricing (ERP 2.0 Live)
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#1a1b22] dark:text-white">
            ERP Rates &amp; Expressway Gantries
          </h2>
          <p className="text-[13px] text-[#464555] dark:text-gray-300 mt-1">
            Dynamic congestion pricing tariffs across Singapore expressways and CBD arterial cordons.
          </p>
        </div>

        <button
          onClick={onOpenErpGuide}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold shadow-xs transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>View 2025 Tariff Guide</span>
        </button>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#252631] p-4 rounded-xl border border-[#eeedf7] dark:border-[#353644] shadow-xs">
        {/* Search */}
        <div className="flex-1 flex items-center bg-[#f4f2fd] dark:bg-[#1a1b22] rounded-xl px-3 py-2 border border-[#eeedf7] dark:border-[#353644]">
          <span className="material-symbols-outlined text-[#777587] text-[18px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gantry name, CTE, AYE, CBD, KPE..."
            className="w-full bg-transparent border-none outline-none text-[13px] text-[#1a1b22] dark:text-white placeholder:text-[#777587]"
          />
        </div>

        {/* Expressway Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[12px]">
          {['all', 'CTE', 'AYE', 'CBD', 'PIE', 'KPE'].map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExpressway(exp)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedExpressway === exp
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300 hover:text-[#1a1b22]'
              }`}
            >
              {exp.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Time Simulator Picker */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-[#f4f2fd] dark:bg-[#1a1b22] px-3 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#353644]">
          <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[18px]">
            schedule
          </span>
          <span className="text-[12px] font-bold text-[#1a1b22] dark:text-white">Active Band:</span>
          <select
            value={simulatedTime}
            onChange={(e) => setSimulatedTime(e.target.value)}
            className="bg-transparent text-[12px] font-bold text-[#3525cd] dark:text-indigo-400 outline-none cursor-pointer"
          >
            <option value="07:30">07:30 - 08:00 (Early Rush)</option>
            <option value="08:30">08:30 - 09:00 (Peak Morning)</option>
            <option value="09:30">09:30 - 10:00 (Late Morning)</option>
            <option value="12:00">12:00 - 14:00 (Midday Off-peak)</option>
            <option value="18:00">18:00 - 19:00 (Evening Peak)</option>
          </select>
        </div>
      </div>

      {/* Gantries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGantries.map((gantry) => {
          return (
            <div
              key={gantry.id}
              className="bg-white dark:bg-[#252631] rounded-2xl p-5 border border-[#eeedf7] dark:border-[#353644] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#353644] text-[10px] font-bold uppercase tracking-wider text-[#464555] dark:text-gray-300">
                      {gantry.expressway}
                    </span>
                    <h3 className="text-[17px] font-bold text-[#1a1b22] dark:text-white mt-1">
                      {gantry.gantryName}
                    </h3>
                    <p className="text-[12px] text-[#464555] dark:text-gray-400">
                      {gantry.direction}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-xl text-[18px] font-bold tabular-nums ${
                        gantry.currentTariff > 0
                          ? 'bg-[#ffdbcc] text-[#7e3000] dark:bg-amber-950/70 dark:text-amber-300'
                          : 'bg-[#ecfdf5] text-[#10b981] dark:bg-emerald-950/70 dark:text-emerald-300'
                      }`}
                    >
                      ${gantry.currentTariff.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-[#777587] dark:text-gray-400 mt-0.5 font-medium">
                      {gantry.currentTariff > 0 ? 'Active Tariff' : 'Free Off-Peak'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] text-[12px] space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span className="text-[#464555] dark:text-gray-400">Current Window:</span>
                    <span className="font-bold text-[#1a1b22] dark:text-white">
                      {gantry.activeTimeWindow}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#464555] dark:text-gray-400">Next Rate Change:</span>
                    <span className="font-semibold text-[#3525cd] dark:text-indigo-400">
                      ${gantry.nextRate.toFixed(2)} at {gantry.nextTariffChange}
                    </span>
                  </div>
                </div>

                {/* Rates timetable preview */}
                <div className="border border-[#eeedf7] dark:border-[#353644] rounded-xl overflow-hidden text-[11px]">
                  <div className="bg-[#fbf8ff] dark:bg-[#1a1b22] px-3 py-1 font-bold text-[#464555] dark:text-gray-300 border-b border-[#eeedf7] dark:border-[#353644]">
                    Peak Hours Timetable
                  </div>
                  <div className="p-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {gantry.ratesSchedule.slice(0, 6).map((sch, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-[#464555] dark:text-gray-400">{sch.timeBand}</span>
                        <span className="font-bold text-[#1a1b22] dark:text-white">
                          ${sch.rate.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
