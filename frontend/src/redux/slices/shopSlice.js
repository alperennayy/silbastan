import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// 🔥 ASYNC THUNK
export const fetchShopData = createAsyncThunk(
    "shop/fetchShopData",
    async (shopId, { rejectWithValue }) => {
        try {
            // 🔴 ŞU AN assets
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/shops/${shopId}`)
            return response.data


        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const listShops = createAsyncThunk(
    'shop/listShops',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shops/list`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    shops: [],
    shopData: null,
    loading: false,
    error: null
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //Shop Datayı çekmek için
            .addCase(fetchShopData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShopData.fulfilled, (state, action) => {
                state.loading = false;
                state.shopData = action.payload;
            })
            .addCase(fetchShopData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Mağazaları listelemk için
            .addCase(listShops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listShops.fulfilled, (state, action) => {
                state.loading = false;
                state.shops = action.payload.shops;
                state.error = null;
            })
            .addCase(listShops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
});

export default shopSlice.reducer;
