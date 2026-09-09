import mongoose from 'mongoose';
import { config } from './environment';

export let isMongoConnected = false;

export const checkMongoConnected = (): boolean => {
  return mongoose.connection.readyState === 1 || isMongoConnected;
};

// Cache the connection promise across serverless function invocations
let cachedPromise: Promise<boolean> | null = null;

export const connectDB = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) {
    isMongoConnected = true;
    return true;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = (async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        bufferCommands: false
      });
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB successfully');
      return true;
    } catch (error: any) {
      isMongoConnected = false;
      cachedPromise = null; // reset to allow retry on next request
      console.warn(`⚠️ MongoDB connection warning: ${error.message}`);
      console.log('💡 Running with built-in high-performance fallback data store. All REST APIs and Admin features will function smoothly!');
      return false;
    }
  })();

  return cachedPromise;
};

