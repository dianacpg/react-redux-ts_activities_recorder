import { startRecorder, stopRecorder, recorderReducer } from './';

describe('recorder module', () => {
  const initialState = {
    dateStart: 'some date',
  };

  it(`should add new date when start recorder`, () => {
    const action = startRecorder();
    const newState = recorderReducer(initialState, action);

    const expectedDate = new Date().toISOString().slice(0, 19); // Remove milliseconds from the expected date
    const receivedDate = newState.dateStart.slice(0, 19); // Remove milliseconds from the received date

    expect(receivedDate).toEqual(expectedDate);
  });

  it(`should empty string date when stop recorder`, () => {
    const action = stopRecorder();
    const newState = recorderReducer(initialState, action);

    expect(newState.dateStart).toEqual('');
  });
});
