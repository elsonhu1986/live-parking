import React from 'react';
import { Carpark, VehicleType } from '../types';

interface CarparkDetailsModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  vehicleType: VehicleType;
}

export const CarparkDetailsModal: React.FC<CarparkDetailsModalProps> = ({
  carpark,
  onClose,
  isBookmarked,
  onToggleBookmark,
  vehicleType
}) => {
  if (!carpark) return null;

  const isFull = carpark.availableLots === 0;
  const isLimited = carpark.availableLots > 0 && carpark.availableLots <= 25;
  const occupancyPercent = Math.min(
    100,
    Math.round(((carpark.totalLots - carpark.availableLots) / carpark.totalLots) * 100)
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    carpark.name + ', ' + carpark.address
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-start justify-between gap-4 bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#353644] text-[11px] font-semibold text-[#464555] dark:text-gray-300 uppercase tracking-wider">
                {carpark.categoryLabel}
              </span>
              <span className="text-[12px] font-semibold text-[#3525cd] dark:text-indigo-400">
                {carpark.distanceMeters < 1000
                  ? `${carpark.distanceMeters}m away`
                  : `${(carpark.distanceMeters / 1000).toFixed(1)}km away`}
              </span>
            </div>
            <h2 className="text-[22px] font-bold text-[#1a1b22] dark:text-white">
              {carpark.name}
            </h2>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 mt-0.5">
              {carpark.address}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-[#1a1b22] dark:text-gray-100">
          {/* Vacancy Meter */}
          <div className="p-4 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isFull
                      ? 'bg-[#ef4444]'
                      : isLimited
                      ? 'bg-[#f59e0b] animate-pulse'
                      : 'bg-[#10b981] animate-ping'
                  }`}
                ></span>
                <span className="text-[14px] font-bold">
                  {isFull
                    ? 'Carpark Currently Full'
                    : isLimited
                    ? 'Limited Lots (Filling Fast)'
                    : 'Ample Parking Available'}
                </span>
              </div>
              <span className="text-[20px] font-bold tabular-nums">
                {carpark.availableLots} / {carpark.totalLots}{' '}
                <span className="text-xs font-normal text-[#464555] dark:text-gray-400">lots</span>
              </span>
            </div>

            <div className="w-full bg-[#eeedf7] dark:bg-[#353644] h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isFull ? 'bg-[#ef4444]' : isLimited ? 'bg-[#f59e0b]' : 'bg-[#10b981]'
                }`}
                style={{ width: `${occupancyPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#464555] dark:text-gray-400 mt-1.5 font-medium">
              <span>Occupancy: {occupancyPercent}%</span>
              <span>Updated {carpark.lastUpdatedSecondsAgo}s ago via LTA</span>
            </div>
          </div>

          {/* Rates Schedule */}
          <div>
            <h3 className="text-[15px] font-bold mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[18px]">
                payments
              </span>
              <span>Parking Rates &amp; Timetable</span>
            </h3>

            <div className="border border-[#eeedf7] dark:border-[#353644] rounded-xl overflow-hidden text-[13px]">
              <div className="p-3 bg-[#fbf8ff] dark:bg-[#1a1b22] border-b border-[#eeedf7] dark:border-[#353644] flex justify-between">
                <span className="font-semibold">Selected Vehicle Mode</span>
                <span className="font-bold text-[#3525cd] dark:text-indigo-400 uppercase">
                  {vehicleType}
                </span>
              </div>
              <div className="p-3 space-y-2 bg-white dark:bg-[#252631]">
                <div className="flex justify-between border-b border-[#f4f2fd] dark:border-[#353644] pb-1.5">
                  <span className="text-[#464555] dark:text-gray-400">Weekday Daytime</span>
                  <span className="font-semibold text-right">
                    {carpark.fullSchedule?.weekdayDay || carpark.rateDisplay}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#f4f2fd] dark:border-[#353644] pb-1.5">
                  <span className="text-[#464555] dark:text-gray-400">Weekday Evening / Night</span>
                  <span className="font-semibold text-right">
                    {carpark.fullSchedule?.weekdayNight || '$3.50 per entry'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#f4f2fd] dark:border-[#353644] pb-1.5">
                  <span className="text-[#464555] dark:text-gray-400">Saturday</span>
                  <span className="font-semibold text-right">
                    {carpark.fullSchedule?.saturday || carpark.rateDisplay}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[#464555] dark:text-gray-400">Sunday &amp; Public Holidays</span>
                  <span className="font-semibold text-right">
                    {carpark.fullSchedule?.sundayHoliday || 'Free or standard Sunday rates'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Specifications */}
          <div>
            <h3 className="text-[15px] font-bold mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[18px]">
                tune
              </span>
              <span>Facility Specifications</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
                <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
                  Grace Period
                </span>
                <span className="text-[14px] font-bold mt-0.5 block">
                  {carpark.gracePeriodMinutes} mins
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
                <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
                  Height Clearance
                </span>
                <span className="text-[14px] font-bold mt-0.5 block">
                  {carpark.fullSchedule?.heightLimitMeters || 2.0}m
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
                <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
                  EPS Type
                </span>
                <span className="text-[14px] font-bold mt-0.5 block">{carpark.epsType}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
                <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
                  Operating Hours
                </span>
                <span className="text-[14px] font-bold mt-0.5 block truncate">
                  {carpark.fullSchedule?.operatingHours || '24 Hours'}
                </span>
              </div>
            </div>
          </div>

          {/* EV Chargers Section if applicable */}
          {carpark.evChargersCount ? (
            <div className="p-3.5 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#10b981] dark:text-emerald-400 text-[24px]">
                  ev_station
                </span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1b22] dark:text-white">
                    {carpark.evChargerNetwork || 'Electric Vehicle Charging'}
                  </h4>
                  <p className="text-[12px] text-[#464555] dark:text-gray-300">
                    {carpark.evChargersCount} plugs available with rapid AC/DC compatibility
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#252631] text-[11px] font-bold text-[#10b981] shadow-xs">
                Active
              </span>
            </div>
          ) : null}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleBookmark(carpark.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors ${
              isBookmarked
                ? 'bg-indigo-100 text-[#3525cd] dark:bg-indigo-900/60 dark:text-indigo-300'
                : 'bg-[#eeedf7] dark:bg-[#353644] text-[#1a1b22] dark:text-white hover:bg-[#e3e1ec]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isBookmarked ? 'Saved' : 'Save Carpark'}</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">directions_car</span>
            <span>Navigate via Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
