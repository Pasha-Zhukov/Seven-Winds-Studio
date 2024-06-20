import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./redux.types";

const initialState: AppState = {
  disableButton: false,
  dataList: [],
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    disableButton: (state, action) => {
      state.disableButton = action.payload;
    },
    dataList: (state, action) => {
      state.dataList = action.payload;
    },
  },
});

export const { disableButton, dataList } = appStateSlice.actions;
export default appStateSlice.reducer;
