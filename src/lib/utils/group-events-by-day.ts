import { UserEvent } from '../services';
import { createDateKey } from './create-date-key';

/**
 * Adds an event to the group corresponding to the given date key.
 *
 * @param {string} dateKey - The date key for grouping events (in the format 'YYYY-MM-DD').
 * @param {UserEvent} event - The UserEvent object to be added to the group.
 * @param {Record<string, UserEvent[]>} groups - groups where event is being injected
 */

// Adds an event to the group corresponding to the given date key.
const addToGroup = (
  dateKey: string,
  event: UserEvent,
  groups: Record<string, UserEvent[]>
) => {
  if (groups[dateKey] === undefined) {
    groups[dateKey] = [];
  }

  groups[dateKey].push(event);
};

/**
 * Groups an array of UserEvent objects by day based on their dateStart and dateEnd properties.
 *
 * @param {UserEvent[]} events - An array of UserEvent objects to be grouped.
 * @returns {Record<string, UserEvent[]>} An object with date keys as properties and arrays of UserEvent objects as values.
 */

export const groupEventsByDay = (
  events: UserEvent[]
): Record<string, UserEvent[]> => {
  const groups: Record<string, UserEvent[]> = {};

  events.forEach((event) => {
    const dateStartKey = createDateKey(new Date(event.dateStart)).fullDate;
    const dateEndKey = createDateKey(new Date(event.dateEnd)).fullDate;

    addToGroup(dateStartKey, event, groups);

    if (dateEndKey !== dateStartKey) {
      addToGroup(dateEndKey, event, groups);
    }
  });

  return groups;
};
