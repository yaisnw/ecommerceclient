import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const loginCall = createAsyncThunk(
    'login/call',
    async ({ username, password }) => {
        try {
            const response = await axios.post("http://localhost:4000/login", {
                username: username,
                password: password
            })
            return response.data
        }
        catch (e) {
            if (e.response.status === 404) {
                throw new Error("user not found")
            }
            else if (e.response.status === 401) {
                throw new Error("incorrect password")
            }
            throw e
        }
    }
)



export const loginSlice = createSlice({
    name: "login",
    initialState: {
        username: "",
        password: "",
        error: "",
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
            state.error = action.payload;
        }
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
                    state.isLoading = false;
                    state.hasError = false;
                }
            ) 
    }
})

export const selectUsername = (state) => state.login.username;
export const selectPassword = (state) => state.login.password;
export const selectisLoggedin = (state) => state.login.isLoggedin;
export const selectisLoading = (state) => state.login.isLoading;
export const selectError = (state) => state.login.error;

export const {
    addUsername,
    addPassword,
    setError
} = loginSlice.actions

export default loginSlice.reducer;