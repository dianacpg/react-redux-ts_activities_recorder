// Store
import { AppState } from '../store';
import { UserEvent } from '../../../lib/services';
import { groupEventsByDay } from '../../../lib/utils/group-events-by-day';

export type GroupedEvents = Record<string, UserEvent[]>;

export interface GroupedEventsData {
  groupedEvents: GroupedEvents | undefined;
  sortedGroupKeys?: string[];
}

/**
 * Selects and returns grouped user events by the same day of the month and
 * sorted days of the month.
 *
 * @param {AppState} state - The application state object.
 * @returns {GroupedEventsData | undefined} - An object containing grouped user events and sorted group keys, if available.
 *
 * @example
 * // Usage within Redux mapStateToProps or similar:
 * const mapStateToProps = (state) => {
 *   const events = useSelector(selectGroupedEvents);
 *
 */

export const selectGroupedEvents = (
  state: AppState
): GroupedEventsData | undefined => {
  const events = state.userEvents.allIds.map(
    (id) => state.userEvents.byIds[id]
  );

  let groupedEvents: GroupedEvents | undefined;
  let sortedGroupKeys: string[] | undefined;
  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return { groupedEvents, sortedGroupKeys };
};
