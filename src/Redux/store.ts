import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import appStateReducer from "./appStateSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    appState: appStateReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
