import { configureStore } from '@reduxjs/toolkit';
import { recorderReducer } from './modules/recorder';
import userEvents from './user-events';

const rootReducer = {
  recorder: recorderReducer,
  userEvents: userEvents,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
