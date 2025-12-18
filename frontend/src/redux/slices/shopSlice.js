// redux/slices/shopSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shops } from "../../assets/assets";

// 🔥 ASYNC THUNK
export const fetchShopData = createAsyncThunk(
    "shop/fetchShopData",
    async (shopId, { rejectWithValue }) => {
        try {
            // 🔴 ŞU AN assets
            const shop = shops.find(shop => shop._id === shopId);

            if (!shop) {
                return rejectWithValue("Shop bulunamadı");
            }

            return shop;

            // 🟢 BACKEND GELİNCE SADECE BURASI DEĞİŞECEK
            // const res = await axios.get(`/api/shops/${shopId}`)
            // return res.data

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
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
            });
    }
});

export default shopSlice.reducer;
