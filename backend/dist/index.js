"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'lankabus_super_secret_key';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize SQLite database
const db = new sqlite3_1.default.Database('./lankabus.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    }
    else {
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
            db.get("SELECT count(*) as count FROM routes", (err, row) => {
                if (row.count === 0) {
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
            db.get("SELECT count(*) as count FROM users WHERE phone = ?", ['0771112233'], (err, row) => __awaiter(void 0, void 0, void 0, function* () {
                if (row && row.count === 0) {
                    console.log("Seeding demo users...");
                    const hashedPass = yield bcryptjs_1.default.hash('password123', 10);
                    db.run(`INSERT INTO users (phone, fullName, password, role, walletBalance) VALUES 
            ('0771112233', 'Demo Passenger', ?, 'passenger', 5000),
            ('0774445566', 'Demo Conductor', ?, 'conductor', 0)`, [hashedPass, hashedPass]);
                }
            }));
        });
    }
});
// --- AUTH ROUTES ---
// Register Endpoint
app.post('/api/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, fullName, password, role } = req.body;
    if (!phone || !fullName || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const query = `INSERT INTO users (phone, fullName, password, role, walletBalance) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [phone, fullName, hashedPassword, role, 0], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'User with this phone number already exists.' });
                }
                return res.status(500).json({ error: 'Registration failed.' });
            }
            const token = jsonwebtoken_1.default.sign({ id: this.lastID, role }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'Registration successful',
                user: { id: this.lastID, phone, fullName, role, walletBalance: 0 },
                token
            });
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Login Endpoint
app.post('/api/auth/login', (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(400).json({ error: 'Phone and password are required.' });
    }
    db.get("SELECT * FROM users WHERE phone = ?", [phone], (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(500).json({ error: 'Database error.' });
        if (!user)
            return res.status(401).json({ error: 'Invalid credentials.' });
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid)
            return res.status(401).json({ error: 'Invalid credentials.' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            user: { id: user.id, phone: user.phone, fullName: user.fullName, role: user.role, walletBalance: user.walletBalance },
            token
        });
    }));
});
// --- BUS & ROUTE ROUTES ---
// Get all buses with route info
app.get('/api/buses', (req, res) => {
    const query = `
    SELECT b.*, r.routeNumber, r."from", r."to", r.baseFare 
    FROM buses b 
    JOIN routes r ON b.routeId = r.id 
    WHERE b.isActive = 1
  `;
    db.all(query, [], (err, rows) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// --- BOOKING ROUTES ---
// Create a booking
app.post('/api/bookings', (req, res) => {
    const { userId, busId, seatNumber, fare, from, to, date, time } = req.body;
    const id = 'bk' + Date.now();
    const qrCode = 'QR-' + id;
    const query = `INSERT INTO bookings (id, userId, busId, seatNumber, qrCode, fare, "from", "to", date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [id, userId, busId, seatNumber, qrCode, fare, from, to, date, time], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(201).json({ id, qrCode, message: 'Booking confirmed' });
    });
});
// Get user bookings
app.get('/api/bookings/user/:userId', (req, res) => {
    db.all("SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC", [req.params.userId], (err, rows) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// --- CONDUCTOR ROUTES ---
// Get stats for a specific bus
app.get('/api/conductor/stats/:busId', (req, res) => {
    const { busId } = req.params;
    const query = `
    SELECT 
      SUM(fare) as revenue, 
      COUNT(*) as passengerCount,
      (SELECT COUNT(*) FROM bookings WHERE busId = ? AND bookingStatus = 'validated') as validatedCount
    FROM bookings 
    WHERE busId = ?
  `;
    db.get(query, [busId, busId], (err, row) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({
            revenue: row.revenue || 0,
            passengers: row.passengerCount || 0,
            validated: row.validatedCount || 0
        });
    });
});
// Validate a ticket (QR Code scanning)
app.post('/api/conductor/validate-ticket', (req, res) => {
    const { qrCode, busId } = req.body;
    db.get("SELECT * FROM bookings WHERE qrCode = ?", [qrCode], (err, booking) => {
        if (err)
            return res.status(500).json({ error: 'Database error' });
        if (!booking)
            return res.status(404).json({ error: 'Invalid Ticket' });
        if (booking.busId !== busId) {
            return res.status(400).json({ error: 'Ticket is for a different bus' });
        }
        if (booking.bookingStatus === 'validated') {
            return res.status(400).json({ error: 'Ticket already used' });
        }
        db.run("UPDATE bookings SET bookingStatus = 'validated' WHERE id = ?", [booking.id], function (err) {
            if (err)
                return res.status(500).json({ error: 'Failed to update ticket status' });
            res.json({ message: 'Ticket validated successfully', booking });
        });
    });
});
// Start/End Trip
app.post('/api/conductor/trip/toggle', (req, res) => {
    const { busId, isActive } = req.body;
    db.run("UPDATE buses SET isActive = ? WHERE id = ?", [isActive ? 1 : 0, busId], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ message: `Trip ${isActive ? 'started' : 'ended'} successfully` });
    });
});
app.listen(port, () => {
    console.log(`LankaBus backend Server running on http://localhost:${port}`);
});
