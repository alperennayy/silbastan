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
      console.error("Slice Hatası:", error.response ?.data);
      return rejectWithValue(error.response ?.data ?.message || "Shop eklenemedi");
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
      return rejectWithValue(error.response ?.data ?.message || "Mağaza yüklenemedi");
    }
  }
);
/* ================= UPDATE SHOP ================= */
export const updateShop = createAsyncThunk(
  "shop/updateShop",
  async ({
    id,
    formData
  }, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/shops/update/${id}`,
        formData, {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Güncelleme başarısız");
    }
  }
);

/* ================= DELETE SHOP ================= */
export const deleteShop = createAsyncThunk(
  "shop/deleteShop",
  async (id, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/shops/delete/${id}`, {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ?.data ?.message || "Silme başarısız");
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
    setVendorShop: (state, action) => {
      state.vendorShop = action.payload;
    },
    clearVendorShop: (state) => {
      state.vendorShop = null;
    },
    resetShopState: (state) => {
      state.loading = false;
      state.error = null;
    },
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

      .addCase(updateShop.pending, (state) => {
    state.loading = true;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload.success) {
              state.vendorShop = action.payload.shop; // State'i yeni gelen veriyle güncelle
          }
      })
      .addCase(deleteShop.fulfilled, (state) => {
          state.loading = false;
          state.vendorShop = null; // Mağaza silindiği için null'a çekiyoruz, Add.jsx formu otomatik açılır
      });
  },
});

export const {
  resetShopState,
  setVendorShop,
  clearVendorShop
} = shopSlice.actions;
export default shopSlice.reducer;