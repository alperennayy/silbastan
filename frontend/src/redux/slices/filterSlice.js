import { createSlice } from "@reduxjs/toolkit";
import { shops } from "../../assets/assets.js";

// --- FILTRELEME FONKSIYONU ---
const applyFilters = (allShops, city, district, salonType) => {
    return allShops.filter(shop => {

        const matchesCity = city
            ? shop.location.city?.toLowerCase() === city.toLowerCase()
            : true;

        const matchesDistrict = district
            ? shop.location.district?.toLowerCase() === district.toLowerCase()
            : true;

        const matchesType = salonType
            ? shop.salonType.toLowerCase() === salonType.toLowerCase()
            : true;

        return matchesCity && matchesDistrict && matchesType;
    });
};

// --- INITIAL STATE ---
const initialState = {
    allShops: shops,        // tüm mağazalar
    filteredShops: shops,   // filtrelenmiş mağazalar
    city: "",
    district: "",
    salonType: ""
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {

        // Şehir seçildiğinde
        setCity: (state, action) => {
            state.city = action.payload;
            state.district = ""; // şehir değişince ilçe sıfırlanır
            state.filteredShops = applyFilters(
                state.allShops,
                state.city,
                state.district,
                state.salonType
            );
        },

        // İlçe seçildiğinde
        setDistrict: (state, action) => {
            state.district = action.payload;
            state.filteredShops = applyFilters(
                state.allShops,
                state.city,
                state.district,
                state.salonType
            );
        },

        // Salon tipi seçildiğinde
        setSalonType: (state, action) => {
            state.salonType = action.payload;
            state.filteredShops = applyFilters(
                state.allShops,
                state.city,
                state.district,
                state.salonType
            );
        },

        // Filtreleri sıfırla
        resetFilters: (state) => {
            state.city = "";
            state.district = "";
            state.salonType = "";
            state.filteredShops = state.allShops;
        }
    }
});

export const {
    setCity,
    setDistrict,
    setSalonType,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
