import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, Ticket, Wallet, MessageSquare, User } from 'lucide-react';

export function PassengerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/passenger' },
    { icon: Ticket, label: 'Tickets', path: '/passenger/tickets' },
    { icon: Wallet, label: 'Wallet', path: '/passenger/wallet' },
    { icon: MessageSquare, label: 'Support', path: '/passenger/complaint' },
    { icon: User, label: 'Profile', path: '/passenger/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/passenger') {
      return location.pathname === '/passenger';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      <Outlet />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-[#0D47A1]'
                  : 'text-gray-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
