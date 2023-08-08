/**
 * Adds a leading zero to a single-digit number.
 *
 * @param num - The number to which a leading zero is to be added.
 * @returns The number with a leading zero if it is a single-digit number; otherwise, returns the number as is.
 */

export const addZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
