import { configureStore } from '@reduxjs/toolkit';

import recorder from './recorder';
import userEvents from './user-events';

const rootReducer = {
  recorder: recorder,
  userEvents: userEvents,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
