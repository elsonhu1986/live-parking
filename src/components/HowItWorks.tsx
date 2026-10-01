import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-12 mt-8 bg-[#f4f2fd] dark:bg-[#1f202b] border-y border-[#eeedf7] dark:border-[#2f3038] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#3525cd] dark:text-indigo-400 uppercase tracking-widest">
            Zero Lag • Civic Infrastructure
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1a1b22] dark:text-white mt-1.5 tracking-tight">
            How ParkWhere Works
          </h2>
          <p className="text-[14px] text-[#464555] dark:text-gray-300 mt-2 leading-relaxed">
            Designed specifically for hurried Singapore motorists. Fast, lightweight, zero registration,
            and powered by direct government telemetry streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#252631] p-6 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#3525cd] text-white flex items-center justify-center text-[20px] font-bold mb-4 shadow-xs">
              1
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1b22] dark:text-white mb-2">
              Detect or Search Spot
            </h3>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 leading-relaxed">
              Tap &ldquo;Use Current Location&rdquo; or type any 6-digit postal code, mall, or HDB
              estate. Our geocoding locates lots within a 2km radius instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#252631] p-6 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center text-[20px] font-bold mb-4 shadow-xs">
              2
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1b22] dark:text-white mb-2">
              Scan Live Colour Codes
            </h3>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 leading-relaxed">
              Emerald Green indicates ample vacancy (&gt;20 lots), Amber means filling rapidly, and
              Crimson indicates a full carpark with queue times.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#252631] p-6 rounded-2xl shadow-xs border border-[#eeedf7] dark:border-[#353644] flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#4d44e3] text-white flex items-center justify-center text-[20px] font-bold mb-4 shadow-xs">
              3
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1b22] dark:text-white mb-2">
              One-Tap Nav &amp; ERP Check
            </h3>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 leading-relaxed">
              Launch directly into Google Maps, Apple Maps, or Waze while checking active ERP gantry
              rates along your highway route.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
