import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'CLIENT_URL'];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiry: process.env.JWT_ACCESS_EXPIRES || '15m',
  refreshExpiry: process.env.JWT_REFRESH_EXPIRES || '7d',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  uploadPath: process.env.UPLOAD_PATH || 'uploads/kyc',
  maxFileSize: Number(process.env.MAX_FILE_SIZE || 5 * 1024 * 1024)
};
