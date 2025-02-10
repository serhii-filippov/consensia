import {
  processEvent,
  getPointsForCustomer,
} from '../services/loyaltyService';
import { Event } from '../models/event';

test('processEvent handles CustomerCreated event', async () => {
  const event: Event = {
    EventTime: '2023-11-13T21:03:10Z',
    EventName: 'CustomerCreated',
    EntityName: 'Customer',
    Sequence: 1,
    Payload: { customerId: '123', name: 'John Doe' },
  };
  await processEvent(event);

  const points = await getPointsForCustomer('123');
  expect(points).toBe(0);
});