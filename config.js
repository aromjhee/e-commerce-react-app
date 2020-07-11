import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PORT: process.env.PORT || 8080,
}