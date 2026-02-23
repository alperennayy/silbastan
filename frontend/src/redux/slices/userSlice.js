import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

/* FETCH CLIENT DATA */
export const fetchClientData = createAsyncThunk(
    "user/fetchClientData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${backendUrl}/api/user/client/data`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/* PROFIL GÜNCELLEME */
export const updateClientProfile = createAsyncThunk(
    "user/updateClientProfile",
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/client/update`,
                { name },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/* RANDEVU TAMAMLA (MVP - Statüyü Değiştirir) */
export const randevuTamamla = createAsyncThunk(
    "user/randevuTamamla",
    async (randevuId) => {
        return randevuId; 
    }
);

/* RANDEVU DELETE (MVP) */
export const randevuDelete = createAsyncThunk(
    "user/randevuDelete",
    async (randevuId) => {
        return randevuId; 
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
                    const { name, email } = action.payload.clientData;

                    const mvpRandevular = [
                        { _id: "r1", shopName: "Be-Nice Güzellik Salonu", service: "Saç Kesimi ve Fön", staffName: "Zehra", date: "2026-03-10", time: "14:00", status: "yaklasan" },
                        { _id: "r2", shopName: "Be-Nice Tırnak Studio", service: "Manikür & Pedikür", staffName: "Ayşe", date: "2026-02-28", time: "10:30", status: "yaklasan" },
                        { _id: "r3", shopName: "Be-Nice Cilt Bakım", service: "Hydrafacial", staffName: "Alperen", date: "2026-03-05", time: "16:00", status: "yaklasan" }
                    ];

                    // En yakından en uzağa sıralama
                    const sortedRandevular = mvpRandevular.sort((a, b) => {
                        return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
                    });

                    state.user = { name, email, randevular: sortedRandevular };
                }
            })
            .addCase(randevuTamamla.fulfilled, (state, action) => {
                const randevu = state.user.randevular.find(r => r._id === action.payload);
                if (randevu) {
                    randevu.status = "gecmis"; // Statüyü güncelleyerek sekmeler arası geçişi sağlar
                }
            })
            .addCase(randevuDelete.fulfilled, (state, action) => {
                state.user.randevular = state.user.randevular.filter(r => r._id !== action.payload);
            });
    },
});

export default userSlice.reducer;