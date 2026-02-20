import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchDistricts } from '../redux/slices/locationSlice.js';
import { setSalonType, setCity, setDistrict } from '../redux/slices/filterSlice.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        cityList: cities,
        districtList: districts,
        loading
    } = useSelector(state => state.location);

    // Salon tipleri (static)
    const salonTypes = [
        "Kuaför",
        "Berber",
        "Güzellik Merkezi",
    ];

    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const [showSalonDropdown, setShowSalonDropdown] = useState(false);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedSalonType, setSelectedSalonType] = useState("");

    const wrapperRef = useRef(null);

    // Şehir dropdown
    const handleCityClick = () => {
        dispatch(fetchCities());
        setShowCityDropdown(true);
        setShowSalonDropdown(false);
        setShowDistrictDropdown(false);
    };

    // Salon dropdown
    const handleSalonClick = () => {
        setShowSalonDropdown(true);
        setShowCityDropdown(false);
        setShowDistrictDropdown(false);
    };

    // Şehir seçildi
    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSelectedDistrict("");
        setShowCityDropdown(false);

        dispatch(fetchDistricts(city));
    };

    // İlçe seçildi
    const handleSelectDistrict = (district) => {
        setSelectedDistrict(district);
        setShowDistrictDropdown(false);
    };

    // Salon tipi seçildi
    const handleSelectSalonType = (salonType) => {
        setSelectedSalonType(salonType);
        setShowSalonDropdown(false);
    };

    // Dışarı tıklanınca dropdownlar kapansın
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowCityDropdown(false);
                setShowSalonDropdown(false);
                setShowDistrictDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    // Ara
    const handleSearch = () => {
        dispatch(setCity(selectedCity));
        dispatch(setSalonType(selectedSalonType));
        dispatch(setDistrict(selectedDistrict));
        navigate(
            `/shops/${slugify(selectedSalonType)}/${slugify(selectedCity)}/${slugify(selectedDistrict)}`
        );
    };


    return (
        <div className='flex bg-gray-100 h-[400px]'>

            <div className='w-[60%] flex items-center justify-center '>
                <div className='text-center max-w-md px-6'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        Mağaza mı oluşturmak istiyorsunuz?
                    </h2>

                    <p className='text-gray-600 mb-6'>
                        Kendi mağazanızı açarak müşterilere ulaşabilir,
                        hizmetlerinizi kolayca yönetebilirsiniz.
                    </p>

                    <button
                        className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'
                        onClick={() => window.open("http://localhost:5174", "_blank")}
                    >
                        Hemen Başla
                    </button>
                </div>
            </div>

            <div className='w-[40%] flex items-center justify-center'>
                <div ref={wrapperRef} className='flex flex-col gap-4 w-[80%] relative'>

                    {/* SALON TİPİ */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder='Salon tipini seçiniz'
                            value={selectedSalonType}
                            readOnly
                            onClick={handleSalonClick}
                            className='border px-4 py-3 rounded-lg w-full cursor-pointer'
                        />

                        {showSalonDropdown && (
                            <div className='absolute left-0 right-0 mt-1 bg-white border rounded-lg max-h-48 overflow-y-auto z-50 shadow'>
                                {salonTypes.map((salonType, index) => (
                                    <p
                                        key={index}
                                        onClick={() => handleSelectSalonType(salonType)}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    >
                                        {salonType}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ŞEHİR */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder='Şehir seçiniz'
                            value={selectedCity}
                            readOnly
                            onClick={handleCityClick}
                            className='border px-4 py-3 rounded-lg w-full cursor-pointer'
                        />

                        {showCityDropdown && (
                            <div className='absolute left-0 right-0 mt-1 bg-white border rounded-lg max-h-48 overflow-y-auto z-50 shadow'>
                                {loading && (
                                    <p className='text-sm text-gray-600 p-3'>
                                        Şehirler yükleniyor...
                                    </p>
                                )}

                                {!loading && cities.map(city => (
                                    <p
                                        key={city.id}
                                        onClick={() => handleSelectCity(city.name)}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    >
                                        {city.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* İLÇE */}
                    {selectedCity && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder='İlçe seçiniz'
                                value={selectedDistrict}
                                readOnly
                                onClick={() => setShowDistrictDropdown(true)}
                                className='border px-4 py-3 rounded-lg w-full cursor-pointer'
                            />

                            {showDistrictDropdown && (
                                <div className='absolute left-0 right-0 mt-1 bg-white border rounded-lg max-h-48 overflow-y-auto z-50 shadow'>
                                    {loading && (
                                        <p className='text-sm text-gray-600 p-3'>
                                            İlçeler yükleniyor...
                                        </p>
                                    )}

                                    {!loading && districts.map(district => (
                                        <p
                                            key={district.id}
                                            onClick={() => handleSelectDistrict(district.name)}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                        >
                                            {district.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ARA */}
                    {!showCityDropdown && !showSalonDropdown && !showDistrictDropdown && (
                        <button
                            className='bg-blue-600 text-white py-3 rounded-lg'
                            onClick={handleSearch}
                        >
                            Ara
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Home;
