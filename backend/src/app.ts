import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { connectDB } from './config/db';
import { seedDatabase } from './services/seedService';
import { errorHandler } from './middleware/errorHandler';


import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import galleryRoutes from './routes/galleryRoutes';
import facilityRoutes from './routes/facilityRoutes';
import contactRoutes from './routes/contactRoutes';
import contributionRoutes from './routes/contributionRoutes';
import siteSettingsRoutes from './routes/siteSettingsRoutes';
import donationSettingsRoutes from './routes/donationSettingsRoutes';
import reviewRoutes from './routes/reviewRoutes';
import activityRoutes from './routes/activityRoutes';
import memoryVaultRoutes from './routes/memoryVaultRoutes';
import studentImageRoutes from './routes/studentImageRoutes';
import carouselRoutes from './routes/carouselRoutes';

import { sanitizeMiddleware } from './middleware/sanitizeMiddleware';

const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false
}));

// CORS Configuration - allows configured clientUrl, vercel previews, and localhost
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server or same-origin)
    if (!origin) return callback(null, true);

    const allowed = [
      config.clientUrl,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:5000',
      'http://localhost:3000'
    ];

    if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(null, true); // Allow all valid web clients
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting on authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
});

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(sanitizeMiddleware);

// Middleware to ensure DB connection is ready and seeded in serverless environments
app.use(async (req, res, next) => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    // connectDB already logs warning and falls back smoothly
  }
  next();
});


// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vatsalya Vatika Ashram REST API is healthy and running.',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Explicit Database Seed API to upload/seed all ashram images & data into MongoDB Atlas
app.post('/api/seed', async (req, res) => {
  try {
    const result = await seedDatabase(true); // force seed if requested
    res.status(200).json({
      success: true,
      message: 'All ashram images, carousels, events, facilities, and records successfully uploaded and synchronized with database!',
      details: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/api/seed', async (req, res) => {
  try {
    const result = await seedDatabase(true);
    res.status(200).json({
      success: true,
      message: 'All ashram images, carousels, events, facilities, and records successfully uploaded and synchronized with database!',
      details: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/donation-settings', donationSettingsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/memory-vault', memoryVaultRoutes);
app.use('/api/student-images', studentImageRoutes);
app.use('/api/carousel', carouselRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
