import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchDistricts } from '../redux/slices/locationSlice';
import { selectFilteredShops } from '../redux/selectors/shopSelector';
import { listShops } from '../redux/slices/shopSlice';
import { setCity, setDistrict, setSalonType } from '../redux/slices/filterSlice';
import ShopItem from '../components/ShopItem';

const Shops = () => {

    const dispatch = useDispatch();

    // -------------------------
    // REDUX STATE
    // -------------------------
    const { cityList: cities, loading: locationLoading, districtList } = useSelector(state => state.location);
    const { city, salonType, district } = useSelector(state => state.filter);
    const { loading: shopLoading, shops } = useSelector(state => state.shop);
    const filteredShops = useSelector(selectFilteredShops);


    // -------------------------
    // LOCAL STATE
    // -------------------------
    const [selectedCity, setSelectedCity] = useState(city);
    const [selectedSalonType, setSelectedSalonType] = useState(salonType);
    const [selectedDistrict, setSelectedDistrict] = useState(district);

    const salonTypes = ["Kuaför", "Berber", "Güzellik Merkezi"];

    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showSalonDropdown, setShowSalonDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

    const ref = useRef(null);

    // -------------------------
    // DIŞARI TIKLAYINCA KAPAT
    // -------------------------
    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowCityDropdown(false);
                setShowSalonDropdown(false);
                setShowDistrictDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    useEffect(() => {
        dispatch(listShops());
    }, [dispatch]);

    // -------------------------
    // FILTER APPLY
    // -------------------------
    const applyFilter = () => {
        dispatch(setCity(selectedCity));
        dispatch(setSalonType(selectedSalonType));
        dispatch(setDistrict(selectedDistrict));
    };


    return (
        <div className="p-6 max-w-6xl mx-auto" ref={ref}>
            <h1 className="text-3xl font-bold mb-6">Mağazalar</h1>

            {/* FILTER BOX */}
            <div
                className={`
                    bg-gray-100 p-5 rounded-xl mb-8 grid gap-4
                    ${selectedCity ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}
                `}
            >

                {/* SALON TYPE */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Salon tipi seçiniz"
                        readOnly
                        value={selectedSalonType}
                        onClick={() => {
                            setShowSalonDropdown(true);
                            setShowCityDropdown(false);
                            setShowDistrictDropdown(false);
                        }}
                        className="p-3 border rounded-lg w-full cursor-pointer bg-white"
                    />

                    {showSalonDropdown && (
                        <div className="absolute left-0 right-0 bg-white border mt-1 rounded-lg shadow max-h-48 overflow-y-auto z-50">
                            {salonTypes.map((type, index) => (
                                <p
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedSalonType(type);
                                        setShowSalonDropdown(false);
                                    }}
                                >
                                    {type}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* CITY */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Şehir seç"
                        readOnly
                        value={selectedCity}
                        onClick={() => {
                            dispatch(fetchCities());
                            setShowCityDropdown(true);
                            setShowSalonDropdown(false);
                            setShowDistrictDropdown(false);
                        }}
                        className="p-3 border rounded-lg w-full cursor-pointer bg-white"
                    />

                    {showCityDropdown && (
                        <div className="absolute left-0 right-0 bg-white border mt-1 rounded-lg shadow max-h-48 overflow-y-auto z-50">
                            {locationLoading && (
                                <p className="px-4 py-2 text-gray-500">Yükleniyor...</p>
                            )}

                            {!locationLoading && cities.map(city => (
                                <p
                                    key={city.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedCity(city.name);
                                        setSelectedDistrict(""); // şehir değişince ilçe sıfırla
                                        setShowCityDropdown(false);
                                    }}
                                >
                                    {city.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* DISTRICT (SADECE ŞEHİR SEÇİLİNCE) */}
                {selectedCity && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="İlçe seç"
                            readOnly
                            value={selectedDistrict}
                            onClick={() => {
                                dispatch(fetchDistricts(selectedCity))
                                setShowDistrictDropdown(true);
                                setShowCityDropdown(false);
                                setShowSalonDropdown(false);
                            }}
                            className="p-3 border rounded-lg w-full cursor-pointer bg-white"
                        />

                        {showDistrictDropdown && (
                            <div className="absolute left-0 right-0 bg-white border mt-1 rounded-lg shadow max-h-48 overflow-y-auto z-50">
                                {districtList.map((d, index) => (
                                    <p
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedDistrict(d.name);
                                            setShowDistrictDropdown(false);
                                        }}
                                    >
                                        {d.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* BUTTON */}
                <button
                    onClick={applyFilter}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
                >
                    Ara
                </button>

            </div>

            {/* SHOP LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopLoading ? (
                    <p className="text-gray-500 text-lg">Mağazalar yükleniyor...</p>
                ) : filteredShops.length > 0 ? (
                    filteredShops.map(shop => (
                        <ShopItem key={shop._id} shopId={shop._id} />
                    ))
                ) : (
                    <p className="text-gray-500 text-lg">Sonuç bulunamadı.</p>
                )}
            </div>

        </div>
    );
};

export default Shops;
