import React, { useState } from 'react';
import { Carpark, VehicleType } from '../../types';

interface MapViewTabProps {
  carparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
  vehicleType: VehicleType;
}

export const MapViewTab: React.FC<MapViewTabProps> = ({
  carparks,
  onSelectCarpark,
  vehicleType
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'available' | 'mall' | 'hdb'>('all');
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState('');

  const filteredCarparks = carparks.filter((cp) => {
    if (search && !cp.name.toLowerCase().includes(search.toLowerCase()) && !cp.address.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filterType === 'available') return cp.availableLots > 20;
    if (filterType === 'mall') return cp.category === 'mall';
    if (filterType === 'hdb') return cp.category === 'hdb';
    return true;
  });

  const activeCarpark = carparks.find((c) => c.id === selectedPinId) || filteredCarparks[0];

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col md:flex-row relative overflow-hidden bg-[#fbf8ff] dark:bg-[#1a1b22]">
      {/* Left Sidebar Drawer: Carpark Selection Rail (380px) */}
      <div className="w-full md:w-96 h-1/2 md:h-full bg-white dark:bg-[#252631] border-r border-[#eeedf7] dark:border-[#353644] flex flex-col shadow-md z-20">
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-[#eeedf7] dark:border-[#353644] space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400">
                map
              </span>
              <span>Singapore Live Map</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/60 text-[#10b981] dark:text-emerald-400 text-[11px] font-bold">
              {filteredCarparks.length} Live Spots
            </span>
          </div>

          <div className="flex items-center bg-[#f4f2fd] dark:bg-[#1a1b22] rounded-xl px-3 py-1.5 border border-[#eeedf7] dark:border-[#353644]">
            <span className="material-symbols-outlined text-[#777587] text-[18px] mr-2">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name or district..."
              className="w-full bg-transparent border-none outline-none text-[12px] text-[#1a1b22] dark:text-white"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
                filterType === 'all'
                  ? 'bg-[#3525cd] text-white'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('available')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
                filterType === 'available'
                  ? 'bg-[#3525cd] text-white'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300'
              }`}
            >
              &gt;20 Lots
            </button>
            <button
              onClick={() => setFilterType('mall')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
                filterType === 'mall'
                  ? 'bg-[#3525cd] text-white'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300'
              }`}
            >
              Malls
            </button>
            <button
              onClick={() => setFilterType('hdb')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
                filterType === 'hdb'
                  ? 'bg-[#3525cd] text-white'
                  : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300'
              }`}
            >
              HDB
            </button>
          </div>
        </div>

        {/* Scrollable Carpark List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#eeedf7] dark:divide-[#353644]">
          {filteredCarparks.map((cp) => {
            const isSelected = cp.id === selectedPinId;
            const isFull = cp.availableLots === 0;
            return (
              <div
                key={cp.id}
                onClick={() => setSelectedPinId(cp.id)}
                className={`p-3.5 hover:bg-[#f4f2fd] dark:hover:bg-[#1a1b22] transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#eeedf7] dark:bg-[#1f202b] border-l-4 border-[#3525cd]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-[#1a1b22] dark:text-white truncate">
                      {cp.name}
                    </h4>
                    <p className="text-[11px] text-[#464555] dark:text-gray-400 truncate">
                      {cp.address}
                    </p>
                    <span className="text-[11px] font-semibold text-[#3525cd] dark:text-indigo-400 mt-1 inline-block">
                      {cp.rateDisplay}
                    </span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg text-[12px] font-bold ${
                        isFull
                          ? 'bg-[#fef2f2] text-[#ef4444]'
                          : cp.availableLots <= 25
                          ? 'bg-[#fffbeb] text-[#f59e0b]'
                          : 'bg-[#ecfdf5] text-[#10b981]'
                      }`}
                    >
                      {isFull ? 'FULL' : `${cp.availableLots} lots`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Full-Screen Map Container */}
      <div className="flex-1 h-1/2 md:h-full relative overflow-hidden bg-[#e2dfff]/40 dark:bg-[#111827]">
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#252631]/95 backdrop-blur-md rounded-xl p-1 shadow-md flex flex-col gap-1 border border-[#eeedf7] dark:border-[#353644] z-30">
          <button
            onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(1)))}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f4f2fd] dark:hover:bg-[#353644] text-[#1a1b22] dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <div className="w-full h-px bg-[#eeedf7] dark:bg-[#353644]" />
          <button
            onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.2).toFixed(1)))}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f4f2fd] dark:hover:bg-[#353644] text-[#1a1b22] dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
        </div>

        {/* Map Canvas */}
        <div
          className="w-full h-full relative transition-transform duration-300 origin-center flex items-center justify-center p-8"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Scalable Singapore Map SVG */}
          <div className="relative w-full max-w-4xl aspect-[4/3] bg-white/50 dark:bg-[#1a1b22]/50 rounded-3xl p-6 shadow-inner border border-white/80 dark:border-gray-800">
            <svg
              className="w-full h-full opacity-70 dark:opacity-30"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50,150 Q 80,100 160,90 T 320,110 T 360,160 T 310,240 T 160,250 T 60,210 Z"
                fill="#d5d0ff"
                stroke="#3525cd"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 60,170 C 130,150 220,140 340,160"
                stroke="#4f46e5"
                strokeWidth="3"
                strokeDasharray="4 2"
                opacity="0.5"
              />
              <path
                d="M 210,100 C 205,140 195,190 190,240"
                stroke="#f59e0b"
                strokeWidth="3"
                opacity="0.5"
              />
            </svg>

            {/* Pins */}
            {filteredCarparks.map((cp) => {
              const isSelected = cp.id === (selectedPinId || activeCarpark?.id);
              const isFull = cp.availableLots === 0;
              return (
                <div
                  key={cp.id}
                  onClick={() => setSelectedPinId(cp.id)}
                  style={{
                    left: `${cp.mapX}%`,
                    top: `${cp.mapY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute cursor-pointer transition-all duration-200 z-10 ${
                    isSelected ? 'scale-125 z-30 ring-4 ring-[#3525cd]/40 rounded-full' : 'hover:scale-115'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[12px] font-bold shadow-lg ${
                      isFull
                        ? 'bg-[#ef4444]'
                        : cp.availableLots <= 25
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#10b981]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isFull ? 'block' : 'local_parking'}
                    </span>
                    <span>{isFull ? 'FULL' : cp.availableLots}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Carpark Bottom Action Card (Floating on Map) */}
        {activeCarpark && (
          <div className="absolute bottom-5 left-5 right-5 md:left-auto md:right-5 md:w-96 bg-white dark:bg-[#252631] p-4 rounded-2xl shadow-xl border border-[#eeedf7] dark:border-[#353644] z-30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3525cd] dark:text-indigo-400">
                  {activeCarpark.categoryLabel}
                </span>
                <h3 className="text-[16px] font-bold text-[#1a1b22] dark:text-white leading-tight">
                  {activeCarpark.name}
                </h3>
                <p className="text-[12px] text-[#464555] dark:text-gray-300 mt-0.5">
                  {activeCarpark.address}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[12px] font-bold text-[#10b981]">
                    {activeCarpark.availableLots} lots available
                  </span>
                  <span>•</span>
                  <span className="text-[12px] text-[#464555] dark:text-gray-300 font-semibold">
                    {activeCarpark.rateDisplay}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectCarpark(activeCarpark)}
                className="px-3 py-2 rounded-xl bg-[#3525cd] text-white text-[12px] font-bold flex-shrink-0 shadow-xs"
              >
                Inspect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
