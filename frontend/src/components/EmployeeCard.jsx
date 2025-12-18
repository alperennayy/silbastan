import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedEmployee } from '../redux/slices/reservationSlice'

const EmployeeCard = ({ employeeId }) => {
    const dispatch = useDispatch()

    // 🔥 Redux'tan employee verisini bul
    const { shopData } = useSelector(state => state.shop)
    const { selectedEmployee } = useSelector(state => state.reservation)

    // 🔥 employeeId'ye göre employee'yi shopData'dan bul
    const employee = shopData?.employees?.find(emp => emp._id === employeeId)

    // 🔥 Seçili mi kontrol et
    const isSelected = selectedEmployee?._id === employeeId

    // 🔥 Employee bulunamazsa
    if (!employee) {
        return (
            <div className="w-full p-4 border border-gray-200 rounded-lg text-gray-500 text-center">
                Personel yükleniyor...
            </div>
        )
    }

    return (
        <button
            onClick={() => dispatch(setSelectedEmployee(employee))}
            className={`
                w-full flex flex-col items-center text-center
                gap-3 p-4 border rounded-lg
                transition-all duration-200
                ${isSelected
                    ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-[1.03]'
                    : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow'}
            `}
        >
            {/* IMAGE */}
            <img
                src={employee.image[0]}
                alt={employee.name}
                className='w-28 h-28 object-cover rounded'
            />

            {/* NAME */}
            <p className='text-base font-semibold'>
                {employee.name}
            </p>

            {/* SERVICES */}
            {employee.service.map((srv, idx) => (
                <p
                    key={idx}
                    className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}
                >
                    {srv}
                </p>
            ))}
        </button>
    )
}

export default EmployeeCard