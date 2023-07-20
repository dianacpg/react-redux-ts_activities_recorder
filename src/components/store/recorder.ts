import { AppState } from './store';
import { createAction, createReducer } from '@reduxjs/toolkit';
interface RecorderState {
  dateStart: string;
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
  builder.addCase(stopRecorder, () => initialState);
});

export const selectRecorderState = (AppState: AppState) => AppState.recorder;

export const selectDateStart = (AppState: AppState) =>
  selectRecorderState(AppState).dateStart;
