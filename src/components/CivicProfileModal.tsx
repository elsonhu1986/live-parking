import React from 'react';
import { VehicleType } from '../types';

interface CivicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleType: VehicleType;
  onVehicleTypeChange: (v: VehicleType) => void;
  savedCount: number;
}

export const CivicProfileModal: React.FC<CivicProfileModalProps> = ({
  isOpen,
  onClose,
  vehicleType,
  onVehicleTypeChange,
  savedCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-md rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center font-bold text-lg">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
                Driver Profile &amp; Preferences
              </h2>
              <p className="text-[11px] text-[#464555] dark:text-gray-400">
                Civic Open Infrastructure • Zero Login Required
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-[13px] text-[#1a1b22] dark:text-gray-100">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-[#464555] dark:text-gray-400 mb-2">
              Default Vehicle Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['car', 'motorcycle', 'heavy'] as VehicleType[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => onVehicleTypeChange(v)}
                  className={`p-2.5 rounded-xl border text-center font-bold capitalize transition-all ${
                    vehicleType === v
                      ? 'border-[#3525cd] bg-[#eeedf7] dark:bg-indigo-950/50 text-[#3525cd] dark:text-indigo-300'
                      : 'border-[#eeedf7] dark:border-[#353644] bg-white dark:bg-[#1f202b] text-[#464555] dark:text-gray-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#464555] dark:text-gray-400">Saved Carparks</span>
              <span className="font-bold text-[#3525cd] dark:text-indigo-400">{savedCount} locations</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#464555] dark:text-gray-400">Telemetry Feed</span>
              <span className="font-bold text-[#10b981] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                LTA DataMall v2
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#464555] dark:text-gray-400">ERP 2.0 OBN Sync</span>
              <span className="font-bold text-[#1a1b22] dark:text-white">Active (Virtual)</span>
            </div>
          </div>

          <div className="text-[11px] text-[#777587] dark:text-gray-400 leading-relaxed">
            ParkWhere Live respects driver privacy: zero analytics tracking, zero account passwords,
            and 100% client-side preference storage.
          </div>
        </div>

        <div className="p-4 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
