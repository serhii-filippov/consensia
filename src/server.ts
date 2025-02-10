import express from 'express';
import bodyParser from 'body-parser';
import {
    webhook,
    getCustomerPoints,
    consumeCustomerPoints,
} from './controllers/loyaltyController';
import {
  authenticate,
  generateToken,
} from './utils/auth';
import logger from './utils/logger';
import { config } from './config';
import cleanUpExpiredPointsCron from './cron-jobs/cleanUpExpiredPoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = config.port;

mongoose.connect(config.db.uri, {
  dbName: config.db.name,
  auth: {
    username: config.db.user,
    password: config.db.password,
  },
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
  cleanUpExpiredPointsCron.start();
  logger.info('Cron job started to expire loyalty points.');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
  // dummy, for testing purposes
  console.log('here\'s your JWT: ', generateToken('testCustomerId123'));
});

app.use(bodyParser.json());
app.post('/webhook', webhook);
app.get('/:customerId/points', authenticate ,getCustomerPoints);
app.post('/:customerId/consume', authenticate, consumeCustomerPoints);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection occurred at:', promise, '\nreason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception occurred:', error);
});
