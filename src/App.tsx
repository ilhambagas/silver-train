import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TripSearch } from './components/TripSearch';
import { TrainList } from './components/TrainList';
import { SeatMapModal } from './components/SeatMapModal';
import { TicketModal } from './components/TicketModal';
import { LiveTracker } from './components/LiveTracker';
import { NetworkMap } from './components/NetworkMap';
import { StationBoard } from './components/StationBoard';
import { MyTickets } from './components/MyTickets';

import { STATIONS, INITIAL_SCHEDULES } from './data/mockTrains';
import { Station, TrainSchedule, TravelClass, Ticket } from './types/train';
import { Shield, Sparkles, Train as TrainIcon, PhoneCall, Globe, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'book' | 'tracker' | 'map' | 'stations' | 'tickets'>('book');

  // Search parameters
  const [originId, setOriginId] = useState(STATIONS[0].id); // Silver Central
  const [destinationId, setDestinationId] = useState(STATIONS[6].id); // Metro Summit
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState<TravelClass | 'all'>('all');

  // Modals state
  const [activeSeatModal, setActiveSeatModal] = useState<{
    train: TrainSchedule;
    classType: TravelClass;
  } | null>(null);

  const [activeTicketModal, setActiveTicketModal] = useState<Ticket | null>(null);

  // Tickets stored in localStorage
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem('silver_train_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load tickets from storage', e);
    }
    // Default initial demonstration ticket
    return [
      {
        id: 'tkt-demo-1',
        bookingRef: 'ST-9482X',
        trainNumber: 'ST-101',
        trainName: 'Silver Bullet Apex',
        model: 'Silver Voyager 350-X',
        departureStation: 'Silver Central Station',
        departureCode: 'SCS',
        arrivalStation: 'Metro Summit Station',
        arrivalCode: 'MSS',
        departureTime: '08:15',
        arrivalTime: '10:45',
        travelDate: '2026-09-29',
        passengerName: 'Alex Morgan',
        passengerEmail: 'alex.morgan@silvertrain.io',
        selectedSeats: ['2A'],
        classType: 'business',
        carriage: 'Coach 02',
        platform: '3A',
        totalPrice: 82,
        bookedAt: new Date().toISOString(),
        status: 'confirmed'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('silver_train_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.warn('Failed to save tickets', e);
    }
  }, [tickets]);

  // Filtered trains matching search
  const availableTrains = INITIAL_SCHEDULES.filter((t) => {
    // If user specified origin and destination, match them, or show all for corridor flexibility
    const matchesStations = 
      (t.departureStation.id === originId && t.arrivalStation.id === destinationId) ||
      (t.departureStation.id === originId || t.arrivalStation.id === destinationId);
    return matchesStations;
  });

  // Fallback to all schedules if none specifically match
  const displayedTrains = availableTrains.length > 0 ? availableTrains : INITIAL_SCHEDULES;

  const handleSelectTrain = (train: TrainSchedule, classType: TravelClass) => {
    setActiveSeatModal({ train, classType });
  };

  const handleConfirmBooking = (bookingData: {
    selectedSeats: string[];
    passengerName: string;
    passengerEmail: string;
    carriage: string;
    totalPrice: number;
  }) => {
    if (!activeSeatModal) return;

    const ref = `ST-${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      bookingRef: ref,
      trainNumber: activeSeatModal.train.trainNumber,
      trainName: activeSeatModal.train.name,
      model: activeSeatModal.train.model,
      departureStation: activeSeatModal.train.departureStation.name,
      departureCode: activeSeatModal.train.departureStation.code,
      arrivalStation: activeSeatModal.train.arrivalStation.name,
      arrivalCode: activeSeatModal.train.arrivalStation.code,
      departureTime: activeSeatModal.train.departureTime,
      arrivalTime: activeSeatModal.train.arrivalTime,
      travelDate,
      passengerName: bookingData.passengerName,
      passengerEmail: bookingData.passengerEmail,
      selectedSeats: bookingData.selectedSeats,
      classType: activeSeatModal.classType,
      carriage: bookingData.carriage,
      platform: activeSeatModal.train.stops[0]?.platform || '4',
      totalPrice: bookingData.totalPrice,
      bookedAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setTickets([newTicket, ...tickets]);
    setActiveSeatModal(null);
    setActiveTicketModal(newTicket);
  };

  const handleCancelTicket = (ticketId: string) => {
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        ticketCount={tickets.length} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* TAB 1: BOOK JOURNEY */}
        {activeTab === 'book' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Next-Generation High-Speed Transit Corridor</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Travel in Pure Silver Speed & Luxury
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Connect capital metropolises, coastal ports, and mountain valleys at 350+ km/h. Smooth magnetic levitation, zero emissions, and panoramic vista carriages.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>350-420 km/h Maglev Speeds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant E-Passes with NFC Gate QR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>100% On-Time Silver Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Box */}
            <TripSearch
              stations={STATIONS}
              originId={originId}
              destinationId={destinationId}
              setOriginId={setOriginId}
              setDestinationId={setDestinationId}
              travelDate={travelDate}
              setTravelDate={setTravelDate}
              passengers={passengers}
              setPassengers={setPassengers}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              onSearch={() => {
                // Smooth scroll down to train list
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
            />

            {/* Train List Results */}
            <TrainList
              trains={displayedTrains}
              passengers={passengers}
              selectedClassFilter={selectedClass}
              onSelectTrain={handleSelectTrain}
            />
          </div>
        )}

        {/* TAB 2: LIVE FLEET RADAR & TELEMETRY */}
        {activeTab === 'tracker' && <LiveTracker />}

        {/* TAB 3: NETWORK ROUTE MAP */}
        {activeTab === 'map' && (
          <NetworkMap
            onSelectStationForBooking={(stationId) => {
              setOriginId(stationId);
              setActiveTab('book');
            }}
          />
        )}

        {/* TAB 4: STATION SPLIT-FLAP BOARD */}
        {activeTab === 'stations' && (
          <StationBoard
            onQuickBookTrain={(train) => {
              handleSelectTrain(train, 'standard');
            }}
          />
        )}

        {/* TAB 5: MY TICKETS */}
        {activeTab === 'tickets' && (
          <MyTickets
            tickets={tickets}
            onViewTicket={(ticket) => setActiveTicketModal(ticket)}
            onCancelTicket={handleCancelTicket}
            onGoToBooking={() => setActiveTab('book')}
          />
        )}

      </main>

      {/* Seat Selection Modal */}
      {activeSeatModal && (
        <SeatMapModal
          train={activeSeatModal.train}
          classType={activeSeatModal.classType}
          passengers={passengers}
          travelDate={travelDate}
          onClose={() => setActiveSeatModal(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Digital Boarding Pass Modal */}
      {activeTicketModal && (
        <TicketModal
          ticket={activeTicketModal}
          onClose={() => setActiveTicketModal(null)}
          onViewMyTickets={() => setActiveTab('tickets')}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-300">SILVER TRAIN SYSTEM</span>
            <span>• High-Speed Rail & Maglev Operations</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Customer Concierge: 1-800-SILVER</span>
            <span>All 18 Network Corridors Certified</span>
            <span className="text-cyan-400 font-mono">v1.0.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default App;
