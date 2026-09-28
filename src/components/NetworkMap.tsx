import React, { useState } from 'react';
import { MapPin, Navigation, Info, Zap, Shield, ArrowRight, Train } from 'lucide-react';
import { STATIONS } from '../data/mockTrains';
import { Station } from '../types/train';

interface NetworkMapProps {
  onSelectStationForBooking: (stationId: string) => void;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ onSelectStationForBooking }) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(STATIONS[0]);
  const [activeLineFilter, setActiveLineFilter] = useState<string>('all');

  // Station positions on a 800x500 canvas
  const stationCoords: Record<string, { x: number; y: number }> = {
    'st-slv': { x: 380, y: 250 }, // Silver Central
    'st-nth': { x: 380, y: 90 },  // North Grand Terminal
    'st-pcf': { x: 120, y: 360 }, // Pacific Harbor
    'st-emr': { x: 260, y: 250 }, // Emerald Valley
    'st-aur': { x: 220, y: 120 }, // Aurora Highlands
    'st-smt': { x: 580, y: 250 }, // Metro Summit
    'st-sol': { x: 700, y: 380 }  // Solaris Port
  };

  const lines = [
    { id: 'all', name: 'All Rail Corridors', color: '#38bdf8' },
    { id: 'apex', name: 'Silver Apex Line', color: '#06b6d4', path: 'st-nth -> st-slv -> st-smt' },
    { id: 'coastal', name: 'Pacific Scenic Line', color: '#10b981', path: 'st-pcf -> st-emr -> st-slv' },
    { id: 'highland', name: 'Highland Alpine', color: '#f59e0b', path: 'st-aur -> st-emr' },
    { id: 'maglev', name: 'Solaris Hyper-Link', color: '#a855f7', path: 'st-smt -> st-sol' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
              <Navigation className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">High-Speed Schematic Transit Network</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click on any station node to view amenities, platforms, and book immediate connections
          </p>
        </div>

        {/* Corridor Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          {lines.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLineFilter(l.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
                activeLineFilter === l.id
                  ? 'bg-slate-900 text-white border-2'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700'
              }`}
              style={{ borderColor: activeLineFilter === l.id ? l.color : undefined }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 md:p-6 border border-slate-800 relative overflow-hidden shadow-2xl">
          
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative w-full aspect-[16/10] min-h-[360px]">
            <svg viewBox="0 0 800 500" className="w-full h-full select-none">
              
              <defs>
                {/* Glow Filter */}
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* RAIL LINE PATHS */}

              {/* 1. North - Silver Central - Metro Summit (Silver Apex) */}
              <path
                d="M 380 90 L 380 250 L 580 250"
                fill="none"
                stroke="#06b6d4"
                strokeWidth={activeLineFilter === 'all' || activeLineFilter === 'apex' ? '6' : '2'}
                strokeOpacity={activeLineFilter === 'all' || activeLineFilter === 'apex' ? '1' : '0.2'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
              />

              {/* 2. Pacific Harbor - Emerald Valley - Silver Central (Pacific Scenic) */}
              <path
                d="M 120 360 L 260 250 L 380 250"
                fill="none"
                stroke="#10b981"
                strokeWidth={activeLineFilter === 'all' || activeLineFilter === 'coastal' ? '6' : '2'}
                strokeOpacity={activeLineFilter === 'all' || activeLineFilter === 'coastal' ? '1' : '0.2'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
              />

              {/* 3. Aurora Highlands - Emerald Valley (Highland Line) */}
              <path
                d="M 220 120 L 260 250"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={activeLineFilter === 'all' || activeLineFilter === 'highland' ? '6' : '2'}
                strokeOpacity={activeLineFilter === 'all' || activeLineFilter === 'highland' ? '1' : '0.2'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
              />

              {/* 4. Metro Summit - Solaris Port (Solaris Maglev) */}
              <path
                d="M 580 250 L 700 380"
                fill="none"
                stroke="#a855f7"
                strokeWidth={activeLineFilter === 'all' || activeLineFilter === 'maglev' ? '6' : '2'}
                strokeOpacity={activeLineFilter === 'all' || activeLineFilter === 'maglev' ? '1' : '0.2'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
              />

              {/* Moving Pulse Animation along lines */}
              <circle r="5" fill="#ffffff" className="animate-pulse">
                <animateMotion
                  path="M 380 90 L 380 250 L 580 250"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="5" fill="#38bdf8" className="animate-pulse">
                <animateMotion
                  path="M 120 360 L 260 250 L 380 250 L 580 250 L 700 380"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* STATION NODES */}
              {STATIONS.map((station) => {
                const pos = stationCoords[station.id];
                if (!pos) return null;
                const isSelected = selectedStation?.id === station.id;

                return (
                  <g
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    className="cursor-pointer group"
                    transform={`translate(${pos.x}, ${pos.y})`}
                  >
                    {/* Ring highlight if selected */}
                    {isSelected && (
                      <circle
                        r="18"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ transformOrigin: '0 0' }}
                      />
                    )}

                    {/* Outer node circle */}
                    <circle
                      r="10"
                      fill="#0f172a"
                      stroke={isSelected ? '#38bdf8' : '#ffffff'}
                      strokeWidth="3.5"
                      className="group-hover:scale-125 transition-transform"
                    />

                    {/* Inner node dot */}
                    <circle
                      r="4"
                      fill={isSelected ? '#38bdf8' : '#64748b'}
                    />

                    {/* Station Name Tag */}
                    <g transform="translate(0, 22)">
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="20"
                        rx="6"
                        fill="rgba(15, 23, 42, 0.85)"
                        stroke={isSelected ? '#38bdf8' : 'rgba(71, 85, 105, 0.5)'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {station.code} • {station.city.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}

            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900 pt-3">
            <span>● Click node to inspect station infrastructure</span>
            <span>Speed Limit: 420 km/h (Design Speed: 500 km/h)</span>
          </div>

        </div>

        {/* Station Detail Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {selectedStation ? (
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    STATION CODE: {selectedStation.code}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedStation.city} • {selectedStation.region}</p>
                </div>
                <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-800 text-cyan-400 font-mono font-black text-lg">
                  {selectedStation.code}
                </div>
              </div>

              {/* Station Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-500 uppercase block">Platforms</span>
                  <span className="text-xl font-bold text-white font-mono">{selectedStation.platforms} Tracks</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-500 uppercase block">Security</span>
                  <span className="text-sm font-bold text-emerald-400">Biometric Fast Pass</span>
                </div>
              </div>

              {/* Transit Connections */}
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">Transit Connections</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStation.connections.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">Terminal Facilities</span>
                <div className="space-y-1 text-xs text-slate-400">
                  {selectedStation.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Book From Here */}
              <button
                type="button"
                onClick={() => onSelectStationForBooking(selectedStation.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Departure from {selectedStation.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 text-center text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p>Select any station on the network map to view live details and connections.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
