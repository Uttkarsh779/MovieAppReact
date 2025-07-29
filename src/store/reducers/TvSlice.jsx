import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};
export const TvSlice = createSlice({
  name: "Tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removetv: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadtv, removetv } = TvSlice.actions;
// console.log("load tv", loadtv);

export default TvSlice.reducer;
