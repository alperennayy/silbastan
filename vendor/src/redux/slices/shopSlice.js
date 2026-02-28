import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

/* ================= ASYNC ================= */
export const createShop = createAsyncThunk(
  "shop/createShop",
  async (formData, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shops/create`,
        formData, {
        withCredentials: true, // Cookie tabanlı auth için şart
      }
      );

      // Backend'den gelen veriyi tam burada kontrol ediyoruz
      console.log("Backend'den Gelen Ham Veri:", response.data);
      return response.data;

    } catch (error) {
      console.error("Slice Hatası:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Shop eklenemedi");
    }
  }
);
export const fetchVendorShop = createAsyncThunk(
  "shop/fetchVendorShop",
  async (_, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shops/my-shop`, // Bu endpoint backend'de olmalı
        {
          withCredentials: true
        }
      );
      return response.data; // { success: true, shop: {...} } döndüğünü varsayıyoruz
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Mağaza yüklenemedi");
    }
  }
);


/* ================= SLICE ================= */
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    loading: false,
    error: null,
    vendorShop: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;


        if (action.payload && action.payload.success) {
          state.vendorShop = action.payload.shop;
          console.log("Redux State Güncellendi:", state.vendorShop);
        }
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // extraReducers içine ekle
      .addCase(fetchVendorShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorShop.fulfilled, (state, action) => {
        state.loading = false; // İşlem bitince loading'i kapat
        if (action.payload && action.payload.success) {
          state.vendorShop = action.payload.shop;
        }
      })
      .addCase(fetchVendorShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { } = shopSlice.actions;
export default shopSlice.reducer;