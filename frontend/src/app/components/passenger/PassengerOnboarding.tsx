import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bus, Globe, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

export function PassengerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'language' | 'welcome' | 'login' | 'otp'>('language');
  const [language, setLanguage] = useState('en');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setStep('welcome');
  };

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      navigate('/passenger');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#00897B] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'language' && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0D47A1]/10 rounded-full mb-4">
                <Globe className="w-8 h-8 text-[#0D47A1]" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Choose Language</h2>
              <p className="text-sm text-gray-600">Select your preferred language</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-14 text-lg hover:bg-[#0D47A1]/10 hover:border-[#0D47A1]"
                onClick={() => handleLanguageSelect('si')}
              >
                සිංහල
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 text-lg hover:bg-[#0D47A1]/10 hover:border-[#0D47A1]"
                onClick={() => handleLanguageSelect('ta')}
              >
                தமிழ்
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 text-lg hover:bg-[#0D47A1]/10 hover:border-[#0D47A1]"
                onClick={() => handleLanguageSelect('en')}
              >
                English
              </Button>
            </div>
          </Card>
        )}

        {step === 'welcome' && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0D47A1]/10 rounded-full mb-6">
                <Bus className="w-10 h-10 text-[#0D47A1]" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Travel Smarter</h1>
              <p className="text-gray-600">
                Book, Pay, and Ride — All in One App
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#0D47A1] rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Search Routes</h3>
                  <p className="text-sm text-gray-600">Find buses to your destination</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#00897B] rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Book & Pay</h3>
                  <p className="text-sm text-gray-600">Secure payment with LankaQR</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#FF6F00] rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Show QR Code</h3>
                  <p className="text-sm text-gray-600">Board the bus hassle-free</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-8">
              <Button
                className="w-full"
                style={{ backgroundColor: '#0D47A1' }}
                onClick={() => setStep('login')}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/passenger')}
              >
                I Already Have an Account
              </Button>
            </div>
          </Card>
        )}

        {step === 'login' && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0D47A1]/10 rounded-full mb-4">
                <Phone className="w-8 h-8 text-[#0D47A1]" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
              <p className="text-sm text-gray-600">Enter your mobile number to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                className="w-full"
                style={{ backgroundColor: '#0D47A1' }}
                onClick={handleSendOTP}
              >
                Send Verification Code
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setStep('welcome')}
                >
                  Back
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 'otp' && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Verify Phone Number</h2>
              <p className="text-sm text-gray-600">
                Enter the 6-digit code sent to {phone}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                className="w-full"
                style={{ backgroundColor: '#0D47A1' }}
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
              >
                Verify
              </Button>

              <div className="text-center">
                <Button variant="link" size="sm">
                  Resend Code
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
