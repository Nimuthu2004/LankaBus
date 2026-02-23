import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const db = new sqlite3.Database('./lankabus.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create tables
        db.serialize(() => {
            // Users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE NOT NULL,
        fullName TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('passenger', 'conductor')),
        email TEXT,
        language TEXT DEFAULT 'en',
        walletBalance INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

            // Routes table
            db.run(`CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        routeNumber TEXT NOT NULL,
        "from" TEXT NOT NULL,
        "to" TEXT NOT NULL,
        distance REAL,
        baseFare INTEGER NOT NULL
      )`);

            // Buses table
            db.run(`CREATE TABLE IF NOT EXISTS buses (
        id TEXT PRIMARY KEY,
        busNumber TEXT NOT NULL,
        operatorName TEXT NOT NULL,
        routeId TEXT NOT NULL,
        totalSeats INTEGER NOT NULL,
        busType TEXT NOT NULL,
        amenities TEXT,
        isActive BOOLEAN DEFAULT 1,
        departureTime TEXT NOT NULL,
        arrivalTime TEXT NOT NULL,
        FOREIGN KEY(routeId) REFERENCES routes(id)
      )`);

            // Bookings table
            db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        busId TEXT NOT NULL,
        seatNumber TEXT NOT NULL,
        bookingStatus TEXT DEFAULT 'confirmed',
        paymentStatus TEXT DEFAULT 'paid',
        qrCode TEXT NOT NULL,
        fare INTEGER NOT NULL,
        "from" TEXT NOT NULL,
        "to" TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(busId) REFERENCES buses(id)
      )`);

            // Transactions table
            db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        type TEXT NOT NULL,
        amount INTEGER NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        method TEXT NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id)
      )`);

            // Seed initial data if routes table is empty
            db.get("SELECT count(*) as count FROM routes", (err, row: any) => {
                if (row && row.count === 0) {
                    console.log("Seeding initial data...");
                    db.run(`INSERT INTO routes (id, routeNumber, "from", "to", distance, baseFare) VALUES 
            ('r1', '138', 'Colombo', 'Kandy', 115, 250),
            ('r2', '02', 'Colombo', 'Galle', 119, 280),
            ('r3', '245', 'Kandy', 'Jaffna', 285, 650),
            ('r4', '99', 'Colombo', 'Trincomalee', 257, 580)`);

                    db.run(`INSERT INTO buses (id, busNumber, operatorName, routeId, totalSeats, busType, amenities, departureTime, arrivalTime) VALUES 
            ('b1', 'NA-1234', 'Luxury Express', 'r1', 45, 'luxury', 'AC, WiFi, Reclining Seats, USB Charging', '08:00 AM', '11:30 AM'),
            ('b2', 'WP-5678', 'Lanka Travels', 'r1', 45, 'semi-luxury', 'AC, Reclining Seats', '09:30 AM', '01:00 PM'),
            ('b3', 'SP-9012', 'Coastal Express', 'r2', 50, 'luxury', 'AC, WiFi, Entertainment, Refreshments', '07:00 AM', '10:30 AM')`);
                }
            });

            // Seed demo users if they don't exist
            db.get("SELECT count(*) as count FROM users WHERE phone = ?", ['0771112233'], async (err, row: any) => {
                if (row && row.count === 0) {
                    console.log("Seeding demo users...");
                    const hashedPass = await bcrypt.hash('password123', 10);
                    db.run(`INSERT INTO users (phone, fullName, password, role, walletBalance) VALUES 
            ('0771112233', 'Demo Passenger', ?, 'passenger', 5000),
            ('0774445566', 'Demo Conductor', ?, 'conductor', 0)`, [hashedPass, hashedPass]);
                }
            });
        });
    }
});

export default db;
