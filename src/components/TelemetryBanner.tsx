import React from 'react';

interface TelemetryBannerProps {
  countdown: number;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  centralLots: number;
  cbdLots: number;
  westLots: number;
}

export const TelemetryBanner: React.FC<TelemetryBannerProps> = ({
  countdown,
  onManualRefresh,
  isRefreshing,
  centralLots,
  cbdLots,
  westLots
}) => {
  return (
    <section className="w-full px-4 sm:px-6 max-w-7xl mx-auto py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Central Zone */}
        <div className="bg-white dark:bg-[#252631] p-4 rounded-xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#464555] dark:text-gray-400 uppercase tracking-wider">
              Orchard &amp; Central
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[22px] font-bold tracking-tight text-[#1a1b22] dark:text-white tabular-nums">
              {centralLots.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#464555] dark:text-gray-400">Lots Free</span>
          </div>
          <div className="w-full bg-[#eeedf7] dark:bg-[#353644] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#f59e0b] h-full rounded-full transition-all duration-700"
              style={{ width: '62%' }}
            ></div>
          </div>
          <span className="text-[11px] text-[#464555] dark:text-gray-400 mt-1 block">
            62% Overall Occupancy
          </span>
        </div>

        {/* Marina CBD */}
        <div className="bg-white dark:bg-[#252631] p-4 rounded-xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#464555] dark:text-gray-400 uppercase tracking-wider">
              Marina Bay &amp; CBD
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[22px] font-bold tracking-tight text-[#1a1b22] dark:text-white tabular-nums">
              {cbdLots.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#464555] dark:text-gray-400">Lots Free</span>
          </div>
          <div className="w-full bg-[#eeedf7] dark:bg-[#353644] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#ef4444] h-full rounded-full transition-all duration-700"
              style={{ width: '78%' }}
            ></div>
          </div>
          <span className="text-[11px] text-[#464555] dark:text-gray-400 mt-1 block">
            78% Overall Occupancy
          </span>
        </div>

        {/* Jurong & West */}
        <div className="bg-white dark:bg-[#252631] p-4 rounded-xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#464555] dark:text-gray-400 uppercase tracking-wider">
              Jurong &amp; West
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[22px] font-bold tracking-tight text-[#1a1b22] dark:text-white tabular-nums">
              {westLots.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#464555] dark:text-gray-400">Lots Free</span>
          </div>
          <div className="w-full bg-[#eeedf7] dark:bg-[#353644] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#10b981] h-full rounded-full transition-all duration-700"
              style={{ width: '44%' }}
            ></div>
          </div>
          <span className="text-[11px] text-[#464555] dark:text-gray-400 mt-1 block">
            44% Overall Occupancy
          </span>
        </div>

        {/* Live Sync Monitor */}
        <div className="bg-[#4f46e5] text-white p-4 rounded-xl shadow-xs flex flex-col justify-between relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-100">
              Next Data Refresh
            </span>
            <button
              onClick={onManualRefresh}
              disabled={isRefreshing}
              title="Force Refresh DataMall Streams"
              className="hover:bg-white/20 p-1 rounded-full transition-transform active:rotate-180 text-white disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          </div>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[22px] font-bold tracking-tight text-white tabular-nums">
              {isRefreshing ? 'Syncing...' : `${countdown}s`}
            </span>
            <span className="text-[12px] text-indigo-200">LTA Feed Syncing</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            <span className="text-[11px] font-medium text-indigo-100 truncate">
              GovTech &amp; URA Gateway OK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
