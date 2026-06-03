<div align="center">

<img src="https://img.shields.io/badge/Platform-Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Status-Academic_Project-blue?style=for-the-badge" />

# 🚌 Lanka Bus
### *Your Journey, Just a Tap Away*

A full-stack digital bus ticketing and journey management platform built for Sri Lanka's public transport system. Lanka Bus replaces physical tickets with QR-based digital tickets, real-time seat tracking, and multi-payment support — designed to eliminate revenue leakage and improve the passenger experience.

</div>

---

## 📱 Screenshots

| Home | AI Chatbot | Conductor View | Trip History | Wallet |
|------|-----------|----------------|--------------|--------|
| ![Home](./screenshots/home.png) | ![Chatbot](./screenshots/chatbot.png) | ![Conductor](./screenshots/conductor.png) | ![History](./screenshots/history.png) | ![Wallet](./screenshots/wallet.png) |

---

## 🚀 Features

### Passenger App
- JWT-based User Registration & Login
- Route Search & Fare Lookup
- Real-time Seat Selection & Reservation
- QR-based Digital Ticket Generation
- Multi-payment Support (EzCash, LankaPay, Card — simulated)
- Wallet with Recharge History
- Trip / Booking History
- AI Chatbot Assistant
- Multi-language Support (Sinhala / Tamil / English)
- Push Notifications (Firebase)

### Conductor App
- Secure Login with Role-Based Access
- QR Code Ticket Validation (Scan & Verify)
- Live Seat Count Dashboard
- Offline Ticket Verification
- Journey Summary & Daily Trip Reports

### Admin Dashboard
- Revenue Analytics & Operational Reports
- Route & Bus Management
- Complaint Management System
- Data Analytics

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────┐
│              Client Applications                │
│  Passenger App  │  Conductor App  │  Admin Web  │
│      (Flutter)  │     (Flutter)   │  (Flutter)  │
└────────────────────┬────────────────────────────┘
                     │ REST API (HTTP/JSON)
┌────────────────────▼────────────────────────────┐
│           Node.js + Express REST API            │
│     JWT Auth │ Route Logic │ Booking Engine     │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│               MongoDB Atlas                     │
└─────────────────────────────────────────────────┘
          │                    │
┌─────────▼────────┐  ┌────────▼──────────────────┐
│ Firebase Cloud   │  │  Payment Gateway          │
│ Messaging (FCM)  │  │  EzCash / LankaPay / Card │
└──────────────────┘  └───────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Frontend | Flutter, Dart |
| State Management | Provider |
| API Integration | Dio |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Authentication | JWT, bcrypt |
| QR Code | QR Generator + QR Scanner Plugin |
| Push Notifications | Firebase Cloud Messaging |
| Maps | Google Maps API |
| Project Management | ClickUp |
| UI/UX Design | Figma |
| Version Control | Git & GitHub |
| API Testing | Postman |

---

## 📂 Project Structure

```
lanka-bus/
├── lankabus-backend/
│   ├── models/           # Mongoose schemas (User, Booking, Bus, Route...)
│   ├── controllers/      # Business logic
│   ├── routes/           # Express route definitions
│   ├── middleware/        # JWT auth, RBAC, error handling
│   ├── config/           # DB connection, env config
│   └── server.js
│
└── lankabus-flutter/
    └── lib/
        ├── screens/      # UI screens (Home, Booking, Wallet, QR...)
        ├── services/     # API calls (Dio), local storage
        ├── models/       # Dart data models
        ├── providers/    # State management
        └── main.dart
```

---

## 🔄 System Flow

```
1. Passenger registers & logs in
        ↓
2. Selects route & available seat
        ↓
3. Booking created & payment processed
        ↓
4. QR code ticket generated & sent
        ↓
5. Conductor scans QR to validate
        ↓
6. Admin dashboard updates revenue & analytics
```

---

## 🔐 Security

- JWT-based Authentication
- Role-Based Access Control (RBAC) — Passenger / Conductor / Admin
- Password Encryption (bcrypt)
- Secure API Middleware
- Flutter Secure Storage for token persistence

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- Flutter SDK 3.x
- MongoDB Atlas account
- Firebase project (for FCM)

### Backend Setup

```bash
git clone https://github.com/your-org/lanka-bus.git
cd lankabus-backend
npm install
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, FCM keys
npm start
```

### Flutter App Setup

```bash
cd lankabus-flutter
flutter pub get
# Add google-services.json (Android) and GoogleService-Info.plist (iOS)
flutter run
```

---

## 📊 Methodology

- Agile SDLC with Scrum-based Sprint Planning
- Object-Oriented Analysis & Design (OOAD)
- Modular team-based development

---

## 🚧 Future Improvements

- [ ] Live GPS bus tracking integration
- [ ] Advanced AI chatbot (extended NLP)
- [ ] Full LankaQR production payment integration
- [ ] Government regulatory compliance dashboard
- [ ] Nationwide deployment & scaling

---

## 👨‍💻 Development Team

**SE-38 Group**
Informatics Institute of Technology (IIT) — University of Westminster

---

## 📜 License

This project was developed for **academic purposes** at IIT / University of Westminster.
