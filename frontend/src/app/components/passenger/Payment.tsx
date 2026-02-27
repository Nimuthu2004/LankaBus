import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Wallet, CreditCard, QrCode, Tag, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { currentUser, mockBuses, mockRoutes } from '../../data/mockData';

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { busId, from, to, date, seats = [], fare = 0 } = location.state || {};

  const bus = mockBuses.find(b => b.id === busId);
  const route = mockRoutes.find(r => r.id === bus?.routeId);

  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FIRST10') {
      setDiscount(fare * 0.1);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = `BK${Date.now()}`;
      navigate('/passenger/confirmation', {
        state: {
          bookingId,
          busId,
          from,
          to,
          date,
          seats,
          fare: fare - discount,
          paymentMethod
        }
      });
    }, 2000);
  };

  const finalAmount = fare - discount;

  if (!bus || !route) {
    return <div>Invalid booking</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-semibold">Complete Your Payment</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 pb-32">
        {/* Trip Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Trip Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-medium">{from} → {to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bus</span>
                <span className="font-medium">{bus.operatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats</span>
                <span className="font-medium">{seats.join(', ')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {/* LankaQR */}
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'lankaQR' ? 'border-[#0D47A1] bg-[#0D47A1]/5' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="lankaQR" id="lankaQR" />
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">LankaQR</p>
                      <p className="text-xs text-gray-600">Zero transaction fee</p>
                    </div>
                  </div>
                  {paymentMethod === 'lankaQR' && (
                    <Check className="w-5 h-5 text-[#0D47A1]" />
                  )}
                </label>

                {/* Wallet */}
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'wallet' ? 'border-[#0D47A1] bg-[#0D47A1]/5' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="wallet" id="wallet" />
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Wallet</p>
                      <p className="text-xs text-gray-600">Balance: Rs. {currentUser.walletBalance}</p>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <Check className="w-5 h-5 text-[#0D47A1]" />
                  )}
                </label>

                {/* Card */}
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-[#0D47A1] bg-[#0D47A1]/5' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="card" id="card" />
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-xs text-gray-600">Bank charges may apply</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <Check className="w-5 h-5 text-[#0D47A1]" />
                  )}
                </label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Promo Code */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Promo Code</h3>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>
            {discount > 0 && (
              <p className="text-sm text-green-600 mt-2">✓ Discount applied: Rs. {discount}</p>
            )}
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Price Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare ({seats.length} seats)</span>
                <span>Rs. {fare}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- Rs. {discount}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-[#0D47A1]">Rs. {finalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Payment Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t px-4 py-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <Button
            className="w-full"
            style={{ backgroundColor: '#0D47A1' }}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay Rs. ${finalAmount}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
