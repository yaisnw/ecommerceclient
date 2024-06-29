import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { PURGE } from 'redux-persist';

export const loginCall = createAsyncThunk(
    'login/call',
    async ({ username, password }, thunkAPI) => {
        console.log('Thunk started');
        try {
            const response = await axios.post("https://ecommercebackend-plha.onrender.com/login", {
                username,
                password
            });
            console.log('Thunk successful');
            return response.data;
        } catch (e) {
            console.log('Thunk failed');
            if (e.response.status === 401) {
                throw new Error("User not found");
            } else if (e.response.status === 402) {
                throw new Error("Incorrect password");
            }
            throw e;
        }
    }
);


const initialState = {
    username: "",
    password: "",
    token: "",
    error: "",
    isLoading: false,
    hasError: false,
};


export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        addUsername: (state, action) => {
            state.username = action.payload;
        },
        addPassword: (state, action) => {
            state.password = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setisLoggedin: (state, action) => {
            state.isLoggedin = true
        },
        logout: state => {
            state.token = '';
            state.isLoggedin = false;
            state.expirationTime = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loginCall.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            }
        )
            .addCase(
                loginCall.rejected, (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                    state.error = action.error.message
                }
            )
            .addCase(
                loginCall.fulfilled, (state, action) => {
                    state.isLoggedin = true;
                    state.token = action.payload;
                    state.isLoading = false;
                    state.hasError = false;
                }
            )
            .addCase(PURGE, (state) => {
                return initialState;
            });

    }
})

export const selectUsername = (state) => state.login.username;
export const selectPassword = (state) => state.login.password;
export const selectToken = (state) => state.login.token;
export const selectisLoggedin = (state) => state.login.isLoggedin;
export const selectisLoading = (state) => state.login.isLoading;
export const selectError = (state) => state.login.error;

export const {
    addUsername,
    addPassword,
    setError,
    setisLoggedin
} = loginSlice.actions

export default loginSlice.reducer;