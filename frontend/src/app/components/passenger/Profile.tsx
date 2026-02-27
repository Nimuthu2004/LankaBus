import { useNavigate } from 'react-router';
import { ArrowLeft, User, Phone, Mail, Globe, CreditCard, MapPin, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { currentUser } from '../../data/mockData';

export function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: User,
      label: 'Personal Details',
      description: 'Update your information',
      action: () => alert('Personal details coming soon')
    },
    {
      icon: Globe,
      label: 'Language',
      description: 'English',
      action: () => alert('Language selection coming soon')
    },
    {
      icon: MapPin,
      label: 'Saved Routes',
      description: '3 routes saved',
      action: () => alert('Saved routes coming soon')
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      description: 'Manage cards and payment options',
      action: () => alert('Payment methods coming soon')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'FAQs and contact us',
      action: () => navigate('/passenger/complaint')
    },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 pt-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/passenger')} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-semibold text-lg">Profile</h1>
        </div>

        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-[#0D47A1] text-white text-xl">
                  {currentUser.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{currentUser.fullName}</h2>
                <p className="text-sm text-gray-600">{currentUser.phone}</p>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-16 pb-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={item.action}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0D47A1]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#0D47A1]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Separator className="my-4" />

        {/* App Info */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Terms & Conditions</span>
                <button className="text-[#0D47A1]">View</button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Privacy Policy</span>
                <button className="text-[#0D47A1]">View</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
