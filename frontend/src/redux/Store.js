import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slices/locationSlice.js'
import filterReducer from './slices/filterSlice.js'
import shopReducer from './slices/shopSlice.js'
import reservationReducer from './slices/reservationSlice.js'
import authReducer from './slices/authSlice.js'
import userReducer from './slices/userSlice.js'


export const store = configureStore({
    reducer: {
        location: locationReducer,
        filter: filterReducer,
        shop: shopReducer,
        reservation: reservationReducer,
        auth: authReducer,
        user: userReducer,
    },
})