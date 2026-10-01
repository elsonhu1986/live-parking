import React, { useState } from 'react';
import { EvStation } from '../../types';

interface EvTabProps {
  stations: EvStation[];
}

export const EvTab: React.FC<EvTabProps> = ({ stations }) => {
  const [operatorFilter, setOperatorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'DC Fast' | 'AC Type 2'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = stations.filter((st) => {
    if (operatorFilter !== 'all' && st.operator !== operatorFilter) return false;
    if (typeFilter !== 'all' && st.chargingType !== typeFilter) return false;
    if (searchQuery && !st.name.toLowerCase().includes(searchQuery.toLowerCase()) && !st.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#252631] p-5 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
              Singapore National EV Charging Telemetry
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#1a1b22] dark:text-white">
            Live EV Charging Network
          </h2>
          <p className="text-[13px] text-[#464555] dark:text-gray-300 mt-1">
            Real-time plug availability for SP Mobility, CDG ENGIE, Shell Recharge, and Charge+ hubs.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/60 text-[#10b981] dark:text-emerald-400 font-bold text-[12px] border border-emerald-200/50">
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span>Open Standards CCS2 &amp; Type 2</span>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#252631] p-4 rounded-xl border border-[#eeedf7] dark:border-[#353644] shadow-xs">
        <div className="flex-1 flex items-center bg-[#f4f2fd] dark:bg-[#1a1b22] rounded-xl px-3 py-2 border border-[#eeedf7] dark:border-[#353644]">
          <span className="material-symbols-outlined text-[#777587] text-[18px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search EV station by hub name or address..."
            className="w-full bg-transparent border-none outline-none text-[13px] text-[#1a1b22] dark:text-white placeholder:text-[#777587]"
          />
        </div>

        {/* Operator Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[12px]">
          {['all', 'SP Mobility', 'CDG ENGIE', 'Shell Recharge', 'Charge+'].map((op) => (
            <button
              key={op}
              onClick={() => setOperatorFilter(op)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                operatorFilter === op
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300 hover:text-[#1a1b22]'
              }`}
            >
              {op === 'all' ? 'All Operators' : op}
            </button>
          ))}
        </div>

        {/* Speed Type Selector */}
        <div className="flex items-center gap-1 bg-[#f4f2fd] dark:bg-[#1a1b22] p-1 rounded-xl border border-[#eeedf7] dark:border-[#353644] text-[12px]">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              typeFilter === 'all' ? 'bg-white dark:bg-[#252631] text-[#3525cd] shadow-xs' : 'text-[#464555] dark:text-gray-300'
            }`}
          >
            All Speeds
          </button>
          <button
            onClick={() => setTypeFilter('DC Fast')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              typeFilter === 'DC Fast' ? 'bg-white dark:bg-[#252631] text-[#3525cd] shadow-xs' : 'text-[#464555] dark:text-gray-300'
            }`}
          >
            DC Fast (50kW+)
          </button>
          <button
            onClick={() => setTypeFilter('AC Type 2')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${
              typeFilter === 'AC Type 2' ? 'bg-white dark:bg-[#252631] text-[#3525cd] shadow-xs' : 'text-[#464555] dark:text-gray-300'
            }`}
          >
            AC (22kW)
          </button>
        </div>
      </div>

      {/* EV Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStations.map((station) => {
          const isBusy = station.availablePlugs === 0;
          return (
            <div
              key={station.id}
              className="bg-white dark:bg-[#252631] rounded-2xl p-5 border border-[#eeedf7] dark:border-[#353644] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#353644] text-[10px] font-bold uppercase tracking-wider text-[#3525cd] dark:text-indigo-400">
                      {station.operator}
                    </span>
                    <h3 className="text-[17px] font-bold text-[#1a1b22] dark:text-white mt-1">
                      {station.name}
                    </h3>
                    <p className="text-[12px] text-[#464555] dark:text-gray-400">
                      {station.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[14px] font-bold ${
                        isBusy
                          ? 'bg-[#fef2f2] text-[#ef4444]'
                          : 'bg-[#ecfdf5] text-[#10b981]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">ev_station</span>
                      <span>
                        {station.availablePlugs} / {station.totalPlugs} free
                      </span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] text-[12px] mb-3 text-center border border-[#eeedf7] dark:border-[#353644]">
                  <div>
                    <span className="text-[10px] text-[#464555] dark:text-gray-400 uppercase font-semibold block">
                      Charging Power
                    </span>
                    <span className="text-[14px] font-bold text-[#3525cd] dark:text-indigo-400">
                      {station.powerKw} kW
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#464555] dark:text-gray-400 uppercase font-semibold block">
                      Connector Type
                    </span>
                    <span className="text-[12px] font-bold text-[#1a1b22] dark:text-white truncate block">
                      {station.connectorTypes.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#464555] dark:text-gray-400 uppercase font-semibold block">
                      Price / kWh
                    </span>
                    <span className="text-[14px] font-bold text-[#1a1b22] dark:text-white">
                      ${station.pricingPerKwh.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7] dark:border-[#353644] text-[12px]">
                <span className="text-[#464555] dark:text-gray-400">
                  {station.parkingFeeRequired ? 'Parking tariff applies' : 'Complimentary parking'}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    station.name + ', ' + station.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#3525cd] text-white font-bold hover:bg-[#4f46e5] transition-colors"
                >
                  Navigate
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
