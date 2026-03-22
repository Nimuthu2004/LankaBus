const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Bus = require('./models/Bus');
const Route = require('./models/Route');
const Ticket = require('./models/Ticket');
const Transaction = require('./models/Transaction');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Bus.deleteMany({}),
      Route.deleteMany({}),
      Ticket.deleteMany({}),
      Transaction.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create test users
    const users = await User.insertMany([
      {
        email: 'passenger@test.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+94712345678',
        password: 'password123',
        userType: 'user',
        isVerified: true,
        walletBalance: 5000,
      },
      {
        email: 'conductor@test.com',
        firstName: 'Ahmed',
        lastName: 'conductor',
        phoneNumber: '+94722345678',
        password: 'conductor123',
        userType: 'conductor',
        isVerified: true,
        walletBalance: 1000,
      },
      {
        email: 'operator@test.com',
        firstName: 'Operator',
        lastName: 'Test',
        phoneNumber: '+94732345678',
        password: 'operator123',
        userType: 'operator',
        isVerified: true,
        walletBalance: 0,
      },
    ]);
    console.log('Created test users:', users.length);

    // Create test routes
    const routes = await Route.insertMany([
      {
        routeNumber: 'A1',
        startLocation: 'Colombo',
        endLocation: 'Kandy',
        estimatedDuration: 180,
        baseFare: 450,
        operator: users[2]._id,
        isActive: true,
        stops: [
          {
            name: 'Colombo Central',
            arrivalTime: '07:00',
            departureTime: '07:00',
            latitude: 6.9271,
            longitude: 80.6369,
            sequence: 1,
          },
          {
            name: 'Kandy',
            arrivalTime: '10:00',
            departureTime: '10:00',
            latitude: 7.2906,
            longitude: 80.6337,
            sequence: 2,
          },
        ],
      },
      {
        routeNumber: 'A2',
        startLocation: 'Colombo',
        endLocation: 'Galle',
        estimatedDuration: 150,
        baseFare: 350,
        operator: users[2]._id,
        isActive: true,
        stops: [
          {
            name: 'Colombo Central',
            arrivalTime: '08:00',
            departureTime: '08:00',
            latitude: 6.9271,
            longitude: 80.6369,
            sequence: 1,
          },
          {
            name: 'Galle',
            arrivalTime: '10:30',
            departureTime: '10:30',
            latitude: 6.0535,
            longitude: 80.2154,
            sequence: 2,
          },
        ],
      },
    ]);
    console.log('Created test routes:', routes.length);

    // Create test buses
    const buses = await Bus.insertMany([
      {
        busNumber: 'SL-1001',
        route: routes[0]._id,
        totalSeats: 32,
        occupiedSeats: 5,
        conductor: users[1]._id,
        driver: users[2]._id,
        latitude: 6.9271,
        longitude: 80.6369,
        status: 'running',
        registrationExpiry: new Date('2025-12-31'),
        insuranceExpiry: new Date('2025-06-30'),
      },
      {
        busNumber: 'SL-1002',
        route: routes[1]._id,
        totalSeats: 32,
        occupiedSeats: 0,
        conductor: users[1]._id,
        status: 'stopped',
        registrationExpiry: new Date('2025-11-30'),
        insuranceExpiry: new Date('2025-05-30'),
      },
    ]);
    console.log('Created test buses:', buses.length);

    // Create test tickets
    const today = new Date();
    const tickets = await Ticket.insertMany([
      {
        user: users[0]._id,
        bus: buses[0]._id,
        route: routes[0]._id,
        seatNumber: 1,
        boardingPoint: 'Colombo Central',
        droppingPoint: 'Kandy',
        fare: 450,
        travelDate: today,
        qrCode: 'QR123456',
        busRegistrationNumber: 'SL-1001',
        status: 'booked',
      },
      {
        user: users[0]._id,
        bus: buses[0]._id,
        route: routes[0]._id,
        seatNumber: 2,
        boardingPoint: 'Colombo Central',
        droppingPoint: 'Kandy',
        fare: 450,
        travelDate: today,
        qrCode: 'QR123457',
        busRegistrationNumber: 'SL-1001',
        status: 'booked',
      },
    ]);
    console.log('Created test tickets:', tickets.length);

    // Create test transactions
    const transactions = await Transaction.insertMany([
      {
        user: users[0]._id,
        amount: 450,
        type: 'debit',
        description: 'Ticket purchase for Colombo to Kandy',
        status: 'completed',
        ticket: tickets[0]._id,
        paymentMethod: 'wallet',
        referenceNumber: 'TXN001',
        previousBalance: 5000,
        newBalance: 4550,
      },
      {
        user: users[0]._id,
        amount: 500,
        type: 'credit',
        description: 'Wallet top-up using card',
        status: 'completed',
        paymentMethod: 'card',
        referenceNumber: 'TXN002',
        previousBalance: 4550,
        newBalance: 5050,
      },
    ]);
    console.log('Created test transactions:', transactions.length);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
