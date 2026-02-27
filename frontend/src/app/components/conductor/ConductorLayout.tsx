import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, ScanLine, Bus, ArrowLeft } from 'lucide-react';

export function ConductorLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/conductor' },
    { icon: ScanLine, label: 'Scan', path: '/conductor/scanner' },
    { icon: Bus, label: 'Trips', path: '/conductor/trips' },
  ];

  const isActive = (path: string) => {
    if (path === '/conductor') {
      return location.pathname === '/conductor';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#00897B] to-[#00ACC1] px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white font-semibold text-lg">Conductor Panel</h1>
      </div>

      <div className="pb-20">
        <Outlet />
      </div>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-[#00897B]'
                  : 'text-gray-500'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
