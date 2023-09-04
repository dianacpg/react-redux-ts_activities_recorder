// Redux
import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
  isPending,
  isFulfilled,
} from "@reduxjs/toolkit";
// Types
import { UserEvent } from "../../../lib/services";
// API
import * as API from "../../../lib/services";

/** STATE */
export interface UserEventsState {
  /** All user events organized by id */
  byIds: Record<UserEvent["id"], UserEvent>;
  /** An array containing IDs of all user events. */
  allIds: UserEvent["id"][];
  /** Indicates whether an action is in progress. */
  loading?: boolean;
}

/** INITIAL STATE */
export const initialState: UserEventsState = { byIds: {}, allIds: [] };

/** ACTIONS */

/**
 * Fetches user events.
 * @example
 * dispatch(fetchUserEvents());
 */
export const fetchUserEvents = createAsyncThunk("userEvents/load", async () => {
  try {
    const events = await API.getUserEvents();
    return events;
  } catch (e) {
    throw new Error("Failed to load events.");
  }
});

/**
 * Creates new user event .
 * @example
 * dispatch(createUserEvent());
 */

export const createUserEvent = createAsyncThunk<UserEvent, { dateStart: string }>(
  "userEvents/create",
  async ({ dateStart }) => {
    try {
      const end = new Date();
      const start = new Date(dateStart);

      const event: Omit<UserEvent, "id"> = {
        title: "No name",
        dateStart,
        dateEnd: end.toISOString(),
        durationMS: end.getTime() - start.getTime(),
      };

      const createdEvent = await API.createUserEvent(event);

      return createdEvent;
    } catch (e) {
      throw new Error("Failed to create event.");
    }
  }
);

/**
 * Deletes user event by its ID.
 * @example
 * dispatch(deleteUserEvent(event.id));
 */

export const deleteUserEvent = createAsyncThunk(
  "userEvents/delete",
  async (id: UserEvent["id"]) => {
    try {
      await API.deleteUserEvent(id);
    } catch (e) {
      throw new Error("Failed to delete event.");
    }

    return id;
  }
);

/**
 * Updates user event title by its id.
 * @example
 * dispatch(updateUserEvent({
 * id, dto
 * }));
 */

export const updateUserEvent = createAsyncThunk(
  "userEvents/update",
  async ({ id, dto }: API.UpdateUserEventDto) => {
    const updatedEvent = await API.updateUserEvent({ id, dto });
    return updatedEvent;
  }
);

/** REDUCER */

export const userEventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserEvents.fulfilled, (state, action: PayloadAction<UserEvent[]>) => {
      state.loading = false;
      const events = action.payload;
      state.allIds = events.map(({ id }) => id);
      state.byIds = events.reduce<UserEventsState["byIds"]>((byIds, event) => {
        byIds[event.id] = event;
        return byIds;
      }, {});
    })
    .addCase(createUserEvent.fulfilled, (state, action: PayloadAction<UserEvent>) => {
      const event = action.payload;
      state.allIds.push(event.id);
      state.byIds[event.id] = event;
    })
    .addCase(deleteUserEvent.fulfilled, (state, action: PayloadAction<UserEvent["id"]>) => {
      const id = action.payload;
      delete state.byIds[id];
      state.allIds = state.allIds.filter((storedId) => storedId !== id);
    })
    .addCase(updateUserEvent.fulfilled, (state, action: PayloadAction<UserEvent>) => {
      const updatedEvent = action.payload;
      state.byIds[updatedEvent.id] = updatedEvent;
    })
    // Loading start for all pending actions
    .addMatcher(isPending, (state) => {
      state.loading = true;
    })
    // Loading stop for all fulfilled actions
    .addMatcher(isFulfilled, (state) => {
      state.loading = false;
    });
});
