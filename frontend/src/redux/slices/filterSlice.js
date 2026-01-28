import { createSlice } from "@reduxjs/toolkit";


// --- INITIAL STATE ---
const initialState = {
    city: "",
    district: "",
    salonType: ""
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {

        setCity: (state, action) => {
            state.city = action.payload;
            state.district = ""; // şehir değişince ilçe sıfırlanır
        },

        setDistrict: (state, action) => {
            state.district = action.payload;
        },

        setSalonType: (state, action) => {
            state.salonType = action.payload;
        },
    }
});

export const {
    setCity,
    setDistrict,
    setSalonType,
} = filterSlice.actions;

export default filterSlice.reducer;
