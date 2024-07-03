import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice";
import authSlice from "../redux/authSlice";
import wishlistSlice from "../redux/wishlistSlice";
import movieDetailSlice from "../redux/movieDetailSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    wishlist: wishlistSlice,
    selectedMovie: movieDetailSlice,
  },
});
