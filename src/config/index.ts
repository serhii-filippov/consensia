import { z } from 'zod';
import dotenv from 'dotenv';
import logger from '../utils/logger';
dotenv.config();

// The env vars schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),

  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN_HOURS: z.string().default('1h'),
});

// Validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  logger.error('Invalid environment variables:', env.error.format(), '\nExiting process with code (1)...');
  process.exit(1);
}

export const config = {
  env: env.data.NODE_ENV,
  port: env.data.PORT,

  db: {
    name: env.data.DB_NAME,
    user: env.data.DB_USER,
    password: env.data.DB_PASSWORD,
    uri: `mongodb://${env.data.DB_USER}:${env.data.DB_PASSWORD}@${env.data.DB_HOST}`,
  },

  jwt: {
    secret: env.data.JWT_SECRET,
    expiresIn: env.data.JWT_EXPIRES_IN_HOURS,
  },
};