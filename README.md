🎫 Ticketing System Backend
A robust Node.js & Express backend service for a real-time ticketing platform. This system processes user travel routes (Origin to Destination) and retrieves dynamic fare data from a PostgreSQL database.

🚀 Features
Route Lookup: Resolves human-readable station names (e.g., "Galle") to unique IDs.

Fare Calculation: Queries a relational database to fetch specific fares between two points.

Real-Time Ready: Optimized for low-latency responses using indexed database lookups.

Error Handling: Validates inputs and provides clear feedback for missing routes or locations.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: PostgreSQL (Supabase)

Querying: [State your method here, e.g., @supabase/supabase-js or pg driver]
- Revenue leakage
- Passenger inconvenience
- Lack of real-time seat availability
- No digital payment options
- Poor operational transparency

📂 Database Schema
The backend interacts with two primary tables in the public schema:

1. Stations
Maps locations to unique identifiers.

id (int8): Primary Key.

Name (text): The station name (e.g., "Makumbura").

Station_Code (int8): Unique numeric code.
- User Registration & Login (JWT Authentication)
- Route Search & Selection
- Real-time Seat Reservation
- QR-based Digital Ticket Generation
- Multi-payment Support (LankaQR, Wallet, Card – simulated)
- Booking History
- Multi-language Support (Sinhala / Tamil / English)
- Push Notifications

- User Registration & Login (JWT Authentication)
- Route Search & Selection
- Real-time Seat Reservation
- QR-based Digital Ticket Generation
- Multi-payment Support (LankaQR, Wallet, Card – simulated)
- Booking History
- Multi-language Support (Sinhala / Tamil / English)
- Push Notifications
2. Fares
Contains the pricing logic for specific journeys.

id (int8): Primary Key.
- Secure Login
- QR Code Ticket Validation
- Offline Ticket Verification
- Daily Trip Summary

- Secure Login
- QR Code Ticket Validation
- Offline Ticket Verification
- Daily Trip Summary
start_station_id (int8): Foreign Key to Stations.id.

end_station_id (int8): Foreign Key to Stations.id.
- Revenue Analytics
- Route & Bus Management
- Complaint Management System
- Operational Reports
- Data Analytics

- Revenue Analytics
- Route & Bus Management
- Complaint Management System
- Operational Reports
- Data Analytics
amount (float8): The ticket price for this specific route.

🚦 Getting Started
Prerequisites
Node.js (v18+ recommended)

A Supabase project or PostgreSQL instance
- AI-based Complaint Assistant
- Real-time GPS Tracking
- Firebase Push Notifications

---

## 🏗 System Architecture

```
Passenger App (Flutter)
        |
Conductor App (Flutter)
        |
Admin Dashboard (Flutter Web)
        |
------------------------------
        |
Node.js + Express REST API
        |
MongoDB Atlas
        |
External Services:
- Payment Gateway
- Firebase Cloud Messaging
- Google Maps API
```

---

## 🛠 Technologies Used

### Frontend

- Flutter (Cross-platform Mobile Development)
- Dart
- Dio (API Integration)
- Provider (State Management)
- QR Scanner Plugin
- Firebase Cloud Messaging
- Google Maps API

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Encryption)
- QR Code Generator

### Database

- MongoDB Atlas (Cloud Database)

### Tools

- Git & GitHub (Version Control)
- Postman (API Testing)
- ClickUp (Project Management)
- Figma (UI/UX Design)

---

## 📂 Project Structure

### Backend Structure

```
lankabus-backend/
│
├── models/
├── controllers/
├── routes/
├── middleware/
├── config/
└── server.js
```

### Frontend Structure (Flutter)

```
lib/
├── screens/
├── services/
├── models/
├── providers/
└── main.dart
```

---

## 🔐 Security Features

- JWT-based Authentication
- Role-Based Access Control (RBAC)
- Encrypted Passwords (bcrypt)
- Secure API Middleware
- Token Storage using Flutter Secure Storage

---

## 🔄 System Flow

1. Passenger registers and logs in.
2. Passenger selects route and seat.
3. Booking is created.
4. Payment is processed.
5. QR code ticket is generated.
6. Conductor scans QR for validation.
7. Admin dashboard updates revenue and analytics.

---

## 📊 Project Methodology

- Agile Software Development Life Cycle (SDLC)
- Scrum-based Sprint Planning
- Object-Oriented Analysis & Design (OOAD)
- Modular Team-based Development

---

## 📌 Future Improvements

- Live GPS tracking integration
- Advanced AI chatbot
- Full LankaQR production integration
- Government regulatory dashboard
- Nationwide deployment expansion

---

## 👨‍💻 Development Team

SE-38 Group
Informatics Institute of Technology (IIT)
University of Westminster

---

## 📜 License

This project was developed for academic purposes.
