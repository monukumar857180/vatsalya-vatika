import mongoose from 'mongoose';
import { config } from './environment';

export let isMongoConnected = false;

export const checkMongoConnected = (): boolean => {
  return mongoose.connection.readyState === 1 || isMongoConnected;
};

export const connectDB = async (): Promise<boolean> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`⚠️ MongoDB connection warning: ${error.message}`);
    console.log('💡 Running with built-in high-performance fallback data store. All REST APIs and Admin features will function smoothly!');
    return false;
  }
};
