import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShop, fetchVendorShop, updateShop } from "../redux/slices/shopSlice.js";
import { fetchCities, fetchDistricts } from "../redux/slices/locationSlice.js";
import ShopCart from "../pages/ShopCart.jsx"
import { assets } from "../assets/assets";


const Add = ({ isEditMode = false, setEditing = null }) => {

    const dispatch = useDispatch();
    const { loading, error, vendorShop } = useSelector(state => state.shop);
    const { cityList, districtList } = useSelector(state => state.location);

    const [token, setToken] = useState('')


    /* ================= IMAGES (AYRI AYRI) ================= */
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    /* ================= SHOP INFO ================= */
    const [name, setName] = useState("");
    const [salonType, setSalonType] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");

    /* ================= SERVICES ================= */
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");

    /* ================= EMPLOYEES ================= */
    const [employees, setEmployees] = useState([]);
    const [empName, setEmpName] = useState("");
    const [empDesc, setEmpDesc] = useState("");
    const [empImage, setEmpImage] = useState(null);
    const [empServices, setEmpServices] = useState([]);

    /* ================= EFFECT ================= */

    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchVendorShop());
    }, [dispatch]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, [token]);
    useEffect(() => {
    if (isEditMode && vendorShop && vendorShop.employees) {
        setName(vendorShop.name || "");
        setDescription(vendorShop.description || "");
        setCategory(vendorShop.category || "");
        setSalonType(vendorShop.salonType || "");
        setCity(vendorShop.location?.city || "");
        setDistrict(vendorShop.location?.district || "");
        setServices(vendorShop.services || []);
        
        const initialEmployees = vendorShop.employees.map(emp => ({
            name: emp.name,
            description: emp.description,
            image: emp.image,
            services: emp.services,
            id: String(emp._id || emp.id)
        }));
        
        setEmployees(initialEmployees);
    }
}, [isEditMode, vendorShop]);  // employees.length dependency'den çıkarıldı

    /* ================= HELPERS ================= */
    const addService = () => {
        if (!serviceName || !price) return;

        setServices(prev => [
            ...prev,
            { id: Date.now(), name: serviceName, price: Number(price) }
        ]);

        setServiceName("");
        setPrice("");
    };


    const addEmployee = () => {
        if (!empName || empServices.length === 0) return;

        setEmployees(prev => [
            ...prev,
            {
                id: String(Date.now()),
                name: empName,
                description: empDesc,
                image: empImage,
                services: empServices
            }
        ]);

        setEmpName("");
        setEmpDesc("");
        setEmpImage(null);
        setEmpServices([]);
    };
    // removeEmployee
    const removeEmployee = (targetId) => {
    if (!targetId) return;
    setEmployees(prev => prev.filter(emp => String(emp.id) !== String(targetId)));
    };
   
    
    /* ================= SUBMIT ================= */
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // TEXT
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("salonType", salonType);
        formData.append("city", city);
        formData.append("district", district);

        // SHOP IMAGES
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);

        // 🔥 EMPLOYEE IMAGES
        employees.forEach(emp => {
            if (emp.image)
                formData.append("empImages", emp.image);

        });




        // SERVICES
        formData.append("services", JSON.stringify(services));
        formData.append("employees", JSON.stringify(employees.map(e => ({ 
    name: e.name, 
    description: e.description, 
    services: e.services,
    image: e.image // Mevcut resim URL'ini veya yeni dosyayı korumak için
}))));
        if (isEditMode) {
        // GÜNCELLEME
        dispatch(updateShop({ id: vendorShop._id, formData }));
        setEditing(false); // İşlem bitince ShopCart'a geri dön
    } else {
        // YENİ OLUŞTURMA
        dispatch(createShop(formData));
    }




        console.log("submitHandler tetiklendi");
    };


    if (vendorShop && !isEditMode) {
        return <ShopCart />;
    }


    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-xl">

            <h2 className="font-bold text-xl">İşletme Bilgileri</h2>

            {/* ================= IMAGES ================= */}
            <div>
                <div className="flex gap-2">
                    {[image1, image2, image3, image4].map((img, i) => {
            // Mantık: Eğer yeni dosya seçildiyse onun URL'ini oluştur, 
            // seçilmediyse ve edit modundaysak veritabanındaki resmi göster.
            const currentImg = img ? URL.createObjectURL(img) : (vendorShop?.images?.[i] || assets.upload_area);
            
            return (
                <label key={i} htmlFor={`image${i + 1}`} className="border border-dashed border-gray-300 cursor-pointer">
                    <img
                        className="w-20 h-20 object-cover rounded-md"
                        src={currentImg}
                        alt="shop"
                    />
                    <input
                        hidden
                        type="file"
                        id={`image${i + 1}`}
                        onChange={e => {
                            const setters = [setImage1, setImage2, setImage3, setImage4];
                            setters[i](e.target.files[0]);
                        }}
                    />
                </label>
            );
        })}
                </div>
            </div>

            {/* ================= SHOP INFO ================= */}
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="İşletme ismi"
                className="px-3 py-2 border border-gray-300 rounded-md"
            />

            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="İşletmenizi tanıtın.."
                className="px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
            />

            {/* Client Category – placeholder only */}
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
                <option value="">Cinsiyet seçiniz..</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
            </select>

            {/* Salon Type – placeholder only */}
            <select
                value={salonType}
                onChange={e => setSalonType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
                <option value="">İşletme tipi..</option>
                <option value="Kuaför">Kuaför</option>
                <option value="Berber">Berber</option>
                <option value="Güzellik Merkezi">Güzellik Merkezi</option>
            </select>

            {/* ================= LOCATION ================= */}
            <select
                value={city}
                onChange={e => {
                    setCity(e.target.value);
                    dispatch(fetchDistricts(e.target.value));
                }}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
                <option value="">Şehir seçiniz..</option>
                {cityList.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>

            <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
                <option value="">İlçe seçiniz</option>
                {districtList.map(district => (
                    <option key={district.id} value={district.name}>{district.name}</option>
                ))}
            </select>

            {/* ================= SERVICES ================= */}
            <div className="flex gap-2 items-center">
                <input
                    value={serviceName}
                    onChange={e => setServiceName(e.target.value)}
                    placeholder="Hizmet ismi"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={price}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setPrice(value);
                        }
                    }}
                    placeholder="Fiyat"
                    className="px-3 py-2 border border-gray-300 rounded-md w-24"
                />

                <button
                    type="button"
                    onClick={addService}
                    className="px-3 py-2 border border-black rounded-md hover:bg-black hover:text-white"
                >
                    +
                </button>
            </div>

            {services.length > 0 && (
                <p className="text-sm font-medium mt-2">
                    Verilen hizmetler:
                </p>
            )}

            {services.map(s => (
                <div
                    key={s.id}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border
               bg-gray-50 shadow-sm
               transition hover:shadow-md hover:border-black group"
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">{s.name} - {s.price} ₺</span>

                    </div>


                </div>
            ))}



            {/* ================= EMPLOYEES ================= */}
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Çalışan Bilgileri</h2>

                <div className="flex gap-2 flex-wrap items-center">
                    <input
                        value={empName}
                        onChange={e => setEmpName(e.target.value)}
                        placeholder="Çalışan ismi giriniz.."
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />

                    <input
                        value={empDesc}
                        onChange={e => setEmpDesc(e.target.value)}
                        placeholder="Çalışan hakkında.."
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />

                    {/* employee image – SAME AS SHOP IMAGE */}
                    <label className="border border-dashed border-gray-300 cursor-pointer">
                        <img
                            className="w-12 h-12 object-cover rounded-md"
                            src={!empImage ? assets.upload_area : URL.createObjectURL(empImage)}
                        />
                        <input
                            hidden
                            type="file"
                            onChange={e => setEmpImage(e.target.files[0])}
                        />
                    </label>
                </div>


                {services.length > 0 && (
                    <p className="text-sm font-medium mt-2">
                        Çalışanın verdiği hizmetleri seçiniz:
                    </p>
                )}
                <div className="flex flex-wrap gap-2">
                    {services.map(s => {
                        const selected = empServices.includes(s.id);

                        return (
                            <div
                                key={s.id}
                                onClick={() =>
                                    setEmpServices(prev =>
                                        selected
                                            ? prev.filter(id => id !== s.id)
                                            : [...prev, s.id]
                                    )
                                }
                                className={`
          px-4 py-2 border rounded-md text-sm cursor-pointer select-none
          transition
          ${selected
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300 hover:bg-gray-100 hover:border-black"}
        `}
                            >
                                {s.name}
                            </div>
                        );
                    })}
                </div>



                <button
                    type="button"
                    onClick={addEmployee}
                    className="self-start px-3 py-1 text-sm border border-black rounded-md hover:bg-black hover:text-white"
                >
                    + Çalışan Ekle
                </button>

                {/* employee list: name – services */}
{employees.map((emp, index) => {
    // Benzersiz bir ID belirleyelim. 
    const employeeKey = emp.id || `emp-${index}`; 
    
    return (
        <div
            key={employeeKey}
            className="flex items-center justify-between gap-4 p-3 rounded-xl border bg-white transition hover:shadow-md hover:border-black group"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-100">
                    {emp.image ? (
                        <img
                            src={emp.image instanceof File ? URL.createObjectURL(emp.image) : emp.image}
                            className="w-full h-full object-cover"
                            alt={emp.name}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">?</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{emp.name}</span>
                    <div className="flex flex-wrap gap-1">
                        {emp.services.map(sId => {
                            const service = services.find(s => (s.id === sId || s._id === sId));
                            return service ? (
                                <span key={sId} className="px-2 py-[2px] text-[10px] rounded-full bg-gray-100 text-gray-600">
                                    {service.name}
                                </span>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>

            {/* 🗑️ SİLME BUTONU */}
            <button
                type="button"
                onClick={() => removeEmployee(emp.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
            </button>
        </div>
    );
})}




            </div>

            <button
    type="submit"
    disabled={loading}
    className="mt-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
>
    {loading ? "İşleniyor..." : (isEditMode ? "Bilgileri Güncelle" : "İşletmeyi Oluştur")}
</button>

            {error && <p className="text-red-500">{error}</p>}
            {isEditMode && (
    <button 
        type="button" 
        onClick={() => setEditing(false)}
        className="self-end text-sm text-gray-500 underline"
    >
        Düzenlemeyi İptal Et
    </button>
)}
        </form>
    
    );




}
export default Add; 