import cron from 'node-cron';
import CustomerPoints from '../models/customerPoints';
import Orders from '../models/Orders';
import logger from '../utils/logger';

/**
 * Cron job to expire loyalty points older than 6 months.
 */
const cleanUpExpiredPointsCron = cron.schedule('0 0 * */6 *', async () => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = Promise.allSettled([
      await CustomerPoints.deleteMany({
        lastUpdated: { $lt: sixMonthsAgo },
      }),
      await Orders.deleteMany({
        createdAt: { $lt: sixMonthsAgo },
      }),
    ])
    logger.info(`Result of expired orders and loyalty points clean up: ${JSON.stringify(result)}`);
  } catch (error) {
    logger.error('Error expiring loyalty points:', error);
  }
});

export default cleanUpExpiredPointsCron;