import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'lankabus_super_secret_key';

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./lankabus.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
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
app.post('/api/auth/register', async (req, res) => {
    const { phone, fullName, password, role } = req.body;

    if (!phone || !fullName || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (role !== 'passenger' && role !== 'conductor') {
        return res.status(400).json({ error: 'Invalid role.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (phone, fullName, password, role) VALUES (?, ?, ?, ?)`;
        db.run(query, [phone, fullName, hashedPassword, role], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'User with this phone number already exists.' });
                }
                return res.status(500).json({ error: 'Registration failed.' });
            }

            const token = jwt.sign({ id: this.lastID, role }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'Registration successful',
                user: { id: this.lastID, phone, fullName, role },
                token
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`LankaBus backend Server running on http://localhost:${port}`);
});
