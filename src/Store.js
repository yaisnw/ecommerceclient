import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/signup/userSlice";
import loginReducer from "./components/signup/loginSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer
    }
})
