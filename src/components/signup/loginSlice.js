import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { PURGE } from 'redux-persist';
import API_URL from "../../api";

export const loginCall = createAsyncThunk(
    'login/call',
    async ({ username, password }, {rejectWithValue} ) => {
        console.log("API_URL:", API_URL);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            });
            console.log('Thunk successful');
            return response.data;
        } catch (e) {
            console.log('Thunk failed');
            console.log(e)
            if (e.response) {
                return rejectWithValue(e.response.data.msg); 
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);



const initialState = {
    token: "",
    error: "",
    isLoading: false,
};


export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {

        logout: state => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loginCall.pending, (state, action) => {
                state.isLoading = true;
                state.error = '';
            }
        )
            .addCase(
                loginCall.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            )
            .addCase(
                loginCall.fulfilled, (state, action) => {
                    state.isLoggedin = true;
                    state.token = action.payload;
                    state.isLoading = false;
                    state.error = '';
                }
            )
            .addCase(PURGE, (state) => {
                return initialState;
            });

    }
})


export const selectToken = (state) => state.login.token;
export const selectisLoading = (state) => state.login.isLoading;
export const selectError = (state) => state.login.error;

export const {
    logout
} = loginSlice.actions

export default loginSlice.reducer;