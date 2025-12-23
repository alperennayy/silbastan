import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/* ================= ASYNC ================= */
export const createShop = createAsyncThunk(
  "shop/createShop",
  async (formData, { rejectWithValue }) => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shops/create`,
        formData,
        {
          withCredentials: true, // ✅ token gönderiliyor
        }
      );
      console.log(response)
      return response.data;

    } catch (error) {

      return rejectWithValue("Shop eklenemedi");
    }
  }
);

/* ================= SLICE ================= */
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    resetShopState: state => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createShop.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShop.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetShopState } = shopSlice.actions;
export default shopSlice.reducer;
