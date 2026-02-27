import { useState } from 'react';
import { ArrowLeft, Download, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { mockBookings, mockBuses, mockRoutes } from '../../data/mockData';

export function MyTickets() {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const activeTickets = mockBookings.filter(b => b.bookingStatus === 'confirmed');
  const pastTickets = mockBookings.filter(b => b.bookingStatus === 'completed');

  const TicketCard = ({ booking, isPast = false }: { booking: typeof mockBookings[0], isPast?: boolean }) => {
    const bus = mockBuses.find(b => b.id === booking.busId);
    const route = mockRoutes.find(r => r.id === bus?.routeId);

    return (
      <Card className={`${isPast ? 'opacity-75' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{booking.from} → {booking.to}</h3>
              <p className="text-sm text-gray-600">{bus?.operatorName} • {bus?.busNumber}</p>
            </div>
            <Badge variant={isPast ? 'secondary' : 'default'} className={isPast ? '' : 'bg-green-600'}>
              {isPast ? 'Completed' : 'Active'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div>
              <p className="text-gray-600">Time</p>
              <p className="font-medium">{booking.time}</p>
            </div>
            <div>
              <p className="text-gray-600">Seat</p>
              <p className="font-medium">{booking.seatNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Fare</p>
              <p className="font-medium">Rs. {booking.fare}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {!isPast && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedTicket(booking.id)}
              >
                View QR Code
              </Button>
            )}
            <Button variant="outline" className={isPast ? 'flex-1' : ''}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const selectedBooking = mockBookings.find(b => b.id === selectedTicket);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/passenger')} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-semibold text-lg">My Tickets</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {activeTickets.length > 0 ? (
              activeTickets.map(booking => (
                <TicketCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No active tickets</p>
                <Button
                  className="mt-4"
                  style={{ backgroundColor: '#0D47A1' }}
                  onClick={() => navigate('/passenger')}
                >
                  Book a Ticket
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-3">
            {pastTickets.length > 0 ? (
              pastTickets.map(booking => (
                <TicketCard key={booking.id} booking={booking} isPast />
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No past trips</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Your Ticket</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
                <QRCodeSVG value={selectedBooking.qrCode} size={200} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Show this QR code to the conductor</p>
                <p className="font-mono text-sm text-gray-500">{selectedBooking.id}</p>
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route</span>
                  <span className="font-semibold">{selectedBooking.from} → {selectedBooking.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seat</span>
                  <span className="font-semibold">{selectedBooking.seatNumber}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
