import { Station, TrainSchedule, LiveTrainTelemetry } from '../types/train';

export const STATIONS: Station[] = [
  {
    id: 'st-slv',
    name: 'Silver Central Station',
    code: 'SCS',
    city: 'Silver City',
    region: 'Central Hub',
    platforms: 16,
    connections: ['Metro Red Line', 'Airport Shuttle', 'Regional Express'],
    amenities: ['First Class Lounge', 'Luggage Lockers', 'Dining Concourse', 'EV Charging', 'Free Wi-Fi 7']
  },
  {
    id: 'st-nth',
    name: 'North Grand Terminal',
    code: 'NGT',
    city: 'Northport',
    region: 'Northern Coast',
    platforms: 12,
    connections: ['Coastal Ferry', 'Metro Blue Line', 'Bus Rapid Transit'],
    amenities: ['Observation Deck', 'Silver Club VIP', 'Boutique Hotel', 'Baggage Drop']
  },
  {
    id: 'st-pcf',
    name: 'Pacific Harbor Bay',
    code: 'PHB',
    city: 'Pacifica',
    region: 'Western Shore',
    platforms: 10,
    connections: ['Ocean Liner Terminal', 'Light Rail Green'],
    amenities: ['Waterfront Promenade', 'Seafood Market', 'Business Center', 'Bicycle Storage']
  },
  {
    id: 'st-emr',
    name: 'Emerald Valley Junction',
    code: 'EVJ',
    city: 'Verdant City',
    region: 'Valley Belt',
    platforms: 8,
    connections: ['Alpine Cog Railway', 'Regional Coach'],
    amenities: ['Eco Garden Terrace', 'Local Farm Bistro', 'Quiet Pods']
  },
  {
    id: 'st-aur',
    name: 'Aurora Highlands',
    code: 'AHL',
    city: 'Highland Peak',
    region: 'Mountain Range',
    platforms: 6,
    connections: ['Ski Resort Cableway', 'Scenic Mountain Shuttle'],
    amenities: ['Heated Lounges', 'Ski Equipment Storage', 'Alpine Panorama Cafe']
  },
  {
    id: 'st-sol',
    name: 'Solaris Innovation Port',
    code: 'SIP',
    city: 'Neo Tech City',
    region: 'Eastern District',
    platforms: 14,
    connections: ['Hyper-Transit Loop', 'Autonomous Pod Network'],
    amenities: ['Coworking Hub', 'VR Lounge', 'Robotic Barista', 'High-Speed Charging']
  },
  {
    id: 'st-smt',
    name: 'Metro Summit Station',
    code: 'MSS',
    city: 'Capital Metro',
    region: 'Central Metropolis',
    platforms: 20,
    connections: ['Interstate Maglev', 'Underground Line 1-8', 'Sky Rail'],
    amenities: ['Flagship Silver Lounge', 'Luxury Retail Arcade', 'Express Security Check', 'Conference Suites']
  }
];

export const INITIAL_SCHEDULES: TrainSchedule[] = [
  {
    id: 'sch-101',
    trainNumber: 'ST-101',
    name: 'Silver Bullet Apex',
    model: 'Silver Voyager 350-X',
    departureStation: STATIONS[0], // Silver Central
    arrivalStation: STATIONS[6], // Metro Summit
    departureTime: '08:15',
    arrivalTime: '10:45',
    durationMinutes: 150,
    stops: [
      { station: STATIONS[0], time: '08:15', platform: '3A' },
      { station: STATIONS[3], time: '09:20', platform: '2' },
      { station: STATIONS[6], time: '10:45', platform: '7B' }
    ],
    price: {
      standard: 48,
      business: 82,
      'first-class': 135
    },
    availableSeats: {
      standard: 84,
      business: 28,
      'first-class': 12
    },
    amenities: ['350 km/h Top Velocity', 'Starlink Wi-Fi', 'Bistro Car', 'Quiet Zone', 'At-Seat Dining'],
    status: 'On Time',
    currentSpeedKmH: 342,
    maxSpeedKmH: 360
  },
  {
    id: 'sch-204',
    trainNumber: 'ST-204',
    name: 'Pacific Dawn Express',
    model: 'Silver Coastliner Aero',
    departureStation: STATIONS[2], // Pacific Harbor
    arrivalStation: STATIONS[0], // Silver Central
    departureTime: '09:00',
    arrivalTime: '11:20',
    durationMinutes: 140,
    stops: [
      { station: STATIONS[2], time: '09:00', platform: '1' },
      { station: STATIONS[3], time: '10:10', platform: '4' },
      { station: STATIONS[0], time: '11:20', platform: '5' }
    ],
    price: {
      standard: 42,
      business: 75,
      'first-class': 120
    },
    availableSeats: {
      standard: 62,
      business: 18,
      'first-class': 6
    },
    amenities: ['Ocean Panorama Coach', 'Barista Coffee Bar', 'Luggage Valet', 'USB-C 100W PD'],
    status: 'Boarding',
    currentSpeedKmH: 0,
    maxSpeedKmH: 320
  },
  {
    id: 'sch-315',
    trainNumber: 'ST-315',
    name: 'Highland Aurora',
    model: 'Silver Alpine Cross',
    departureStation: STATIONS[0], // Silver Central
    arrivalStation: STATIONS[4], // Aurora Highlands
    departureTime: '10:30',
    arrivalTime: '13:50',
    durationMinutes: 200,
    stops: [
      { station: STATIONS[0], time: '10:30', platform: '8' },
      { station: STATIONS[3], time: '11:45', platform: '1' },
      { station: STATIONS[4], time: '13:50', platform: '2' }
    ],
    price: {
      standard: 56,
      business: 94,
      'first-class': 155,
      sleeper: 195
    },
    availableSeats: {
      standard: 45,
      business: 14,
      'first-class': 8,
      sleeper: 4
    },
    amenities: ['Glass Roof Vista Car', 'Heated Seats', 'Gourmet Fondue Cart', 'Ski Racks'],
    status: 'On Time',
    currentSpeedKmH: 285,
    maxSpeedKmH: 300
  },
  {
    id: 'sch-408',
    trainNumber: 'ST-408',
    name: 'Solaris Streamliner',
    model: 'Silver Mag-Pulse 400',
    departureStation: STATIONS[6], // Metro Summit
    arrivalStation: STATIONS[5], // Solaris Innovation
    departureTime: '11:15',
    arrivalTime: '12:35',
    durationMinutes: 80,
    stops: [
      { station: STATIONS[6], time: '11:15', platform: '12' },
      { station: STATIONS[5], time: '12:35', platform: '3' }
    ],
    price: {
      standard: 39,
      business: 68,
      'first-class': 110
    },
    availableSeats: {
      standard: 110,
      business: 42,
      'first-class': 16
    },
    amenities: ['Magnetic Levitation', 'Ultra-Quiet Cabin', 'Workstation Desks', 'Fast Pass Boarding'],
    status: 'On Time',
    currentSpeedKmH: 395,
    maxSpeedKmH: 420
  },
  {
    id: 'sch-520',
    trainNumber: 'ST-520',
    name: 'Northern Star Starlight',
    model: 'Silver Nightliner Grand',
    departureStation: STATIONS[1], // North Grand Terminal
    arrivalStation: STATIONS[6], // Metro Summit
    departureTime: '13:00',
    arrivalTime: '16:15',
    durationMinutes: 195,
    stops: [
      { station: STATIONS[1], time: '13:00', platform: '4B' },
      { station: STATIONS[0], time: '14:40', platform: '6A' },
      { station: STATIONS[6], time: '16:15', platform: '9' }
    ],
    price: {
      standard: 52,
      business: 89,
      'first-class': 148,
      sleeper: 180
    },
    availableSeats: {
      standard: 54,
      business: 20,
      'first-class': 9,
      sleeper: 6
    },
    amenities: ['Private Sleeping Pods', 'Cocktail Lounge', 'Shower Cabins', 'Digital Concierge'],
    status: 'Delayed 5m',
    currentSpeedKmH: 310,
    maxSpeedKmH: 330
  }
];

export const INITIAL_TELEMETRY: LiveTrainTelemetry[] = [
  {
    trainNumber: 'ST-101',
    name: 'Silver Bullet Apex',
    model: 'Silver Voyager 350-X',
    speed: 342,
    maxSpeed: 360,
    origin: 'Silver Central',
    destination: 'Metro Summit',
    nextStation: 'Emerald Valley',
    etaNext: '12 mins',
    progressPercent: 58,
    status: 'Cruising',
    line: 'Silver Apex',
    coordinates: { x: 48, y: 42 }
  },
  {
    trainNumber: 'ST-204',
    name: 'Pacific Dawn Express',
    model: 'Silver Coastliner Aero',
    speed: 0,
    maxSpeed: 320,
    origin: 'Pacific Harbor Bay',
    destination: 'Silver Central',
    nextStation: 'Pacific Harbor Bay',
    etaNext: 'Departs in 4m',
    progressPercent: 2,
    status: 'Boarding',
    line: 'Pacific Coastal',
    coordinates: { x: 18, y: 64 }
  },
  {
    trainNumber: 'ST-315',
    name: 'Highland Aurora',
    model: 'Silver Alpine Cross',
    speed: 285,
    maxSpeed: 300,
    origin: 'Silver Central',
    destination: 'Aurora Highlands',
    nextStation: 'Aurora Peak Gateway',
    etaNext: '24 mins',
    progressPercent: 74,
    status: 'Cruising',
    line: 'Highland Express',
    coordinates: { x: 38, y: 22 }
  },
  {
    trainNumber: 'ST-408',
    name: 'Solaris Streamliner',
    model: 'Silver Mag-Pulse 400',
    speed: 395,
    maxSpeed: 420,
    origin: 'Metro Summit',
    destination: 'Solaris Innovation Port',
    nextStation: 'Solaris Innovation Port',
    etaNext: '8 mins',
    progressPercent: 88,
    status: 'Cruising',
    line: 'Metro Cross',
    coordinates: { x: 78, y: 52 }
  },
  {
    trainNumber: 'ST-520',
    name: 'Northern Star Starlight',
    model: 'Silver Nightliner Grand',
    speed: 310,
    maxSpeed: 330,
    origin: 'North Grand Terminal',
    destination: 'Metro Summit',
    nextStation: 'Silver Central',
    etaNext: '19 mins',
    progressPercent: 36,
    status: 'Cruising',
    line: 'Silver Apex',
    coordinates: { x: 32, y: 34 }
  }
];
