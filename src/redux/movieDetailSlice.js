// src/redux/selectedMovieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectedMovieSlice = createSlice({
  name: "selectedMovie",
  initialState: null,
  reducers: {
    setSelectedMovie(state, action) {
      return action.payload;
    },
    clearSelectedMovie() {
      return null;
    },
  },
});

export const { setSelectedMovie, clearSelectedMovie } =
  selectedMovieSlice.actions;

export default selectedMovieSlice.reducer;
