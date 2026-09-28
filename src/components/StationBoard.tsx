import React, { useState } from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft, Train, MapPin, Sparkles } from 'lucide-react';
import { STATIONS, INITIAL_SCHEDULES } from '../data/mockTrains';
import { TrainSchedule } from '../types/train';

interface StationBoardProps {
  onQuickBookTrain: (train: TrainSchedule) => void;
}

export const StationBoard: React.FC<StationBoardProps> = ({ onQuickBookTrain }) => {
  const [selectedStationId, setSelectedStationId] = useState(STATIONS[0].id);
  const [boardType, setBoardType] = useState<'departures' | 'arrivals'>('departures');

  const station = STATIONS.find((s) => s.id === selectedStationId) || STATIONS[0];

  // Derive departures and arrivals for the station
  const trains = INITIAL_SCHEDULES;

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
                <Clock className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Live Station Concourse Board</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized real-time split-flap train arrivals and departures timetable
            </p>
          </div>

          {/* Station selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Station:</span>
            <select
              value={selectedStationId}
              onChange={(e) => setSelectedStationId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-medium focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            >
              {STATIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Board Toggle (Departures / Arrivals) */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80 text-xs">
            <button
              onClick={() => setBoardType('departures')}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                boardType === 'departures'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Departures</span>
            </button>
            <button
              onClick={() => setBoardType('arrivals')}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                boardType === 'arrivals'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Arrivals</span>
            </button>
          </div>

          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>LIVE FEED • PLATFORMS 1 - {station.platforms}</span>
          </div>
        </div>
      </div>

      {/* Retro-Modern High-Speed Rail Split Flap Board */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-500">
              <th className="py-3 px-3">Sched Time</th>
              <th className="py-3 px-3">Train #</th>
              <th className="py-3 px-3">Service Name</th>
              <th className="py-3 px-3">{boardType === 'departures' ? 'Destination' : 'Origin'}</th>
              <th className="py-3 px-3 text-center">Track</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-sm">
            {trains.map((train, idx) => {
              const displayTime = boardType === 'departures' ? train.departureTime : train.arrivalTime;
              const displayStation = boardType === 'departures' 
                ? `${train.arrivalStation.city} (${train.arrivalStation.code})` 
                : `${train.departureStation.city} (${train.departureStation.code})`;
              
              const platform = train.stops[0]?.platform || `${(idx % 8) + 1}A`;

              return (
                <tr key={train.id} className="hover:bg-slate-900/60 transition group">
                  
                  {/* Time with glowing font */}
                  <td className="py-4 px-3 font-black text-amber-400 text-base">
                    {displayTime}
                  </td>

                  {/* Train number */}
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700 text-xs font-bold">
                      {train.trainNumber}
                    </span>
                  </td>

                  {/* Service name */}
                  <td className="py-4 px-3 font-sans font-semibold text-white">
                    {train.name}
                    <span className="text-[11px] font-mono text-slate-500 block">{train.model}</span>
                  </td>

                  {/* Destination / Origin */}
                  <td className="py-4 px-3 font-sans font-medium text-slate-200">
                    {displayStation}
                  </td>

                  {/* Platform */}
                  <td className="py-4 px-3 text-center">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-400 font-black text-xs border border-slate-700">
                      {platform}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3 text-center">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      train.status === 'On Time'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : train.status === 'Boarding'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60 animate-pulse'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                    }`}>
                      {train.status}
                    </span>
                  </td>

                  {/* Quick Book */}
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => onQuickBookTrain(train)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white text-xs font-sans font-bold transition border border-cyan-500/40"
                    >
                      Book Seat
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex justify-between items-center">
          <span>* Gate closes 2 minutes prior to scheduled departure. Luggage check recommended 15 mins prior.</span>
          <span>Station Code: {station.code}</span>
        </div>
      </div>

    </div>
  );
};
