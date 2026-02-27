import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Search, Bell, QrCode, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { mockBuses, mockRoutes, currentUser, mockBookings } from '../../data/mockData';

export function PassengerHome() {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);

  const activeBooking = mockBookings.find(b => b.bookingStatus === 'confirmed');
  const nearbyBuses = mockBuses.slice(0, 3);

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      navigate('/passenger/search', { state: { from: fromLocation, to: toLocation, date: searchDate } });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h1 className="text-white text-xl font-semibold">{currentUser.fullName}</h1>
            </div>
          </div>
          <button className="relative p-2 bg-white/20 rounded-full">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6F00] rounded-full"></span>
          </button>
        </div>

        {/* Search Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Where are you traveling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="From"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="To"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              className="w-full"
              style={{ backgroundColor: '#0D47A1' }}
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Buses
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Scan */}
        <Card className="bg-gradient-to-r from-[#FF6F00] to-[#FF9800] text-white cursor-pointer" onClick={() => navigate('/passenger/qr-scan')}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold mb-1">Quick Scan</h3>
              <p className="text-sm text-white/90">Scan bus QR to buy ticket</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Active Trip */}
        {activeBooking && (
          <div>
            <h2 className="font-semibold mb-3">Active Trip</h2>
            <Card className="border-l-4 border-[#2E7D32]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{activeBooking.from} → {activeBooking.to}</p>
                    <p className="text-sm text-gray-600">{activeBooking.date} • {activeBooking.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Seat</p>
                    <p className="font-semibold text-lg">{activeBooking.seatNumber}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/passenger/tickets')}
                >
                  View Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nearby Buses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Buses Near You</h2>
            <button className="text-sm text-[#0D47A1]">View All</button>
          </div>
          <div className="space-y-3">
            {nearbyBuses.map((bus) => {
              const route = mockRoutes.find(r => r.id === bus.routeId);
              return (
                <Card key={bus.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{route?.from} → {route?.to}</p>
                        <p className="text-sm text-gray-600">{bus.operatorName} • {bus.busNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#0D47A1]">Rs. {route?.baseFare}</p>
                        <p className="text-xs text-gray-500">{bus.availableSeats} seats</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {bus.departureTime}
                      </span>
                      <span className="px-2 py-1 bg-[#2E7D32]/10 text-[#2E7D32] rounded text-xs">
                        {bus.busType}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>


      </div>
    </div >
  );
}
