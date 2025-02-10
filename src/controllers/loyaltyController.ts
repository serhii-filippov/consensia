import { Response } from 'express';
import {
  processEvent,
  getPointsForCustomer,
  consumePointsForCustomer,
} from '../services/loyaltyService';
import {
  validateEvent,
  validateConsumePoints,
} from '../utils/validation';
import { AuthenticatedRequest } from '../models/event';
import logger from '../utils/logger';

export const webhook = (req: AuthenticatedRequest, res: Response): void => {
  const { error } = validateEvent(req.body);
  if (error) {
    logger.error(`Validation error: ${error.details[0].message}`)
    res.status(400).json({ error: error.details[0].message });

    return
  }

  // don't wait for the event to be processed by intent
  processEvent(req.body);
  res.status(200).send('Event processed');
};

export const getCustomerPoints = (req: AuthenticatedRequest, res: Response): void => {
  const customerId = req.params.CustomerId;
  const points = getPointsForCustomer(customerId);
  res.status(200).json({ points });
};

export const consumeCustomerPoints = (req: AuthenticatedRequest, res: Response): void => {
  const { error } = validateConsumePoints(req.body);
  if (error) {
    logger.error(`Validation error: ${error.details[0].message}`);
    res.status(400).json({ error: error.details[0].message });

    return
  }

  const customerId = req.params.CustomerId;
  const points = req.body.points;
  const newPoints = consumePointsForCustomer(customerId, points);
  res.status(200).json({ points: newPoints });
};