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
        // Create Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('passenger', 'conductor')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    }
});
// Register Endpoint
app.post('/api/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, fullName, password, role } = req.body;
    if (!phone || !fullName || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (role !== 'passenger' && role !== 'conductor') {
        return res.status(400).json({ error: 'Invalid role.' });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const query = `INSERT INTO users (phone, fullName, password, role) VALUES (?, ?, ?, ?)`;
        db.run(query, [phone, fullName, hashedPassword, role], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'User with this phone number already exists.' });
                }
                return res.status(500).json({ error: 'Registration failed.' });
            }
            const token = jsonwebtoken_1.default.sign({ id: this.lastID, role }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'Registration successful',
                user: { id: this.lastID, phone, fullName, role },
                token
            });
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}));
app.listen(port, () => {
    console.log(`LankaBus backend Server running on http://localhost:${port}`);
});
