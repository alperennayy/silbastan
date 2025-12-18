import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ReservationDetail = () => {
    const { selectedService, selectedEmployee } = useSelector(
        state => state.reservation
    )

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)

    if (!selectedEmployee) {
        return (
            <div className="p-6 text-gray-500 text-center">
                Lütfen bir çalışan seçin
            </div>
        )
    }

    const dates = [
        { day: 10, weekday: 'Cum' },
        { day: 11, weekday: 'Paz' },
        { day: 12, weekday: 'Pzt' },
        { day: 13, weekday: 'Sal' },
        { day: 14, weekday: 'Çar' },
        { day: 15, weekday: 'Per' },
        { day: 16, weekday: 'Cum' },
    ]

    const times = [
        "8:00 am", "8:30 am", "9:00 am", "9:30 am",
        "10:00 am", "10:30 am", "11:00 am", "11:30 am"
    ]

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg w-full flex flex-col md:flex-row gap-4 md:gap-6">

            {/* Resim */}
            <div className="w-full md:w-auto flex justify-center md:block">
                <img
                    src={selectedEmployee.image[0]}
                    alt={selectedEmployee.name}
                    className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-xl"
                />
            </div>

            {/* Detaylar */}
            <div className="flex-1 flex flex-col gap-4 items-center md:items-start">

                {/* İsim & Açıklama */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold">
                        {selectedEmployee.name}
                    </h2>

                    <p className="text-gray-500 text-sm md:text-base mt-1">
                        {selectedEmployee.description}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        {selectedEmployee.service.map((srv, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm"
                            >
                                {srv}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hizmet */}
                <div className="flex flex-col md:flex-row md:gap-2 items-center md:items-start text-sm md:text-lg">
                    <p className="font-medium">Alınacak Hizmet:</p>
                    <span className="text-gray-500">
                        {selectedService?.name}
                    </span>
                </div>

                {/* Fiyat */}
                <div className="flex flex-col md:flex-row md:gap-2 items-center md:items-start text-sm md:text-lg">
                    <p className="font-medium">Fiyat:</p>
                    <span className="text-gray-500">
                        {selectedService?.price} TL
                    </span>
                </div>

                {/* Randevu */}
                <div className="mt-3 w-full">
                    <p className="font-medium mb-2 text-center md:text-left">
                        Randevu Seç
                    </p>

                    {/* Tarihler */}
                    <div className="flex flex-wrap gap-3 py-2 mb-3 text-left md:justify-start">
                        {dates.map((d, idx) => {
                            const val = `${d.day}-${d.weekday}`
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(val)}
                                    className={`min-w-[68px] h-18 flex flex-col items-center justify-center rounded-lg border
                                        ${selectedDate === val
                                            ? 'bg-blue-500 text-white'
                                            : 'border-gray-300 text-gray-700'}`}
                                >
                                    <span className="text-base md:text-lg font-semibold">
                                        {d.day}
                                    </span>
                                    <span className="text-xs md:text-sm">
                                        {d.weekday}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Saatler */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 place-items-center md:place-items-start">
                        {times.map((time, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedTime(time)}
                                className={`w-full px-3 py-2 md:py-1 rounded-full border text-sm
                                    ${selectedTime === time
                                        ? 'bg-blue-500 text-white'
                                        : 'border-gray-300 text-gray-700'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {/* BUTON */}
                    <div className="flex justify-center">
                        <button
                            disabled={!selectedDate || !selectedTime}
                            className={`w-full md:w-64 py-3 md:py-3 rounded-full text-white text-base md:text-lg
                                ${selectedDate && selectedTime
                                    ? 'bg-blue-500 hover:bg-blue-600'
                                    : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            Randevu Al
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReservationDetail
