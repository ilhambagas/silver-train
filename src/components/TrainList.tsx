import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  Wifi, 
  Coffee, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Gauge,
  Sparkles
} from 'lucide-react';
import { TrainSchedule, TravelClass } from '../types/train';

interface TrainListProps {
  trains: TrainSchedule[];
  passengers: number;
  selectedClassFilter: TravelClass | 'all';
  onSelectTrain: (train: TrainSchedule, classType: TravelClass) => void;
}

export const TrainList: React.FC<TrainListProps> = ({
  trains,
  passengers,
  selectedClassFilter,
  onSelectTrain
}) => {
  if (trains.length === 0) {
    return (
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/60 p-12 text-center my-6">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Direct High-Speed Trains Found</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Try selecting different origin/destination stations like Silver Central to Metro Summit or Pacific Harbor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
          Available Departures ({trains.length} Direct High-Speed Services)
        </h3>
        <span className="text-xs text-cyan-400 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Fares include seat reservation & Wi-Fi
        </span>
      </div>

      <div className="space-y-4">
        {trains.map((train) => {
          const isMaglev = train.maxSpeedKmH >= 400;

          return (
            <div
              key={train.id}
              className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 rounded-2xl p-5 md:p-6 transition-all duration-200 shadow-xl group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Train details & Route column */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-mono font-bold">
                      {train.trainNumber}
                    </span>
                    <span className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                      {train.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({train.model})
                    </span>

                    {isMaglev && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Maglev 400
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      train.status === 'On Time' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                        : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                    }`}>
                      {train.status}
                    </span>
                  </div>

                  {/* Route Timeline */}
                  <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    {/* Departure */}
                    <div className="text-left min-w-[70px]">
                      <div className="text-2xl font-black text-white font-mono tracking-tight">
                        {train.departureTime}
                      </div>
                      <div className="text-xs font-bold text-cyan-400 mt-0.5">
                        {train.departureStation.code}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[120px]">
                        {train.departureStation.name}
                      </div>
                    </div>

                    {/* Duration / Arrow graph */}
                    <div className="flex-1 flex flex-col items-center px-2">
                      <div className="text-[11px] font-mono font-semibold text-slate-400 flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(train.durationMinutes / 60)}h {train.durationMinutes % 60}m
                      </div>
                      <div className="w-full flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-slate-900 px-1 text-[10px] text-slate-400 border border-slate-700 rounded">
                            Direct Express
                          </div>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-cyan-400" />
                        <span>Cruising ~{train.maxSpeedKmH} km/h</span>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-right min-w-[70px]">
                      <div className="text-2xl font-black text-white font-mono tracking-tight">
                        {train.arrivalTime}
                      </div>
                      <div className="text-xs font-bold text-indigo-400 mt-0.5">
                        {train.arrivalStation.code}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[120px]">
                        {train.arrivalStation.name}
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap items-center gap-2">
                    {train.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Class Fares & Booking Column */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 lg:pt-0 lg:border-l lg:border-slate-700/80 lg:pl-6">
                  
                  {/* Standard Class */}
                  {(selectedClassFilter === 'all' || selectedClassFilter === 'standard') && (
                    <div 
                      onClick={() => onSelectTrain(train, 'standard')}
                      className="bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-xl p-3 cursor-pointer transition flex flex-col justify-between group/card shadow-sm"
                    >
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                          Standard
                        </div>
                        <div className="text-xl font-bold text-white font-mono mt-1">
                          ${train.price.standard * passengers}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {passengers > 1 ? `$${train.price.standard} ea` : 'Per ticket'}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400">
                          {train.availableSeats.standard} seats
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover/card:translate-x-0.5 transition" />
                      </div>
                    </div>
                  )}

                  {/* Business Class */}
                  {(selectedClassFilter === 'all' || selectedClassFilter === 'business') && (
                    <div 
                      onClick={() => onSelectTrain(train, 'business')}
                      className="bg-slate-900/80 hover:bg-slate-900 border border-cyan-900/60 hover:border-cyan-400 rounded-xl p-3 cursor-pointer transition flex flex-col justify-between group/card shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/10 rounded-bl-xl pointer-events-none" />
                      <div>
                        <div className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wide flex items-center gap-1">
                          Business
                        </div>
                        <div className="text-xl font-bold text-cyan-200 font-mono mt-1">
                          ${train.price.business * passengers}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {passengers > 1 ? `$${train.price.business} ea` : 'Lounge access'}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400">
                          {train.availableSeats.business} seats
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover/card:translate-x-0.5 transition" />
                      </div>
                    </div>
                  )}

                  {/* First Class */}
                  {(selectedClassFilter === 'all' || selectedClassFilter === 'first-class') && (
                    <div 
                      onClick={() => onSelectTrain(train, 'first-class')}
                      className="bg-slate-900/80 hover:bg-slate-900 border border-amber-800/40 hover:border-amber-400 rounded-xl p-3 cursor-pointer transition flex flex-col justify-between group/card shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 rounded-bl-xl pointer-events-none" />
                      <div>
                        <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                          First Class
                        </div>
                        <div className="text-xl font-bold text-amber-200 font-mono mt-1">
                          ${train.price['first-class'] * passengers}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Gourmet meal inc.
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-amber-400">
                          {train.availableSeats['first-class']} left
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover/card:translate-x-0.5 transition" />
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
