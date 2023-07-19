import { configureStore } from '@reduxjs/toolkit';
import { recorderReducer } from './recorder';
import userEvents from './user-events';

const rootReducer = {
  recorder: recorderReducer,
  userEvents: userEvents,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
