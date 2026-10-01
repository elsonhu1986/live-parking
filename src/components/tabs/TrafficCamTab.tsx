import React, { useState } from 'react';
import { TrafficCam } from '../../types';

interface TrafficCamTabProps {
  cameras: TrafficCam[];
  onOpenTrafficCamModal: (cam: TrafficCam) => void;
}

export const TrafficCamTab: React.FC<TrafficCamTabProps> = ({
  cameras,
  onOpenTrafficCamModal
}) => {
  const [selectedExpressway, setSelectedExpressway] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredCams = cameras.filter((cam) => {
    if (selectedExpressway !== 'all' && cam.expressway !== selectedExpressway) return false;
    if (searchQuery && !cam.name.toLowerCase().includes(searchQuery.toLowerCase()) && !cam.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#252631] p-5 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
              LTA EMAS Traffic Surveillance Feed
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#1a1b22] dark:text-white">
            Live Highway &amp; Expressway Cameras
          </h2>
          <p className="text-[13px] text-[#464555] dark:text-gray-300 mt-1">
            Real-time highway camera snapshots along CTE, PIE, AYE, ECP, and arterial flyovers.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold shadow-xs transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Refresh All Cams</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#252631] p-4 rounded-xl border border-[#eeedf7] dark:border-[#353644] shadow-xs">
        <div className="flex-1 flex items-center bg-[#f4f2fd] dark:bg-[#1a1b22] rounded-xl px-3 py-2 border border-[#eeedf7] dark:border-[#353644]">
          <span className="material-symbols-outlined text-[#777587] text-[18px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by flyover, junction, or cam number..."
            className="w-full bg-transparent border-none outline-none text-[13px] text-[#1a1b22] dark:text-white placeholder:text-[#777587]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[12px]">
          {['all', 'CTE', 'PIE', 'AYE', 'ECP'].map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExpressway(exp)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedExpressway === exp
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300 hover:text-[#1a1b22]'
              }`}
            >
              {exp === 'all' ? 'All Expressways' : exp}
            </button>
          ))}
        </div>
      </div>

      {/* Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCams.map((cam) => {
          return (
            <div
              key={`${cam.id}-${refreshKey}`}
              onClick={() => onOpenTrafficCamModal(cam)}
              className="bg-white dark:bg-[#252631] rounded-2xl overflow-hidden border border-[#eeedf7] dark:border-[#353644] shadow-xs hover:shadow-lg transition-all group cursor-pointer"
            >
              {/* Snapshot Viewport */}
              <div className="relative aspect-video bg-[#1e293b] overflow-hidden">
                <img
                  src={cam.imageUrl}
                  alt={cam.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-bold">
                    {cam.cameraNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${
                      cam.condition === 'Fluid'
                        ? 'bg-[#10b981]'
                        : cam.condition === 'Moderate'
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#ef4444]'
                    }`}
                  >
                    {cam.condition} Traffic ({cam.speedKmH} km/h)
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-[12px] flex justify-between items-end">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-[14px] truncate">{cam.name}</p>
                    <p className="text-[11px] opacity-80 truncate">{cam.location}</p>
                  </div>
                  <span className="text-[11px] opacity-90 flex-shrink-0 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping"></span>
                    Live {cam.updatedAgo}
                  </span>
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="p-3.5 flex items-center justify-between text-[12px]">
                <span className="text-[#464555] dark:text-gray-300 font-medium">
                  Expressway: <strong className="text-[#1a1b22] dark:text-white font-bold">{cam.expressway}</strong>
                </span>
                <span className="text-[#3525cd] dark:text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                  <span>Enlarge Snapshot</span>
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
