import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                { email, password, role },
                { withCredentials: true }
            );;
            return response.data; // { success, role }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/* REGISTER */
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password, role }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                { name, email, password, role },
                { withCredentials: true }
            );
            return response.data; // { success, role }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
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
        role: null,
        loading: false,
        error: null,
        loggedOut: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            /* LOGIN */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.role = action.payload.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* REGISTER */
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.role = action.payload.role;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGOUT
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false; // 🔥 çıkış yapıldı
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
