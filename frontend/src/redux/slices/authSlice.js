import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

/* LOGIN */
export const loginClient = createAsyncThunk(
    "auth/loginClient",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/client/login`,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


/* REGISTER */
export const registerClient = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/client/register`,
                { name, email, password },
                { withCredentials: true }
            );
            return response.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutClient = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/client/logout`,
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
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            /* LOGIN */
            .addCase(loginClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginClient.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* REGISTER */
            .addCase(registerClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerClient.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* LOGOUT */
            .addCase(logoutClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutClient.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(logoutClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
