import React, { useState } from 'react';

interface FooterProps {
  onSelectQuickFilter: (filterId: string) => void;
  onOpenPrivacyModal: () => void;
  onOpenApiStatusModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectQuickFilter,
  onOpenPrivacyModal,
  onOpenApiStatusModal
}) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1WnNFG7hCYgHJ4RspmJ9AUCPNkfXMPhP2ZpWKEDZeEQk-VBeYLfzxdE9n8WX_AgUaiTX1tvf7vlNHmOJvnh1cmapp4T_b-bESIiqfISYx3SxuJ-XyNsZZ_3o1U14eexbGGC_tG5voorGRh-Wec4Yy1UrW4ZJN5LaUuPB-jK1jOErdBUolte9-VkqwOOj16xXVsj8qSAR3R9-HakWXj6bJydJhVfyL3QTy8qZ5srZClDNLsmquwSDwo3B3M';

  return (
    <footer className="w-full bg-[#f4f2fd] dark:bg-[#1a1b22] mt-12 border-t border-[#eeedf7] dark:border-[#2f3038] transition-colors">
      <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & GovTech Disclaimer */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-2.5">
              {!imgError ? (
                <img
                  src={logoUrl}
                  alt="ParkWhere Live Logo"
                  className="h-6 w-auto object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="h-6 w-6 rounded-md bg-[#3525cd] flex items-center justify-center text-white text-xs font-bold">
                  P
                </div>
              )}
              <span className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
                ParkWhere Live
              </span>
            </div>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 max-w-md mb-3 leading-relaxed">
              Real-time Singapore metropolitan telemetry providing live carpark occupancy, dynamic ERP
              rates, EV charging stall statuses, and highway surveillance cameras.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#e8e7f1] dark:bg-[#252631] border border-[#d8d6e2] dark:border-[#353644]">
              <span className="material-symbols-outlined text-[#777587] text-[16px]">info</span>
              <span className="text-[11px] text-[#464555] dark:text-gray-300">
                Data sourced via LTA DataMall, HDB InfoWEB, and URA Open APIs.
              </span>
            </div>
          </div>

          {/* Quick Telemetry */}
          <div>
            <h4 className="text-[13px] font-bold text-[#1a1b22] dark:text-white mb-3 uppercase tracking-wider">
              Quick Telemetry
            </h4>
            <ul className="space-y-2 text-[12px] text-[#464555] dark:text-gray-300">
              <li
                onClick={() => onSelectQuickFilter('cbd')}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                CBD &amp; Marina Bay Lots
              </li>
              <li
                onClick={() => onSelectQuickFilter('hdb')}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                HDB Season &amp; Visitor Lots
              </li>
              <li
                onClick={() => onSelectQuickFilter('erp')}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Active ERP Gantries
              </li>
              <li
                onClick={() => onSelectQuickFilter('ev')}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                High-Power EV Fast Chargers
              </li>
            </ul>
          </div>

          {/* Platform & Help */}
          <div>
            <h4 className="text-[13px] font-bold text-[#1a1b22] dark:text-white mb-3 uppercase tracking-wider">
              Platform &amp; Help
            </h4>
            <ul className="space-y-2 text-[12px] text-[#464555] dark:text-gray-300">
              <li
                onClick={onOpenApiStatusModal}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <span>API Integration Status</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
              </li>
              <li
                onClick={onOpenPrivacyModal}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Civic Data Disclaimer
              </li>
              <li
                onClick={onOpenPrivacyModal}
                className="hover:text-[#3525cd] dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Privacy &amp; Telemetry Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Compliance */}
        <div className="pt-4 border-t border-[#eeedf7] dark:border-[#2f3038] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777587] dark:text-gray-400">
          <p>© 2025 ParkWhere Live. Open Civic Infrastructure Platform.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-[#1a1b22] dark:hover:text-white cursor-pointer transition-colors">
              DataMall Compliant
            </span>
            <span>•</span>
            <span className="hover:text-[#1a1b22] dark:hover:text-white cursor-pointer transition-colors">
              Singapore GovTech Open Data
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#10b981] dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              System Healthy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
