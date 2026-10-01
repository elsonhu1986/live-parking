import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-lg rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[20px]">
              verified_user
            </span>
            <h2 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Civic Data Disclaimer &amp; Privacy Policy
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-[13px] text-[#464555] dark:text-gray-300 leading-relaxed overflow-y-auto max-h-[60vh]">
          <div>
            <h4 className="font-bold text-[#1a1b22] dark:text-white mb-1">
              1. Open Data Attribution
            </h4>
            <p>
              Data provided by ParkWhere Live is collected under the Singapore Open Data Licence from
              the Land Transport Authority (LTA DataMall), Housing &amp; Development Board (HDB), and
              Urban Redevelopment Authority (URA).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1b22] dark:text-white mb-1">
              2. Real-Time Telemetry Latency
            </h4>
            <p>
              Carpark slot availability counts are updated at approximately 60-second intervals from
              electronic barrier sensors. During peak periods, actual vacant bays may fluctuate rapidly.
              Motorists must adhere to physical overhead signage and guidance staff.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1b22] dark:text-white mb-1">
              3. Privacy Commitment
            </h4>
            <p>
              ParkWhere Live operates on a zero-tracking principle: no persistent cookies, no user
              account credentials, and no vehicle registration plate storage. Geolocation data is
              processed strictly in memory on your browser client.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3525cd] text-white text-[13px] font-bold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
