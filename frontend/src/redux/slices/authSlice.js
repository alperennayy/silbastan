import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                { email, password },
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

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        role: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = null;
        },
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
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
