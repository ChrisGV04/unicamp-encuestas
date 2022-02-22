import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';
import * as env from './env';
import { redisWrapper } from './services';

const start = async () => {
  if (!env.CORS_DOMAIN) throw new Error('⚠️ CORS_DOMAIN must be defined');
  if (!env.MONGO_URI) throw new Error('⚠️ MONGO_URI must be defined');
  if (!env.REDIS_URI) throw new Error('⚠️ REDIS_URI must be defined');
  if (!env.SUMMARY_PWD) throw new Error('⚠️ SUMMARY_PWD must be defined');

  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connection successful!');

    await redisWrapper.connect();
    console.log('Redis connection successful!');
  } catch (error) {
    console.error('⚠️ Error on start:', error);
  }

  app.listen(3030, () => console.log('🚀 Listening on port 3030!'));
};

start();
