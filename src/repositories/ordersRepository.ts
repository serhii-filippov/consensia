import Orders,
{
  IOrders,
} from '../models/Orders';

/**
 * Get a customer by the orderId.
 * @param OrderId - The ID of the order.
 * @returns The number of loyalty points.
 */
export const getCustomerByOrderId = async (
    OrderId: string,
): Promise<IOrders[]> => {
  const customerOrders = await Orders.find({ orderId: OrderId }).exec();
  return customerOrders
};

/**
 * Delete the order by it's ID.
 * @param OrderId - The ID of the order.
 */
export const deleteOrder = async (
  OrderId: string,
): Promise<void> => {
  await Orders.deleteOne(
    { orderId: OrderId },
  ).exec();
};

/**
 * Handle order creation event.
 * @param payload - The payload of the customer created event.
 */
export const handleOrderCreation = async (
  payload: { CustomerId: string, OrderId: string, TotalOrderAmount: number }
): Promise<void> => {
  await new Orders({
    customerId: payload.CustomerId,
    orderId: payload.OrderId,
    points: Math.floor(payload.TotalOrderAmount / 50),
}).save();
};

/**
 * Handle customer deletion event.
 * @param payload - The payload of the customer deleted event.
 */
export const handleCustomerDeletion = async (
  payload: { CustomerId: string }
): Promise<void> => {
  const customerOrders = await Orders.find({ customerId: payload.CustomerId }).exec();
  const orderIds = customerOrders.map((order) => order.orderId);
  await Orders.deleteMany({ orderId: { $in: orderIds } }).exec();
};
