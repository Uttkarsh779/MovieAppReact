import { configureStore } from "@reduxjs/toolkit";
import Movie from "../Components/Movie";
import { movieSlice } from "./reducers/movieSlice";
import { TvSlice } from "./reducers/TvSlice";
import { personSlice } from "./reducers/personSlice";

export const store = configureStore({
  reducer: {
    Movie: movieSlice.reducer,
    Tv: TvSlice.reducer,
    People: personSlice.reducer,
  },
});
