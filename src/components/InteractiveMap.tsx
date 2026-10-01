import React, { useState } from 'react';
import { Carpark } from '../types';

interface InteractiveMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  onPinClick: (carparkId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  onPinClick
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCarpark, setHoveredCarpark] = useState<Carpark | null>(null);
  const [mapMode, setMapMode] = useState<'vector' | 'satellite'>('vector');
  const [centerDistrict, setCenterDistrict] = useState('Orchard MRT (NS22/TE14)');

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.8, +(z + 0.2).toFixed(1)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.8, +(z - 0.2).toFixed(1)));
  const handleRecenter = () => {
    setZoomLevel(1);
    setCenterDistrict('Orchard MRT (NS22/TE14)');
  };

  return (
    <div className="bg-white dark:bg-[#252631] rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] p-4 overflow-hidden relative">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[20px]">
            map
          </span>
          <h4 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
            Singapore Live Vector Map
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMapMode(mapMode === 'vector' ? 'satellite' : 'vector')}
            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300 hover:text-[#1a1b22] dark:hover:text-white transition-colors"
          >
            {mapMode === 'vector' ? 'Street Grid' : 'Aerial View'}
          </button>
          <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/60 text-[11px] text-[#10b981] dark:text-emerald-400 font-semibold uppercase tracking-wide border border-emerald-200/40">
            {carparks.length} Markers in View
          </span>
        </div>
      </div>

      {/* Map Container Viewport */}
      <div
        className={`relative w-full h-80 rounded-xl overflow-hidden shadow-inner select-none transition-colors ${
          mapMode === 'vector'
            ? 'bg-[#f4f2fd] dark:bg-[#1a1b22]'
            : 'bg-[#1e293b]'
        }`}
      >
        {/* Vector SVG Roads & Coastlines Grid for Singapore */}
        <div
          className="w-full h-full relative transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Stylized Singapore Geographic Map & Road Network */}
          <svg
            className="w-full h-full opacity-60 dark:opacity-30 pointer-events-none"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Singapore Island Outline */}
            <path
              d="M 50,150 Q 80,100 160,90 T 320,110 T 360,160 T 310,240 T 160,250 T 60,210 Z"
              fill={mapMode === 'vector' ? '#e2dfff' : '#111827'}
              stroke={mapMode === 'vector' ? '#c7c4d8' : '#374151'}
              strokeWidth="2"
            />
            {/* Jurong Island & Sentosa */}
            <path
              d="M 140,245 Q 170,265 200,255 T 190,280 T 150,270 Z"
              fill={mapMode === 'vector' ? '#d4d0f5' : '#1f2937'}
            />
            <path
              d="M 70,230 Q 100,240 90,260 T 60,250 Z"
              fill={mapMode === 'vector' ? '#d4d0f5' : '#1f2937'}
            />

            {/* Major Expressways: PIE, CTE, AYE, ECP */}
            {/* PIE (West to East) */}
            <path
              d="M 60,170 C 130,150 220,140 340,160"
              stroke={mapMode === 'vector' ? '#3525cd' : '#6366f1'}
              strokeWidth="3"
              strokeDasharray="4 2"
              opacity="0.5"
            />
            {/* CTE (North to South through Central/Orchard) */}
            <path
              d="M 210,100 C 205,140 195,190 190,240"
              stroke={mapMode === 'vector' ? '#7e3000' : '#f59e0b'}
              strokeWidth="3.5"
              opacity="0.6"
            />
            {/* AYE (West through Alexandra to Marina) */}
            <path
              d="M 80,210 C 120,225 170,230 220,240"
              stroke={mapMode === 'vector' ? '#4f46e5' : '#818cf8'}
              strokeWidth="2.5"
              opacity="0.5"
            />
            {/* ECP (Marina to Changi) */}
            <path
              d="M 220,240 C 260,230 310,210 350,170"
              stroke={mapMode === 'vector' ? '#10b981' : '#34d399'}
              strokeWidth="2.5"
              opacity="0.5"
            />

            {/* Central Water Catchment / MacRitchie */}
            <circle cx="190" cy="130" r="16" fill="#a7f3d0" fillOpacity="0.4" />
            <circle cx="215" cy="140" r="10" fill="#a7f3d0" fillOpacity="0.4" />

            {/* Marina Bay Reservoir */}
            <path
              d="M 210,225 Q 225,230 220,245 Z"
              fill="#93c5fd"
              fillOpacity="0.6"
            />
          </svg>

          {/* Interactive Carpark Map Markers */}
          {carparks.map((cp) => {
            const isFull = cp.availableLots === 0;
            const isLimited = cp.availableLots > 0 && cp.availableLots <= 25;
            const isTarget = selectedCarpark?.id === cp.id;

            return (
              <div
                key={cp.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onPinClick(cp.id);
                  onSelectCarpark(cp);
                  setCenterDistrict(cp.name);
                }}
                onMouseEnter={() => setHoveredCarpark(cp)}
                onMouseLeave={() => setHoveredCarpark(null)}
                style={{
                  left: `${cp.mapX}%`,
                  top: `${cp.mapY}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute cursor-pointer transition-transform duration-200 group z-10 ${
                  isTarget ? 'scale-125 z-30' : 'hover:scale-115'
                }`}
              >
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md transition-all ${
                    isFull
                      ? 'bg-[#ef4444] ring-2 ring-red-300'
                      : isLimited
                      ? 'bg-[#f59e0b] ring-2 ring-amber-300'
                      : 'bg-[#10b981] ring-2 ring-emerald-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {isFull ? 'block' : 'local_parking'}
                  </span>
                  <span>{isFull ? 'FULL' : cp.availableLots}</span>
                </div>

                {/* Hover Tooltip Popup Card */}
                {hoveredCarpark?.id === cp.id && (
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-[#1a1b22] p-2.5 rounded-xl shadow-xl z-40 border border-[#eeedf7] dark:border-[#353644] pointer-events-none">
                    <p className="text-[12px] font-bold text-[#1a1b22] dark:text-white truncate">
                      {cp.name}
                    </p>
                    <p
                      className={`text-[11px] font-semibold ${
                        isFull
                          ? 'text-[#ef4444]'
                          : isLimited
                          ? 'text-[#f59e0b]'
                          : 'text-[#10b981]'
                      }`}
                    >
                      {isFull ? '0 lots (Full)' : `${cp.availableLots} lots free • ${cp.rateDisplay}`}
                    </p>
                    <span className="text-[10px] text-[#777587] block mt-0.5">
                      Click to jump to card
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Control Buttons */}
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#1a1b22]/95 backdrop-blur-md rounded-lg p-1 shadow-md flex flex-col gap-1 border border-[#e8e7f1] dark:border-[#353644] z-20">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#f4f2fd] dark:hover:bg-[#353644] text-[#1a1b22] dark:text-white transition-colors"
            title="Zoom in"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <div className="w-full h-px bg-[#eeedf7] dark:bg-[#353644]" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#f4f2fd] dark:hover:bg-[#353644] text-[#1a1b22] dark:text-white transition-colors"
            title="Zoom out"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
        </div>

        {/* Bottom Floating Current Position Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-[#1a1b22]/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center justify-between text-[#1a1b22] dark:text-white border border-[#e8e7f1] dark:border-[#353644] z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3525cd] animate-ping"></span>
            <span className="text-[11px] font-semibold truncate">
              Centered near {centerDistrict}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRecenter}
            className="text-[11px] text-[#3525cd] dark:text-indigo-400 font-bold hover:underline flex-shrink-0 ml-2"
          >
            Recenter
          </button>
        </div>
      </div>
    </div>
  );
};
