import { createAction, createReducer, isPending, isFulfilled } from "@reduxjs/toolkit";

interface RecorderState {
  /** Start date of the recorder */
  dateStart: string;
  /**  Indicates whether an action is in progress. */
  loading?: boolean;
}

/** INITIAL STATE */

export const initialState: RecorderState = {
  dateStart: "",
};

/** ACTIONS */

/** Start Recorder
 * @example
 * dispatch(startRecorder());
 */
export const startRecorder = createAction("recorder/start");

/** Stop Recorder
 * @example
 * dispatch(stopRecorder());
 */
export const stopRecorder = createAction("recorder/stop");

/** REDUCER */

export const recorderReducer = createReducer(initialState, (builder) => {
  builder.addCase(startRecorder, (state) => {
    // Add new date when start recording
    state.dateStart = new Date().toISOString();
  });
  builder
    // Remove date when stop recorder
    .addCase(stopRecorder, () => initialState)
    // Loading start for all pending actions
    .addMatcher(isPending, (state) => {
      state.loading = true;
    })
    // Loading stop for all fulfilled actions
    .addMatcher(isFulfilled, (state) => {
      state.loading = false;
    });
});
