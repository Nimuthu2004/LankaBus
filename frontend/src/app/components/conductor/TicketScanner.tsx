import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Flashlight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

type ScanResult = 'valid' | 'invalid' | 'expired' | 'used' | null;

export function TicketScanner() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  const simulateScan = (result: ScanResult) => {
    if (result === 'valid') {
      setTicketData({
        bookingId: 'BK-2026-001',
        seat: 'A12',
        from: 'Colombo',
        to: 'Kandy',
        fare: 250,
        passenger: 'Nuwan Perera'
      });
    } else if (result === 'expired') {
      setTicketData({
        bookingId: 'BK-2026-OLD',
        seat: 'B5',
        from: 'Colombo',
        to: 'Galle',
        date: '2026-02-15'
      });
    } else if (result === 'used') {
      setTicketData({
        bookingId: 'BK-2026-002',
        seat: 'C8',
        scannedAt: '08:30 AM'
      });
    }
    setScanResult(result);
  };

  const resetScanner = () => {
    setScanResult(null);
    setTicketData(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`p-2 rounded-full ${flashOn ? 'bg-yellow-500' : 'bg-white/10'}`}
          >
            <Flashlight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center h-screen px-4">
        {!scanResult ? (
          <div className="w-full max-w-md">
            {/* Scanner viewfinder */}
            <div className="relative mx-auto w-72 h-72 border-2 border-white rounded-lg">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00897B] rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#00897B] rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00897B] rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00897B] rounded-br-lg"></div>
              
              {/* Scanning line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#00897B] animate-pulse"></div>
            </div>
            
            <p className="text-white text-center mt-8 text-lg">Scan passenger QR code</p>
            
            {/* Demo Buttons */}
            <div className="mt-8 space-y-2">
              <Button
                className="w-full"
                style={{ backgroundColor: '#00897B' }}
                onClick={() => simulateScan('valid')}
              >
                Simulate Valid Ticket
              </Button>
              <Button
                variant="outline"
                className="w-full text-white border-white"
                onClick={() => simulateScan('expired')}
              >
                Simulate Expired
              </Button>
              <Button
                variant="outline"
                className="w-full text-white border-white"
                onClick={() => simulateScan('used')}
              >
                Simulate Already Used
              </Button>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              {/* Result Icon */}
              <div className="text-center mb-6">
                {scanResult === 'valid' && (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                )}
                {scanResult === 'expired' && (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
                    <AlertCircle className="w-12 h-12 text-amber-600" />
                  </div>
                )}
                {(scanResult === 'invalid' || scanResult === 'used') && (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2">
                  {scanResult === 'valid' && 'Ticket Valid'}
                  {scanResult === 'expired' && 'Ticket Expired'}
                  {scanResult === 'invalid' && 'Invalid Ticket'}
                  {scanResult === 'used' && 'Already Scanned'}
                </h2>
                
                <Badge className={
                  scanResult === 'valid' ? 'bg-green-600' :
                  scanResult === 'expired' ? 'bg-amber-600' :
                  'bg-red-600'
                }>
                  {scanResult?.toUpperCase()}
                </Badge>
              </div>

              {/* Ticket Details */}
              {ticketData && (
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID</span>
                    <span className="font-semibold">{ticketData.bookingId}</span>
                  </div>
                  {ticketData.passenger && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passenger</span>
                      <span className="font-semibold">{ticketData.passenger}</span>
                    </div>
                  )}
                  {ticketData.seat && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seat</span>
                      <span className="font-semibold">{ticketData.seat}</span>
                    </div>
                  )}
                  {ticketData.from && ticketData.to && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route</span>
                      <span className="font-semibold">{ticketData.from} → {ticketData.to}</span>
                    </div>
                  )}
                  {ticketData.fare && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fare</span>
                      <span className="font-semibold text-[#00897B]">Rs. {ticketData.fare}</span>
                    </div>
                  )}
                  {ticketData.scannedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Previously Scanned</span>
                      <span className="font-semibold">{ticketData.scannedAt}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  style={{ backgroundColor: '#00897B' }}
                  onClick={resetScanner}
                >
                  Scan Next Ticket
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/conductor')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
