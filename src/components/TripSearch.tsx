import React from 'react';
import { ArrowLeftRight, Calendar, Users, Shield, MapPin, Sparkles } from 'lucide-react';
import { Station, TravelClass } from '../types/train';

interface TripSearchProps {
  stations: Station[];
  originId: string;
  destinationId: string;
  setOriginId: (id: string) => void;
  setDestinationId: (id: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  passengers: number;
  setPassengers: (count: number) => void;
  selectedClass: TravelClass | 'all';
  setSelectedClass: (c: TravelClass | 'all') => void;
  onSearch: () => void;
}

export const TripSearch: React.FC<TripSearchProps> = ({
  stations,
  originId,
  destinationId,
  setOriginId,
  setDestinationId,
  travelDate,
  setTravelDate,
  passengers,
  setPassengers,
  selectedClass,
  setSelectedClass,
  onSearch
}) => {
  const handleSwap = () => {
    const temp = originId;
    setOriginId(destinationId);
    setDestinationId(temp);
  };

  const quickRoutes = [
    { from: 'st-slv', to: 'st-smt', label: 'Silver Central ➔ Metro Summit (Express 350)' },
    { from: 'st-pcf', to: 'st-slv', label: 'Pacific Harbor ➔ Silver Central (Coastline)' },
    { from: 'st-slv', to: 'st-aur', label: 'Silver Central ➔ Aurora Highlands (Panoramic)' },
    { from: 'st-smt', to: 'st-sol', label: 'Metro Summit ➔ Solaris Tech Port (Maglev)' }
  ];

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </span>
            Book High-Speed Express Journey
          </h2>
          <p className="text-xs text-slate-400 mt-1">Guaranteed seat reservations with 100% On-Time Silver Guarantee</p>
        </div>

        {/* Class selector tabs */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 text-xs">
          {(['all', 'standard', 'business', 'first-class'] as const).map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                selectedClass === cls
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cls === 'first-class' ? 'First Class' : cls}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Origin Station */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Origin Station
          </label>
          <div className="relative">
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {stations.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === destinationId}>
                  {s.name} ({s.code}) - {s.city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {stations.find(s => s.id === originId)?.code}
              </span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center md:pt-5">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Origin and Destination"
            className="p-2.5 rounded-xl bg-slate-700/60 hover:bg-cyan-500 hover:text-white text-slate-300 transition duration-200 border border-slate-600 shadow-sm active:scale-95"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destination Station */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            Destination Station
          </label>
          <div className="relative">
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {stations.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === originId}>
                  {s.name} ({s.code}) - {s.city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <span className="text-xs font-mono font-bold text-sky-400">
                {stations.find(s => s.id === destinationId)?.code}
              </span>
            </div>
          </div>
        </div>

        {/* Date & Passengers */}
        <div className="md:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              Guests
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Rider' : 'Riders'}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Quick Route Shortcuts */}
      <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-300">Popular Corridors:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickRoutes.map((qr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setOriginId(qr.from);
                  setDestinationId(qr.to);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-slate-700/70 border border-slate-700 transition"
              >
                {qr.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
        >
          <span>Find Available Trains</span>
        </button>
      </div>

    </div>
  );
};
