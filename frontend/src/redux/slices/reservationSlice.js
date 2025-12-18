import { createSlice } from '@reduxjs/toolkit'

const persistedService = localStorage.getItem('selectedService')
const persistedEmployee = localStorage.getItem('selectedEmployee')

const initialState = {
    selectedService: persistedService ? JSON.parse(persistedService) : null,
    selectedEmployee: persistedEmployee ? JSON.parse(persistedEmployee) : null,
}

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        setSelectedService: (state, action) => {
            state.selectedService = action.payload
            state.selectedEmployee = ''
            localStorage.setItem('selectedService', JSON.stringify(action.payload))
        },
        setSelectedEmployee: (state, action) => {
            state.selectedEmployee = action.payload
            localStorage.setItem('selectedEmployee', JSON.stringify(action.payload))
        },
        clearReservation: (state) => {
            state.selectedService = ''
            state.selectedEmployee = ''
        }
    },
    extraReducers: (builder) => {

    }
})

export default reservationSlice.reducer
export const { setSelectedEmployee, setSelectedService, clearReservation } = reservationSlice.actions