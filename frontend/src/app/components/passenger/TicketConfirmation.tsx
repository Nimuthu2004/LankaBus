import { useLocation, useNavigate } from 'react-router';
import { CheckCircle2, Download, Share2, Home } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { mockBuses, mockRoutes } from '../../data/mockData';

export function TicketConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, busId, from, to, date, seats = [], fare = 0, paymentMethod } = location.state || {};

  const bus = mockBuses.find(b => b.id === busId);
  const route = mockRoutes.find(r => r.id === bus?.routeId);

  const qrValue = `BUSEASE-${bookingId}-${date}-${seats.join('-')}`;

  const handleDownload = () => {
    // In a real app, this would generate a PDF ticket
    alert('Ticket downloaded!');
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'My Bus Ticket',
        text: `Bus ticket for ${from} to ${to}`,
      });
    } else {
      alert('Share feature not available');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#00897B] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 pb-24">
        {/* Success Message */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-white/90">Your ticket is ready</p>
        </div>

        {/* Ticket Card */}
        <Card>
          <CardContent className="p-6">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg mb-6 flex items-center justify-center">
              <QRCodeSVG value={qrValue} size={200} />
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Show this QR code to the conductor</p>
              <p className="font-mono text-sm text-gray-500">{bookingId}</p>
            </div>

            {/* Trip Details */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-semibold">{from} → {to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bus</span>
                <span className="font-semibold">{bus?.operatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bus Number</span>
                <span className="font-semibold">{bus?.busNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Departure</span>
                <span className="font-semibold">{bus?.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats</span>
                <span className="font-semibold">{seats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment</span>
                <span className="font-semibold capitalize">{paymentMethod}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-semibold">Total Paid</span>
                <span className="font-bold text-[#0D47A1]">Rs. {fare}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="bg-white hover:bg-gray-100"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="secondary"
            className="bg-white hover:bg-gray-100"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <Button
          className="w-full"
          style={{ backgroundColor: '#FF6F00' }}
          onClick={() => navigate('/passenger')}
        >
          <Home className="w-4 h-4 mr-2" />
          Go to Home
        </Button>
      </div>
    </div>
  );
}
