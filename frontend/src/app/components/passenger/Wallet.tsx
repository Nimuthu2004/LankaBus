import { useState } from 'react';
import { ArrowLeft, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { currentUser, mockTransactions } from '../../data/mockData';

export function Wallet() {
  const navigate = useNavigate();
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpMethod, setTopUpMethod] = useState('card');

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleTopUp = () => {
    // Simulate top-up
    alert(`Top-up of Rs. ${topUpAmount} successful!`);
    setShowTopUp(false);
    setTopUpAmount('');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 pt-4 pb-32 relative">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/passenger')} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-semibold text-lg">Wallet</h1>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Available Balance</p>
            <p className="text-4xl font-bold text-[#0D47A1] mb-6">
              Rs. {currentUser.walletBalance.toLocaleString()}
            </p>
            <Button
              className="w-full"
              style={{ backgroundColor: '#0D47A1' }}
              onClick={() => setShowTopUp(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Top Up Wallet
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div className="px-4 -mt-16 pb-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-600">{transaction.date} • {transaction.method}</p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'} Rs. {transaction.amount}
                </div>
              </div>
            ))}

            {mockTransactions.length === 0 && (
              <p className="text-center text-gray-500 py-8">No transactions yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Up Dialog */}
      <Dialog open={showTopUp} onOpenChange={setShowTopUp}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Top Up Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Quick Amount Selection */}
            <div>
              <Label>Select Amount</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setTopUpAmount(amount.toString())}
                    className={topUpAmount === amount.toString() ? 'border-[#0D47A1] bg-[#0D47A1]/5' : ''}
                  >
                    Rs. {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Payment Method */}
            <div>
              <Label>Payment Method</Label>
              <RadioGroup value={topUpMethod} onValueChange={setTopUpMethod} className="mt-2">
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
                    topUpMethod === 'card' ? 'border-[#0D47A1] bg-[#0D47A1]/5' : 'border-gray-200'
                  }`}>
                    <RadioGroupItem value="card" id="card-topup" />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">Credit / Debit Card</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
                    topUpMethod === 'lankaQR' ? 'border-[#0D47A1] bg-[#0D47A1]/5' : 'border-gray-200'
                  }`}>
                    <RadioGroupItem value="lankaQR" id="lankaQR-topup" />
                    <QrCode className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">LankaQR</span>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Summary */}
            {topUpAmount && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Current Balance</span>
                  <span className="font-medium">Rs. {currentUser.walletBalance}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Top-up Amount</span>
                  <span className="font-medium">Rs. {topUpAmount}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>New Balance</span>
                  <span className="text-[#0D47A1]">
                    Rs. {(currentUser.walletBalance + parseInt(topUpAmount || '0')).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              style={{ backgroundColor: '#0D47A1' }}
              onClick={handleTopUp}
              disabled={!topUpAmount || parseInt(topUpAmount) <= 0}
            >
              Top Up Rs. {topUpAmount || '0'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
