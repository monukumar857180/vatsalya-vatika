import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { connectDB, isMongoConnected } from './config/db';
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

// Security Headers (helmet sets X-Content-Type-Options, X-Frame-Options, etc.)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false
}));

// CORS Configuration
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting on authentication endpoints to prevent brute force
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

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vatsalya Vatika Ashram REST API server is healthy and running.',
    timestamp: new Date().toISOString()
  });
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

// Start Server
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(config.port, () => {
    console.log(`
=====================================================
  🕊️ VATSALYA VATIKA ASHRAM BACKEND REST API RUNNING
  📡 PORT: ${config.port}
  🌐 HEALTH CHECK: http://localhost:${config.port}/api/health
=====================================================
    `);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
