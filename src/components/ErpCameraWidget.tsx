import React, { useState } from 'react';
import { TrafficCam } from '../types';

interface ErpCameraWidgetProps {
  cameras: TrafficCam[];
  onOpenTrafficCamModal: (cam: TrafficCam) => void;
  onOpenErpGuide: () => void;
}

export const ErpCameraWidget: React.FC<ErpCameraWidgetProps> = ({
  cameras,
  onOpenTrafficCamModal,
  onOpenErpGuide
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCamIndex, setSelectedCamIndex] = useState(0);

  const activeCam = cameras[selectedCamIndex] || cameras[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Collapsible Accordion Card */}
      <div className="bg-white dark:bg-[#252631] rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] p-4 transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e3000] dark:text-amber-500 text-[20px]">
              videocam
            </span>
            <h4 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Nearby ERP &amp; Expressway Cam
            </h4>
          </div>
          <span
            className={`material-symbols-outlined text-[#464555] dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>

        {isOpen && (
          <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-[#eeedf7] dark:border-[#353644]">
            {/* ERP Gantry Snapshot */}
            <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] flex items-center justify-between border border-[#eeedf7]/60 dark:border-[#353644]/60">
              <div>
                <span className="text-[11px] text-[#464555] dark:text-gray-400 uppercase font-bold tracking-wider">
                  CTE Gantries (Southbound)
                </span>
                <p className="text-[13px] text-[#1a1b22] dark:text-gray-100 mt-0.5">
                  Current active tariff: <strong className="font-bold">$1.50</strong> (08:30 - 09:00)
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 rounded bg-[#ffdbcc] dark:bg-amber-950/70 text-[11px] text-[#351000] dark:text-amber-300 font-bold uppercase tracking-wide">
                  Active
                </span>
                <button
                  type="button"
                  onClick={onOpenErpGuide}
                  title="View full ERP schedule"
                  className="p-1 text-[#3525cd] dark:text-indigo-400 hover:bg-[#eeedf7] dark:hover:bg-[#353644] rounded"
                >
                  <span className="material-symbols-outlined text-[17px]">info</span>
                </button>
              </div>
            </div>

            {/* Camera Selector Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {cameras.map((cam, idx) => (
                <button
                  key={cam.id}
                  type="button"
                  onClick={() => setSelectedCamIndex(idx)}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap transition-colors ${
                    selectedCamIndex === idx
                      ? 'bg-[#3525cd] text-white shadow-xs'
                      : 'bg-[#eeedf7] dark:bg-[#353644] text-[#464555] dark:text-gray-300 hover:text-[#1a1b22]'
                  }`}
                >
                  {cam.cameraNumber}
                </button>
              ))}
            </div>

            {/* Highway Camera Snapshot with Fallback */}
            <div
              onClick={() => onOpenTrafficCamModal(activeCam)}
              className="rounded-xl overflow-hidden bg-[#e3e1ec] dark:bg-[#1a1b22] relative group cursor-pointer aspect-video sm:aspect-auto sm:h-36 shadow-xs"
            >
              <img
                src={activeCam.imageUrl}
                alt={activeCam.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="truncate pr-2">
                  {activeCam.name} ({activeCam.cameraNumber})
                </span>
                <span className="opacity-90 flex-shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  Live {activeCam.updatedAgo}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pro-Tip for Singapore Drivers Banner */}
      <div className="p-4 rounded-2xl bg-[#e5e1e4] dark:bg-[#2c2b30] text-[#656466] dark:text-gray-300 shadow-xs flex items-start gap-3 border border-[#d6d3d6] dark:border-[#3d3c42]">
        <span className="material-symbols-outlined text-[#656466] dark:text-gray-300 text-[24px] flex-shrink-0 mt-0.5">
          lightbulb
        </span>
        <div>
          <h5 className="text-[13px] font-bold text-[#1a1b22] dark:text-white">
            Pro-Tip for Singapore Drivers
          </h5>
          <p className="text-[12px] mt-0.5 leading-relaxed">
            Sunday &amp; Public Holiday free parking rules apply at selected HDB car parks between 7:30
            AM and 10:30 PM. Always check orange parking notices on entrance gantries!
          </p>
        </div>
      </div>
    </div>
  );
};
