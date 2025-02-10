import express from 'express';
import bodyParser from 'body-parser';
import {
    webhook,
    getCustomerPoints,
    consumeCustomerPoints,
} from './controllers/loyaltyController';
import logger from './utils/logger';
import { config } from './config';
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
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

app.use(bodyParser.json());
app.post('/webhook', webhook);
app.get('/:customerId/points', getCustomerPoints);
app.post('/:customerId/consume', consumeCustomerPoints);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection occurred at:', promise, '\nreason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception occurred:', error);
});