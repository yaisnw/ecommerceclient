import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductById = createAsyncThunk(
    'productdetail/productbyid',
    async ({id, token}) => {
        try { 
            const response = await axios.get(`https://ecommercebackend-plha.onrender.com/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
        catch (e) {
            throw e
        }
    }

)

export const addToCart = createAsyncThunk(
    'productdetail/addtocart',
    async ({id, quantity, token}) => {
        try {
            await axios.post('https://ecommercebackend-plha.onrender.com/cart/item', {
                product_id: id,
                quantity: quantity
            }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            )
        }
        catch (e) {
            throw e
        }
    }
)

const ProductDetailSlice = createSlice({
    name: "productdetail",
    initialState: {
        product: {},
        isLoading: false,
        hasError: false,
        quantity: 0,
        addedToCart: false
    },
    reducers: {
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setAddedToCart: (state, action) => {
            state.addedToCart = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getProductById.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            }
        )
            .addCase(
                getProductById.rejected, (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                }
            )
            .addCase(
                getProductById.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.hasError = false;
                    state.product = action.payload;
                }
            )
            .addCase(
                addToCart.pending, (state, action) => {
                    state.isLoading = true;
                    state.hasError = false;
                }
            )
            .addCase(
                addToCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                }
            )
            .addCase(
                addToCart.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.hasError = false;
                    state.addedToCart = true;
                }
            )
    }

})

export const selectProductDetail = (state) => state.productdetail.product;
export const selectQuantity = (state) => state.productdetail.quantity;
export const selectAddedToCart = (state) => state.productdetail.addedToCart;

export const { setQuantity, setAddedToCart } = ProductDetailSlice.actions

export default ProductDetailSlice.reducer;