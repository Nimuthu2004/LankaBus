import express from 'express';
import db from './db';

const router = express.Router();

// --- BUS & ROUTE ROUTES ---

// Get all buses with route info
router.get('/buses', (req, res) => {
    const query = `
    SELECT b.*, r.routeNumber, r."from", r."to", r.baseFare 
    FROM buses b 
    JOIN routes r ON b.routeId = r.id 
    WHERE b.isActive = 1
  `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- BOOKING ROUTES ---

// Create a booking
router.post('/bookings', (req, res) => {
    const { userId, busId, seatNumber, fare, from, to, date, time } = req.body;
    const id = 'bk' + Date.now();
    const qrCode = 'QR-' + id;

    const query = `INSERT INTO bookings (id, userId, busId, seatNumber, qrCode, fare, "from", "to", date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [id, userId, busId, seatNumber, qrCode, fare, from, to, date, time], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, qrCode, message: 'Booking confirmed' });
    });
});

// Get user bookings
router.get('/bookings/user/:userId', (req, res) => {
    db.all("SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC", [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- CONDUCTOR ROUTES ---

// Get stats for a specific bus
router.get('/conductor/stats/:busId', (req, res) => {
    const { busId } = req.params;
    const query = `
    SELECT 
      SUM(fare) as revenue, 
      COUNT(*) as passengerCount,
      (SELECT COUNT(*) FROM bookings WHERE busId = ? AND bookingStatus = 'validated') as validatedCount
    FROM bookings 
    WHERE busId = ?
  `;
    db.get(query, [busId, busId], (err, row: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            revenue: row.revenue || 0,
            passengers: row.passengerCount || 0,
            validated: row.validatedCount || 0
        });
    });
});

// Validate a ticket (QR Code scanning)
router.post('/conductor/validate-ticket', (req, res) => {
    const { qrCode, busId } = req.body;

    db.get("SELECT * FROM bookings WHERE qrCode = ?", [qrCode], (err, booking: any) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!booking) return res.status(404).json({ error: 'Invalid Ticket' });

        if (booking.busId !== busId) {
            return res.status(400).json({ error: 'Ticket is for a different bus' });
        }

        if (booking.bookingStatus === 'validated') {
            return res.status(400).json({ error: 'Ticket already used' });
        }

        db.run("UPDATE bookings SET bookingStatus = 'validated' WHERE id = ?", [booking.id], function (err) {
            if (err) return res.status(500).json({ error: 'Failed to update ticket status' });
            res.json({ message: 'Ticket validated successfully', booking });
        });
    });
});

// Start/End Trip
router.post('/conductor/trip/toggle', (req, res) => {
    const { busId, isActive } = req.body;
    db.run("UPDATE buses SET isActive = ? WHERE id = ?", [isActive ? 1 : 0, busId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Trip ${isActive ? 'started' : 'ended'} successfully` });
    });
});

export default router;
