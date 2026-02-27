import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DollarSign, Users, Clock, ScanLine, PlayCircle, StopCircle, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ConductorDashboard() {
  const navigate = useNavigate();
  const [tripActive, setTripActive] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Mock data
  const todayStats = {
    revenue: 12500,
    passengers: 48,
    trips: 3,
    avgPerPassenger: 260
  };

  const recentScans = [
    { id: 1, seat: 'A12', time: '10:45 AM', fare: 250, status: 'valid' },
    { id: 2, seat: 'B5', time: '10:43 AM', fare: 250, status: 'valid' },
    { id: 3, seat: 'C8', time: '10:40 AM', fare: 250, status: 'valid' },
  ];

  const handleStartTrip = () => {
    setTripActive(true);
  };

  const handleEndTrip = () => {
    if (confirm('Are you sure you want to end this trip?')) {
      setTripActive(false);
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Offline Indicator */}
      {isOffline && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-900">Offline Mode</p>
              <p className="text-sm text-amber-700">Data will sync when connection is restored</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trip Status */}
      <Card className={tripActive ? 'border-green-500 bg-green-50' : ''}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Current Trip Status</p>
              <p className="text-2xl font-bold">
                {tripActive ? 'In Progress' : 'Not Started'}
              </p>
            </div>
            <Badge className={tripActive ? 'bg-green-600' : 'bg-gray-400'}>
              {tripActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {tripActive ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Started</p>
                  <p className="font-medium">08:00 AM</p>
                </div>
                <div>
                  <p className="text-gray-600">Route</p>
                  <p className="font-medium">Colombo - Kandy</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-600"
                onClick={handleEndTrip}
              >
                <StopCircle className="w-4 h-4 mr-2" />
                End Trip
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              style={{ backgroundColor: '#00897B' }}
              onClick={handleStartTrip}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Start New Trip
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Quick Scan Button */}
      <Button
        size="lg"
        className="w-full h-16 text-lg"
        style={{ backgroundColor: '#00897B' }}
        onClick={() => navigate('/conductor/scanner')}
      >
        <ScanLine className="w-6 h-6 mr-2" />
        Scan Ticket
      </Button>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-xl font-bold">Rs. {todayStats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Passengers</p>
                <p className="text-xl font-bold">{todayStats.passengers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-green-700 text-sm">{scan.seat}</span>
                </div>
                <div>
                  <p className="font-medium">Seat {scan.seat}</p>
                  <p className="text-sm text-gray-600">{scan.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs. {scan.fare}</p>
                <Badge className="bg-green-600 text-xs">Valid</Badge>
              </div>
            </div>
          ))}

          {recentScans.length === 0 && (
            <p className="text-center text-gray-500 py-8">No scans yet today</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
