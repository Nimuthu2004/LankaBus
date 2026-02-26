import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Clock, MapPin, Users, Filter, SortAsc } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { mockBuses, mockRoutes } from '../../data/mockData';

export function BusSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from = 'Colombo', to = 'Kandy', date = new Date().toISOString().split('T')[0] } = location.state || {};

  const [sortBy, setSortBy] = useState<'time' | 'price' | 'seats'>('time');

  const filteredBuses = mockBuses.filter(bus => {
    const route = mockRoutes.find(r => r.id === bus.routeId);
    return route && (
      route.from.toLowerCase().includes(from.toLowerCase()) &&
      route.to.toLowerCase().includes(to.toLowerCase())
    );
  });

  const handleBookBus = (busId: string) => {
    navigate('/passenger/seat-selection', { state: { busId, from, to, date } });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-lg">{from} → {to}</h1>
            <p className="text-white/80 text-sm">{date}</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <SortAsc className="w-4 h-4 mr-1" />
            Sort
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-4 space-y-3">
        <p className="text-sm text-gray-600">{filteredBuses.length} buses available</p>

        {filteredBuses.map((bus) => {
          const route = mockRoutes.find(r => r.id === bus.routeId);
          if (!route) return null;

          return (
            <Card key={bus.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Bus Type Banner */}
                <div className={`px-4 py-2 text-white text-sm font-medium ${
                  bus.busType === 'luxury' ? 'bg-gradient-to-r from-purple-600 to-purple-700' :
                  bus.busType === 'semi-luxury' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                  'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  {bus.busType.toUpperCase()}
                </div>

                <div className="p-4">
                  {/* Operator & Bus Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{bus.operatorName}</h3>
                      <p className="text-sm text-gray-600">{bus.busNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#0D47A1]">Rs. {route.baseFare}</p>
                      <p className="text-xs text-gray-500">per seat</p>
                    </div>
                  </div>

                  {/* Time & Duration */}
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{bus.departureTime}</span>
                    </div>
                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{bus.arrivalTime}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {bus.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  {/* Seats & Book Button */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className={bus.availableSeats < 10 ? 'text-[#FF6F00] font-medium' : 'text-gray-600'}>
                        {bus.availableSeats} seats left
                      </span>
                    </div>
                    <Button
                      className="flex-1"
                      style={{ backgroundColor: '#0D47A1' }}
                      onClick={() => handleBookBus(bus.id)}
                    >
                      Select Seat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredBuses.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No buses found for this route</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate('/passenger')}
            >
              Search Different Route
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
