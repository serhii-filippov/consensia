import { Event } from '../models/event';
import {
  handleCustomerCreated,
  handleCustomerDeleted,
  handleOrderCreation,
  getCustomerPoints,
  consumeCustomerPoints,
} from '../repositories/loyaltyRepository';
import logger from '../utils/logger';

/**
 * Process an incoming event.
 * @param event - The event to process.
 */
export const processEvent = async (
  event: Event,
): Promise<void> => {
  switch (event.EventName) {
    case 'CustomerCreated':
      await handleCustomerCreated(event.Payload);
      break;
    case 'CustomerDeleted':
      await handleCustomerDeleted(event.Payload);
      break;
    case 'OrderPlaced':
      await handleOrderCreation(event.Payload);
      break;
    case 'OrderReturned':
      await subtractPointsOrderReturnCancellation(event.Payload);
      break;
    case 'OrderCanceled':
      await subtractPointsOrderReturnCancellation(event.Payload);
      break;
    default:
      logger.warn(`Unknown event type: ${event.EventName}`);
      throw new Error(`Unknown event type: ${event.EventName}`);
  }
};

/**
 * Get loyalty points for a customer.
 * @param customerId - The ID of the customer.
 * @returns The number of loyalty points.
 */
export const getPointsForCustomer = async (
  customerId: string
): Promise<number> => {
  return getCustomerPoints(customerId);
};

/**
 * Consume loyalty points from a customer.
 * @param customerId - The ID of the customer.
 * @param points - The number of points to consume.
 * @returns The new number of loyalty points.
 */
export const consumePointsForCustomer = async (
  customerId: string,
  points: number
): Promise<number> => {
  const currentPointsBalance = await getCustomerPoints(customerId);
  if (currentPointsBalance < points) {
    throw new Error('Insufficient points balance');
  }

  return consumeCustomerPoints(customerId, points);
};

/**
 * Subtract loyalty points by the returned or canceled order.
 * @param customerId - The ID of the customer.
 * @param points - The number of points to consume.
 * @returns The new number of loyalty points.
 */
export const subtractPointsOrderReturnCancellation = async (
  payload: {customerId: string, points: number},
): Promise<number> => {
  const { customerId, points } = payload;
  const currentPointsBalance = await getCustomerPoints(customerId);
  if (currentPointsBalance < points) {
    throw new Error('Insufficient points balance');
  }

  return consumeCustomerPoints(customerId, points);
};