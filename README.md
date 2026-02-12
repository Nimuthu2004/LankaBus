# 🚌 LankaBus – Real-Time E-Ticketing System for Highway Buses

## 📌 Project Overview

**LankaBus** is a real-time digital e-ticketing and seat reservation system designed to modernize the manual ticketing process used in Sri Lanka’s highway bus transportation sector.

The system enables passengers to book seats, make digital payments, and receive QR-based e-tickets through a mobile application. Conductors can validate tickets using a QR scanner, while administrators can monitor revenue, analytics, and operational performance through a dashboard.

This project was developed as part of the Software Engineering coursework at the Informatics Institute of Technology (IIT), in collaboration with the University of Westminster, UK.

---

## 🎯 Problem Statement

Sri Lanka’s highway buses currently rely on manual, cash-based ticketing systems which cause:

* Revenue leakage
* Passenger inconvenience
* Lack of real-time seat availability
* No digital payment options
* Poor operational transparency

LankaBus provides a fully digital solution to eliminate these inefficiencies.

---

## 🚀 Key Features

### 👤 Passenger Mobile App

* User Registration & Login (JWT Authentication)
* Route Search & Selection
* Real-time Seat Reservation
* QR-based Digital Ticket Generation
* Multi-payment Support (LankaQR, Wallet, Card – simulated)
* Booking History
* Multi-language Support (Sinhala / Tamil / English)
* Push Notifications

### 🎫 Conductor App

* Secure Login
* QR Code Ticket Validation
* Offline Ticket Verification
* Daily Trip Summary

### 🖥 Admin Dashboard

* Revenue Analytics
* Route & Bus Management
* Complaint Management System
* Operational Reports
* Data Analytics

### 🤖 AI & Smart Services

* AI-based Complaint Assistant
* Real-time GPS Tracking
* Firebase Push Notifications

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

* Flutter (Cross-platform Mobile Development)
* Dart
* Dio (API Integration)
* Provider (State Management)
* QR Scanner Plugin
* Firebase Cloud Messaging
* Google Maps API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (Password Encryption)
* QR Code Generator

### Database

* MongoDB Atlas (Cloud Database)

### Tools

* Git & GitHub (Version Control)
* Postman (API Testing)
* ClickUp (Project Management)
* Figma (UI/UX Design)

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

* JWT-based Authentication
* Role-Based Access Control (RBAC)
* Encrypted Passwords (bcrypt)
* Secure API Middleware
* Token Storage using Flutter Secure Storage

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

* Agile Software Development Life Cycle (SDLC)
* Scrum-based Sprint Planning
* Object-Oriented Analysis & Design (OOAD)
* Modular Team-based Development

---

## 📌 Future Improvements

* Live GPS tracking integration
* Advanced AI chatbot
* Full LankaQR production integration
* Government regulatory dashboard
* Nationwide deployment expansion

---

## 👨‍💻 Development Team

SE-38 Group
Informatics Institute of Technology (IIT)
University of Westminster

---

## 📜 License

This project was developed for academic purposes.

