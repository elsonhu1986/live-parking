import React from 'react';

interface DriverGuideModalProps {
  guideId: string | null;
  onClose: () => void;
}

export const DriverGuideModal: React.FC<DriverGuideModalProps> = ({ guideId, onClose }) => {
  if (!guideId) return null;

  const contentMap: Record<
    string,
    { title: string; subtitle: string; icon: string; sections: { heading: string; body: string }[] }
  > = {
    'erp-guide': {
      title: 'ERP Rates 2025 Comprehensive Guide',
      subtitle: 'Complete timetables and gantry locations across Singapore',
      icon: 'toll',
      sections: [
        {
          heading: '1. CTE Southbound (Moulmein & Braddell)',
          body: 'Between 07:30 and 08:00, the rate starts at $1.00. Peak tariff of $2.00 to $3.00 is charged from 08:00 to 09:30. Rates drop to $1.00 from 09:30 to 10:00 and zero after 10:00 until the evening rush.'
        },
        {
          heading: '2. CBD Core Cordon (Shenton Way, Anson Road, Nicoll Hwy)',
          body: 'Active on weekdays between 08:30 and 19:00. Peak charges ($2.00) apply during morning peak hours (08:30 - 09:30) and evening commute (17:30 - 18:30).'
        },
        {
          heading: '3. AYE & KPE Tunnel Gantries',
          body: 'KPE Defu southbound tunnel active during 07:30 - 09:30 ($1.00 tariff). AYE Jurong Town Hall and Alexandra slip roads operate moderate $0.50 - $1.00 fees during peak hours.'
        },
        {
          heading: '4. ERP 2.0 (OBN On-Board Unit) Transition',
          body: 'All Singapore vehicles are transitioning to satellite-based OBN units. Currently, cordon rates remain identical to legacy gantries with no distance-based billing implemented yet.'
        }
      ]
    },
    'free-parking-guide': {
      title: 'Free Parking Across Singapore',
      subtitle: 'Sunday HDB locations & mall lunch hour promotions',
      icon: 'savings',
      sections: [
        {
          heading: '1. Sunday & Public Holiday HDB Free Parking (FPS)',
          body: 'Most HDB car parks marked with the orange FPS plate provide free parking for cars and motorcycles from 7:30 AM to 10:30 PM on Sundays and gazetted Public Holidays. Red season-holder lots remain restricted.'
        },
        {
          heading: '2. Shopping Mall Lunch Hour Specials',
          body: 'Marina Square offers free weekday lunch parking with $30 spend. Suntec City provides 1st hour free with minimum spending, and VivoCity offers dining rebate vouchers during off-peak hours.'
        },
        {
          heading: '3. URA Couponless Street Parking Grace Period',
          body: 'Standard 10-minute grace periods apply for drive-throughs and pickups across electronic parking systems. Always start your Parking.sg session immediately on street lots to avoid summon enforcement.'
        }
      ]
    },
    'cheapest-orchard-guide': {
      title: 'Cheapest Parking Near Orchard Road',
      subtitle: 'Save up to $15 on weekend shopping and dining excursions',
      icon: 'local_offer',
      sections: [
        {
          heading: '1. Best Value: Far East Plaza & Shaw House',
          body: 'Far East Plaza charges a per-entry flat fee of $3.50 after 5:00 PM on weekdays and weekends, making it one of the most affordable options in the Orchard shopping belt.'
        },
        {
          heading: '2. HDB Alternatives near Orchard',
          body: 'Blk 8/9 Crawford Lane or Jalan Kukoh MSCP offer standard HDB rates ($0.60/30 mins) with a short 5-minute MRT ride or scenic walk into Orchard, bypassing mall peak rates.'
        },
        {
          heading: '3. Plaza Singapura & The Cathay Area',
          body: 'Plaza Singapura offers competitive weekday tiered pricing and immediate undercover connectivity to Dhoby Ghaut interchange (NS, NE, CC lines).'
        }
      ]
    }
  };

  const current = contentMap[guideId] || contentMap['erp-guide'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-xl rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-start justify-between gap-4 bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">{current.icon}</span>
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-[#1a1b22] dark:text-white leading-tight">
                {current.title}
              </h2>
              <p className="text-[12px] text-[#464555] dark:text-gray-400 mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-[#1a1b22] dark:text-gray-100">
          {current.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]"
            >
              <h3 className="text-[14px] font-bold text-[#3525cd] dark:text-indigo-400 mb-1">
                {sec.heading}
              </h3>
              <p className="text-[13px] text-[#464555] dark:text-gray-300 leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold shadow-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
