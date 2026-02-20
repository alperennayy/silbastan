import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerVendor = createAsyncThunk(
    "auth/registerVendor",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/vendor/register`,
                { name, email, password },
                { withCredentials: true }
            );

            return response.data

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const loginVendor = createAsyncThunk(
    "auth/loginVendor",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/vendor/login`,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);

        }
    }
)

export const logoutVendor = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/vendor/logout`,
                {},
                { withCredentials: true }
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginVendor.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            }).addCase(loginVendor.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })
            /* REGISTER */
            .addCase(registerVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerVendor.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(registerVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* LOGOUT */
            .addCase(logoutVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutVendor.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false; // 🔥 çıkış yapıldı
            })
            .addCase(logoutVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
