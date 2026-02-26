import { useNavigate } from 'react-router';
import { Bus, UserCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#00897B] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <Bus className="w-10 h-10 text-[#0D47A1]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">LankaBus</h1>
          <p className="text-xl text-white/90">Modern Ticketing for Smarter Travel</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card
            className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-[#FF6F00]"
            onClick={() => navigate('/onboarding')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#0D47A1]/10 rounded-full flex items-center justify-center mb-4">
                <Bus className="w-8 h-8 text-[#0D47A1]" />
              </div>
              <CardTitle>Passenger</CardTitle>
              <CardDescription>Book tickets and manage trips</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" style={{ backgroundColor: '#0D47A1' }}>
                Continue as Passenger
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-[#FF6F00]"
            onClick={() => navigate('/conductor')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#00897B]/10 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-[#00897B]" />
              </div>
              <CardTitle>Conductor</CardTitle>
              <CardDescription>Verify tickets and manage trips</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" style={{ backgroundColor: '#00897B' }}>
                Continue as Conductor
              </Button>
            </CardContent>
          </Card>


        </div>

        <div className="text-center mt-8 text-white/80 text-sm">
          <p>© 2026 LankaBus • Digitizing Sri Lanka's Public Transport</p>
        </div>
      </div>
    </div>
  );
}
