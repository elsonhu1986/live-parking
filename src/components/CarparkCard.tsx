import React from 'react';
import { Carpark, VehicleType } from '../types';

interface CarparkCardProps {
  carpark: Carpark;
  vehicleType: VehicleType;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectCarpark: (carpark: Carpark) => void;
  onReroute: (targetId: string) => void;
  isSelected?: boolean;
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  vehicleType,
  isBookmarked,
  onToggleBookmark,
  onSelectCarpark,
  onReroute,
  isSelected
}) => {
  const isFull = carpark.availableLots === 0;
  const isLimited = carpark.availableLots > 0 && carpark.availableLots <= 25;
  const isVacant = carpark.availableLots > 25;

  const occupancyRate = Math.min(
    100,
    Math.round(((carpark.totalLots - carpark.availableLots) / carpark.totalLots) * 100)
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    carpark.name + ', ' + carpark.address
  )}`;

  return (
    <article
      id={`card-${carpark.id}`}
      onClick={() => onSelectCarpark(carpark)}
      className={`carpark-card bg-white dark:bg-[#252631] rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 relative overflow-hidden group cursor-pointer border ${
        isSelected
          ? 'border-[#3525cd] ring-2 ring-[#3525cd]/30 dark:border-indigo-400'
          : 'border-[#eeedf7] dark:border-[#353644] hover:border-[#3525cd]/40'
      }`}
    >
      {/* Top Header: Category Tag & Distance */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#353644] text-[11px] font-semibold text-[#464555] dark:text-gray-300 uppercase tracking-wider">
              {carpark.categoryLabel}
            </span>
            <span className="flex items-center text-[#3525cd] dark:text-indigo-400 text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px] mr-0.5">near_me</span>
              {carpark.distanceMeters < 1000
                ? `${carpark.distanceMeters}m`
                : `${(carpark.distanceMeters / 1000).toFixed(1)}km`}{' '}
              {carpark.walkTimeMinutes ? `• ${carpark.walkTimeMinutes} min walk` : ''}
            </span>
          </div>

          <h3 className="text-[19px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-colors">
            {carpark.name}
          </h3>
          <p className="text-[12px] text-[#464555] dark:text-gray-400 mt-0.5">
            {carpark.address}
          </p>
        </div>

        {/* Lots Telemetry Badge */}
        <div className="flex flex-col items-start sm:items-end flex-shrink-0">
          {isVacant && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/60 text-[#10b981] dark:text-emerald-400 shadow-xs border border-emerald-200/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
              <span className="text-[20px] font-bold tabular-nums leading-none">
                {carpark.availableLots}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-tight">lots free</span>
            </div>
          )}

          {isLimited && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fffbeb] dark:bg-amber-950/60 text-[#f59e0b] dark:text-amber-400 shadow-xs border border-amber-200/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
              <span className="text-[20px] font-bold tabular-nums leading-none">
                {carpark.availableLots}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-tight">lots free</span>
            </div>
          )}

          {isFull && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fef2f2] dark:bg-red-950/60 text-[#ef4444] dark:text-red-400 shadow-xs border border-red-200/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
              <span className="text-[20px] font-bold tabular-nums leading-none">0</span>
              <span className="text-[11px] font-bold uppercase tracking-tight">lots (FULL)</span>
            </div>
          )}

          <span className="text-[11px] text-[#464555] dark:text-gray-400 mt-1 font-medium">
            {isFull
              ? 'Est. wait: ~15 mins queue'
              : isLimited
              ? `${carpark.availableLots} / ${carpark.totalLots} lots • Filling Fast`
              : `${carpark.availableLots} / ${carpark.totalLots} lots total`}
          </span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="w-full bg-[#eeedf7] dark:bg-[#353644] h-2 rounded-full mb-3.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull
              ? 'bg-[#ef4444]'
              : isLimited
              ? 'bg-[#f59e0b]'
              : 'bg-[#10b981]'
          }`}
          style={{ width: `${occupancyRate}%` }}
        ></div>
      </div>

      {/* Alternative Suggestion Banner for FULL Carparks */}
      {isFull && carpark.alternativeSuggestion && (
        <div className="p-3 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 mb-3.5 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#10b981] dark:text-emerald-400 text-[22px] flex-shrink-0">
              assistant_navigation
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#10b981] dark:text-emerald-400 uppercase tracking-wider block">
                Recommended Alternative
              </span>
              <p className="text-[12px] font-semibold text-[#1a1b22] dark:text-gray-100 truncate">
                {carpark.alternativeSuggestion.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReroute(carpark.alternativeSuggestion!.id);
            }}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#252631] hover:bg-[#f4f2fd] text-[#3525cd] dark:text-indigo-300 text-[11px] font-bold shadow-xs flex-shrink-0 transition-all border border-[#eeedf7] dark:border-[#353644]"
          >
            Reroute There
          </button>
        </div>
      )}

      {/* Quick Telemetry & Rates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] mb-3.5 border border-[#eeedf7]/60 dark:border-[#353644]/60">
        <div>
          <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
            {carpark.category === 'hdb' ? 'HDB Standard Rate' : 'Hourly Rate'}
          </span>
          <span className="text-[13px] font-bold text-[#1a1b22] dark:text-gray-100">
            {vehicleType === 'motorcycle'
              ? carpark.vehicleRates?.motorcycle || '$0.65'
              : vehicleType === 'heavy'
              ? carpark.vehicleRates?.heavy || '$3.00/hr'
              : carpark.rateDisplay}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
            {carpark.nightParkingFree ? 'Night Parking' : 'Grace Period'}
          </span>
          <span
            className={`text-[13px] font-bold ${
              carpark.nightParkingFree
                ? 'text-[#10b981] dark:text-emerald-400'
                : 'text-[#1a1b22] dark:text-gray-100'
            }`}
          >
            {carpark.nightParkingFree ? 'Free after 10:30 PM' : `${carpark.gracePeriodMinutes} Minutes`}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[11px] text-[#464555] dark:text-gray-400 block font-medium">
            {carpark.seasonHolderPriority ? 'Season Priority' : 'EPS Gantry'}
          </span>
          <span className="text-[13px] font-bold text-[#1a1b22] dark:text-gray-100 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#10b981]">
              check_circle
            </span>
            <span>{carpark.seasonHolderPriority || carpark.epsType}</span>
          </span>
        </div>
      </div>

      {/* Feature Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        {carpark.features.map((feature, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#eeedf7] dark:bg-[#353644] text-[11px] font-medium text-[#464555] dark:text-gray-300"
          >
            {feature.includes('EV') && (
              <span className="material-symbols-outlined text-[14px] text-[#3525cd] dark:text-indigo-400">
                ev_station
              </span>
            )}
            {feature.includes('Sheltered') && (
              <span className="material-symbols-outlined text-[14px] text-[#777587]">
                roofing
              </span>
            )}
            {feature.includes('Handicap') && (
              <span className="material-symbols-outlined text-[14px] text-[#777587]">
                accessible
              </span>
            )}
            {feature.includes('Car Wash') && (
              <span className="material-symbols-outlined text-[14px] text-[#3525cd]">
                local_car_wash
              </span>
            )}
            <span>{feature}</span>
          </span>
        ))}
      </div>

      {/* Actions & ERP tag */}
      <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7] dark:border-[#353644] gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[12px] font-semibold shadow-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">directions_car</span>
            <span>Open in Google Maps</span>
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(carpark.id);
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark carpark'}
            className={`p-2 rounded-xl transition-colors ${
              isBookmarked
                ? 'bg-indigo-100 text-[#3525cd] dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] text-[#464555] dark:text-gray-300'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isBookmarked ? 'material-symbols-filled text-[#3525cd] dark:text-indigo-400' : ''
              }`}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectCarpark(carpark);
            }}
            className="px-3 py-2 rounded-xl bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] text-[#1a1b22] dark:text-gray-200 text-[12px] font-semibold transition-colors"
          >
            Full Details
          </button>
        </div>

        {carpark.erpOnRoute !== undefined ? (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eeedf7] dark:bg-[#353644] text-[11px] text-[#464555] dark:text-gray-300 font-medium">
            <span className="material-symbols-outlined text-[15px] text-[#7e3000] dark:text-amber-500">
              toll
            </span>
            <span>
              ERP on Route:{' '}
              <strong className="text-[#1a1b22] dark:text-white font-bold">
                ${carpark.erpOnRoute.toFixed(2)}
              </strong>
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-[#777587] dark:text-gray-400">
            Updated {carpark.lastUpdatedSecondsAgo}s ago
          </span>
        )}
      </div>
    </article>
  );
};
