import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* FETCH CLIENT DATA */
export const fetchClientData = createAsyncThunk(
    "user/fetchClientData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/client/data`,
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientData.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.success) {
                    state.user = action.payload.clientData;
                } else {
                    state.user = null;
                }
            })
            .addCase(fetchClientData.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;