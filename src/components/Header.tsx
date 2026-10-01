import React from 'react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDetectLocation: () => void;
  isLocating: boolean;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCivicProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onDetectLocation,
  isLocating,
  onOpenNotifications,
  unreadNotificationsCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenCivicProfile
}) => {
  const [imgError, setImgError] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1WnNFG7hCYgHJ4RspmJ9AUCPNkfXMPhP2ZpWKEDZeEQk-VBeYLfzxdE9n8WX_AgUaiTX1tvf7vlNHmOJvnh1cmapp4T_b-bESIiqfISYx3SxuJ-XyNsZZ_3o1U14eexbGGC_tG5voorGRh-Wec4Yy1UrW4ZJN5LaUuPB-jK1jOErdBUolte9-VkqwOOj16xXVsj8qSAR3R9-HakWXj6bJydJhVfyL3QTy8qZ5srZClDNLsmquwSDwo3B3M';

  const navLinks = [
    { id: 'live-parking', label: 'Live Parking' },
    { id: 'map-view', label: 'Map View' },
    { id: 'erp-rates', label: 'ERP Rates & Gantries' },
    { id: 'ev-charging', label: 'EV Charging' },
    { id: 'traffic-cameras', label: 'Traffic Cameras' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf8ff]/95 dark:bg-[#1a1b22]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e3e1ec] dark:border-[#2f3038] transition-colors">
      <div className="h-20 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Live Feed Status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => onTabChange('live-parking')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3525cd] rounded-lg"
          >
            {!imgError ? (
              <img
                src={logoUrl}
                alt="ParkWhere Live Logo"
                className="h-8 w-auto object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-[#3525cd] flex items-center justify-center text-white font-bold relative shadow-xs">
                <span className="text-base tracking-tighter">P</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#10b981]"></span>
              </div>
            )}
            <span className="text-[20px] font-bold tracking-tight text-[#1a1b22] dark:text-white hidden sm:inline-block">
              ParkWhere
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-semibold text-[#10b981] dark:text-emerald-400 tracking-wider uppercase">
              LIVE LTA FEED • 48s ago
            </span>
          </div>
        </div>

        {/* Global Omnibox Search (Desktop Header) */}
        <div className="flex-1 max-w-lg hidden lg:flex items-center relative">
          <div className="w-full flex items-center rounded-full bg-[#f4f2fd] dark:bg-[#252631] px-3.5 py-1.5 transition-all focus-within:bg-white dark:focus-within:bg-[#1a1b22] focus-within:ring-2 focus-within:ring-[#3525cd] shadow-xs">
            <span className="material-symbols-outlined text-[#777587] text-[20px] mr-2 flex-shrink-0">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search carpark name, address, or 6-digit postal code..."
              className="w-full bg-transparent border-none outline-none text-[13px] text-[#1a1b22] dark:text-white placeholder:text-[#777587]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#777587] hover:text-[#1a1b22] dark:hover:text-white mr-1 p-0.5"
                title="Clear input"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
            <button
              type="button"
              onClick={onDetectLocation}
              disabled={isLocating}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e3e1ec] dark:bg-[#353644] hover:bg-[#eeedf7] dark:hover:bg-[#464757] transition-colors ml-1.5 flex-shrink-0 text-[#1a1b22] dark:text-gray-100"
            >
              <span
                className={`material-symbols-outlined text-[#3525cd] dark:text-indigo-400 text-[16px] ${
                  isLocating ? 'animate-spin' : ''
                }`}
              >
                {isLocating ? 'refresh' : 'near_me'}
              </span>
              <span className="text-[11px] font-medium hidden xl:inline">
                {isLocating ? 'Locating...' : 'Detect location'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Pill Bar */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-[#f4f2fd] dark:bg-[#252631] border border-[#e8e7f1] dark:border-[#353644]">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'text-[#464555] dark:text-gray-300 hover:text-[#1a1b22] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Country, Dark Mode, Notifications, Profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#252631] text-[11px] font-medium text-[#1a1b22] dark:text-gray-200">
            <span className="material-symbols-outlined text-[#464555] dark:text-gray-400 text-[15px]">
              location_city
            </span>
            <span>Singapore</span>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark/Light Mode"
            className="w-9 h-9 rounded-full bg-[#f4f2fd] dark:bg-[#252631] hover:bg-[#e8e7f1] dark:hover:bg-[#353644] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-[#f4f2fd] dark:bg-[#252631] hover:bg-[#e8e7f1] dark:hover:bg-[#353644] flex items-center justify-center text-[#464555] dark:text-gray-200 transition-colors relative"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>
            )}
          </button>

          {/* Profile / Civic Status */}
          <button
            type="button"
            onClick={onOpenCivicProfile}
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-[#3525cd] text-white hover:bg-[#4f46e5] transition-transform active:scale-95 flex items-center justify-center shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">person</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-full bg-[#f4f2fd] dark:bg-[#252631] flex items-center justify-center text-[#464555] dark:text-gray-200"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf8ff] dark:bg-[#1a1b22] border-t border-[#e3e1ec] dark:border-[#2f3038] px-4 py-3 flex flex-col gap-1.5 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onTabChange(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-[#4f46e5] text-white'
                  : 'text-[#464555] dark:text-gray-300 hover:bg-[#f4f2fd] dark:hover:bg-[#252631]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
