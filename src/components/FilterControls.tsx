import React from 'react';
import { VehicleType, FilterCategory, SortMode } from '../types';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDetectLocation: () => void;
  isLocating: boolean;
  locationStatus: string | null;
  vehicleType: VehicleType;
  onVehicleTypeChange: (v: VehicleType) => void;
  selectedFilter: FilterCategory;
  onFilterChange: (f: FilterCategory) => void;
  sortMode: SortMode;
  onSortChange: (s: SortMode) => void;
  totalCarparksCount: number;
  availableCarparksCount: number;
  bookmarkedCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  onDetectLocation,
  isLocating,
  locationStatus,
  vehicleType,
  onVehicleTypeChange,
  selectedFilter,
  onFilterChange,
  sortMode,
  onSortChange,
  totalCarparksCount,
  availableCarparksCount,
  bookmarkedCount
}) => {
  return (
    <section className="w-full bg-white dark:bg-[#1a1b22] border-b border-[#e3e1ec] dark:border-[#2f3038] py-4 px-4 sm:px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Search & Geolocation Row */}
        <div className="flex flex-col md:flex-row items-stretch gap-2.5">
          {/* Search Box */}
          <div className="flex-1 relative flex items-center bg-[#f4f2fd] dark:bg-[#252631] rounded-xl px-4 py-2.5 focus-within:bg-white dark:focus-within:bg-[#1a1b22] focus-within:ring-2 focus-within:ring-[#3525cd] shadow-xs transition-all border border-transparent focus-within:border-[#3525cd]/40">
            <span className="material-symbols-outlined text-[#777587] text-[22px] mr-2.5 flex-shrink-0">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by carpark name, street, or 6-digit postal code (e.g. 238801, Orchard, Bishan)"
              className="w-full bg-transparent border-none outline-none text-[14px] text-[#1a1b22] dark:text-white placeholder:text-[#777587]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-[#777587] hover:text-[#1a1b22] dark:hover:text-white transition-colors p-1"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Right Action Tools: Geolocation & Vehicle Mode */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={onDetectLocation}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3525cd] text-white hover:bg-[#4f46e5] shadow-xs active:scale-95 transition-all w-full md:w-auto text-[13px] font-semibold"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isLocating ? 'animate-spin' : 'animate-pulse'
                }`}
              >
                {isLocating ? 'sync' : 'my_location'}
              </span>
              <span>{locationStatus || (isLocating ? 'Locating...' : 'Use Current Location')}</span>
            </button>

            {/* Vehicle Type Selector */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#f4f2fd] dark:bg-[#252631] border border-[#e8e7f1] dark:border-[#353644]">
              <button
                type="button"
                onClick={() => onVehicleTypeChange('car')}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  vehicleType === 'car'
                    ? 'bg-white dark:bg-[#1a1b22] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                    : 'text-[#464555] dark:text-gray-300 hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                Cars
              </button>
              <button
                type="button"
                onClick={() => onVehicleTypeChange('motorcycle')}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  vehicleType === 'motorcycle'
                    ? 'bg-white dark:bg-[#1a1b22] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                    : 'text-[#464555] dark:text-gray-300 hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                Motorcycles
              </button>
              <button
                type="button"
                onClick={() => onVehicleTypeChange('heavy')}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  vehicleType === 'heavy'
                    ? 'bg-white dark:bg-[#1a1b22] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                    : 'text-[#464555] dark:text-gray-300 hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                Heavy
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills & Sorting Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pt-1">
          {/* Scrollable Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              All (3,420)
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('available')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'available'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              Available Now (&gt;20 lots)
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('hdb')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'hdb'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              HDB Parking
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('mall')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'mall'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              Shopping Malls &amp; Commercial
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('ev')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'ev'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              EV Charging Available
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('cheap')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'cheap'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
              }`}
            >
              Cheapest / Free First Hour
            </button>
            {bookmarkedCount > 0 && (
              <button
                type="button"
                onClick={() => onFilterChange('bookmarks')}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === 'bookmarks'
                    ? 'bg-[#3525cd] text-white shadow-xs'
                    : 'bg-[#eeedf7] dark:bg-[#252631] text-[#464555] dark:text-gray-300 hover:bg-[#e8e7f1] dark:hover:bg-[#353644]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">bookmark</span>
                <span>Saved ({bookmarkedCount})</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end lg:self-auto flex-shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#464555] dark:text-gray-400">
              Sort:
            </span>
            <select
              value={sortMode}
              onChange={(e) => onSortChange(e.target.value as SortMode)}
              className="bg-[#f4f2fd] dark:bg-[#252631] hover:bg-[#eeedf7] text-[#1a1b22] dark:text-white text-[12px] font-semibold py-1.5 px-3 rounded-lg border-none outline-none cursor-pointer transition-colors shadow-xs"
            >
              <option value="nearest">Distance: Nearest First</option>
              <option value="available">Most Available Lots</option>
              <option value="rate">Lowest Hourly Rate</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
