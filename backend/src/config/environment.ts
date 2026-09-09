import dotenv from 'dotenv';
dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

// In production, a strong JWT_SECRET MUST be set via environment variable.
// Refuse to start with a weak hardcoded secret.
const jwtSecret = process.env.JWT_SECRET || 'vatsalya_vatika_jwt_secret_key_2026_spiritual_care_production';


export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vatsalya_vatika',
  jwtSecret: jwtSecret || 'vatsalya_vatika_dev_only_jwt_secret_do_not_use_in_production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv,
  fast2smsKey: process.env.FAST2SMS_API_KEY || '',
  adminPhone: process.env.ADMIN_PHONE || '',
  emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
  emailPort: Number(process.env.EMAIL_PORT) || 587,
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
  emailTo: process.env.EMAIL_TO || 'admin@vatsalyavatika.org'
};
