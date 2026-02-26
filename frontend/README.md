# 🚌 LankaBus - Complete Bus Ticketing System

A comprehensive digital bus ticketing platform for Sri Lanka's public transportation system with QR-based ticketing, multi-payment support, and AI-powered features.

## 🎯 Project Overview

**LankaBus** digitizes Sri Lanka's bus transportation by providing:
- Mobile-first passenger booking platform
- Conductor ticket validation system  
- Admin analytics and management dashboard
- QR code-based ticketing
- Multi-payment support (LankaQR, Wallet, Cards)
- AI-powered complaint management
- Revenue analytics and reporting

## 🆕 Recent Updates

- **Rebranded:** Changed project name from "BusEase Lanka" to "LankaBus".
- **Routing Fixes:** Reconstructed the previously missing `routes.tsx` logic using `createBrowserRouter`, establishing clear, navigable paths for `Passenger`, `Conductor`, and `Admin` dashboards.
- **Onboarding Flow:** Adjusted the passenger onboarding route (`/onboarding`) to be accessible directly from the role selection screen.
- **Verification:** Successfully executed and verified the application on the local Vite dev server.

## 📱 Application Modules

### 1. **Passenger App** (Mobile-Optimized)
Complete booking and ticketing experience for passengers.

#### Features:
- **Onboarding Flow**: Language selection, welcome screens, OTP verification
- **Home Dashboard**: Route search, nearby buses, active trips, travel insights
- **Bus Search**: Filter and sort buses, view amenities, seat availability
- **Seat Selection**: Interactive seat map, real-time availability
- **Payment**: Multiple payment methods (LankaQR, Wallet, Cards), promo codes
- **QR Tickets**: Digital tickets with QR codes for boarding
- **Wallet**: Top-up, transaction history, balance management
- **My Tickets**: Active and past trips, download receipts
- **QR Scanner**: Scan bus QR codes for quick booking
- **AI Complaint Chat**: Intelligent complaint assistant with categorization
- **Profile**: Personal settings, saved routes, payment methods

#### User Flow:
1. Select language → Welcome → Phone OTP verification
2. Search route → Select bus → Choose seats
3. Select payment method → Complete payment
4. Receive QR ticket → Board bus → Show QR to conductor

### 2. **Conductor App** (Tablet-Optimized)
Ticket validation and trip management for bus conductors.

#### Features:
- **Dashboard**: Today's revenue, passenger count, trip status
- **QR Scanner**: Validate passenger tickets in real-time
- **Trip Management**: Start/end trips, view history, daily reports
- **Offline Mode**: Works without internet, syncs when connected
- **Revenue Tracking**: Live revenue monitoring per trip

#### Validation States:
- ✅ Valid Ticket
- ⚠️ Expired Ticket
- ❌ Invalid Ticket
- 🔄 Already Scanned

### 3. **Admin Dashboard** (Desktop Web)
Comprehensive management and analytics platform.

#### Features:
- **Dashboard Overview**: KPIs, revenue trends, passenger flow, peak hours
- **Bus Management**: Add/edit buses, assign routes, monitor fleet
- **Revenue Reports**: Daily/weekly/monthly reports, route-wise breakdown
- **Complaint Management**: AI-categorized complaints, resolution tracking
- **Payment Analytics**: Payment method distribution, transaction trends
- **Real-time Charts**: Interactive visualizations with Recharts

#### Analytics:
- Total revenue and trends
- Active buses and utilization
- Passenger statistics
- Peak hours analysis
- Route performance
- Payment method preferences

## 🎨 Design System

### Brand Colors
```css
Primary: #0D47A1 (Deep Blue)
Secondary: #00897B (Teal)
Accent: #FF6F00 (Orange)
Success: #2E7D32 (Green)
Warning: #F9A825 (Amber)
Error: #C62828 (Red)
Background: #F5F7FA
```

### Typography
- Font Family: System fonts (optimized for readability)
- Spacing: 8pt grid system
- Border Radius: 8px (cards), 12px (modals)

### Components
- Material-inspired cards
- Bottom navigation (mobile)
- Sidebar navigation (desktop)
- QR code displays
- Interactive charts
- Modal dialogs

## 🛠 Technical Stack

### Frontend Framework
- **React 18.3** - UI library
- **React Router 7** - Client-side routing with data mode
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Pre-built component library
- **Lucide React** - Icon system
- **Recharts** - Data visualization
- **QRCode.react** - QR code generation

### State Management
- React Hooks (useState, useEffect)
- React Router location state
- Local storage for persistence

## 📂 Project Structure

```
/src
  /app
    /components
      /passenger        # Passenger app components
        - PassengerLayout.tsx
        - PassengerHome.tsx
        - BusSearch.tsx
        - SeatSelection.tsx
        - Payment.tsx
        - TicketConfirmation.tsx
        - MyTickets.tsx
        - Wallet.tsx
        - QRScan.tsx
        - ComplaintChat.tsx
        - Profile.tsx
      /conductor        # Conductor app components
        - ConductorLayout.tsx
        - ConductorDashboard.tsx
        - TicketScanner.tsx
        - TripManagement.tsx
      /admin           # Admin dashboard components
        - AdminLayout.tsx
        - AdminDashboard.tsx
        - BusManagement.tsx
        - RevenueReports.tsx
        - ComplaintManagement.tsx
        - PaymentAnalytics.tsx
      /ui              # Reusable UI components
    /data
      - mockData.ts    # Mock database
    - App.tsx
    - routes.tsx
  /styles
    - index.css
    - busease-theme.css
```

## 🗄 Data Architecture

### Core Entities
```typescript
- User (passenger/conductor/admin)
- Route (from/to/stops/fare)
- Bus (number/operator/type/amenities)
- Trip (active journey)
- Booking (confirmed tickets)
- Payment (transactions)
- Complaint (user issues)
```

### Mock Data Includes
- 4 major routes (Colombo-Kandy, Colombo-Galle, etc.)
- 5 buses with various types (luxury, semi-luxury)
- Sample bookings and transactions
- Analytics data (revenue, passengers, peak hours)

## 🚀 Key Features

### 1. **Multi-User System**
Three distinct user roles with different interfaces:
- Passengers: Mobile-first booking experience
- Conductors: Tablet-optimized validation
- Admins: Desktop analytics dashboard

### 2. **QR-Based Ticketing**
- Generate QR codes for each booking
- Scan QR codes for validation
- Offline validation support

### 3. **Payment Integration**
- LankaQR (zero fees, priority method)
- Digital Wallet system
- Credit/Debit cards
- Promo code support

### 4. **AI Features**
- Intelligent complaint categorization
- Auto-generated complaint summaries
- Travel insights and suggestions

### 5. **Offline Support**
- Conductor app works offline
- Auto-sync when connection restored
- Critical for rural routes

### 6. **Analytics Dashboard**
- Revenue tracking and trends
- Peak hours identification
- Route performance analysis
- Payment method distribution
- Complaint monitoring

## 🎯 User Personas

### Passenger - Nuwan Perera
- Daily commuter, Colombo to Kandy
- Uses mobile app for advance booking
- Prefers digital payments
- Values seat selection and on-time departures

### Conductor - Saman Silva
- Operates on luxury buses
- Uses tablet for ticket validation
- Needs offline functionality
- Tracks daily revenue

### Admin - Transport Authority
- Monitors fleet performance
- Analyzes revenue patterns
- Manages complaints
- Plans route optimization

## 📊 Sample Data

### Routes
1. Colombo → Kandy (115km, Rs. 250)
2. Colombo → Galle (119km, Rs. 280)
3. Kandy → Jaffna (285km, Rs. 650)
4. Colombo → Trincomalee (257km, Rs. 580)

### Bus Types
- **Luxury**: AC, WiFi, USB charging, reclining seats
- **Semi-Luxury**: AC, comfortable seats
- **Normal**: Standard seating

## 🔄 User Flows

### Passenger Booking Flow
```
Home → Search Route → View Buses → Select Seats → 
Choose Payment → Pay → Get QR Ticket → Board Bus
```

### Conductor Validation Flow
```
Open Scanner → Scan QR Code → View Ticket Details → 
Validate (Valid/Invalid/Expired) → Continue
```

### Admin Management Flow
```
Login → Dashboard Overview → View Analytics → 
Manage Buses/Routes → Handle Complaints → Generate Reports
```

## 🎨 UI Screenshots

### Passenger App Screens
- ✅ Language Selection
- ✅ Onboarding with OTP
- ✅ Home with search and nearby buses
- ✅ Bus listing with filters
- ✅ Interactive seat selection
- ✅ Payment methods
- ✅ QR ticket confirmation
- ✅ Wallet management
- ✅ AI complaint chat

### Conductor App Screens
- ✅ Dashboard with stats
- ✅ QR scanner with validation
- ✅ Trip management

### Admin Dashboard Screens
- ✅ Analytics overview with charts
- ✅ Bus management table
- ✅ Revenue reports
- ✅ Complaint tracking
- ✅ Payment analytics

## 🌟 Unique Value Propositions

1. **Low-Fare Optimization**: Designed for Rs. 200-700 ticket range
2. **LankaQR First**: Zero-fee payment method priority
3. **Offline Capability**: Works in low-connectivity areas
4. **Revenue Leak Prevention**: Digital tracking reduces losses
5. **AI Assistance**: Smart complaint handling
6. **Multi-Language**: Sinhala, Tamil, English support

## 🔐 Security Features

- OTP-based authentication
- Secure QR code generation
- Payment encryption ready
- Role-based access control
- Transaction audit trails

## 📱 Responsive Design

- **Mobile (390px)**: Passenger app optimized
- **Tablet (768px)**: Conductor app optimized
- **Desktop (1440px)**: Admin dashboard optimized

## 🚧 Future Enhancements

1. Real-time GPS tracking
2. Route planning with Google Maps
3. Push notifications
4. Referral program
5. Corporate booking
6. Bus operator portal
7. Government analytics API
8. Multi-currency support
9. Wheelchair accessibility info
10. Real-time crowd indicators

## 📞 Support

For issues or questions about the LankaBus system:
- Email: support@busease.lk
- Phone: +94 11 234 5678
- In-app AI chat support

---

**Built with ❤️ for Sri Lanka's Digital Transport Future**

*SE-38 Academic Project | Figma Make Implementation*
