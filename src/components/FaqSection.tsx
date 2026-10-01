import React, { useState } from 'react';

interface FaqSectionProps {
  onOpenDriverGuide: (guideId: string) => void;
  onOpenCivicPing: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenDriverGuide,
  onOpenCivicPing
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Where does the real-time carpark vacancy data come from?',
      a: 'Data is refreshed every 60 seconds directly via the Land Transport Authority (LTA) DataMall API, Housing & Development Board (HDB) InfoWEB, and the Urban Redevelopment Authority (URA) Civic Gateway.'
    },
    {
      q: 'Is ParkWhere free to use? Do I need to install an app?',
      a: 'ParkWhere is 100% free and open civic infrastructure. It is fully web-based and requires zero mobile app downloads or accounts. You can bookmark it or add it to your home screen for rapid access on iOS and Android.'
    },
    {
      q: 'How accurate is the lot availability count?',
      a: 'Sensor data reflects electronic parking system (EPS) barrier counts with an average latency of under 45 seconds. During peak hours at major shopping centres, lot availability can change rapidly as motorists drive down ramps.'
    },
    {
      q: 'Are EV charging points tracked in real-time?',
      a: 'Yes, we aggregate real-time plug occupancy telemetry for SP Mobility, Shell Recharge, and CDG ENGIE fast chargers across key commercial and HDB hubs.'
    }
  ];

  const guides = [
    {
      id: 'erp-guide',
      title: 'ERP Rates 2025 Comprehensive Guide',
      subtitle: 'Timetables for CTE, KPE, AYE & CBD Gantries'
    },
    {
      id: 'free-parking-guide',
      title: 'Free Parking Across Singapore',
      subtitle: 'Sunday HDB locations & mall lunch hour promotions'
    },
    {
      id: 'cheapest-orchard-guide',
      title: 'Cheapest Parking Near Orchard Road',
      subtitle: 'Save up to $15 on weekend shopping excursions'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-4 sm:px-6 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: FAQ Accordion (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-[#1a1b22] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#252631] rounded-xl p-4 shadow-xs border border-[#eeedf7] dark:border-[#353644] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#1a1b22] dark:text-gray-100 group focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="material-symbols-outlined text-[#777587] group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-transform">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="text-[13px] text-[#464555] dark:text-gray-300 pt-3 mt-2 border-t border-[#eeedf7] dark:border-[#353644] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Driver Guides & Feedback (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-[19px] font-bold text-[#1a1b22] dark:text-white">
            Popular Driver Guides
          </h3>

          <div className="flex flex-col gap-2.5">
            {guides.map((g) => (
              <div
                key={g.id}
                onClick={() => onOpenDriverGuide(g.id)}
                className="p-4 rounded-xl bg-white dark:bg-[#252631] hover:bg-[#f4f2fd] dark:hover:bg-[#353644] transition-all shadow-xs border border-[#eeedf7] dark:border-[#353644] flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-colors">
                    {g.title}
                  </h4>
                  <p className="text-[11px] text-[#464555] dark:text-gray-400 mt-0.5">
                    {g.subtitle}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#777587] group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-1 text-[18px]">
                  arrow_forward
                </span>
              </div>
            ))}
          </div>

          {/* Civic Ping Report Box */}
          <div className="mt-2 p-4 rounded-2xl bg-[#e8e7f1]/70 dark:bg-[#2c2b38] border border-[#d8d6e2] dark:border-[#3f3e4d] flex flex-col gap-1.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a1b22] dark:text-white">
              Report Incorrect Slot Count?
            </span>
            <p className="text-[12px] text-[#464555] dark:text-gray-300 leading-relaxed">
              Community reports help calibrate algorithm accuracy during barrier maintenance.
            </p>
            <button
              type="button"
              onClick={onOpenCivicPing}
              className="mt-2 self-start px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1a1b22] hover:bg-[#f4f2fd] text-[#1a1b22] dark:text-white text-[11px] font-bold shadow-xs transition-colors border border-[#eeedf7] dark:border-[#353644]"
            >
              Submit Civic Ping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
