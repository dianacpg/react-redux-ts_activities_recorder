import { addZero } from './add-zero';

/**
 * Creates a date key in the format 'YYYY-MM-DD' based on the provided date.
 *
 * @param {Date} date - The date for which the key is to be created.
 * @returns {string} The date key in the format 'YYYY-MM-DD'.
 */

export const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  return `${year}-${addZero(month)}-${addZero(day)}`;
};
