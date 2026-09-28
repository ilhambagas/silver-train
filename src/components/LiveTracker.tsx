import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Gauge, 
  MapPin, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  Activity, 
  Navigation,
  Train as TrainIcon,
  Search,
  Filter
} from 'lucide-react';
import { LiveTrainTelemetry } from '../types/train';
import { INITIAL_TELEMETRY } from '../data/mockTrains';

export const LiveTracker: React.FC = () => {
  const [telemetry, setTelemetry] = useState<LiveTrainTelemetry[]>(INITIAL_TELEMETRY);
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrain, setSelectedTrain] = useState<LiveTrainTelemetry | null>(INITIAL_TELEMETRY[0]);

  // Live simulation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) =>
        prev.map((t) => {
          if (t.status === 'Boarding') return t;
          // small speed fluctuation +/- 3 km/h
          const delta = (Math.random() * 6 - 3);
          const newSpeed = Math.min(t.maxSpeed, Math.max(120, Math.round(t.speed + delta)));
          // slight progress advance
          const newProgress = t.progressPercent >= 99 ? 5 : t.progressPercent + 0.5;
          return {
            ...t,
            speed: newSpeed,
            progressPercent: Number(newProgress.toFixed(1))
          };
        })
      );
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const lines = ['all', 'Silver Apex', 'Pacific Coastal', 'Highland Express', 'Metro Cross'];

  const filtered = telemetry.filter((t) => {
    const matchesLine = selectedLine === 'all' || t.line === selectedLine;
    const matchesSearch = 
      t.trainNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLine && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Filter bar */}
      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <h2 className="text-xl font-bold text-white">Silver Fleet Telemetry & Live Radar</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active high-speed rolling stock telemetry transmitted via Silver Starlink Mesh
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-slate-400">Active Trains: </span>
              <span className="text-cyan-400 font-bold">{telemetry.length}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-slate-400">Network Avg Speed: </span>
              <span className="text-emerald-400 font-bold">332 km/h</span>
            </div>
          </div>
        </div>

        {/* Filter and Search controls */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Corridor:
            </span>
            {lines.map((ln) => (
              <button
                key={ln}
                onClick={() => setSelectedLine(ln)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedLine === ln
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                {ln === 'all' ? 'All Corridors' : ln}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search train or station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: List of trains & Active Focus Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Train Cards Column */}
        <div className="lg:col-span-7 space-y-3.5">
          {filtered.map((train) => {
            const isSelected = selectedTrain?.trainNumber === train.trainNumber;
            const speedRatio = Math.round((train.speed / train.maxSpeed) * 100);

            return (
              <div
                key={train.trainNumber}
                onClick={() => setSelectedTrain(train)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500/50 shadow-xl shadow-cyan-950/30'
                    : 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {train.trainNumber}
                    </span>
                    <span className="font-bold text-white text-base">{train.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">({train.line})</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                    train.status === 'Boarding'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    {train.status}
                  </span>
                </div>

                {/* Speed Gauge & Progress Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 mb-3">
                  <div className="sm:col-span-4 flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white font-mono leading-none">
                        {train.speed} <span className="text-xs font-normal text-slate-400">km/h</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Max {train.maxSpeed} km/h
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-8 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Next: <strong className="text-slate-200">{train.nextStation}</strong></span>
                      <span className="text-cyan-400 font-mono font-semibold">ETA {train.etaNext}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-500 rounded-full"
                        style={{ width: `${train.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Route Endpoints */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{train.origin}</span>
                    <span className="text-slate-600">➔</span>
                    <span>{train.destination}</span>
                  </div>
                  <div className="font-mono text-cyan-400 text-[11px]">
                    {train.progressPercent}% Completed
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Train Focus Telemetry Box */}
        {selectedTrain && (
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl shadow-cyan-950/40">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 block uppercase">
                    Focused Telemetry Stream
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedTrain.trainNumber} - {selectedTrain.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedTrain.model}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <TrainIcon className="w-6 h-6" />
                </div>
              </div>

              {/* Real-time speed cluster */}
              <div className="my-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Instantaneous Velocity</span>
                <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                  {selectedTrain.speed}
                </div>
                <span className="text-xs font-mono text-cyan-400 block mt-1">KILOMETERS PER HOUR</span>

                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-around text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Traction Status</span>
                    <span className="font-semibold text-emerald-400">Nominal 100%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Overhead Voltage</span>
                    <span className="font-semibold text-slate-300">25 kV AC</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Cabin Pressure</span>
                    <span className="font-semibold text-slate-300">Sealed 1.0 ATM</span>
                  </div>
                </div>
              </div>

              {/* Waypoint details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Corridor Line:</span>
                  <span className="font-semibold text-white">{selectedTrain.line}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Origin Station:</span>
                  <span className="font-semibold text-white">{selectedTrain.origin}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Terminal Destination:</span>
                  <span className="font-semibold text-cyan-300">{selectedTrain.destination}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Approaching Stop:</span>
                  <span className="font-semibold text-amber-300">{selectedTrain.nextStation}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Estimated Arrival:</span>
                  <span className="font-bold text-emerald-400 font-mono">{selectedTrain.etaNext}</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Automatic Train Control (ATC-3) active. Zero human error threshold.</span>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
