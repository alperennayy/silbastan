import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShop, setVendorShop } from "../redux/slices/shopSlice";
import { fetchCities, fetchDistricts } from "../redux/slices/locationSlice";
import { assets } from "../assets/assets";

const Add = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.shop);
  const { cityList, districtList } = useSelector(state => state.location);

  const [token, setToken] = useState("");

  /* ================= IMAGES ================= */
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
  }, [dispatch]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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
    if (!empName || empServices.length === 0 || !empImage) return;

    setEmployees(prev => [
      ...prev,
      {
        id: Date.now(),
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

  const removeEmployee = id => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const removeService = id => {
    setServices(prev => prev.filter(s => s.id !== id));
    setEmpServices(prev => prev.filter(sid => sid !== id));
    setEmployees(prev =>
      prev
        .map(emp => ({
          ...emp,
          services: emp.services.filter(sid => sid !== id)
        }))
        .filter(emp => emp.services.length > 0)
    );
  };

  /* ================= SUBMIT ================= */
  const submitHandler = e => {
    e.preventDefault();

    const shopData = {
      name,
      description,
      category,
      salonType,
      city,
      district,
      services,
      employees,
      images: [image1, image2, image3, image4]
    };

    dispatch(setVendorShop(shopData));

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("salonType", salonType);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("text", `${district}/${city}`);

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    formData.append("services", JSON.stringify(services));

    // 🔥 EMPLOYEE IMAGES
    employees.forEach(emp => {
      if (emp.image) {
        formData.append("empImages", emp.image);
      }
    });

    // 🔥 EMPLOYEES JSON (image hariç)
    formData.append(
      "employees",
      JSON.stringify(
        employees.map(e => ({
          name: e.name,
          description: e.description,
          services: e.services
        }))
      )
    );

    dispatch(createShop(formData));
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-xl">
      <h2 className="font-bold text-xl">İşletme Bilgileri</h2>

      {/* IMAGES */}
      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, i) => (
          <label key={i} className="border border-dashed cursor-pointer">
            <img
              className="w-20 h-20 object-cover"
              src={!img ? assets.upload_area : URL.createObjectURL(img)}
            />
            <input
              hidden
              type="file"
              onChange={e => {
                const setters = [setImage1, setImage2, setImage3, setImage4];
                setters[i](e.target.files[0]);
              }}
            />
          </label>
        ))}
      </div>

      {/* FORM */}
      <input value={name} onChange={e => setName(e.target.value)} placeholder="İşletme ismi" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Açıklama" />

      <button type="submit" disabled={loading} className="bg-black text-white py-2 rounded">
        {loading ? "Ekleniyor..." : "İşletmeyi Oluştur"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Add;
