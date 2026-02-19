import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorShop } from "../redux/slices/shopSlice";

const ShopCart = () => {
  const dispatch = useDispatch();
  const { vendorShop, loading } = useSelector((state) => state.shop);

  useEffect(() => {
    if (!vendorShop) {
      dispatch(fetchVendorShop());
    }
  }, [dispatch, vendorShop]);

  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    try {
      if (img instanceof File || img instanceof Blob) {
        return URL.createObjectURL(img);
      }
    } catch (e) { return null; }
    return null;
  };

  const parseData = (data) => {
    if (!data) return [];
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return []; }
    }
    return data;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!vendorShop) return <div className="p-10 text-center text-sm border rounded-3xl">Mağaza bulunamadı.</div>;

  const servicesList = parseData(vendorShop.services);
  const employeesList = parseData(vendorShop.employees);
  const coverImage = vendorShop.images?.[0] || vendorShop.image1;

  // Şehir/İlçe verisini garantiye alma (bazı modellerde location objesi içinde olabilir)
  const city = vendorShop.city || vendorShop.location?.city || "Belirtilmemiş";
  const district = vendorShop.district || vendorShop.location?.district || "Belirtilmemiş";

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-10 bg-gray-50/50 min-h-screen">
      
      {/* 1. ANA PROFİL KARTI */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="h-48 w-full bg-gray-200 relative">
          {coverImage && (
            <img src={getImageUrl(coverImage)} className="w-full h-full object-cover opacity-90" alt="cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="px-10 pb-10 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-32 h-32 rounded-3xl bg-slate-900 border-[6px] border-white shadow-2xl flex items-center justify-center overflow-hidden">
               {vendorShop.name ? (
                 <span className="text-white text-5xl font-black italic">{vendorShop.name.charAt(0).toUpperCase()}</span>
               ) : null}
            </div>
            
            <div className="text-center md:text-left flex-1 mb-2">
              <h1 className="text-3xl font-extrabold text-slate-900 uppercase italic tracking-tighter">
                {vendorShop.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 items-center">
                <span className="px-4 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  {vendorShop.salonType}
                </span>
                <div className="flex items-center gap-1 text-slate-400 font-bold text-xs uppercase tracking-tight">
                  <span className="text-rose-500">●</span> {city} / {district}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-50">
            <p className="text-slate-500 italic text-sm leading-relaxed max-w-2xl">
               "{vendorShop.description || "İşletme hakkında açıklama bulunmuyor."}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. HİZMETLER KARTI */}
        <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-gray-200/40 border border-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Hizmet Menüsü</h2>
            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-lg">Fiyat Listesi</span>
          </div>
          <div className="space-y-3">
            {servicesList.map((s, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-rose-100 hover:bg-white transition-all">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-tight">{s.name}</span>
                <span className="text-sm font-black text-slate-900 italic">{s.price} ₺</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. EKİP KARTI */}
        <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-gray-200/40 border border-gray-50">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Uzman Ekibimiz</h2>
           <div className="grid grid-cols-2 gap-4">
              {employeesList.map((emp, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    {emp.image ? (
                      <img src={getImageUrl(emp.image)} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold uppercase text-xs">
                        {emp.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-black text-slate-800 uppercase italic truncate">{emp.name}</span>
                    <span className="text-[9px] text-rose-500 font-bold uppercase">Artist</span>
                  </div>
                </div>
              ))}
           </div>
           
           {/* EKSTRA BİLGİ ALANI */}
           <div className="mt-8 p-6 rounded-3xl bg-slate-900 text-white flex justify-between items-center">
              <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-widest text-slate-500">Kategori</p>
                 <p className="text-xs font-bold uppercase italic">{vendorShop.category || "Unisex"}</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] uppercase tracking-widest text-slate-500">Çalışan Sayısı</p>
                 <p className="text-xs font-bold uppercase italic">{employeesList.length} Kişi</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default ShopCart;