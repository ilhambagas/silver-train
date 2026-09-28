export interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
  region: string;
  platforms: number;
  connections: string[];
  amenities: string[];
}

export type TravelClass = 'standard' | 'business' | 'first-class' | 'sleeper';

export interface TrainSchedule {
  id: string;
  trainNumber: string;
  name: string;
  model: string;
  departureStation: Station;
  arrivalStation: Station;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: {
    station: Station;
    time: string;
    platform: string;
  }[];
  price: {
    standard: number;
    business: number;
    'first-class': number;
    sleeper?: number;
  };
  availableSeats: {
    standard: number;
    business: number;
    'first-class': number;
    sleeper?: number;
  };
  amenities: string[];
  status: 'On Time' | 'Delayed 5m' | 'Boarding' | 'Departed';
  currentSpeedKmH: number;
  maxSpeedKmH: number;
}

export interface Seat {
  id: string;
  number: string;
  row: number;
  column: 'A' | 'B' | 'C' | 'D' | 'F';
  type: 'window' | 'aisle' | 'table';
  classType: TravelClass;
  status: 'available' | 'reserved' | 'selected' | 'disabled';
  priceMultiplier: number;
}

export interface Ticket {
  id: string;
  bookingRef: string;
  trainNumber: string;
  trainName: string;
  model: string;
  departureStation: string;
  departureCode: string;
  arrivalStation: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: string;
  passengerName: string;
  passengerEmail: string;
  selectedSeats: string[];
  classType: TravelClass;
  carriage: string;
  platform: string;
  totalPrice: number;
  bookedAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface LiveTrainTelemetry {
  trainNumber: string;
  name: string;
  model: string;
  speed: number;
  maxSpeed: number;
  origin: string;
  destination: string;
  nextStation: string;
  etaNext: string;
  progressPercent: number;
  status: 'Cruising' | 'Accelerating' | 'Decelerating' | 'At Station' | 'Boarding';
  line: 'Silver Apex' | 'Pacific Coastal' | 'Metro Cross' | 'Highland Express';
  coordinates: { x: number; y: number };
}
