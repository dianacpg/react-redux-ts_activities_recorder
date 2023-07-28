import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { selectDateStart } from '../recorder';
import { UserEvent } from '../../../../lib/services';
import * as API from '../../../../lib/services';

export interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
  loading?: boolean;
}

const initialState: UserEventsState = { byIds: {}, allIds: [] };

export const fetchUserEvents = createAsyncThunk('userEvents/load', async () => {
  try {
    const events = await API.getUserEvents();
    return events;
  } catch (e) {
    throw new Error('Failed to load events.');
  }
});

export const createUserEvent = createAsyncThunk<
  UserEvent,
  undefined,
  {
    state: AppState;
  }
>('userEvents/create', async (_, { getState }) => {
  try {
    const dateStart = selectDateStart(getState());
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

export const updateUserEvent = createAsyncThunk(
  'userEvents/update',
  async (event: UserEvent) => {
    const updatedEvent = await API.updateUserEvent(event);
    return updatedEvent;
  }
);

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

export const selectUserEventsState = (AppState: AppState) =>
  AppState.userEvents;
export const selectUserEventsArray = (AppState: AppState) => {
  const state = selectUserEventsState(AppState);
  return state.allIds.map((id) => state.byIds[id]);
};
