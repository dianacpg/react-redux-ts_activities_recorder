// Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Types
import { AppDispatch, AppState } from '.';

/**
 * Custom hook to select state from the Redux store with TypeScript typings.
 * @example
 * const selectedValue = useAppSelector(state => state.someSlice.someValue);
 */

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

/**
 * Custom hook to get the dispatch function from the Redux store.
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(someAction());
 */

export const useAppDispatch: () => AppDispatch = useDispatch;
