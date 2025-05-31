import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";
import API_URL from "../../api";

export const signup = createAsyncThunk(
  'user/signup',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/accounts/signup`, {
        username,
        password
      });
      return response.data;
    } catch (e) {
      console.log('Thunk failed');
      if (e.response) {
        return rejectWithValue(e.response.data.msg);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const initialState = {
  error: "",
  isLoading: false,
  isSignedup: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signout: state => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      signup.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      }
    )
      .addCase(
        signup.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        signup.fulfilled, (state) => {
          state.isSignedup = true;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(PURGE, (state) => {
        return initialState;
      });
  }
});

export const selectisSignedup = (state) => state.user.isSignedup;
export const selectError = (state) => state.user.error;
export const selectisLoading = (state) => state.user.isLoading;

export const { signout } = userSlice.actions;

export default userSlice.reducer;
