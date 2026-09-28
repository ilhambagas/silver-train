import React, { useState } from 'react';
import { X, Check, Armchair, AlertCircle, Shield, Sparkles, User } from 'lucide-react';
import { TrainSchedule, TravelClass, Seat } from '../types/train';

interface SeatMapModalProps {
  train: TrainSchedule;
  classType: TravelClass;
  passengers: number;
  travelDate: string;
  onClose: () => void;
  onConfirmBooking: (bookingData: {
    selectedSeats: string[];
    passengerName: string;
    passengerEmail: string;
    carriage: string;
    totalPrice: number;
  }) => void;
}

export const SeatMapModal: React.FC<SeatMapModalProps> = ({
  train,
  classType,
  passengers,
  travelDate,
  onClose,
  onConfirmBooking
}) => {
  const [selectedCarriage, setSelectedCarriage] = useState('02');
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['2A']);
  const [passengerName, setPassengerName] = useState('Alex Morgan');
  const [passengerEmail, setPassengerEmail] = useState('alex.morgan@silvertrain.io');
  const [extraLuggage, setExtraLuggage] = useState(false);
  const [bistroVoucher, setBistroVoucher] = useState(false);

  // Generate 8 rows of 4 seats (A B - aisle - C D)
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const reservedSeed = ['1C', '3A', '4D', '6B', '7C', '8A', '5B'];

  const getSeatStatus = (seatId: string) => {
    if (selectedSeatIds.includes(seatId)) return 'selected';
    if (reservedSeed.includes(seatId)) return 'reserved';
    return 'available';
  };

  const handleSeatClick = (seatId: string) => {
    if (reservedSeed.includes(seatId)) return;

    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds(selectedSeatIds.filter(id => id !== seatId));
    } else {
      if (selectedSeatIds.length < passengers) {
        setSelectedSeatIds([...selectedSeatIds, seatId]);
      } else {
        // Replace first if reached count
        setSelectedSeatIds([...selectedSeatIds.slice(1), seatId]);
      }
    }
  };

  const basePricePerTicket = train.price[classType] || train.price.standard;
  const seatsTotal = basePricePerTicket * selectedSeatIds.length;
  const addonsTotal = (extraLuggage ? 15 : 0) + (bistroVoucher ? 20 : 0);
  const grandTotal = seatsTotal + addonsTotal;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeatIds.length === 0) return;
    onConfirmBooking({
      selectedSeats: selectedSeatIds,
      passengerName,
      passengerEmail,
      carriage: `Coach ${selectedCarriage}`,
      totalPrice: grandTotal
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl shadow-cyan-950/40">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
                {train.trainNumber}
              </span>
              <h3 className="font-bold text-lg text-white">Select Seats & Boarding Details</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {train.departureStation.name} ➔ {train.arrivalStation.name} • {travelDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Carriage selector */}
          <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300">Carriage:</span>
            <div className="flex gap-2">
              {['01', '02', '03', '04'].map((car) => (
                <button
                  key={car}
                  type="button"
                  onClick={() => setSelectedCarriage(car)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                    selectedCarriage === car
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Car {car} {car === '01' ? '(First)' : car === '02' ? '(Lounge)' : '(Express)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Train Carriage Visualizer */}
            <div className="md:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800">
              <div className="text-center text-xs font-mono font-semibold text-slate-400 mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>◀ TRAIN NOSE (COACH {selectedCarriage})</span>
                <span className="text-cyan-400">Class: {classType.toUpperCase()}</span>
              </div>

              {/* Seat Legend */}
              <div className="flex items-center justify-center gap-4 text-[11px] mb-5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
                  Available
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <div className="w-4 h-4 rounded bg-cyan-500 border border-cyan-400 shadow-sm" />
                  Selected
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <div className="w-4 h-4 rounded bg-slate-900 border border-slate-800 text-center text-[9px] line-through">✕</div>
                  Occupied
                </div>
              </div>

              {/* Seat Layout Rows */}
              <div className="space-y-2.5 max-w-xs mx-auto">
                {rows.map((row) => {
                  const colA = `${row}A`;
                  const colB = `${row}B`;
                  const colC = `${row}C`;
                  const colD = `${row}D`;

                  const renderSeatBtn = (seatId: string, col: string) => {
                    const status = getSeatStatus(seatId);
                    const isSelected = status === 'selected';
                    const isReserved = status === 'reserved';

                    return (
                      <button
                        key={seatId}
                        type="button"
                        disabled={isReserved}
                        onClick={() => handleSeatClick(seatId)}
                        title={`Seat ${seatId} (${col === 'A' || col === 'D' ? 'Window' : 'Aisle'})`}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all relative ${
                          isSelected
                            ? 'bg-gradient-to-tr from-cyan-500 to-sky-400 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-300 scale-105'
                            : isReserved
                            ? 'bg-slate-900/90 text-slate-600 border border-slate-800 cursor-not-allowed'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {seatId}
                      </button>
                    );
                  };

                  return (
                    <div key={row} className="flex items-center justify-between gap-3">
                      {/* Left: Window A, Aisle B */}
                      <div className="flex items-center gap-2">
                        {renderSeatBtn(colA, 'A')}
                        {renderSeatBtn(colB, 'B')}
                      </div>

                      {/* Center Aisle Indicator */}
                      <div className="text-[10px] font-mono text-slate-600 font-bold px-1 select-none">
                        R{row}
                      </div>

                      {/* Right: Aisle C, Window D */}
                      <div className="flex items-center gap-2">
                        {renderSeatBtn(colC, 'C')}
                        {renderSeatBtn(colD, 'D')}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-center text-[10px] text-slate-500">
                Direction of Travel ◀ | Power outlets & Reading light at every seat
              </div>
            </div>

            {/* Passenger Form & Price Summary */}
            <form onSubmit={handleConfirm} className="md:col-span-5 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Lead Passenger Details</h4>
                <p className="text-xs text-slate-400">Boarding passes will be sent digitally</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-300">Journey Add-ons</span>
                
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={extraLuggage}
                      onChange={(e) => setExtraLuggage(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-xs text-slate-300">Extra Luggage Allowance (2x 32kg)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-cyan-400">+$15</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={bistroVoucher}
                      onChange={(e) => setBistroVoucher(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-xs text-slate-300">Gourmet Dining Dining Credit ($30 val)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-cyan-400">+$20</span>
                </label>
              </div>

              {/* Price Calculation Box */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Seats:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {selectedSeatIds.length > 0 ? selectedSeatIds.join(', ') : 'None selected'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Base Fares ({selectedSeatIds.length}x):</span>
                  <span className="text-slate-200 font-mono">${seatsTotal}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Add-ons:</span>
                    <span className="text-slate-200 font-mono">+${addonsTotal}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Amount:</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">
                    ${grandTotal}
                  </span>
                </div>
              </div>

              {selectedSeatIds.length < passengers && (
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Please pick {passengers - selectedSeatIds.length} more seat(s) for your party.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={selectedSeatIds.length === 0}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>Confirm Reservation (${grandTotal})</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
