import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function TripManagement() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const todayTrips = [
    {
      id: '1',
      route: 'Colombo - Kandy',
      startTime: '06:00 AM',
      endTime: '09:30 AM',
      passengers: 42,
      revenue: 10500,
      status: 'completed'
    },
    {
      id: '2',
      route: 'Colombo - Kandy',
      startTime: '12:00 PM',
      endTime: '03:30 PM',
      passengers: 38,
      revenue: 9500,
      status: 'completed'
    },
    {
      id: '3',
      route: 'Colombo - Kandy',
      startTime: '04:00 PM',
      endTime: null,
      passengers: 15,
      revenue: 3750,
      status: 'active'
    }
  ];

  const weekSummary = {
    totalTrips: 21,
    totalPassengers: 876,
    totalRevenue: 219000,
    avgPerTrip: 10428
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <h2 className="text-2xl font-semibold">Trip Management</h2>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {/* Today's Trips */}
          {todayTrips.map((trip) => (
            <Card key={trip.id} className={trip.status === 'active' ? 'border-green-500' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold mb-1">{trip.route}</h3>
                    <p className="text-sm text-gray-600">Trip #{trip.id}</p>
                  </div>
                  <Badge className={trip.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                    {trip.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Start</p>
                      <p className="font-medium">{trip.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">End</p>
                      <p className="font-medium">{trip.endTime || 'In Progress'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Passengers</span>
                    </div>
                    <p className="font-semibold text-lg">{trip.passengers}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <p className="font-semibold text-lg text-[#00897B]">Rs. {trip.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          {/* Week Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-1">Total Trips</p>
                <p className="text-2xl font-bold">{weekSummary.totalTrips}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-1">Passengers</p>
                <p className="text-2xl font-bold">{weekSummary.totalPassengers}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-[#00897B]">
                    Rs. {weekSummary.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Avg per Trip</p>
                  <p className="text-xl font-semibold">
                    Rs. {weekSummary.avgPerTrip.toLocaleString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          {/* Daily Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{day}</p>
                    <p className="text-sm text-gray-600">3 trips • 125 passengers</p>
                  </div>
                  <p className="font-semibold text-[#00897B]">Rs. 31,250</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
