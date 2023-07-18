import { Action } from 'redux';
import { RootState } from './store';
import { createReducer } from '@reduxjs/toolkit';

interface RecorderState {
  dateStart: string;
}

const START = 'recorder/start';
const STOP = 'recorder/stop';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

export const start = (): StartAction => ({
  type: START,
});

export const stop = (): StopAction => ({
  type: STOP,
});

export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) =>
  selectRecorderState(rootState).dateStart;

const initialState: RecorderState = {
  dateStart: '',
};

const recorder = createReducer(initialState, {
  [START]: (state) => ({ ...state, dateStart: new Date().toISOString() }),
  [STOP]: (state) => ({ ...state, dateStart: '' }),
});

export default recorder;
