// Redux
import { configureStore } from "@reduxjs/toolkit";
// Modules
import { userEventsReducer } from "./modules/user-events";

/**
 * Root reducer object that combines all the individual reducers.
 */

export const rootReducer = {
  userEvents: userEventsReducer,
};

/**
 * The Redux store instance configured with the root reducer.
 */

export const store = configureStore({
  reducer: rootReducer,
});

/**
 * The complete type derived state of the application.
 */

export type AppState = ReturnType<typeof store.getState>;

/**
 * The dispatch function type derived from the store.
 */

export type AppDispatch = typeof store.dispatch;

export default store;
