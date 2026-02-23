import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientData, updateClientProfile } from '../redux/slices/userSlice';
import Sidebar from '../components/Sidebar';
import Randevularim from '../components/Randevu';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState('profil');
    const [name, setName] = useState('');

    useEffect(() => { dispatch(fetchClientData()); }, [dispatch]);
    useEffect(() => { if (user) setName(user.name); }, [user]);

    if (loading && !user) return <div className="p-10 text-center font-bold text-[#8B5CF6] animate-pulse uppercase tracking-widest text-xs">Yükleniyor...</div>;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FD]">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 p-4 md:p-8 flex flex-col items-center">
                {activeTab === 'profil' ? (
                    <div className="w-full max-w-3xl animate-fadeIn">
                        
                        {/* Karşılama Kartı - Daha İnce ve Keskin */}
                        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-6 text-center">
                            <h1 className="text-2xl  text-[#1F2937] tracking-tight uppercase">Profilim</h1>
                            <p className="text-[#8B5CF6] font-bold mt-1 text-sm italic">
                                Hoş geldin, <span className="lowercase">{user?.name}</span>
                            </p>
                            <p className="text-[9px] text-gray-300 font-black uppercase mt-2 tracking-widest">{user?.email}</p>
                        </div>

                        {/* Düzenleme Formu - Kompakt Yapı */}
                        <div className="bg-white p-6 md:p-10 rounded-xl border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Ad Soyad Değiştir</label>
                                    <input 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 bg-[#F9FAFB] border border-gray-100 rounded-lg font-bold text-[#1F2937] focus:bg-white focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                                        placeholder="İsminizi yazın..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">E-posta (Sabit)</label>
                                    <div className="w-full p-3 bg-[#F3F4F6] border border-gray-100 rounded-lg font-bold text-gray-400 cursor-not-allowed text-sm">
                                        {user?.email}
                                    </div>
                                </div>
                                
                                <div className="md:col-span-2 flex justify-center pt-4">
                                    <button 
                                        onClick={() => {
                                            dispatch(updateClientProfile(name));
                                            alert("Profil başarıyla güncellendi!");
                                        }}
                                        className="w-full md:w-1/2 bg-[#8B5CF6] text-white px-8 py-3.5 rounded-lgshadow-md hover:bg-[#7C3AED] transition-all transform active:scale-[0.98] text-[15px] tracking-widest uppercase"
                                    >
                                        KAYDET
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl">
                        <Randevularim />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;