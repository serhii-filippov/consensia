import cron from 'node-cron';
import CustomerPoints from '../models/customerPoints';
import logger from '../utils/logger';

/**
 * Cron job to expire loyalty points older than 6 months.
 */
const cleanUpExpiredPointsCron = cron.schedule('0 0 * 1/6 *', async () => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = await CustomerPoints.deleteMany({
      lastUpdated: { $lt: sixMonthsAgo },
    });

    logger.info(`Expired ${result.deletedCount} loyalty points.`);
  } catch (error) {
    logger.error('Error expiring loyalty points:', error);
  }
});

export default cleanUpExpiredPointsCron;