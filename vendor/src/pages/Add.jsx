import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShop } from "../redux/slices/shopSlice";
import { fetchCities, fetchDistricts } from "../redux/slices/locationSlice";
import { assets } from "../assets/assets";



const Add = () => {


  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.shop);
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
  }, [dispatch]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])


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

  /* ================= SUBMIT ================= */
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler tetiklendi");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("salonType", salonType);
    formData.append("city", city);
    formData.append("district", district);

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    formData.append("services", JSON.stringify(services));
    formData.append("employees", JSON.stringify(employees));

    console.log("submitHandler tetiklendi");
    console.log("FormData objesi:", {
      name,
      description,
      category,
      salonType,
      city,
      district,
      services,
      employees,
      image1,
      image2,
      image3,
      image4
    });

    dispatch(createShop(formData));
  };



  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-xl">

      <h2 className="font-bold text-xl">Add Shop</h2>

      {/* ================= IMAGES ================= */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20 h-20 object-cover cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
            <input hidden type="file" id="image1" onChange={e => setImage1(e.target.files[0])} />
          </label>

          <label htmlFor="image2">
            <img className="w-20 h-20 object-cover cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
            <input hidden type="file" id="image2" onChange={e => setImage2(e.target.files[0])} />
          </label>

          <label htmlFor="image3">
            <img className="w-20 h-20 object-cover cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
            <input hidden type="file" id="image3" onChange={e => setImage3(e.target.files[0])} />
          </label>

          <label htmlFor="image4">
            <img className="w-20 h-20 object-cover cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
            <input hidden type="file" id="image4" onChange={e => setImage4(e.target.files[0])} />
          </label>
        </div>
      </div>

      {/* ================= SHOP INFO ================= */}
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Shop name" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />

      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <input value={salonType} onChange={e => setSalonType(e.target.value)} placeholder="Salon Type" />

      {/* ================= LOCATION ================= */}
      <select value={city} onChange={e => {
        setCity(e.target.value);
        dispatch(fetchDistricts(e.target.value));
      }}>
        <option value="">City</option>
        {cityList.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}
      </select>

      <select value={district} onChange={e => setDistrict(e.target.value)}>
        <option value="">District</option>
        {districtList.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
      </select>

      {/* ================= SERVICES ================= */}
      <div className="flex gap-2">
        <input value={serviceName} onChange={e => setServiceName(e.target.value)} placeholder="Service name" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
        <button type="button" onClick={addService}>+</button>
      </div>

      {services.map(s => (
        <p key={s.id}>{s.name} - {s.price}₺</p>
      ))}

      {/* ================= EMPLOYEES ================= */}
      <input value={empName} onChange={e => setEmpName(e.target.value)} placeholder="Employee name" />
      <input value={empDesc} onChange={e => setEmpDesc(e.target.value)} placeholder="Employee description" />
      <input type="file" onChange={e => setEmpImage(e.target.files[0])} />

      {services.map(s => (
        <label key={s.id}>
          <input
            type="checkbox"
            checked={empServices.includes(s.id)}
            onChange={() =>
              setEmpServices(prev =>
                prev.includes(s.id)
                  ? prev.filter(id => id !== s.id)
                  : [...prev, s.id]
              )
            }
          />
          {s.name}
        </label>
      ))}

      <button type="button" onClick={addEmployee}>Add Employee</button>

      <button type="submit" disabled={loading}>
        {loading ? "Ekleniyor..." : "ADD SHOP"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Add;  