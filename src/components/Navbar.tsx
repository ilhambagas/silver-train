import React, { useState, useEffect } from 'react';
import { 
  Train, 
  Radio, 
  MapPin, 
  Clock, 
  Ticket as TicketIcon, 
  ShieldCheck,
  Zap,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'book' | 'tracker' | 'map' | 'stations' | 'tickets';
  setActiveTab: (tab: 'book' | 'tracker' | 'map' | 'stations' | 'tickets') => void;
  ticketCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, ticketCount }) => {
  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  interface NavItem {
    id: 'book' | 'tracker' | 'map' | 'stations' | 'tickets';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | null;
  }

  const navItems: NavItem[] = [
    { id: 'book', label: 'Book Journey', icon: Train },
    { id: 'tracker', label: 'Fleet Telemetry', icon: Radio },
    { id: 'map', label: 'Network Map', icon: MapPin },
    { id: 'stations', label: 'Live Timetable', icon: Clock },
    { id: 'tickets', label: 'My Tickets', icon: TicketIcon, badge: ticketCount > 0 ? ticketCount : null }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('book')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Train className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300 font-mono">
                  SILVER<span className="text-cyan-400">TRAIN</span>
                </span>
                <span className="text-[10px] font-semibold tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase">
                  350+ KM/H
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5">High-Speed Rail Transit System</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Indicator & Clock */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-mono font-medium">SYSTEM LIVE</span>
              <span className="text-slate-600">|</span>
              <span className="font-mono text-cyan-400 font-semibold">{time}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Maglev & Aero Line</span>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden gap-2">
            {ticketCount > 0 && (
              <button
                onClick={() => setActiveTab('tickets')}
                className="relative p-2 rounded-lg bg-slate-800 text-cyan-400"
              >
                <TicketIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {ticketCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
