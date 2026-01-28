import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedService } from '../redux/slices/reservationSlice.js'

const ServiceList = () => { // 🔥 Props almıyor!
    const dispatch = useDispatch()

    // 🔥 Redux'tan direkt okuyor
    const { selectedService } = useSelector(state => state.reservation)
    const { shopData } = useSelector(state => state.shop)

    // 🔥 Services yoksa veya yükleniyorsa
    if (!shopData || !shopData.services) {
        return (
            <div className='flex flex-col gap-3 text-sm text-gray-600 sm:w-1/3'>
                <div className="pl-3 py-2 pr-6 text-start border rounded">
                    Servisler yükleniyor...
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 text-sm text-gray-600 sm:w-1/3'>
            {shopData.services.map((service) => (
                <button
                    key={service.id}
                    onClick={() => dispatch(setSelectedService(service))}
                    className={`w-full pl-3 py-2 pr-6 text-start border rounded cursor-pointer transition-all 
                    ${selectedService?.id === service.id ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-600'}`}
                >
                    <div className='flex justify-between'>
                        <span>{service.name}</span>
                        <span className='font-medium'>{service.price} TL</span>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default ServiceList