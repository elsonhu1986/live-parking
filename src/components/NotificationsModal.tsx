import React from 'react';
import { DriverNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DriverNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#252631] w-full max-w-md rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#353644] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#eeedf7] dark:border-[#353644] flex items-center justify-between bg-[#fbf8ff] dark:bg-[#1a1b22]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[20px]">
              notifications
            </span>
            <h3 className="text-[16px] font-bold text-[#1a1b22] dark:text-white">
              Driver Telemetry &amp; Alerts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#eeedf7] dark:bg-[#353644] hover:bg-[#e3e1ec] dark:hover:bg-[#464757] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border text-[13px] transition-all ${
                item.isRead
                  ? 'bg-white dark:bg-[#1f202b] border-[#eeedf7] dark:border-[#353644]'
                  : 'bg-[#f4f2fd] dark:bg-indigo-950/30 border-[#3525cd]/30 dark:border-indigo-500/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-[#1a1b22] dark:text-white truncate">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#777587] dark:text-gray-400 flex-shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-[#464555] dark:text-gray-300 text-[12px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#eeedf7] dark:border-[#353644] bg-[#fbf8ff] dark:bg-[#1a1b22] flex justify-between items-center text-[12px]">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-[#3525cd] dark:text-indigo-400 font-semibold hover:underline"
          >
            Mark all as read
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#3525cd] text-white font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
