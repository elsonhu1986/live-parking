import React from 'react';
import { TrafficCam } from '../types';

interface TrafficCamModalProps {
  camera: TrafficCam | null;
  onClose: () => void;
}

export const TrafficCamModal: React.FC<TrafficCamModalProps> = ({ camera, onClose }) => {
  if (!camera) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black text-white text-[11px] font-mono font-bold">
                {camera.cameraNumber}
              </span>
              <h3 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
                {camera.name}
              </h3>
            </div>
            <p className="text-[12px] text-[#464555] dark:text-gray-400 mt-0.5">
              {camera.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={camera.imageUrl}
            alt={camera.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 bg-[#fbf8ff] dark:bg-[#1a1b22] border-t border-[#eeedf7] dark:border-[#353644] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-3">
            <span className="text-[#464555] dark:text-gray-300">
              Flow Status:{' '}
              <strong className="text-[#10b981] dark:text-emerald-400 font-bold">
                {camera.condition} ({camera.speedKmH} km/h)
              </strong>
            </span>
            <span>•</span>
            <span className="text-[#464555] dark:text-gray-300">
              Feed Stream: <strong className="text-[#1a1b22] dark:text-white">LTA EMAS Cam 1080p</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3525cd] text-white font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
