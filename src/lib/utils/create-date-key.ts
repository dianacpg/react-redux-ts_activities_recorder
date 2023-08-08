import { addZero } from "./add-zero";

/**
 * Creates a date key in the format 'YYYY-MM-DD' based on the provided date.
 *
 * @param {Date} date - The date for which the key is to be created.
 * @returns {string} The date key in the format 'YYYY-MM-DD'.
 */

interface CreateDateKey {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  fullTime: string;
  fullDate: string;
}

export const createDateKey = (date: Date): CreateDateKey => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  console.log(date, hour, minute);
  const fullDate = `${year}-${addZero(month)}-${addZero(day)}`;
  const fullTime = `${addZero(hour)}:${addZero(minute)}`;

  return { year, month, day, hour, minute, fullDate, fullTime };
};
