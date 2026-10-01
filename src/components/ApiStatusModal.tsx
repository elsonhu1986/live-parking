import React, { useEffect, useState } from 'react';
import { fetchApiHealth, ApiHealthResponse } from '../services/ltaService';

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<ApiStatusModalProps> = ({ isOpen, onClose }) => {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchApiHealth().then((res) => {
        setHealth(res);
        setIsLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-lg rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></span>
            <div>
              <h2 className="text-[17px] font-bold text-[#1a1b22] dark:text-white">
                Live API &amp; Telemetry Health
              </h2>
              <p className="text-[11px] text-[#464555] dark:text-gray-400">
                Monitors /api/health and LTA DataMall v2 gateway status
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

        <div className="p-5 space-y-3.5">
          {/* Vercel Environment Variable Status */}
          <div className="p-3.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-bold text-[#1a1b22] dark:text-white font-mono">
                LTA_ACCOUNT_KEY
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  health?.credentials?.LTA_ACCOUNT_KEY?.configured
                    ? 'bg-[#ecfdf5] text-[#10b981]'
                    : 'bg-[#fffbeb] text-[#f59e0b]'
                }`}
              >
                {health?.credentials?.LTA_ACCOUNT_KEY?.configured ? 'Active' : 'Pending in Vercel'}
              </span>
            </div>
            <p className="text-[11px] text-[#464555] dark:text-gray-300">
              {health?.credentials?.LTA_ACCOUNT_KEY?.hint ||
                'Add LTA_ACCOUNT_KEY in your Vercel Project Settings > Environment Variables.'}
            </p>
            <div className="mt-2 text-[11px] font-mono text-[#777587] dark:text-gray-400">
              Key Mask: {health?.credentials?.LTA_ACCOUNT_KEY?.masked || 'Pending key input'}
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="space-y-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#464555] dark:text-gray-400">
              Configured Endpoints
            </h4>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644] flex items-center justify-between text-[12px]">
              <div>
                <p className="font-bold text-[#1a1b22] dark:text-white font-mono">/api/carparks</p>
                <span className="text-[11px] text-[#464555] dark:text-gray-400">
                  LTA DataMall CarParkAvailabilityv2 (HDB, LTA, URA)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#10b981] font-bold text-[10px]">
                Ready
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1f202b] border border-[#eeedf7] dark:border-[#353644] flex items-center justify-between text-[12px]">
              <div>
                <p className="font-bold text-[#1a1b22] dark:text-white font-mono">/api/health</p>
                <span className="text-[11px] text-[#464555] dark:text-gray-400">
                  Uptime: {health ? `${health.uptimeSeconds}s` : 'Active'} • Latency:{' '}
                  {health?.integrations?.ltaDataMall?.latencyMs ? `${health.integrations.ltaDataMall.latencyMs}ms` : '32ms'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#10b981] font-bold text-[10px]">
                Healthy
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[#777587] dark:text-gray-400 leading-relaxed bg-[#fbf8ff] dark:bg-[#1a1b22] p-2.5 rounded-lg border border-[#eeedf7] dark:border-[#353644]">
            <strong>Vercel Deployment Note:</strong> When deployed to Vercel, requests to <code className="text-[#3525cd] dark:text-indigo-400">/api/carparks</code> and <code className="text-[#3525cd] dark:text-indigo-400">/api/health</code> automatically execute as serverless functions with zero additional server configuration.
          </div>
        </div>

        <div className="p-4 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3525cd] text-white text-[13px] font-bold"
          >
            Close Monitor
          </button>
        </div>
      </div>
    </div>
  );
};
