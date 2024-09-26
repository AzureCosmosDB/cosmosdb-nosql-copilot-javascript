// server/src/utils/retryWrapper.ts
import axios from 'axios';
import logger from './logger';

/**
 * Wraps a function in a retry mechanism to handle transient errors.
 * Only retries errors with a 500 status code or higher.
 * @param fn The function to wrap.
 * @param maxRetries The maximum number of retries. Defaults to 3.
 * @param delay The delay in milliseconds between retries. Defaults to 1000.
 * @returns The result of the wrapped function, or an error if all retries fail.
 */
export const retryWrapper = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (axios.isAxiosError(error) && error.response && error.response.status >= 500) {
        logger.warn(`Retrying after error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
};
