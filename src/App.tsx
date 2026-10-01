import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TelemetryBanner } from './components/TelemetryBanner';
import { FilterControls } from './components/FilterControls';
import { CarparkCard } from './components/CarparkCard';
import { InteractiveMap } from './components/InteractiveMap';
import { ErpCameraWidget } from './components/ErpCameraWidget';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals
import { CarparkDetailsModal } from './components/CarparkDetailsModal';
import { DriverGuideModal } from './components/DriverGuideModal';
import { CivicPingModal } from './components/CivicPingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { TrafficCamModal } from './components/TrafficCamModal';
import { CivicProfileModal } from './components/CivicProfileModal';
import { ApiStatusModal } from './components/ApiStatusModal';
import { PrivacyModal } from './components/PrivacyModal';

// Tabs
import { MapViewTab } from './components/tabs/MapViewTab';
import { ErpTab } from './components/tabs/ErpTab';
import { EvTab } from './components/tabs/EvTab';
import { TrafficCamTab } from './components/tabs/TrafficCamTab';

// Data & Types
import {
  INITIAL_CARPARKS,
  INITIAL_ERP_GANTRIES,
  INITIAL_TRAFFIC_CAMS,
  INITIAL_EV_STATIONS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import {
  Carpark,
  VehicleType,
  FilterCategory,
  SortMode,
  TrafficCam,
  DriverNotification
} from './types';
import { fetchLiveCarparkAvailability } from './services/ltaService';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState('live-parking');

  // Core Data State
  const [carparks, setCarparks] = useState<Carpark[]>(INITIAL_CARPARKS);
  const [erpGantries] = useState(INITIAL_ERP_GANTRIES);
  const [trafficCams] = useState<TrafficCam[]>(INITIAL_TRAFFIC_CAMS);
  const [evStations] = useState(INITIAL_EV_STATIONS);
  const [notifications, setNotifications] = useState<DriverNotification[]>(INITIAL_NOTIFICATIONS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [sortMode, setSortMode] = useState<SortMode>('nearest');

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parkwhere_bookmarks');
      return saved ? JSON.parse(saved) : ['cp-1'];
    } catch {
      return ['cp-1'];
    }
  });

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Geolocation Simulation State
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  // Telemetry Refresh State
  const [countdown, setCountdown] = useState(12);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Selection State
  const [selectedCarparkForDetails, setSelectedCarparkForDetails] = useState<Carpark | null>(null);
  const [highlightedCarparkId, setHighlightedCarparkId] = useState<string | null>(null);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [isCivicPingOpen, setIsCivicPingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTrafficCamForModal, setSelectedTrafficCamForModal] = useState<TrafficCam | null>(null);
  const [isCivicProfileOpen, setIsCivicProfileOpen] = useState(false);
  const [isApiStatusOpen, setIsApiStatusOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('parkwhere_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [bookmarks]);

  // Dark Mode Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initial live telemetry sync from /api/carparks
  useEffect(() => {
    fetchLiveCarparkAvailability().then((res) => {
      if (res && res.data && res.data.length > 0) {
        setCarparks((prev) =>
          prev.map((c) => {
            const match = res.data.find(
              (item: any) =>
                (item.Development && item.Development.toLowerCase().includes(c.name.toLowerCase().slice(0, 8))) ||
                (item.name && item.name.toLowerCase().includes(c.name.toLowerCase().slice(0, 8))) ||
                item.id === c.id ||
                item.CarParkID === c.id
            );
            if (match && typeof match.availableLots === 'number') {
              return { ...c, availableLots: match.availableLots, lastUpdatedSecondsAgo: 5 };
            }
            return c;
          })
        );
      }
    });
  }, []);

  // Real-time Countdown Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Auto sync telemetry from /api/carparks
          fetchLiveCarparkAvailability().then((res) => {
            if (res && res.data && res.data.length > 0) {
              setCarparks((prevCps) =>
                prevCps.map((cp) => {
                  const match = res.data.find(
                    (item: any) =>
                      (item.Development && item.Development.toLowerCase().includes(cp.name.toLowerCase().slice(0, 8))) ||
                      (item.name && item.name.toLowerCase().includes(cp.name.toLowerCase().slice(0, 8))) ||
                      item.id === cp.id ||
                      item.CarParkID === cp.id
                  );
                  if (match && typeof match.availableLots === 'number') {
                    return { ...cp, availableLots: match.availableLots, lastUpdatedSecondsAgo: 3 };
                  }
                  return { ...cp, lastUpdatedSecondsAgo: Math.floor(Math.random() * 20) + 5 };
                })
              );
            }
          });
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchLiveCarparkAvailability().then((res) => {
      setCountdown(60);
      if (res && res.data && res.data.length > 0) {
        setCarparks((prev) =>
          prev.map((c) => {
            const match = res.data.find(
              (item: any) =>
                (item.Development && item.Development.toLowerCase().includes(c.name.toLowerCase().slice(0, 8))) ||
                (item.name && item.name.toLowerCase().includes(c.name.toLowerCase().slice(0, 8))) ||
                item.id === c.id ||
                item.CarParkID === c.id
            );
            if (match && typeof match.availableLots === 'number') {
              return { ...c, availableLots: match.availableLots, lastUpdatedSecondsAgo: 1 };
            }
            return {
              ...c,
              lastUpdatedSecondsAgo: 2,
              availableLots:
                c.availableLots > 0
                  ? Math.max(0, c.availableLots + (Math.floor(Math.random() * 5) - 2))
                  : 0
            };
          })
        );
      }
      setIsRefreshing(false);
    });
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationStatus('Locating Nearest Lots...');
    setTimeout(() => {
      setIsLocating(false);
      setLocationStatus('Orchard Road (GPS Locked)');
      setSortMode('nearest');
      setTimeout(() => {
        setLocationStatus(null);
      }, 3500);
    }, 900);
  };

  const handleReroute = (targetId: string) => {
    // If target carpark exists in our list or an alternative
    const target = carparks.find((c) => c.id === targetId);
    if (target) {
      setSelectedCarparkForDetails(target);
      setHighlightedCarparkId(target.id);
      const el = document.getElementById(`card-${target.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Create a temporary Wisma Atria card to display if not in initial list
      const wisma: Carpark = {
        id: 'cp-alt-wisma',
        name: 'Wisma Atria Carpark',
        address: '435 Orchard Rd, Singapore 238877',
        postalCode: '238877',
        category: 'mall',
        categoryLabel: 'Orchard Commercial',
        totalLots: 420,
        availableLots: 85,
        distanceMeters: 120,
        walkTimeMinutes: 2,
        hourlyRate: 3.5,
        rateDisplay: '$2.50 / 1st hr',
        gracePeriodMinutes: 10,
        epsType: 'Automated',
        features: ['Direct Link to Orchard MRT', 'Undercover Sheltered', '4x EV AC'],
        coordinates: { lat: 1.3038, lng: 103.833 },
        mapX: 46,
        mapY: 47,
        lastUpdatedSecondsAgo: 10
      };
      setSelectedCarparkForDetails(wisma);
    }
  };

  const handlePinClick = (carparkId: string) => {
    setHighlightedCarparkId(carparkId);
    const cardEl = document.getElementById(`card-${carparkId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFooterQuickFilter = (type: string) => {
    setCurrentTab('live-parking');
    if (type === 'cbd') {
      setSearchQuery('CBD');
      setSelectedFilter('all');
    } else if (type === 'hdb') {
      setSelectedFilter('hdb');
    } else if (type === 'erp') {
      setCurrentTab('erp-rates');
    } else if (type === 'ev') {
      setSelectedFilter('ev');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Filtered & Sorted Carparks
  const processedCarparks = useMemo(() => {
    let list = [...carparks];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.postalCode.includes(q) ||
          c.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Filter by Pill Category
    if (selectedFilter === 'available') {
      list = list.filter((c) => c.availableLots > 20);
    } else if (selectedFilter === 'hdb') {
      list = list.filter((c) => c.category === 'hdb');
    } else if (selectedFilter === 'mall') {
      list = list.filter((c) => c.category === 'mall' || c.category === 'commercial');
    } else if (selectedFilter === 'ev') {
      list = list.filter((c) => (c.evChargersCount || 0) > 0);
    } else if (selectedFilter === 'cheap') {
      list = list.filter((c) => c.hourlyRate <= 2.2 || c.nightParkingFree);
    } else if (selectedFilter === 'bookmarks') {
      list = list.filter((c) => bookmarks.includes(c.id));
    }

    // Sorting
    list.sort((a, b) => {
      if (sortMode === 'nearest') {
        return a.distanceMeters - b.distanceMeters;
      }
      if (sortMode === 'available') {
        return b.availableLots - a.availableLots;
      }
      if (sortMode === 'rate') {
        return a.hourlyRate - b.hourlyRate;
      }
      return 0;
    });

    return list;
  }, [carparks, searchQuery, selectedFilter, sortMode, bookmarks]);

  const carparkNamesList = useMemo(() => carparks.map((c) => c.name), [carparks]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#1a1b22] text-[#1a1b22] dark:text-gray-100 transition-colors">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDetectLocation={handleDetectLocation}
        isLocating={isLocating}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenCivicProfile={() => setIsCivicProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {currentTab === 'live-parking' && (
          <div className="flex flex-col w-full">
            {/* Control & Search Header */}
            <FilterControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onDetectLocation={handleDetectLocation}
              isLocating={isLocating}
              locationStatus={locationStatus}
              vehicleType={vehicleType}
              onVehicleTypeChange={setVehicleType}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              sortMode={sortMode}
              onSortChange={setSortMode}
              totalCarparksCount={3420}
              availableCarparksCount={processedCarparks.length}
              bookmarkedCount={bookmarks.length}
            />

            {/* Live Telemetry Status Banner */}
            <TelemetryBanner
              countdown={countdown}
              onManualRefresh={handleManualRefresh}
              isRefreshing={isRefreshing}
              centralLots={1482}
              cbdLots={890}
              westLots={3110}
            />

            {/* Split Screen 2-Column Responsive Layout */}
            <section className="w-full px-4 sm:px-6 max-w-7xl mx-auto py-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Carparks Listing (7 Columns) */}
                <div className="lg:col-span-7 flex flex-col gap-4" id="carparkList">
                  {processedCarparks.length === 0 ? (
                    <div className="p-12 text-center bg-white dark:bg-[#252631] rounded-2xl border border-[#eeedf7] dark:border-[#353644] shadow-xs">
                      <span className="material-symbols-outlined text-[48px] text-[#777587]">
                        search_off
                      </span>
                      <h4 className="text-[18px] font-bold mt-2">No Carparks Found</h4>
                      <p className="text-[13px] text-[#464555] dark:text-gray-400 mt-1 max-w-sm mx-auto">
                        No carparks matched &ldquo;{searchQuery}&rdquo; under the current filter. Try
                        resetting filters or searching by a different postal code.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedFilter('all');
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-[#3525cd] text-white text-[13px] font-bold"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    processedCarparks.map((cp) => (
                      <CarparkCard
                        key={cp.id}
                        carpark={cp}
                        vehicleType={vehicleType}
                        isBookmarked={bookmarks.includes(cp.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onSelectCarpark={setSelectedCarparkForDetails}
                        onReroute={handleReroute}
                        isSelected={highlightedCarparkId === cp.id}
                      />
                    ))
                  )}
                </div>

                {/* Right Column: Sticky Interactive Map & Live Camera Widget (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
                  {/* Interactive Singapore Vector Map */}
                  <InteractiveMap
                    carparks={processedCarparks}
                    selectedCarpark={selectedCarparkForDetails}
                    onSelectCarpark={setSelectedCarparkForDetails}
                    onPinClick={handlePinClick}
                  />

                  {/* Nearby ERP & Expressway Cam */}
                  <ErpCameraWidget
                    cameras={trafficCams}
                    onOpenTrafficCamModal={setSelectedTrafficCamForModal}
                    onOpenErpGuide={() => setActiveGuideId('erp-guide')}
                  />
                </div>
              </div>
            </section>

            {/* How ParkWhere Works */}
            <HowItWorks />

            {/* FAQ & Driver Guides */}
            <FaqSection
              onOpenDriverGuide={setActiveGuideId}
              onOpenCivicPing={() => setIsCivicPingOpen(true)}
            />
          </div>
        )}

        {currentTab === 'map-view' && (
          <MapViewTab
            carparks={carparks}
            onSelectCarpark={setSelectedCarparkForDetails}
            vehicleType={vehicleType}
          />
        )}

        {currentTab === 'erp-rates' && (
          <ErpTab
            gantries={erpGantries}
            onOpenErpGuide={() => setActiveGuideId('erp-guide')}
          />
        )}

        {currentTab === 'ev-charging' && <EvTab stations={evStations} />}

        {currentTab === 'traffic-cameras' && (
          <TrafficCamTab
            cameras={trafficCams}
            onOpenTrafficCamModal={setSelectedTrafficCamForModal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectQuickFilter={handleFooterQuickFilter}
        onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        onOpenApiStatusModal={() => setIsApiStatusOpen(true)}
      />

      {/* Modals & Dialogs */}
      <CarparkDetailsModal
        carpark={selectedCarparkForDetails}
        onClose={() => setSelectedCarparkForDetails(null)}
        isBookmarked={
          selectedCarparkForDetails ? bookmarks.includes(selectedCarparkForDetails.id) : false
        }
        onToggleBookmark={handleToggleBookmark}
        vehicleType={vehicleType}
      />

      <DriverGuideModal guideId={activeGuideId} onClose={() => setActiveGuideId(null)} />

      <CivicPingModal
        isOpen={isCivicPingOpen}
        onClose={() => setIsCivicPingOpen(false)}
        carparkNames={carparkNamesList}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
      />

      <TrafficCamModal
        camera={selectedTrafficCamForModal}
        onClose={() => setSelectedTrafficCamForModal(null)}
      />

      <CivicProfileModal
        isOpen={isCivicProfileOpen}
        onClose={() => setIsCivicProfileOpen(false)}
        vehicleType={vehicleType}
        onVehicleTypeChange={setVehicleType}
        savedCount={bookmarks.length}
      />

      <ApiStatusModal isOpen={isApiStatusOpen} onClose={() => setIsApiStatusOpen(false)} />

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
