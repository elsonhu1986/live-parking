import { Carpark, ErpGantry, EvStation, TrafficCam, DriverNotification } from '../types';

export const INITIAL_CARPARKS: Carpark[] = [
  {
    id: 'cp-1',
    name: 'Ngee Ann City / Takashimaya',
    address: '391 Orchard Rd, Singapore 238873',
    postalCode: '238873',
    category: 'mall',
    categoryLabel: 'Commercial Mall',
    totalLots: 850,
    availableLots: 142,
    distanceMeters: 250,
    walkTimeMinutes: 4,
    hourlyRate: 4.80,
    rateDisplay: '$2.40 / 30 mins',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['4x EV AC Chargers', 'Sheltered Multi-Storey', '8 Handicap Lots'],
    evChargersCount: 4,
    evChargerNetwork: 'SP Mobility (Type 2 22kW)',
    erpOnRoute: 1.50,
    coordinates: { lat: 1.3023, lng: 103.8344 },
    mapX: 47,
    mapY: 48,
    vehicleRates: {
      car: '$2.40 / 30 mins',
      motorcycle: '$1.40 per entry',
      heavy: '$4.50 / hour'
    },
    fullSchedule: {
      weekdayDay: 'Mon-Fri: $2.40 for 1st hr, $1.20/subsequent 30 mins (00:00 - 17:00)',
      weekdayNight: '$4.36 per entry after 17:00',
      saturday: '$2.40 for 1st hr, $1.20/subsequent 30 mins (00:00 - 17:00), $4.36/entry after 17:00',
      sundayHoliday: '$4.36 for 1st 4 hrs, $1.20/subsequent 30 mins',
      heightLimitMeters: 1.9,
      operatingHours: '24 Hours Daily'
    },
    lastUpdatedSecondsAgo: 14
  },
  {
    id: 'cp-2',
    name: 'HDB Ang Mo Kio Ave 3 Blk 700',
    address: 'Blk 700 Ang Mo Kio Ave 3, Singapore 560700',
    postalCode: '560700',
    category: 'hdb',
    categoryLabel: 'HDB Multi-Storey',
    totalLots: 320,
    availableLots: 18,
    distanceMeters: 600,
    walkTimeMinutes: 8,
    hourlyRate: 1.20,
    rateDisplay: '$0.60 / 30 mins',
    gracePeriodMinutes: 15,
    epsType: 'Automated',
    nightParkingFree: true,
    seasonHolderPriority: 'Priority 7PM - 7AM',
    features: ['Covered Multi-storey', 'HDB EPS Gantry', 'Motorcycle Friendly'],
    coordinates: { lat: 1.3691, lng: 103.8454 },
    mapX: 52,
    mapY: 32,
    vehicleRates: {
      car: '$0.60 / 30 mins',
      motorcycle: '$0.65 per day session',
      heavy: '$1.20 / 30 mins'
    },
    fullSchedule: {
      weekdayDay: '$0.60 per half hour (07:00 - 22:30)',
      weekdayNight: 'Free after 10:30 PM (Capped at $5.00 for non-residents)',
      saturday: '$0.60 per half hour (07:00 - 22:30)',
      sundayHoliday: 'Free Parking 07:30 - 22:30 for non-season lots',
      heightLimitMeters: 2.1,
      operatingHours: '24 Hours Open'
    },
    lastUpdatedSecondsAgo: 34
  },
  {
    id: 'cp-3',
    name: 'ION Orchard Basement Carpark',
    address: '2 Orchard Turn, Singapore 238801',
    postalCode: '238801',
    category: 'mall',
    categoryLabel: 'Premium Mall',
    totalLots: 600,
    availableLots: 0,
    distanceMeters: 350,
    walkTimeMinutes: 5,
    hourlyRate: 5.00,
    rateDisplay: '$3.00 for 1st hr • $1.50/subsequent 30m',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['Direct Mall Lift Access', 'Valet Available', 'Shell Recharge 50kW'],
    evChargersCount: 6,
    evChargerNetwork: 'Shell Recharge',
    alternativeSuggestion: {
      name: 'Wisma Atria (85 lots free • 120m away)',
      availableLots: 85,
      distanceMeters: 120,
      id: 'cp-alt-wisma'
    },
    coordinates: { lat: 1.3040, lng: 103.8318 },
    mapX: 45,
    mapY: 46,
    vehicleRates: {
      car: '$3.00 1st hr, $1.50/30m',
      motorcycle: '$2.00 per entry',
      heavy: 'Not Permitted'
    },
    fullSchedule: {
      weekdayDay: 'Mon-Thu: $2.67 for 1st hr, $1.28/subsequent 30m (08:00 - 17:00)',
      weekdayNight: '$3.74 per entry after 17:00',
      saturday: '$3.21 for 1st hr, $1.60/subsequent 30m',
      sundayHoliday: '$3.21 for 1st hr, $1.60/subsequent 30m',
      heightLimitMeters: 1.9,
      operatingHours: '06:00 - 02:00 Next Day'
    },
    lastUpdatedSecondsAgo: 8
  },
  {
    id: 'cp-4',
    name: 'VivoCity Multi-Storey Carpark',
    address: '1 HarbourFront Walk, Singapore 098585',
    postalCode: '098585',
    category: 'mall',
    categoryLabel: 'HarbourFront Waterfront',
    totalLots: 2100,
    availableLots: 318,
    distanceMeters: 1200,
    walkTimeMinutes: 15,
    hourlyRate: 3.20,
    rateDisplay: '$1.60 / 1st hour',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['Professional Car Wash', 'Direct Lift to Level 1-3', '12x SP Mobility EV'],
    evChargersCount: 12,
    evChargerNetwork: 'SP Mobility (DC 50kW & AC 22kW)',
    coordinates: { lat: 1.2644, lng: 103.8222 },
    mapX: 43,
    mapY: 65,
    vehicleRates: {
      car: '$1.60 1st hr, $0.80/30m',
      motorcycle: '$1.50 per entry',
      heavy: 'No Heavy Vehicles'
    },
    fullSchedule: {
      weekdayDay: 'Mon-Fri: $1.60 for 1st hr, $0.80/subsequent 30m (07:00 - 18:00)',
      weekdayNight: '$3.20 per entry after 18:00',
      saturday: '$1.80 for 1st hr, $0.90/subsequent 30m',
      sundayHoliday: '$1.80 for 1st hr, $0.90/subsequent 30m',
      heightLimitMeters: 2.0,
      operatingHours: '24 Hours Open'
    },
    lastUpdatedSecondsAgo: 18
  },
  {
    id: 'cp-5',
    name: 'URA Urban Carpark - Telok Ayer St',
    address: 'Telok Ayer Conservation Zone, Singapore 068580',
    postalCode: '068580',
    category: 'ura',
    categoryLabel: 'URA Street Carpark',
    totalLots: 45,
    availableLots: 9,
    distanceMeters: 800,
    walkTimeMinutes: 10,
    hourlyRate: 2.40,
    rateDisplay: '$1.20 / 30 mins',
    gracePeriodMinutes: 0,
    epsType: 'Couponless',
    features: ['Parking.sg App Enabled', 'Direct Shophouse Frontage', 'Short-Term Parking'],
    coordinates: { lat: 1.2828, lng: 103.8475 },
    mapX: 52,
    mapY: 56,
    vehicleRates: {
      car: '$1.20 / 30 mins (Peak CBD Zone)',
      motorcycle: '$0.65 per session',
      heavy: 'Not Allowed'
    },
    fullSchedule: {
      weekdayDay: '$1.20 per 30 mins (08:30 - 17:00)',
      weekdayNight: '$0.60 per 30 mins (17:00 - 22:30)',
      saturday: '$1.20 per 30 mins (08:30 - 17:00)',
      sundayHoliday: 'Free parking on Sundays & gazetted public holidays',
      heightLimitMeters: 3.5,
      operatingHours: 'Open Street 24/7'
    },
    lastUpdatedSecondsAgo: 52
  },
  {
    id: 'cp-6',
    name: 'Suntec City Carpark (Zones A-E)',
    address: '3 Temasek Blvd, Singapore 038983',
    postalCode: '038983',
    category: 'commercial',
    categoryLabel: 'Convention & Mall Mega Hub',
    totalLots: 3100,
    availableLots: 450,
    distanceMeters: 1800,
    walkTimeMinutes: 22,
    hourlyRate: 2.20,
    rateDisplay: '$2.20 / 1st hour',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['16x EV Chargers', '1st hr Free with $30 spend', 'Convention Center Direct'],
    evChargersCount: 16,
    evChargerNetwork: 'CDG ENGIE 60kW DC',
    coordinates: { lat: 1.2935, lng: 103.8572 },
    mapX: 58,
    mapY: 51,
    vehicleRates: {
      car: '$2.20 1st hr, $1.10/30m',
      motorcycle: '$1.20 per entry',
      heavy: '$4.00 / hour (Loading Bay Zone)'
    },
    fullSchedule: {
      weekdayDay: '$2.20 for 1st hr, $1.10/subsequent 30m (07:00 - 17:00)',
      weekdayNight: '$3.30 per entry after 17:00',
      saturday: '$2.40 for 1st 4 hrs, $1.10/subsequent 30m',
      sundayHoliday: '$2.40 for 1st 4 hrs, $1.10/subsequent 30m',
      heightLimitMeters: 2.0,
      operatingHours: '24 Hours Open'
    },
    lastUpdatedSecondsAgo: 10
  },
  {
    id: 'cp-7',
    name: 'Plaza Singapura Basement',
    address: '68 Orchard Rd, Singapore 238839',
    postalCode: '238839',
    category: 'mall',
    categoryLabel: 'Transit Mall Hub',
    totalLots: 720,
    availableLots: 195,
    distanceMeters: 900,
    walkTimeMinutes: 11,
    hourlyRate: 3.90,
    rateDisplay: '$1.95 / 30 mins',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['Dhoby Ghaut MRT Direct', '10x Charge+ EV', 'B1-B3 Sheltered'],
    evChargersCount: 10,
    evChargerNetwork: 'Charge+ (Type 2 22kW)',
    erpOnRoute: 1.00,
    coordinates: { lat: 1.3007, lng: 103.8451 },
    mapX: 50,
    mapY: 49,
    vehicleRates: {
      car: '$1.95 / 30 mins',
      motorcycle: '$1.30 per entry',
      heavy: 'Not Permitted'
    },
    fullSchedule: {
      weekdayDay: '$1.95 for 1st hr, $0.80/subsequent 15 mins (00:00 - 17:59)',
      weekdayNight: '$3.25 per entry (18:00 - 23:59)',
      saturday: '$2.95 for 1st 2 hrs, $0.55/subsequent 15 mins',
      sundayHoliday: '$2.95 for 1st 2 hrs, $0.55/subsequent 15 mins',
      heightLimitMeters: 1.9,
      operatingHours: '24 Hours'
    },
    lastUpdatedSecondsAgo: 22
  },
  {
    id: 'cp-8',
    name: 'Jurong Point Mega Basement & MSCP',
    address: '1 Jurong West Central 2, Singapore 648886',
    postalCode: '648886',
    category: 'mall',
    categoryLabel: 'Heartland Mega Mall',
    totalLots: 1450,
    availableLots: 512,
    distanceMeters: 4500,
    walkTimeMinutes: 50,
    hourlyRate: 2.10,
    rateDisplay: '$1.05 / 30 mins',
    gracePeriodMinutes: 10,
    epsType: 'Automated',
    features: ['Boon Lay Bus Interchange', '8x SP Mobility EV', 'B1-B3 & Level 4-6'],
    evChargersCount: 8,
    evChargerNetwork: 'SP Mobility (DC 50kW)',
    coordinates: { lat: 1.3404, lng: 103.7058 },
    mapX: 20,
    mapY: 43,
    vehicleRates: {
      car: '$1.05 / 30 mins',
      motorcycle: '$1.20 per entry',
      heavy: '$3.50 / hour'
    },
    fullSchedule: {
      weekdayDay: '$1.25 for 1st hr, $0.55/subsequent 15 mins (07:00 - 17:00)',
      weekdayNight: '$2.50 per entry after 17:00',
      saturday: '$1.50 for 1st hr, $0.65/subsequent 15 mins',
      sundayHoliday: '$1.50 for 1st hr, $0.65/subsequent 15 mins',
      heightLimitMeters: 2.1,
      operatingHours: '24 Hours'
    },
    lastUpdatedSecondsAgo: 45
  },
  {
    id: 'cp-9',
    name: 'Toa Payoh Central HDB Hub',
    address: 'Blk 500 Toa Payoh Lorong 6, Singapore 310500',
    postalCode: '310500',
    category: 'hdb',
    categoryLabel: 'HDB Central MSCP',
    totalLots: 880,
    availableLots: 164,
    distanceMeters: 2200,
    walkTimeMinutes: 28,
    hourlyRate: 1.20,
    rateDisplay: '$0.60 / 30 mins',
    gracePeriodMinutes: 15,
    epsType: 'Automated',
    nightParkingFree: true,
    features: ['Central Atrium Access', 'Free Sunday Parking Rules', 'Underground Air-con Link'],
    coordinates: { lat: 1.3323, lng: 103.8488 },
    mapX: 53,
    mapY: 41,
    vehicleRates: {
      car: '$0.60 / 30 mins',
      motorcycle: '$0.65 per session',
      heavy: '$1.20 / 30 mins'
    },
    fullSchedule: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: 'Free after 10:30 PM (resident/visitor differential)',
      saturday: '$0.60 per 30 mins',
      sundayHoliday: 'Free parking 07:30 - 22:30 (yellow lot exemptions)',
      heightLimitMeters: 2.0,
      operatingHours: '24 Hours Open'
    },
    lastUpdatedSecondsAgo: 19
  }
];

export const INITIAL_ERP_GANTRIES: ErpGantry[] = [
  {
    id: 'erp-cte-sb',
    gantryName: 'CTE Gantries (Southbound)',
    expressway: 'Central Expressway (CTE)',
    direction: 'Southbound towards City / Orchard',
    currentTariff: 1.50,
    activeTimeWindow: '08:30 - 09:00',
    isActive: true,
    nextTariffChange: '09:00 - 09:30',
    nextRate: 2.00,
    coordinates: { lat: 1.3218, lng: 103.8519 },
    ratesSchedule: [
      { timeBand: '07:00 - 07:30', rate: 0.00 },
      { timeBand: '07:30 - 08:00', rate: 1.00 },
      { timeBand: '08:00 - 08:30', rate: 2.00 },
      { timeBand: '08:30 - 09:00', rate: 1.50 },
      { timeBand: '09:00 - 09:30', rate: 2.00 },
      { timeBand: '09:30 - 10:00', rate: 1.00 },
      { timeBand: '10:00 - 17:30', rate: 0.00 },
      { timeBand: '17:30 - 18:30', rate: 2.00 },
      { timeBand: '18:30 - 19:30', rate: 1.50 },
      { timeBand: '19:30 - 20:00', rate: 1.00 }
    ]
  },
  {
    id: 'erp-aye-eb',
    gantryName: 'AYE before Alexandra Rd',
    expressway: 'Ayer Rajah Expressway (AYE)',
    direction: 'Eastbound towards CBD & MCE',
    currentTariff: 1.00,
    activeTimeWindow: '08:30 - 09:00',
    isActive: true,
    nextTariffChange: '09:00 - 09:30',
    nextRate: 0.00,
    coordinates: { lat: 1.2842, lng: 103.7995 },
    ratesSchedule: [
      { timeBand: '07:30 - 08:00', rate: 0.50 },
      { timeBand: '08:00 - 09:00', rate: 1.00 },
      { timeBand: '09:00 - 09:30', rate: 0.00 }
    ]
  },
  {
    id: 'erp-cbd-shenton',
    gantryName: 'Shenton Way / Maxwell Road Cordon',
    expressway: 'CBD Core Cordon',
    direction: 'Inbound into Financial District',
    currentTariff: 2.00,
    activeTimeWindow: '08:30 - 09:30',
    isActive: true,
    nextTariffChange: '09:30 - 10:00',
    nextRate: 1.50,
    coordinates: { lat: 1.2778, lng: 103.8475 },
    ratesSchedule: [
      { timeBand: '08:00 - 08:30', rate: 1.00 },
      { timeBand: '08:30 - 09:30', rate: 2.00 },
      { timeBand: '09:30 - 10:00', rate: 1.50 },
      { timeBand: '17:30 - 19:00', rate: 1.00 }
    ]
  },
  {
    id: 'erp-pie-kallang',
    gantryName: 'PIE (Kallang Bahru Slip Road)',
    expressway: 'Pan Island Expressway (PIE)',
    direction: 'Eastbound towards Changi',
    currentTariff: 0.00,
    activeTimeWindow: '08:30 - 17:30',
    isActive: false,
    nextTariffChange: '17:30 - 18:30',
    nextRate: 1.00,
    coordinates: { lat: 1.3255, lng: 103.8710 },
    ratesSchedule: [
      { timeBand: '08:00 - 09:00', rate: 1.00 },
      { timeBand: '17:30 - 18:30', rate: 1.00 }
    ]
  },
  {
    id: 'erp-kpe-defu',
    gantryName: 'KPE (Defu Flyover Slip Road)',
    expressway: 'Kallang-Paya Lebar Expressway (KPE)',
    direction: 'Southbound into KPE Tunnel',
    currentTariff: 1.00,
    activeTimeWindow: '08:00 - 09:30',
    isActive: true,
    nextTariffChange: '09:30 - 10:00',
    nextRate: 0.00,
    coordinates: { lat: 1.3571, lng: 103.8905 },
    ratesSchedule: [
      { timeBand: '07:30 - 08:00', rate: 0.50 },
      { timeBand: '08:00 - 09:30', rate: 1.00 },
      { timeBand: '09:30 - 10:00', rate: 0.00 }
    ]
  }
];

export const INITIAL_TRAFFIC_CAMS: TrafficCam[] = [
  {
    id: 'cam-1703',
    cameraNumber: 'Cam 1703',
    name: 'CTE - Moulmein Flyover',
    expressway: 'CTE',
    location: 'Central Expressway (Southbound towards Orchard / City)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEJkUa0AqZAkNOQasPsmHUCha-ZYydQ37654ML_mkjuUhXYdlm3lDDF5iwaAeBEWPRPYLvjoZ2QverCkXbxMtPK9GjzPSemQaayBkGCccGkIW4rl5ep2AxrZE0LTOeFr-ex2phSPH3h2gU2PObKqKDa6nE7obMxAGnXFIo3biR1U1oBQxIodXiJ2OmWoBUJKHJBmWL7Z1w6Hn5oqNzqSm_s83lyL97PUiCcPaLpMy7UXYh7T7sbQf',
    condition: 'Fluid',
    speedKmH: 78,
    updatedAgo: '12s ago'
  },
  {
    id: 'cam-2701',
    cameraNumber: 'Cam 2701',
    name: 'PIE - Jalan Anak Bukit Flyover',
    expressway: 'PIE',
    location: 'Pan Island Expressway towards Tuas / Jurong',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEJkUa0AqZAkNOQasPsmHUCha-ZYydQ37654ML_mkjuUhXYdlm3lDDF5iwaAeBEWPRPYLvjoZ2QverCkXbxMtPK9GjzPSemQaayBkGCccGkIW4rl5ep2AxrZE0LTOeFr-ex2phSPH3h2gU2PObKqKDa6nE7obMxAGnXFIo3biR1U1oBQxIodXiJ2OmWoBUJKHJBmWL7Z1w6Hn5oqNzqSm_s83lyL97PUiCcPaLpMy7UXYh7T7sbQf',
    condition: 'Moderate',
    speedKmH: 54,
    updatedAgo: '28s ago'
  },
  {
    id: 'cam-3704',
    cameraNumber: 'Cam 3704',
    name: 'AYE - Near Clementi Ave 6 Exit',
    expressway: 'AYE',
    location: 'Ayer Rajah Expressway towards Jurong East',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEJkUa0AqZAkNOQasPsmHUCha-ZYydQ37654ML_mkjuUhXYdlm3lDDF5iwaAeBEWPRPYLvjoZ2QverCkXbxMtPK9GjzPSemQaayBkGCccGkIW4rl5ep2AxrZE0LTOeFr-ex2phSPH3h2gU2PObKqKDa6nE7obMxAGnXFIo3biR1U1oBQxIodXiJ2OmWoBUJKHJBmWL7Z1w6Hn5oqNzqSm_s83lyL97PUiCcPaLpMy7UXYh7T7sbQf',
    condition: 'Fluid',
    speedKmH: 82,
    updatedAgo: '35s ago'
  },
  {
    id: 'cam-4702',
    cameraNumber: 'Cam 4702',
    name: 'ECP - Tanjong Katong Flyover',
    expressway: 'ECP',
    location: 'East Coast Parkway towards Changi Airport',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEJkUa0AqZAkNOQasPsmHUCha-ZYydQ37654ML_mkjuUhXYdlm3lDDF5iwaAeBEWPRPYLvjoZ2QverCkXbxMtPK9GjzPSemQaayBkGCccGkIW4rl5ep2AxrZE0LTOeFr-ex2phSPH3h2gU2PObKqKDa6nE7obMxAGnXFIo3biR1U1oBQxIodXiJ2OmWoBUJKHJBmWL7Z1w6Hn5oqNzqSm_s83lyL97PUiCcPaLpMy7UXYh7T7sbQf',
    condition: 'Fluid',
    speedKmH: 88,
    updatedAgo: '42s ago'
  }
];

export const INITIAL_EV_STATIONS: EvStation[] = [
  {
    id: 'ev-1',
    name: 'VivoCity Level 2 EV Hub',
    operator: 'SP Mobility',
    address: '1 HarbourFront Walk, Singapore 098585',
    postalCode: '098585',
    availablePlugs: 7,
    totalPlugs: 12,
    powerKw: 50,
    chargingType: 'DC Fast',
    connectorTypes: ['CCS2', 'Type 2'],
    pricingPerKwh: 0.654,
    parkingFeeRequired: true,
    coordinates: { lat: 1.2644, lng: 103.8222 },
    mapX: 43,
    mapY: 65
  },
  {
    id: 'ev-2',
    name: 'Suntec City Zone B Hub',
    operator: 'CDG ENGIE',
    address: '3 Temasek Blvd, Singapore 038983',
    postalCode: '038983',
    availablePlugs: 11,
    totalPlugs: 16,
    powerKw: 60,
    chargingType: 'DC Fast',
    connectorTypes: ['CCS2', 'Type 2'],
    pricingPerKwh: 0.628,
    parkingFeeRequired: true,
    coordinates: { lat: 1.2935, lng: 103.8572 },
    mapX: 58,
    mapY: 51
  },
  {
    id: 'ev-3',
    name: 'ION Orchard B3 Fast Charger',
    operator: 'Shell Recharge',
    address: '2 Orchard Turn, Singapore 238801',
    postalCode: '238801',
    availablePlugs: 2,
    totalPlugs: 6,
    powerKw: 50,
    chargingType: 'DC Fast',
    connectorTypes: ['CCS2'],
    pricingPerKwh: 0.680,
    parkingFeeRequired: true,
    coordinates: { lat: 1.3040, lng: 103.8318 },
    mapX: 45,
    mapY: 46
  },
  {
    id: 'ev-4',
    name: 'Bishan HDB MSCP Blk 510',
    operator: 'Charge+',
    address: 'Blk 510 Bishan St 13, Singapore 570510',
    postalCode: '570510',
    availablePlugs: 3,
    totalPlugs: 4,
    powerKw: 22,
    chargingType: 'AC Type 2',
    connectorTypes: ['Type 2'],
    pricingPerKwh: 0.542,
    parkingFeeRequired: true,
    coordinates: { lat: 1.3508, lng: 103.8504 },
    mapX: 52,
    mapY: 36
  }
];

export const INITIAL_NOTIFICATIONS: DriverNotification[] = [
  {
    id: 'notif-1',
    title: 'CTE Southbound ERP Active',
    description: 'Current tariff $1.50 active between 08:30 - 09:00. Increases to $2.00 at 09:00.',
    category: 'erp',
    timestamp: '5m ago',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'ION Orchard Basement Full',
    description: 'Carpark capacity reached 100%. Reroute to Wisma Atria recommended (85 lots free).',
    category: 'carpark',
    timestamp: '12m ago',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'Sunday Free Parking Active at HDB MSCP',
    description: 'Free parking rules in effect across selected town councils until 22:30 tonight.',
    category: 'carpark',
    timestamp: '1h ago',
    isRead: true
  }
];
