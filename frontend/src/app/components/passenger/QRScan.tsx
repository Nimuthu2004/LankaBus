import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Flashlight, Keyboard, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { mockRoutes } from '../../data/mockData';

export function QRScan() {
  const navigate = useNavigate();
  const [flashOn, setFlashOn] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scannedRoute, setScannedRoute] = useState<typeof mockRoutes[0] | null>(null);

  // Simulate QR scan
  const simulateScan = () => {
    // Simulate scanning a bus QR code
    setTimeout(() => {
      setScannedRoute(mockRoutes[0]); // Colombo to Kandy route
    }, 1000);
  };

  const handleManualEntry = () => {
    if (manualCode) {
      setScannedRoute(mockRoutes[0]);
      setShowManualEntry(false);
    }
  };

  const handleProceed = () => {
    if (scannedRoute) {
      navigate('/passenger/search', {
        state: {
          from: scannedRoute.from,
          to: scannedRoute.to,
          date: new Date().toISOString().split('T')[0]
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setFlashOn(!flashOn)}
              className={`p-2 rounded-full ${flashOn ? 'bg-yellow-500' : 'bg-white/10'}`}
            >
              <Flashlight className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setShowManualEntry(true)}
              className="p-2 bg-white/10 rounded-full"
            >
              <Keyboard className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Scanner Frame */}
      <div className="flex items-center justify-center h-screen">
        {!scannedRoute ? (
          <div className="relative">
            {/* Scanner viewfinder */}
            <div className="w-64 h-64 border-2 border-white rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#0D47A1] rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#0D47A1] rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#0D47A1] rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#0D47A1] rounded-br-lg"></div>
              
              {/* Scanning line animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0D47A1] animate-pulse"></div>
            </div>
            
            <p className="text-white text-center mt-6">Position QR code within frame</p>
            
            {/* Demo Button */}
            <Button
              className="mt-4 w-full"
              style={{ backgroundColor: '#0D47A1' }}
              onClick={simulateScan}
            >
              Simulate Scan (Demo)
            </Button>
          </div>
        ) : (
          <Card className="max-w-sm mx-4">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Route Detected</h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">From</p>
                  <p className="font-semibold text-lg">{scannedRoute.from}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">To</p>
                  <p className="font-semibold text-lg">{scannedRoute.to}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Base Fare</p>
                  <p className="font-semibold text-lg text-[#0D47A1]">Rs. {scannedRoute.baseFare}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  style={{ backgroundColor: '#0D47A1' }}
                  onClick={handleProceed}
                >
                  Select Destination & Book
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setScannedRoute(null)}
                >
                  Scan Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Manual Entry Dialog */}
      <Dialog open={showManualEntry} onOpenChange={setShowManualEntry}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Enter Bus Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter bus code manually"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                You can find the bus code displayed on the bus
              </p>
            </div>
            <Button
              className="w-full"
              style={{ backgroundColor: '#0D47A1' }}
              onClick={handleManualEntry}
              disabled={!manualCode}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
