import {
  processEvent,
  getPointsForCustomer,
} from '../services/loyaltyService';
import { Event } from '../models/event';
import { connect, disconnect } from 'mongoose';
import Orders from '../models/Orders';


beforeAll(async () => {
  await connect('mongodb://root:example@localhost:27017/loyalty?authSource=admin');
});

afterAll(async () => {
  await Orders.deleteMany({});
  await disconnect();
});

describe('Loyalty Service', () => {
  test('processEvent handles CustomerCreated event', async () => {
    const event: Event = {
      EventTime: '2023-11-13T21:03:10Z',
      EventName: 'CustomerCreated',
      EntityName: 'Customer',
      Sequence: 1,
      Payload: { CustomerId: '123' },
    };
    await processEvent(event);

    const points = await getPointsForCustomer('123');
    expect(points).toBe(0);
  });

  const customerId = '814e496d-c6d1-49d5-b30b-359b4f83fa47'
  const orderId = 'c5df8e6f-eee3-4b07-897e-81832b664fc5';
  0
  test('processEvent handles OrderPlaced event', async () => {
    const event: Event = {
      EventTime: '2023-11-13T21:03:10Z',
      EventName: 'OrderPlaced',
      EntityName: 'Order',
      Sequence: 1,
      Payload: { CustomerId: customerId, OrderId: orderId, TotalOrderAmount: 45 },
    };
    await processEvent(event);

    const points = await getPointsForCustomer(customerId);
    expect(points).toBe(0);
  });

  test('processEvent handles OrderCanceled event', async () => {
    
    const event: Event = {
      EventTime: '2023-11-13T21:03:10Z',
      EventName: 'OrderCanceled',
      EntityName: 'Customer',
      Sequence: 1,
      Payload: { OrderId: orderId },
    };
    await processEvent(event);

    const points = await getPointsForCustomer(customerId);
    expect(points).toBe(0);
  });

  test('processEvent handles CustomerDeleted event', async () => {
    const event: Event = {
      EventTime: '2023-11-13T21:03:10Z',
      EventName: 'CustomerDeleted',
      EntityName: 'Customer',
      Sequence: 1,
      Payload: { CustomerId: customerId },
    };
    await processEvent(event);

    const points = await getPointsForCustomer('123');
    expect(points).toBe(0);
  });
});