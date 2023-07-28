import {
  createAction,
  createReducer,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
import { AppState } from '../../store';

interface RecorderState {
  dateStart: string;
  loading?: boolean;
}

const initialState: RecorderState = {
  dateStart: '',
};

export const startRecorder = createAction('recorder/start');
export const stopRecorder = createAction('recorder/stop');

export const recorderReducer = createReducer(initialState, (builder) => {
  builder.addCase(startRecorder, (state) => {
    state.dateStart = new Date().toISOString();
  });
  builder
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

export const selectRecorderState = (AppState: AppState) => AppState.recorder;

export const selectDateStart = (AppState: AppState) =>
  selectRecorderState(AppState).dateStart;
