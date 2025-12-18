import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeCard from '../components/EmployeeCard'
import ServiceList from '../components/ServiceList'
import { clearReservation } from '../redux/slices/reservationSlice'
import { fetchShopData } from '../redux/slices/shopSlice'

const MakeReservation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shopId } = useParams()

    const { shopData, loading } = useSelector(state => state.shop)
    const { selectedService, selectedEmployee } = useSelector(state => state.reservation)

    // 🔹 Shop verisi yoksa çek (Aynı)
    useEffect(() => {
        if (!shopData) {
            dispatch(fetchShopData(shopId))
        }
    }, [dispatch, shopId, shopData])

    // 🔹 YENİ: ShopId değiştiğinde seçimleri temizle
    useEffect(() => {
        dispatch(clearReservation())
    }, [shopId, dispatch])

    /* 🔹 Loading durumu (Aynı) */
    if (loading || !shopData) {
        return (
            <div className="p-10 text-center text-gray-500">
                Yükleniyor...
            </div>
        )
    }

    /* 🔹 Filtrelenmiş çalışanlar (Aynı) */
    const filteredEmployees = selectedService
        ? shopData.employees.filter(emp =>
            emp.service.includes(selectedService.name)
        )
        : shopData.employees

    /* 🔹 URL oluşturma (Aynı) */
    const slugify = (text) =>
        text
            .toLowerCase()
            .replaceAll("ğ", "g")
            .replaceAll("ü", "u")
            .replaceAll("ş", "s")
            .replaceAll("ı", "i")
            .replaceAll("ö", "o")
            .replaceAll("ç", "c")
            .replace(/\s+/g, "-");

    return (
        <div>
            <p className='text-gray-600 text-lg sm:text-xl font-medium'>Make a reservation</p>

            <div className='flex flex-col sm:flex-row gap-4 mt-5'>
                {/* 🔥 DEĞİŞTİ: ServiceList props almıyor */}
                <ServiceList />

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:w-2/3'>
                    {/* 🔥 DEĞİŞTİ: EmployeeCard sadece employeeId alıyor */}
                    {filteredEmployees.map(emp => (
                        <EmployeeCard key={emp._id} employeeId={emp._id} />
                    ))}
                </div>
            </div>

            {selectedEmployee && (
                <div className='flex justify-center mt-8'>
                    <button
                        onClick={() => navigate(`/shop/${shopId}/make-reservation/${slugify(selectedService.name)}/${selectedService._id}/${slugify(selectedEmployee.name)}/${selectedEmployee._id}`)}
                        className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition'
                    >
                        Randevu Seç
                    </button>
                </div>
            )}
        </div>
    )
}

export default MakeReservation