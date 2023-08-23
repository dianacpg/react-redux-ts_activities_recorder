// Counter in hh:mm:ss style

import { addZero } from "./add-zero";

/**
 * Format seconds to display hours, minutes and seconds.
 *
 * @param num - seconds.
 * @returns seconds in hh:mm:sec style.
 */

export function formatSeconds(seconds: number): string {
  return `${addZero(Math.floor(seconds / 3600))}:${addZero(
    Math.floor((seconds % 3600) / 60)
  )}:${addZero(seconds % 60)}`;
}
