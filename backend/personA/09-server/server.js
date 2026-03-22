require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');
const errorHandler = require('../middleware/errorHandler');
const { startLiveSeatResetScheduler } = require('../services/liveSeatResetService');

// Route imports
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const ticketRoutes = require('../routes/ticket');
const routeRoutes = require('../routes/route');
const busRoutes = require('../routes/bus');
const walletRoutes = require('../routes/wallet');
const fareRoutes = require('../routes/fare');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const parseAllowedOrigins = (rawOrigins) =>
  `${rawOrigins || ''}`
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const createCorsOptions = () => {
  const rawCorsOrigins = process.env.CORS_ORIGIN || '';
  const allowedOrigins = parseAllowedOrigins(rawCorsOrigins);

  if (isProduction) {
    if (!rawCorsOrigins || rawCorsOrigins.trim() === '*' || allowedOrigins.length === 0) {
      throw new Error(
        'CORS_ORIGIN must be a comma-separated allowlist in production (wildcard is not allowed).'
      );
    }

    return {
      origin(origin, callback) {
        // Allow non-browser clients (no Origin header), including mobile apps.
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS origin blocked'));
      },
    };
  }

  if (!rawCorsOrigins || rawCorsOrigins.trim() === '*') {
    return { origin: '*' };
  }

  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS origin blocked'));
    },
  };
};

// Middleware
app.use(cors(createCorsOptions()));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/user', userRoutes);
app.use('/v1/tickets', ticketRoutes);
app.use('/v1/routes', routeRoutes);
app.use('/v1/buses', busRoutes);
app.use('/v1/wallet', walletRoutes);
app.use('/v1/fare', fareRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.path} not found`,
  });
});

// Error Handler Middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server running on port ${PORT}`);
    startLiveSeatResetScheduler();
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
});

module.exports = app;
