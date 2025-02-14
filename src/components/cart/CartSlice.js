import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from 'redux-persist';

export const cartCall = createAsyncThunk(
    'cart/items',
    async ({ token }) => {
        try {
            const response = await axios.get('http://localhost:4000/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data.items
        }
        catch (e) {
            console.log(e);
            throw e
        }
    }
)

export const checkout = createAsyncThunk(
    'cart/checkout',
    async (token) => {
        try {
            const response = await axios.post('http://localhost:4000/cart/checkout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response
        }
        catch (e) {
            console.log(e);
            throw e
        }
    }
)
export const updateQuantity = createAsyncThunk(
    'cart/quantity',
    async ({ id, quantity, token }) => {
        try {
            const response = await axios.put(`http://localhost:4000/cart/item/${id}`, {
                quantity: quantity
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            return response
        }
        catch (e) {
            console.log(e)
            throw e
        }
    }
)

export const deleteItem = createAsyncThunk(
    'cart/delete',
    async ({ id, token }) => {
        try {
            const response = await axios.delete(`http://localhost:4000/cart/item/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
);

const initialState = {
    cartItems: [],
    hasError: false,
    isLoading: false,
    checkoutSuccess: false,
    cartChanged: false
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(cartCall.pending, (state, aciton) => {
            state.isLoading = true;
            state.hasError = false;
        })
            .addCase(cartCall.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(cartCall.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.cartChanged = false;
                state.cartItems = action.payload
            })
            .addCase(checkout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkout.rejected, (state, action) => {
                state.hasError = true;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                return initialState
            })
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.hasError = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.cartChanged = true;
                const updatedItem = action.payload;
                const index = state.cartItems.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.cartItems[index] = updatedItem;
                }
            })
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.hasError = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.cartChanged = true;
            })
            .addCase(PURGE, (state) => {
                return initialState
            })
    }
})

export const selectcartItems = (state) => state.cart.cartItems;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectHasError = (state) => state.cart.hasError;
export const selectCheckoutSuccess = (state) => state.cart.checkoutSuccess;
export const selectCartChanged = (state) => state.cart.cartChanged;


export default CartSlice.reducer