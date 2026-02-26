import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { mockBuses, mockRoutes } from '../../data/mockData';

export function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { busId, from, to, date } = location.state || {};

  const bus = mockBuses.find(b => b.id === busId);
  const route = mockRoutes.find(r => r.id === bus?.routeId);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat layout (simplified)
  const rows = 11; // 11 rows
  const seatsPerRow = 4; // 2-2 layout
  const totalSeats = rows * seatsPerRow;

  // Simulate some occupied seats
  const occupiedSeats = ['A1', 'A3', 'B2', 'C1', 'D4', 'E3', 'F1', 'G2'];

  const getSeatNumber = (rowIndex: number, seatIndex: number) => {
    const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C, etc.
    return `${rowLetter}${seatIndex + 1}`;
  };

  const toggleSeat = (seatNumber: string) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/passenger/payment', {
        state: {
          busId,
          from,
          to,
          date,
          seats: selectedSeats,
          fare: route?.baseFare ? route.baseFare * selectedSeats.length : 0
        }
      });
    }
  };

  if (!bus || !route) {
    return <div>Bus not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white font-semibold">Select Seats</h1>
            <p className="text-white/80 text-sm">{bus.operatorName} • {bus.busNumber}</p>
          </div>
        </div>
      </div>

      {/* Trip Info */}
      <div className="px-4 py-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold">{from} → {to}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Fare per seat</p>
                <p className="font-semibold text-[#0D47A1]">Rs. {route.baseFare}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seat Legend */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0D47A1] rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="px-4 pb-24">
        <Card>
          <CardContent className="p-6">
            {/* Driver Section */}
            <div className="mb-6 pb-4 border-b">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xs">Driver</span>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-3">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                  <div className="flex gap-2">
                    {Array.from({ length: 2 }, (_, seatIndex) => {
                      const seatNumber = getSeatNumber(rowIndex, seatIndex);
                      const isOccupied = occupiedSeats.includes(seatNumber);
                      const isSelected = selectedSeats.includes(seatNumber);

                      return (
                        <button
                          key={seatNumber}
                          onClick={() => toggleSeat(seatNumber)}
                          disabled={isOccupied}
                          className={`w-10 h-10 rounded flex items-center justify-center text-xs font-medium transition-all ${
                            isOccupied
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#0D47A1] text-white shadow-md'
                              : 'bg-white border-2 border-gray-300 hover:border-[#0D47A1]'
                          }`}
                        >
                          {seatNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-6"></div>

                  <div className="flex gap-2">
                    {Array.from({ length: 2 }, (_, seatIndex) => {
                      const seatNumber = getSeatNumber(rowIndex, seatIndex + 2);
                      const isOccupied = occupiedSeats.includes(seatNumber);
                      const isSelected = selectedSeats.includes(seatNumber);

                      return (
                        <button
                          key={seatNumber}
                          onClick={() => toggleSeat(seatNumber)}
                          disabled={isOccupied}
                          className={`w-10 h-10 rounded flex items-center justify-center text-xs font-medium transition-all ${
                            isOccupied
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#0D47A1] text-white shadow-md'
                              : 'bg-white border-2 border-gray-300 hover:border-[#0D47A1]'
                          }`}
                        >
                          {seatNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Summary Bar */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t px-4 py-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">
                {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
              </p>
              {selectedSeats.length > 0 && (
                <p className="text-xs text-gray-500">{selectedSeats.join(', ')}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-[#0D47A1]">
                Rs. {route.baseFare * selectedSeats.length}
              </p>
            </div>
          </div>
          <Button
            className="w-full"
            style={{ backgroundColor: '#0D47A1' }}
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
