import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./components/signup/userSlice";
import loginReducer from "./components/signup/loginSlice";
import productsReducer from "./components/products/ProductsSlice";
import productDetailReducer from "./components/cro/ProductDetailSlice";
import cartReducer from "./components/cart/CartSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE', 'persist/REGISTER'],
            },
        }),
});

export const persistor = persistStore(store);
