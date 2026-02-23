import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { durumGuncelle } from '../redux/slices/randevuSlice'; 

const Randevu = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.randevu);
  const [tab, setTab] = useState('upcoming');

  const suan = new Date();

  const yaklasanlar = items
    .filter(r => new Date(r.date) >= suan && r.status === 'beklemede')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const gecmis = items
    .filter(r => new Date(r.date) < suan || r.status !== 'beklemede')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const liste = tab === 'upcoming' ? yaklasanlar : gecmis;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl text-gray-800 tracking-tight uppercase">Randevu Takip Sistemi</h1>
          <p className="text-sm text-gray-500 mt-1">Mağazanıza gelen randevuları buradan yönetebilirsiniz.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setTab('upcoming')}
            className={`px-4 md:px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'upcoming' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Yaklaşanlar
          </button>
          <button 
            onClick={() => setTab('past')}
            className={`px-4 md:px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'past' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Geçmiş
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {liste.length > 0 ? liste.map((item) => (
          <div key={item._id} className="group bg-white border border-gray-100 p-4 md:p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between hover:border-purple-200 hover:shadow-md transition-all duration-300">
            
            <div className="flex flex-row items-center space-x-4 md:space-x-6">
              {/* TARİH KUTUSU */}
              <div className="bg-purple-50 text-purple-700 p-2 md:p-3 rounded-2xl min-w-[65px] md:min-w-[75px] text-center border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <p className="text-[10px] md:text-xs font-bold uppercase opacity-80">{new Date(item.date).toLocaleDateString('tr-TR', { month: 'short' })}</p>
                <p className="text-xl md:text-2xl font-black">{new Date(item.date).getDate()}</p>
              </div>

              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-3 flex-1">
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Müşteri</p>
                  <p className="font-bold text-gray-800 text-xs md:text-base truncate">{item.customerName}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Hizmet</p>
                  <p className="text-gray-700 font-medium text-xs md:text-base truncate">{item.serviceName}</p>
                </div>
                {/* Mobilde geri gelen Çalışan kısmı */}
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Çalışan</p>
                  <p className="text-gray-600 flex items-center font-medium text-xs md:text-base">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 shrink-0"></span>
                    <span className="truncate">{item.employeeName}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Saat</p>
                  <p className="text-purple-600 font-extrabold text-sm md:text-base">{item.time}</p>
                </div>
              </div>
            </div>

            {/* AKSİYON BUTONLARI */}
            <div className="flex flex-row space-x-2 mt-5 lg:mt-0 w-full lg:w-auto">
              {tab === 'upcoming' ? (
                <>
                  <button 
                    onClick={() => dispatch(durumGuncelle({ id: item._id, yeniDurum: 'tamamlandi' }))}
                    className="flex-1 lg:flex-none px-3 md:px-4 py-2.5 bg-green-500 text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider hover:bg-green-600 transition shadow-sm active:scale-95"
                  >
                    Tamamlandı
                  </button>
                  <button 
                    onClick={() => dispatch(durumGuncelle({ id: item._id, yeniDurum: 'iptal' }))}
                    className="flex-1 lg:flex-none px-3 md:px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider hover:bg-red-100 transition active:scale-95"
                  >
                    İptal
                  </button>
                </>
              ) : (
                <span className={`flex-1 lg:flex-none text-center px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase ${item.status === 'tamamlandi' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                  {item.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
            <p className="italic">Şu an gösterilecek bir randevu bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Randevu;