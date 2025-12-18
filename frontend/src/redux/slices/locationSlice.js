import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCities = createAsyncThunk(
    "cities/fetchCities",
    async () => {
        const response = await axios.get("https://turkiyeapi.dev/api/v1/provinces")
        return response.data.data
    }
)

export const fetchDistricts = createAsyncThunk(
    "district/fetchDistrict",
    async (cityName) => {
        const response = await axios.get("https://turkiyeapi.dev/api/v1/provinces");

        // seçilen ili bul
        const city = response.data.data.find(
            item => item.name.toLowerCase() === cityName.toLowerCase()
        );

        // sadece ilçeleri dön
        return city ? city.districts : [];
    }
);




const initialState = {
    cityList: [],
    districtList: [],
    loading: false,
    error: null,
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false
                state.cityList = action.payload
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchDistricts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.districtList = action.payload,
                    state.loading = false,
                    state.error = false
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})


export default locationSlice.reducer;
