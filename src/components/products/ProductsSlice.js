import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../api";
export const productsCall = createAsyncThunk(
    'products/call',
    async (token, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://${API_URL}/products`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return response.data
        }
        catch (e) {
            console.log('Thunk failed');
            if (e.response) {
                return rejectWithValue(e.response.data.msg); 
            }
            return rejectWithValue("An unknown error occurred");
        }

    }
)


const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        isLoading: false,
        hasError: false,
        error: ''
    },
    reducers: {
        addProducts: () =>{

        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            productsCall.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            }
        )
        .addCase(
            productsCall.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.error = action.error.message
            }
        )
        .addCase( 
            productsCall.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.allProducts = action.payload;
            }
        )
    }
})

export const selectAllProducts = (state) => state.products.allProducts;
export const selectProducts = (state) => state.products;

export default ProductsSlice.reducer;