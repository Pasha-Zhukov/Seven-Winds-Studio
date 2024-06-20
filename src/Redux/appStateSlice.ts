import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    disableButton: false,
    dataList: [],
  },
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
