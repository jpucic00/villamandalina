import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDatabase } from './db/database.js';
import authRoutes from './routes/auth.js';
import bookedDatesRoutes from './routes/bookedDates.js';
import pricesRoutes from './routes/prices.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: log all relevant env vars
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true  // Allow same-origin requests in production
    : process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize database
const db = getDatabase();

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/booked-dates', bookedDatesRoutes);
app.use('/api/prices', pricesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../gui/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../gui/build', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
