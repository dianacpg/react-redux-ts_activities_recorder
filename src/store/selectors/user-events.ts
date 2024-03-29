// Types
import { AppState } from "..";
import { UserEvent } from "../../lib/services";
// Utils
import { groupEventsByDay } from "../../lib/utils/group-events-by-day";

export type GroupedEvents = Record<string, UserEvent[]>;

export interface GroupedEventsData {
  /** Grouped user events organized by date. */
  groupedEvents: GroupedEvents | undefined;
  /** Optional array of strings representing sorted group keys (dates) from most recent to least recent. */
  sortedGroupKeys?: string[];
  /** Loading state */
  loading?: boolean;
}

/**
 * Selects and returns grouped user events data from the application state.
 *
 * @param state - The application state object.
 * @returns  An object containing grouped user events and sorted group keys, if available.
 *
 * @example
 * const events = useSelector(selectGroupedEvents);
 */

export const selectGroupedEvents = (state: AppState): GroupedEventsData | undefined => {
  const events = state.userEvents.allIds.map((id) => state.userEvents.byIds[id]);
  const isLoading = state.userEvents.loading;

  let groupedEvents: GroupedEvents | undefined = undefined;
  let sortedGroupKeys: string[] | undefined = undefined;
  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return { groupedEvents, sortedGroupKeys, loading: isLoading };
};
