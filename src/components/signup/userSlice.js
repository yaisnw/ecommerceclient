import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const signup = createAsyncThunk(
    'user/signup',
    async ({ username, password }) => {
        try {
            const response = await axios.post('http://localhost:4000/accounts/signup', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            if (error.response.status === 409) {
                throw new Error("Username is taken")
            }
            throw error; // This will be caught in the rejected action case
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        password: "",
        error: "",
        isLoading: false,
        hasError: false,
        isSignedup: false
    },
    reducers: {
        addUsername: (state, action) => {
            state.username = action.payload;
        },
        addPassword: (state, action) => {
            state.password = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }


    },
    extraReducers: (builder) => {
        builder.addCase(
            signup.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            }
        )
            .addCase(
                signup.rejected, (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                    state.error = action.error.message
                }
            )
            .addCase(
                signup.fulfilled, (state, action) => {
                    state.isSignedup = true;
                    state.isLoading = false;
                    state.hasError = false;
                }
            )
    }
})

export const selectUsername = (state) => state.user.username;
export const selectPassword = (state) => state.user.password;
export const selectisSignedup = (state) => state.user.isSignedup;
export const selectError = (state) => state.user.error;
export const selectisLoading = (state) => state.user.isLoading;
export const selecthasError = (state) => state.user.hasError


export const {
    addUsername,
    addPassword,
    setError,
    removeError
} = userSlice.actions

export default userSlice.reducer;