export type VehicleType = 'car' | 'motorcycle' | 'heavy';

export type CarparkCategory = 'mall' | 'hdb' | 'ura' | 'commercial';

export type FilterCategory = 'all' | 'available' | 'hdb' | 'mall' | 'ev' | 'cheap' | 'bookmarks';

export type SortMode = 'nearest' | 'available' | 'rate';

export interface AlternativeSuggestion {
  name: string;
  availableLots: number;
  distanceMeters: number;
  id: string;
}

export interface Carpark {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  category: CarparkCategory;
  categoryLabel: string;
  totalLots: number;
  availableLots: number;
  distanceMeters: number;
  walkTimeMinutes: number;
  hourlyRate: number;
  rateDisplay: string;
  gracePeriodMinutes: number;
  epsType: 'Automated' | 'Couponless' | 'Standard';
  features: string[];
  evChargersCount?: number;
  evChargerNetwork?: string;
  erpOnRoute?: number;
  nightParkingFree?: boolean;
  seasonHolderPriority?: string;
  alternativeSuggestion?: AlternativeSuggestion;
  coordinates: { lat: number; lng: number };
  mapX: number; // percentage 0-100 across Singapore vector map
  mapY: number; // percentage 0-100 across Singapore vector map
  vehicleRates?: {
    car: string;
    motorcycle: string;
    heavy: string;
  };
  fullSchedule?: {
    weekdayDay: string;
    weekdayNight: string;
    saturday: string;
    sundayHoliday: string;
    heightLimitMeters: number;
    operatingHours: string;
  };
  lastUpdatedSecondsAgo: number;
}

export interface ErpGantry {
  id: string;
  gantryName: string;
  expressway: string;
  direction: string;
  currentTariff: number;
  activeTimeWindow: string;
  isActive: boolean;
  nextTariffChange: string;
  nextRate: number;
  coordinates: { lat: number; lng: number };
  ratesSchedule: { timeBand: string; rate: number }[];
}

export interface EvStation {
  id: string;
  name: string;
  operator: 'SP Mobility' | 'CDG ENGIE' | 'Shell Recharge' | 'Charge+';
  address: string;
  postalCode: string;
  availablePlugs: number;
  totalPlugs: number;
  powerKw: number;
  chargingType: 'DC Fast' | 'AC Type 2' | 'Ultra-Fast DC';
  connectorTypes: string[];
  pricingPerKwh: number;
  parkingFeeRequired: boolean;
  coordinates: { lat: number; lng: number };
  mapX: number;
  mapY: number;
}

export interface TrafficCam {
  id: string;
  cameraNumber: string;
  name: string;
  expressway: string;
  location: string;
  imageUrl: string;
  condition: 'Fluid' | 'Moderate' | 'Heavy' | 'Incident';
  speedKmH: number;
  updatedAgo: string;
}

export interface DriverNotification {
  id: string;
  title: string;
  description: string;
  category: 'erp' | 'traffic' | 'weather' | 'carpark';
  timestamp: string;
  isRead: boolean;
}
