import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



export const loginSlice = createSlice({
    name: "login",
    initialState: {
        username: "",
        password: "",
        isLoading: false,
        hasError: false,
        isLoggedin: false
    },
    reducers: {
        addUsername: (state, action) => {
            state.username = action.payload;
        },
        addPassword: (state, action) => {
            state.password = action.payload;
        },
        setError: (state, action) => {
            state.hasError = true;
        },
        removeError: (state, action) => {
            state.hasError = false
        }
    
    },
    // extraReducers: (builder) => {
    //     builder.addCase(
    //         loginSlice.pending, (state, action) => {
    //             state.isLoading = true;
    //             state.hasError = false;
    //         }
    //     )
    //     .addCase(
    //         loginSlice.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.hasError = true;
    //         }
    //     )
    //     .addCase(
    //         loginSlice.fulfilled, (state,action) => {
    //             state.isSignedup = true;
    //             state.isLoading = false;
    //             state.hasError = false;
    //         }
    //     )
    // }
})

export const selectUsername = (state) => state.login.username;
export const selectPassword = (state) => state.login.password;
export const selectisSignedup = (state) => state.login.isSignedup;
export const selecthasError = (state) => state.login.hasError;

export const {
    addUsername,
    addPassword,
    setError,
    removeError
} = loginSlice.actions

export default loginSlice.reducer;