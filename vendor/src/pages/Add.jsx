import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { shopActions } from '../redux/slices/shopSlice.js'
import { fetchCities, fetchDistricts } from "../redux/slices/locationSlice";
const Add = () => {
  const dispatch = useDispatch();

  const shop = useSelector(state => state.shop);


  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const { cityList, districtList, loading } = useSelector(
    state => state.location
  );


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(shopActions.addShop());
    dispatch(shopActions.resetShop());
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full gap-4">

      {/* ================= SHOP IMAGES ================= */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <label key={i}>
              <img
                src={
                  shop[`image${i}`]
                    ? URL.createObjectURL(shop[`image${i}`])
                    : assets.upload_area
                }
                className="w-20 cursor-pointer"
                alt=""
              />

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  dispatch(shopActions[`setImage${i}`](e.target.files?.[0] || null))
                }
              />
            </label>
          ))}

        </div>

      </div>

      {/* ================= SHOP INFO ================= */}
      <input
        value={shop.name}
        onChange={(e) => dispatch(shopActions.setShopName(e.target.value))}
        placeholder="Shop name"
        className="border px-3 py-2 rounded-md"
        required
      />

      <select
        value={shop.salonType}
        onChange={(e) => dispatch(shopActions.setSalonType(e.target.value))}
        className="border px-3 py-2 rounded-md"
        required
      >
        <option value="" disabled hidden>Salon tipi seç</option>
        <option value="Berber">Berber</option>
        <option value="Kuaför">Kuaför</option>
        <option value="Güzellik Merkezi">Güzellik Merkezi</option>
      </select>

      <textarea
        value={shop.description}
        onChange={(e) => dispatch(shopActions.setDescription(e.target.value))}
        placeholder="Shop description"
        className="border px-3 py-2 rounded-md"
      />

      <select
        value={shop.category}
        onChange={(e) => dispatch(shopActions.setCategory(e.target.value))}
        className="border px-3 py-2 rounded-md"
        required
      >
        <option value="" disabled hidden>Kategori seç</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
      </select>

      {/* ================= LOCATION (API) ================= */}
      <select
        value={shop.city}

        onChange={(e) => {
          dispatch(shopActions.setCity(e.target.value));
          dispatch(fetchDistricts(e.target.value))
        }}
        className="border px-3 py-2 rounded-md"
        required
      >
        <option value=""  >
          Şehir seç
        </option>

        {cityList.map(city => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>


      <select
        value={shop.district}
        onChange={(e) =>
          dispatch(shopActions.setDistrict(e.target.value)) 
        }
        className="border px-3 py-2 rounded-md"
        disabled={!districtList.length}
        required
      >
        <option value="">
          İlçe seç
        </option>

        {districtList.map(district => (
          <option key={district.id} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>
      {loading && (
        <span className="text-xs text-gray-400">
          Yükleniyor...
        </span>
      )}



      {/* ================= SERVICES ================= */}
      <hr />
      <h3 className="font-semibold">Hizmetler</h3>

      <input
        value={shop.serviceName}
        onChange={(e) =>
          dispatch(shopActions.setServiceName(e.target.value))
        }
        placeholder="Service name"
        className="border px-3 py-2 rounded-md"
      />

      <input
        type="number"
        value={shop.price}
        onChange={e => dispatch(shopActions.setPrice(e.target.value))}
        placeholder="Price"
        className="border px-3 py-2 rounded-md"
      />

      <button
        type="button"
        onClick={() => dispatch(shopActions.addService())}
        className="bg-slate-200 px-3 py-1 rounded-md w-fit"
      >
        + Hizmet Ekle
      </button>

      {/* ✅ HİZMET LİSTESİ (SENDE VARDI) */}
      <ul className="text-sm">
        {shop.services.map(srv => (
          <li key={srv._id}>
            • {srv.name} – {srv.price}₺
          </li>
        ))}
      </ul>
      {/* ================= EMPLOYEES ================= */}
      <hr />
      <h3 className="font-semibold">Çalışanlar</h3>

      <input
        value={shop.empName}
        onChange={e => dispatch(shopActions.setEmpName(e.target.value))}
        placeholder="Çalışan adı"
        className="border px-3 py-2 rounded-md"
      />

      <textarea
        value={shop.empDesc}
        onChange={e => dispatch(shopActions.setEmpDesc(e.target.value))}
        placeholder="Çalışan açıklaması"
        className="border px-3 py-2 rounded-md"
      />

      {/* ✅ EMPLOYEE IMAGE (DEĞİŞEN TEK KISIM) */}
      <div>
        <p className="mb-2 text-sm">Çalışan Fotoğrafı</p>

        <label className="flex gap-2 cursor-pointer">
          <img
            src={shop.empImage ? URL.createObjectURL(shop.empImage) : assets.upload_area}
            className="w-20 h-20 object-cover"
          />

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              dispatch(shopActions.setEmpImage(e.target.files?.[0] || null))
            }
          />

        </label>
      </div>


      <p className="text-sm">Bu çalışan hangi hizmetleri yapıyor?</p>

      <div className="flex gap-2 flex-wrap">
        {shop.services.length === 0 && (
          <span className="text-xs text-gray-400">Önce hizmet eklemelisin</span>
        )}

        {shop.services.map(srv => (
          <span
            key={srv._id}
            onClick={() => dispatch(shopActions.toggleEmpService(srv._id))}
            className={`px-2 py-1 border rounded-md cursor-pointer text-sm
              ${shop.empServices.includes(srv._id)
                ? "bg-pink-100 border-pink-300"
                : "bg-slate-200 border-slate-300"
              }`}
          >
            {srv.name}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch(shopActions.addEmployee())}
        className="bg-slate-300 px-3 py-1 rounded-md w-fit"
      >
        + Çalışan Ekle
      </button>

      {/* ✅ EMPLOYEE LIST (SENDE VARDI) */}
      <ul className="text-sm">
        {shop.employees.map(emp => (
          <li key={emp._id} className="flex items-center gap-2">
            {emp.image?.[0] && (
              <img
                src={URL.createObjectURL(emp.image[0])}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />

            )}
            <span>
              {emp.name} (
              {emp.service
                .map(id => shop.services.find(srv => srv._id === id)?.name)
                .filter(Boolean)
                .join(", ")}
              )
            </span>
          </li>
        ))}
      </ul>

      {/* ================= SUBMIT ================= */}
      <button type="submit" className="bg-black text-white py-3 w-32 mt-4">
        ADD SHOP
      </button>

    </form>
  );
};

export default Add;
