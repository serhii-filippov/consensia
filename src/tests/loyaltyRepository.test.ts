import { connect, disconnect } from 'mongoose';
import { getCustomerPoints, addCustomerPoints, consumeCustomerPoints, handleCustomerCreated } from '../repositories/loyaltyRepository';
import CustomerPoints from '../models/customerPoints';

beforeAll(async () => {
  await connect('mongodb://root:example@localhost:27017/loyalty?authSource=admin');
});

afterAll(async () => {
  await CustomerPoints.deleteMany({});
  await disconnect();
});

describe('Loyalty Repository', () => {
  test('handleCustomerCreated creates a new customer with 0 points', async () => {
    const CustomerId = '123';
    await handleCustomerCreated({ CustomerId });
    const points = await getCustomerPoints(CustomerId);
    expect(points).toBe(0);
  });

  test('addCustomerPoints adds points to a customer', async () => {
    const CustomerId = '456';
    await handleCustomerCreated({ CustomerId });
    await addCustomerPoints(CustomerId, 10);
    const points = await getCustomerPoints(CustomerId);
    expect(points).toBe(10);
  });

  test('consumeCustomerPoints consumes points from a customer', async () => {
    const CustomerId = '789';
    await handleCustomerCreated({ CustomerId });
    await addCustomerPoints(CustomerId, 20);
    const newPoints = await consumeCustomerPoints(CustomerId, 10);
    expect(newPoints).toBe(10);
  });
});