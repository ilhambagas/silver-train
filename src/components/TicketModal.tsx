import React, { useState } from 'react';
import { X, CheckCircle, Download, Train, ShieldCheck } from 'lucide-react';
import { Ticket } from '../types/train';

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onViewMyTickets: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  onClose,
  onViewMyTickets
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col my-8">
        
        {/* Success Header banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-extrabold text-base">Booking Confirmed!</h3>
              <p className="text-xs text-teal-100">Ticket e-Pass issued & seat reserved</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boarding Pass Physical Card Style */}
        <div className="p-6 bg-slate-900 space-y-6">
          
          <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
            {/* Watermark Logo */}
            <div className="absolute -right-8 -top-8 text-cyan-500/5 pointer-events-none">
              <Train className="w-48 h-48" />
            </div>

            {/* Top Pass Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-cyan-400 text-sm">SILVER TRAIN PASS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                  {ticket.classType.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Ref Code</span>
                <span className="font-mono font-black text-sm text-white tracking-wider">{ticket.bookingRef}</span>
              </div>
            </div>

            {/* Train details */}
            <div className="py-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block">Train Service</span>
                <span className="font-bold text-white text-base">{ticket.trainNumber} - {ticket.trainName}</span>
                <span className="text-xs text-slate-500 block">{ticket.model}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Platform</span>
                <span className="font-black text-2xl text-cyan-400 font-mono">{ticket.platform}</span>
              </div>
            </div>

            {/* Journey Stops */}
            <div className="py-4 border-b border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Departure</span>
                <div className="text-2xl font-black text-white font-mono">{ticket.departureTime}</div>
                <div className="text-xs font-bold text-cyan-300">{ticket.departureCode}</div>
                <div className="text-xs text-slate-400">{ticket.departureStation}</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Arrival</span>
                <div className="text-2xl font-black text-white font-mono">{ticket.arrivalTime}</div>
                <div className="text-xs font-bold text-indigo-300">{ticket.arrivalCode}</div>
                <div className="text-xs text-slate-400">{ticket.arrivalStation}</div>
              </div>
            </div>

            {/* Passenger & Seats details */}
            <div className="py-4 grid grid-cols-3 gap-2 text-xs border-b border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Passenger</span>
                <span className="font-bold text-white truncate block">{ticket.passengerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Coach</span>
                <span className="font-bold text-cyan-300 font-mono">{ticket.carriage}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px] uppercase">Seat(s)</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">{ticket.selectedSeats.join(', ')}</span>
              </div>
            </div>

            {/* QR Code & Barcode Section */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                {/* Simulated QR Code SVG */}
                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="black">
                  <rect width="30" height="30" rx="3" />
                  <rect x="70" width="30" height="30" rx="3" />
                  <rect y="70" width="30" height="30" rx="3" />
                  <rect x="7" y="7" width="16" height="16" fill="white" />
                  <rect x="77" y="7" width="16" height="16" fill="white" />
                  <rect x="7" y="77" width="16" height="16" fill="white" />
                  <rect x="11" y="11" width="8" height="8" />
                  <rect x="81" y="11" width="8" height="8" />
                  <rect x="11" y="81" width="8" height="8" />
                  <rect x="36" y="15" width="28" height="8" />
                  <rect x="42" y="30" width="16" height="16" />
                  <rect x="15" y="42" width="18" height="16" />
                  <rect x="68" y="42" width="22" height="18" />
                  <rect x="40" y="72" width="30" height="10" />
                </svg>
              </div>

              <div className="flex-1 text-right">
                <span className="text-[10px] font-mono text-slate-500 block">Scan at boarding gate</span>
                <span className="text-xs font-mono font-bold text-slate-300 block">SILVER-GATE-NFC-ENABLED</span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-end gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Validated by Silver Express ID
                </span>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                setDownloadSuccess(true);
                setTimeout(() => setDownloadSuccess(false), 3000);
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition border border-slate-700"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF Pass'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewMyTickets();
              }}
              className="py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-cyan-500/20"
            >
              <span>View in My Tickets</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
