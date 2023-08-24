import React, { PropsWithChildren } from "react";
import { render, RenderResult } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { initialState as initialUserEventsState } from "../modules/user-events";

import store, { AppState, rootReducer } from "..";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<AppState>;
  // Use your store type instead of AppStore if you have a different type
  store?: typeof store;
}

type CustomRenderResult = RenderResult & {
  store: typeof store;
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { userEvents: initialUserEventsState },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): CustomRenderResult {
  function Wrapper({ children }: PropsWithChildren<React.ReactNode>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  const customResult: CustomRenderResult = {
    ...renderResult,
    store,
  };

  return customResult;
}
