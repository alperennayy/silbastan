import React from "react";
import { useSelector } from "react-redux";

const ShopCart = () => {
  const shop = useSelector(state => state.shop.vendorShop);

  // 🔴 HENÜZ SHOP YOKSA
  if (!shop) {
    return (
      <div className="p-6 text-gray-500 text-center">
        Henüz bir işletme oluşturulmadı.
      </div>
    );
  }

  // 🖼️ Kapak görseli (local File)
  const coverImage =
    shop.images && shop.images[0]
      ? URL.createObjectURL(shop.images[0])
      : null;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">

        {/* ================= IMAGE ================= */}
        <div className="h-52 w-full bg-gray-100">
          {coverImage ? (
            <img
              src={coverImage}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              Görsel yok
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 flex flex-col gap-6">

          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{shop.name}</h2>
              <p className="text-sm text-gray-500">
                {shop.city} / {shop.district}
              </p>
            </div>

            <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
              {shop.salonType}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm">
            {shop.description}
          </p>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-xl border p-4 text-center hover:border-black transition">
              <p className="text-2xl font-bold">
                {shop.services?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Hizmet</p>
            </div>

            <div className="rounded-xl border p-4 text-center hover:border-black transition">
              <p className="text-2xl font-bold">
                {shop.employees?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Çalışan</p>
            </div>

            <div className="rounded-xl border p-4 text-center hover:border-black transition">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-gray-500">Randevu</p>
            </div>

          </div>

          {/* ================= SERVICES ================= */}
          {shop.services?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Hizmetler</h3>
              <div className="flex flex-wrap gap-2">
                {shop.services.map(s => (
                  <span
                    key={s.id}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                  >
                    {s.name} – {s.price}₺
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ================= EMPLOYEES ================= */}
          {shop.employees?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Çalışanlar</h3>

              <div className="flex flex-col gap-3">
                {shop.employees.map(emp => (
                  <div
                    key={emp.id}
                    className="flex items-center gap-3 p-3 border rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      {emp.image ? (
                        <img
                          src={URL.createObjectURL(emp.image)}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {emp.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {emp.services?.length || 0} hizmet
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShopCart;
