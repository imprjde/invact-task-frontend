import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";

// Async thunk to fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wishlist/getWishlist/${id}`
      );
      console.log("MY WISHLIST", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create wishlist
export const createWishlist = createAsyncThunk(
  "wishlist/createWishlist",
  async (wishlistData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/wishlist/createWishlist`,
        wishlistData
      );
      console.log("New Create Wishlist API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create Wishlist API Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/wishlist/deleteWishlist/${id}`
      );
      console.log("Delete Wishlist API Response:", response.data);
      return id; // Return the id of the deleted wishlist
    } catch (error) {
      console.error("Delete Wishlist API Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update movie
export const updateWishlist = createAsyncThunk(
  "wishlist/updateMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/wishlist/updateWishlist/${movieData._id}`,
        movieData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Update Movie API Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedWishlist = state.wishlist.data.filter(
          (movie) => movie._id !== action.payload
        );
        state.wishlist = { ...state.wishlist, data: updatedWishlist };
        console.log("Updated Wishlist:", state.wishlist);
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
