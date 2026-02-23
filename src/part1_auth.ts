import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'lankabus_super_secret_key';

// Register Endpoint
router.post('/register', async (req, res) => {
    const { phone, fullName, password, role } = req.body;

    if (!phone || !fullName || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (phone, fullName, password, role, walletBalance) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [phone, fullName, hashedPassword, role, 0], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'User with this phone number already exists.' });
                }
                return res.status(500).json({ error: 'Registration failed.' });
            }
            const token = jwt.sign({ id: this.lastID, role }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'Registration successful',
                user: { id: this.lastID, phone, fullName, role, walletBalance: 0 },
                token
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Login Endpoint
router.post('/login', (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ error: 'Phone and password are required.' });
    }

    db.get("SELECT * FROM users WHERE phone = ?", [phone], async (err, user: any) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            user: { id: user.id, phone: user.phone, fullName: user.fullName, role: user.role, walletBalance: user.walletBalance },
            token
        });
    });
});

export default router;
