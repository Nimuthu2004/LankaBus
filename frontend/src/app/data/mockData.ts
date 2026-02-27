// Mock Data for LankaBus Application

export interface User {
  id: string;
  role: 'passenger' | 'conductor' | 'admin';
  fullName: string;
  phone: string;
  email: string;
  language: 'en' | 'si' | 'ta';
  walletBalance: number;
}

export interface Route {
  id: string;
  routeNumber: string;
  from: string;
  to: string;
  distance: number;
  baseFare: number;
  stops: string[];
}

export interface Bus {
  id: string;
  busNumber: string;
  operatorName: string;
  routeId: string;
  totalSeats: number;
  busType: 'luxury' | 'semi-luxury' | 'normal';
  amenities: string[];
  isActive: boolean;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
}

export interface Trip {
  id: string;
  busId: string;
  conductorId: string;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface Booking {
  id: string;
  userId: string;
  tripId: string;
  busId: string;
  seatNumber: string;
  bookingStatus: 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  qrCode: string;
  fare: number;
  from: string;
  to: string;
  date: string;
  time: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  method: 'lankaQR' | 'wallet' | 'card';
  amount: number;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Complaint {
  id: string;
  userId: string;
  tripId: string;
  category: 'driver' | 'overcharging' | 'route' | 'condition' | 'other';
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'closed';
  aiSummary?: string;
  createdAt: string;
}

// Mock Routes
export const mockRoutes: Route[] = [
  {
    id: 'r1',
    routeNumber: '138',
    from: 'Colombo',
    to: 'Kandy',
    distance: 115,
    baseFare: 250,
    stops: ['Kadawatha', 'Kegalle', 'Mawanella', 'Peradeniya']
  },
  {
    id: 'r2',
    routeNumber: '02',
    from: 'Colombo',
    to: 'Galle',
    distance: 119,
    baseFare: 280,
    stops: ['Panadura', 'Kalutara', 'Bentota', 'Hikkaduwa']
  },
  {
    id: 'r3',
    routeNumber: '245',
    from: 'Kandy',
    to: 'Jaffna',
    distance: 285,
    baseFare: 650,
    stops: ['Dambulla', 'Anuradhapura', 'Vavuniya', 'Kilinochchi']
  },
  {
    id: 'r4',
    routeNumber: '99',
    from: 'Colombo',
    to: 'Trincomalee',
    distance: 257,
    baseFare: 580,
    stops: ['Kurunegala', 'Dambulla', 'Habarana', 'Kantale']
  }
];

// Mock Buses
export const mockBuses: Bus[] = [
  {
    id: 'b1',
    busNumber: 'NA-1234',
    operatorName: 'Luxury Express',
    routeId: 'r1',
    totalSeats: 45,
    busType: 'luxury',
    amenities: ['AC', 'WiFi', 'Reclining Seats', 'USB Charging'],
    isActive: true,
    departureTime: '08:00 AM',
    arrivalTime: '11:30 AM',
    availableSeats: 12
  },
  {
    id: 'b2',
    busNumber: 'WP-5678',
    operatorName: 'Lanka Travels',
    routeId: 'r1',
    totalSeats: 45,
    busType: 'semi-luxury',
    amenities: ['AC', 'Reclining Seats'],
    isActive: true,
    departureTime: '09:30 AM',
    arrivalTime: '01:00 PM',
    availableSeats: 23
  },
  {
    id: 'b3',
    busNumber: 'SP-9012',
    operatorName: 'Coastal Express',
    routeId: 'r2',
    totalSeats: 50,
    busType: 'luxury',
    amenities: ['AC', 'WiFi', 'Entertainment', 'Refreshments'],
    isActive: true,
    departureTime: '07:00 AM',
    arrivalTime: '10:30 AM',
    availableSeats: 8
  },
  {
    id: 'b4',
    busNumber: 'CP-3456',
    operatorName: 'North Line',
    routeId: 'r3',
    totalSeats: 48,
    busType: 'semi-luxury',
    amenities: ['AC', 'Comfortable Seats'],
    isActive: true,
    departureTime: '06:00 AM',
    arrivalTime: '02:30 PM',
    availableSeats: 15
  },
  {
    id: 'b5',
    busNumber: 'EP-7890',
    operatorName: 'East Coast Travels',
    routeId: 'r4',
    totalSeats: 45,
    busType: 'luxury',
    amenities: ['AC', 'WiFi', 'Reclining Seats', 'USB Charging'],
    isActive: true,
    departureTime: '05:30 AM',
    arrivalTime: '01:00 PM',
    availableSeats: 20
  }
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'bk1',
    userId: 'u1',
    tripId: 't1',
    busId: 'b1',
    seatNumber: 'A12',
    bookingStatus: 'confirmed',
    paymentStatus: 'paid',
    qrCode: 'QR-BK1-2026-02-22',
    fare: 250,
    from: 'Colombo',
    to: 'Kandy',
    date: '2026-02-23',
    time: '08:00 AM',
    createdAt: '2026-02-22T10:30:00'
  },
  {
    id: 'bk2',
    userId: 'u1',
    tripId: 't2',
    busId: 'b3',
    seatNumber: 'B5',
    bookingStatus: 'completed',
    paymentStatus: 'paid',
    qrCode: 'QR-BK2-2026-02-15',
    fare: 280,
    from: 'Colombo',
    to: 'Galle',
    date: '2026-02-15',
    time: '07:00 AM',
    createdAt: '2026-02-14T15:20:00'
  }
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    userId: 'u1',
    tripId: 't1',
    category: 'driver',
    description: 'Driver was rude and driving was unsafe',
    status: 'reviewing',
    aiSummary: 'Passenger reported unsafe driving behavior and unprofessional conduct by driver.',
    createdAt: '2026-02-20T14:30:00'
  }
];

// Analytics Data
export const mockAnalytics = {
  totalRevenue: 1250000,
  totalPassengers: 4567,
  activeBuses: 124,
  totalComplaints: 23,
  revenueByRoute: [
    { route: 'Colombo-Kandy', revenue: 450000 },
    { route: 'Colombo-Galle', revenue: 380000 },
    { route: 'Kandy-Jaffna', revenue: 220000 },
    { route: 'Colombo-Trinco', revenue: 200000 }
  ],
  paymentMethods: [
    { method: 'LankaQR', percentage: 45, amount: 562500 },
    { method: 'Wallet', percentage: 35, amount: 437500 },
    { method: 'Card', percentage: 20, amount: 250000 }
  ],
  dailyRevenue: [
    { date: 'Feb 16', revenue: 180000 },
    { date: 'Feb 17', revenue: 165000 },
    { date: 'Feb 18', revenue: 195000 },
    { date: 'Feb 19', revenue: 210000 },
    { date: 'Feb 20', revenue: 175000 },
    { date: 'Feb 21', revenue: 160000 },
    { date: 'Feb 22', revenue: 165000 }
  ],
  peakHours: [
    { hour: '6 AM', passengers: 320 },
    { hour: '7 AM', passengers: 580 },
    { hour: '8 AM', passengers: 750 },
    { hour: '9 AM', passengers: 520 },
    { hour: '10 AM', passengers: 380 },
    { hour: '11 AM', passengers: 280 },
    { hour: '12 PM', passengers: 250 }
  ]
};

// Current User (for demo purposes)
export const currentUser: User = {
  id: 'u1',
  role: 'passenger',
  fullName: 'Nuwan Perera',
  phone: '+94771234567',
  email: 'nuwan@example.com',
  language: 'en',
  walletBalance: 1500
};

// Transactions
export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  date: string;
  method: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'debit',
    amount: 250,
    description: 'Ticket: Colombo to Kandy',
    date: '2026-02-22',
    method: 'Wallet'
  },
  {
    id: 'tx2',
    type: 'credit',
    amount: 1000,
    description: 'Wallet Top-up',
    date: '2026-02-21',
    method: 'Card'
  },
  {
    id: 'tx3',
    type: 'debit',
    amount: 280,
    description: 'Ticket: Colombo to Galle',
    date: '2026-02-15',
    method: 'Wallet'
  },
  {
    id: 'tx4',
    type: 'credit',
    amount: 500,
    description: 'Wallet Top-up',
    date: '2026-02-10',
    method: 'LankaQR'
  }
];
