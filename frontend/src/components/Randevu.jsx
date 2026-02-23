import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { randevuDelete, randevuTamamla } from '../redux/slices/userSlice';

const Randevu = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [filtre, setFiltre] = useState('yaklasan');

    const getTarih = (dateStr) => {
        const d = new Date(dateStr);
        return { 
            ay: d.toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase(), 
            gun: d.getDate() 
        };
    };

    const filtrelenmis = user?.randevular?.filter(r => r.status === filtre) || [];

    return (
        <div className="w-full animate-fadeIn pb-24 lg:pb-0">
            {/* ÜST BAŞLIK VE FİLTRELEME */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h2 className="text-2xl  text-gray-800 tracking-tighter uppercase">Randevu Takip Sistemi</h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Sistem üzerindeki aktif randevularınız</p>
                </div>
                
                <div className="bg-gray-100 p-1 rounded-lg flex gap-1 shadow-inner">
                    <button 
                        onClick={() => setFiltre('yaklasan')} 
                        className={`px-6 py-2 rounded-md text-[10px] font-black transition-all duration-300 ${filtre === 'yaklasan' ? 'bg-white shadow-sm text-[#8B5CF6]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        YAKLAŞANLAR
                    </button>
                    <button 
                        onClick={() => setFiltre('gecmis')} 
                        className={`px-6 py-2 rounded-md text-[10px] font-black transition-all duration-300 ${filtre === 'gecmis' ? 'bg-white shadow-sm text-[#8B5CF6]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        GEÇMİŞ
                    </button>
                </div>
            </div>

            {/* RANDEVU LİSTESİ */}
            <div className="grid gap-4">
                {filtrelenmis.length > 0 ? filtrelenmis.map((r) => {
                    const { ay, gun } = getTarih(r.date);
                    return (
                        <div key={r._id} className="group bg-white p-5 border border-gray-100 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-purple-200 hover:shadow-md transition-all duration-300">
                            
                            <div className="flex items-center gap-6 lg:gap-10 w-full">
                                {/* TARİH KUTUSU - Karemsi ve Keskin */}
                                <div className="bg-[#F5F3FF] px-4 py-3 rounded-xl text-center min-w-[80px] lg:min-w-[90px] border border-[#E9E4FF] group-hover:bg-[#8B5CF6] transition-colors duration-300">
                                    <p className="text-[9px] font-black text-[#A78BFA] group-hover:text-purple-200 uppercase tracking-widest">{ay}</p>
                                    <p className="text-2xl font-black text-[#7C3AED] group-hover:text-white leading-none mt-1">{gun}</p>
                                </div>
                                
                                {/* VERİ GRİDİ */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-12 flex-1 text-sm font-bold">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[9px] text-gray-300 uppercase font-black tracking-widest">Mağaza</p>
                                        <p className="text-gray-800 font-bold">{r.shopName}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[9px] text-gray-300 uppercase font-black tracking-widest">Hizmet</p>
                                        <p className="text-gray-600 font-semibold">{r.service}</p>
                                    </div>
                                    <div className="hidden sm:flex flex-col gap-1">
                                        <p className="text-[9px] text-gray-300 uppercase font-black tracking-widest">Çalışan</p>
                                        <p className="text-gray-600 flex items-center gap-2 font-semibold">
                                            <span className="w-2 h-2 rounded-full bg-[#00D084]"></span> {r.staffName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[9px] text-gray-300 uppercase font-black tracking-widest">Saat</p>
                                        <p className="text-[#8B5CF6] text-lg font-black">{r.time}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* AKSİYONLAR */}
                            <div className="flex gap-2 w-full md:w-auto">
                                {filtre === 'yaklasan' ? (
                                    <>
                                        <button 
                                            onClick={() => dispatch(randevuTamamla(r._id))} 
                                            className="flex-1 px-5 py-2.5 bg-[#00D084] text-white text-[10px] font-black rounded-lg uppercase tracking-wider hover:bg-[#00ba76] transition-all active:scale-95 shadow-sm"
                                        >
                                            Tamamlandı
                                        </button>
                                        <button 
                                            onClick={() => dispatch(randevuDelete(r._id))} 
                                            className="flex-1 px-5 py-2.5 bg-red-50 text-[#FF5B5B] text-[10px] font-black rounded-lg uppercase hover:bg-red-100 transition-all active:scale-95"
                                        >
                                            İptal
                                        </button>
                                    </>
                                ) : (
                                    <span className={`px-4 py-1.5 rounded-md text-[9px] font-black tracking-widest uppercase border ${r.status === 'gecmis' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                                        {r.status === 'gecmis' ? 'TAMAMLANDI' : 'İPTAL EDİLDİ'}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-center p-16 bg-white rounded-xl border-2 border-dashed border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-xs">
                        Gösterilecek randevu bulunmuyor
                    </div>
                )}
            </div>
        </div>
    );
};

export default Randevu;