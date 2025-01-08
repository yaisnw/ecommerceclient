import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductById = createAsyncThunk(
    'productDetail/productbyid',
    async ({ id, token }) => {
        try {
            const response = await axios.get(`http://localhost:4000/products/${id}`, {
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
    'productDetail/addtocart',
    async ({ id, quantity, token }) => {
        try {
            await axios.post('http://localhost:4000/cart/item', {
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

export const getFilteredProducts = createAsyncThunk(
    'productDetail/getFilteredProducts',
    async ({id, category, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:4000/products/category?category=${category}&id=${id}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
        catch (e) {
            if (e.response) {
                return rejectWithValue(e.response.data.msg);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)

const ProductDetailSlice = createSlice({
    name: "productDetail",
    initialState: {
        product: {},
        filteredProducts: [],
        isLoading: false,
        error: '',
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
            .addCase(getFilteredProducts.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getFilteredProducts.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                console.log('Filtered Products:', action.payload);
                state.isLoading = false;
                state.error = '';
                state.filteredProducts = action.payload
            })
    }

})

export const selectProductDetail = (state) => state.productDetail.product;
export const selectQuantity = (state) => state.productDetail.quantity;
export const selectAddedToCart = (state) => state.productDetail.addedToCart;
export const selectFilteredProducts = (state) => state.productDetail.filteredProducts

export const { setQuantity, setAddedToCart } = ProductDetailSlice.actions

export default ProductDetailSlice.reducer;