// Redux
import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
// Types
import { AppState } from '../../';
import { UserEvent } from '../../../../lib/services';
// API
import * as API from '../../../../lib/services';

/** STATE */
export interface UserEventsState {
  /** All user events organized by id */
  byIds: Record<UserEvent['id'], UserEvent>;
  /** An array containing IDs of all user events. */
  allIds: UserEvent['id'][];
  /** Indicates whether an action is in progress. */
  loading?: boolean;
}

/** INITIAL STATE */
const initialState: UserEventsState = { byIds: {}, allIds: [] };

/** ACTIONS */

/**
 * Fetches user events.
 * @example
 * dispatch(fetchUserEvents());
 */
export const fetchUserEvents = createAsyncThunk('userEvents/load', async () => {
  try {
    const events = await API.getUserEvents();
    return events;
  } catch (e) {
    throw new Error('Failed to load events.');
  }
});

/**
 * Creates new user event .
 * @example
 * dispatch(createUserEvent());
 */

export const createUserEvent = createAsyncThunk<
  UserEvent,
  undefined,
  {
    state: AppState;
  }
>('userEvents/create', async (_, { getState }) => {
  try {
    const dateStart = getState().recorder.dateStart;
    const event: Omit<UserEvent, 'id'> = {
      title: 'No name',
      dateStart,
      dateEnd: new Date().toISOString(),
    };

    const createdEvent = await API.createUserEvent(event);

    return createdEvent;
  } catch (e) {
    throw new Error('Failed to create event.');
  }
});

/**
 * Deletes user event by its ID.
 * @example
 * dispatch(deleteUserEvent(event.id));
 */

export const deleteUserEvent = createAsyncThunk(
  'userEvents/delete',
  async (id: UserEvent['id']) => {
    try {
      await API.deleteUserEvent(id);
    } catch (e) {
      throw new Error('Failed to delete event.');
    }

    return id;
  }
);

/**
 * Updates user event.
 * @example
 * dispatch(updateUserEvent({
 * ...event,
 * title
 * }));
 */

export const updateUserEvent = createAsyncThunk(
  'userEvents/update',
  async (event: UserEvent) => {
    const updatedEvent = await API.updateUserEvent(event);
    return updatedEvent;
  }
);

/** REDUCER */

export const userEventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchUserEvents.fulfilled,
      (state, action: PayloadAction<UserEvent[]>) => {
        state.loading = false;
        const events = action.payload;
        state.allIds = events.map(({ id }) => id);
        state.byIds = events.reduce<UserEventsState['byIds']>(
          (byIds, event) => {
            byIds[event.id] = event;
            return byIds;
          },
          {}
        );
      }
    )
    .addCase(
      createUserEvent.fulfilled,
      (state, action: PayloadAction<UserEvent>) => {
        const event = action.payload;
        state.allIds.push(event.id);
        state.byIds[event.id] = event;
      }
    )
    .addCase(
      deleteUserEvent.fulfilled,
      (state, action: PayloadAction<UserEvent['id']>) => {
        const id = action.payload;
        delete state.byIds[id];
        state.allIds = state.allIds.filter((storedId) => storedId !== id);
      }
    )
    .addCase(
      updateUserEvent.fulfilled,
      (state, action: PayloadAction<UserEvent>) => {
        const updatedEvent = action.payload;
        state.byIds[updatedEvent.id] = updatedEvent;
      }
    )
    // Loading start for all pending actions
    .addMatcher(isPending, (state) => {
      state.loading = true;
    })
    // Loading stop for all fulfilled actions
    .addMatcher(isFulfilled, (state) => {
      state.loading = false;
    });
});
