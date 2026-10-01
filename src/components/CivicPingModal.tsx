import React, { useState } from 'react';

interface CivicPingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carparkNames: string[];
}

export const CivicPingModal: React.FC<CivicPingModalProps> = ({
  isOpen,
  onClose,
  carparkNames
}) => {
  const [selectedCarpark, setSelectedCarpark] = useState(carparkNames[0] || 'Ngee Ann City / Takashimaya');
  const [issueType, setIssueType] = useState('incorrect_slots');
  const [observedLots, setObservedLots] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-lg rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3525cd] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
                Submit Civic Telemetry Ping
              </h2>
              <p className="text-[11px] text-[#464555] dark:text-gray-400">
                Calibrates real-time vacancy models during barrier maintenance
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

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/60 text-[#10b981] flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1b22] dark:text-white">
              Civic Ping Received!
            </h3>
            <p className="text-[13px] text-[#464555] dark:text-gray-300 max-w-xs">
              Thank you for contributing to Singapore&apos;s open civic transport infrastructure. Telemetry updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-[#1a1b22] dark:text-gray-200 mb-1">
                Select Affected Carpark
              </label>
              <select
                value={selectedCarpark}
                onChange={(e) => setSelectedCarpark(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1a1b22] border border-[#eeedf7] dark:border-[#353644] text-[13px] font-medium text-[#1a1b22] dark:text-white outline-none focus:ring-2 focus:ring-[#3525cd]"
              >
                {carparkNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1a1b22] dark:text-gray-200 mb-1">
                Observed Issue
              </label>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <button
                  type="button"
                  onClick={() => setIssueType('incorrect_slots')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    issueType === 'incorrect_slots'
                      ? 'border-[#3525cd] bg-[#eeedf7] dark:bg-indigo-950/40 text-[#3525cd] dark:text-indigo-300 font-bold'
                      : 'border-[#eeedf7] dark:border-[#353644] bg-white dark:bg-[#1a1b22] text-[#464555] dark:text-gray-300'
                  }`}
                >
                  Incorrect Slot Count
                </button>
                <button
                  type="button"
                  onClick={() => setIssueType('faulty_barrier')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    issueType === 'faulty_barrier'
                      ? 'border-[#3525cd] bg-[#eeedf7] dark:bg-indigo-950/40 text-[#3525cd] dark:text-indigo-300 font-bold'
                      : 'border-[#eeedf7] dark:border-[#353644] bg-white dark:bg-[#1a1b22] text-[#464555] dark:text-gray-300'
                  }`}
                >
                  EPS Barrier Malfunction
                </button>
                <button
                  type="button"
                  onClick={() => setIssueType('ev_blocked')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    issueType === 'ev_blocked'
                      ? 'border-[#3525cd] bg-[#eeedf7] dark:bg-indigo-950/40 text-[#3525cd] dark:text-indigo-300 font-bold'
                      : 'border-[#eeedf7] dark:border-[#353644] bg-white dark:bg-[#1a1b22] text-[#464555] dark:text-gray-300'
                  }`}
                >
                  EV Charger Offline / Blocked
                </button>
                <button
                  type="button"
                  onClick={() => setIssueType('maintenance')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    issueType === 'maintenance'
                      ? 'border-[#3525cd] bg-[#eeedf7] dark:bg-indigo-950/40 text-[#3525cd] dark:text-indigo-300 font-bold'
                      : 'border-[#eeedf7] dark:border-[#353644] bg-white dark:bg-[#1a1b22] text-[#464555] dark:text-gray-300'
                  }`}
                >
                  Full Carpark Closed
                </button>
              </div>
            </div>

            {issueType === 'incorrect_slots' && (
              <div>
                <label className="block text-[12px] font-bold text-[#1a1b22] dark:text-gray-200 mb-1">
                  Actual Lots Visible on Overhead Sign
                </label>
                <input
                  type="number"
                  placeholder="e.g. 0 (Full) or 15 lots"
                  value={observedLots}
                  onChange={(e) => setObservedLots(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1a1b22] border border-[#eeedf7] dark:border-[#353644] text-[13px] text-[#1a1b22] dark:text-white outline-none focus:ring-2 focus:ring-[#3525cd]"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-bold text-[#1a1b22] dark:text-gray-200 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Ramp bottleneck on B2, long queue at Somerset exit"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1a1b22] border border-[#eeedf7] dark:border-[#353644] text-[13px] text-[#1a1b22] dark:text-white outline-none focus:ring-2 focus:ring-[#3525cd]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#464555] dark:text-gray-300 hover:bg-[#eeedf7] dark:hover:bg-[#353644] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[13px] font-bold shadow-xs active:scale-95 transition-all"
              >
                Send Civic Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
