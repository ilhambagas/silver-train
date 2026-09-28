import React from 'react';
import { Ticket as TicketIcon, Calendar, Clock, MapPin, QrCode, Trash2, ArrowRight } from 'lucide-react';
import { Ticket } from '../types/train';

interface MyTicketsProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
  onCancelTicket: (ticketId: string) => void;
  onGoToBooking: () => void;
}

export const MyTickets: React.FC<MyTicketsProps> = ({
  tickets,
  onViewTicket,
  onCancelTicket,
  onGoToBooking
}) => {
  if (tickets.length === 0) {
    return (
      <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-12 text-center my-6 max-w-2xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <TicketIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Active Train Passes</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          You haven't booked any Silver Train tickets yet. Search routes and reserve high-speed seats with instant digital e-passes.
        </p>
        <button
          onClick={onGoToBooking}
          className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white shadow-lg shadow-cyan-500/25 transition cursor-pointer"
        >
          Book Your First Journey
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TicketIcon className="w-5 h-5 text-cyan-400" />
            My Booked Journeys & Digital Passes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tap on any pass to reveal the high-resolution NFC boarding pass & QR gate scanner
          </p>
        </div>

        <button
          onClick={onGoToBooking}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 text-xs font-semibold transition"
        >
          + Book Another Journey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition space-y-4 group relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {t.trainNumber}
                </span>
                <span className="font-bold text-white text-sm">{t.trainName}</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-bold">
                REF: {t.bookingRef}
              </span>
            </div>

            {/* Departure / Arrival row */}
            <div className="flex items-center justify-between bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">{t.departureStation}</span>
                <span className="text-xl font-black text-white font-mono">{t.departureTime}</span>
                <span className="text-[10px] text-cyan-400 font-mono font-bold">Code: {t.departureCode}</span>
              </div>

              <div className="flex flex-col items-center px-4">
                <ArrowRight className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] text-slate-500 font-mono mt-1">{t.travelDate}</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">{t.arrivalStation}</span>
                <span className="text-xl font-black text-white font-mono">{t.arrivalTime}</span>
                <span className="text-[10px] text-indigo-400 font-mono font-bold">Code: {t.arrivalCode}</span>
              </div>
            </div>

            {/* Seat & Passenger Info */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Lead Passenger</span>
                <span className="font-medium text-white">{t.passengerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Coach / Seat</span>
                <span className="font-mono font-bold text-cyan-300">{t.carriage} • Seat {t.selectedSeats.join(', ')}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase">Fares Paid</span>
                <span className="font-mono font-black text-emerald-400 text-sm">${t.totalPrice}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between gap-3">
              <button
                onClick={() => onCancelTicket(t.id)}
                className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 transition"
                title="Cancel Reservation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                onClick={() => onViewTicket(t)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Open Digital Pass</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
