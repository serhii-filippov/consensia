import CustomerPoints from '../models/customerPoints';

/**
 * Get loyalty points for a customer.
 * @param CustomerId - The ID of the customer.
 * @returns The number of loyalty points.
 */
export const getCustomerPoints = async (CustomerId: string): Promise<number> => {
  const customerPoints = await CustomerPoints.findOne({ customerId: CustomerId }).exec();
  return customerPoints ? customerPoints.points ?? 0 : 0;
};

/**
 * Add loyalty points to a customer.
 * @param CustomerId - The ID of the customer.
 * @param points - The number of points to add.
 */
export const addCustomerPoints = async (
  CustomerId: string, points: number
): Promise<void> => {
  await CustomerPoints.findOneAndUpdate(
    { customerId: CustomerId },
    { $inc: { points }, lastUpdated: new Date() },
    { upsert: true, new: true }
  ).exec();
};

/**
 * Consume loyalty points from a customer.
 * @param CustomerId - The ID of the customer.
 * @param points - The number of points to consume.
 * @returns The new number of loyalty points.
 */
export const consumeCustomerPoints = async (
  CustomerId: string, points: number
): Promise<number> => {
  const customerPoints = await CustomerPoints.findOneAndUpdate(
    { customerId: CustomerId },
    { $inc: { points: -points }, lastUpdated: new Date() },
    { new: true }
  ).exec();

  return customerPoints ? customerPoints.points ?? 0 : 0;
};

/**
 * Handle customer creation event.
 * @param payload - The payload of the customer created event.
 */
export const handleCustomerCreated = async (
  payload: { CustomerId: string }
): Promise<void> => {
  await new CustomerPoints({ customerId: payload.CustomerId, points: 0 }).save();
};

/**
 * Handle customer deletion event.
 * @param payload - The payload of the customer deleted event.
 */
export const handleCustomerDeleted = async (
  payload: { CustomerId: string }
): Promise<void> => {
  await CustomerPoints.deleteOne({ customerId: payload.CustomerId }).exec();
};

/**
 * Handle order placed event.
 * @param payload - The payload of the order placed event.
 */
export const handleOrderCreation = async (
  payload: { CustomerId: string; TotalOrderAmount: number; OrderId: string }
): Promise<void> => {
  const pointsEarned = Math.floor(payload.TotalOrderAmount / 50);
  await addCustomerPoints(payload.CustomerId, pointsEarned);
};
