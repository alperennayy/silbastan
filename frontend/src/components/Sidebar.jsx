import React, { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleTabChange = (id) => {
        setActiveTab(id);
        setIsOpen(false);
    };

    return (
        <>
            {/* MOBİL ÜST BAR */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-black z-[60] p-4 flex justify-between items-center shadow-sm">
                <h1 className='text-2xl'>BE-NICE</h1>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-gray-50 text-gray-600 rounded-md transition-all"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* ARKA PLAN KARARTMA */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[70] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ANA SIDEBAR - Siyah Border Çizgili (lg:border-black) */}
            <div className={`
                fixed top-0 left-0 h-full bg-white z-[80] w-64 transition-transform duration-300 ease-in-out
                lg:static lg:translate-x-0 lg:z-auto lg:border-r lg:border-black lg:min-h-screen
                ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex flex-col h-full">
                    
                    {/* Logo ve Başlık Alanı */}
                    <div className="mb-10 px-2">
                        
                        <div className="mt-8">
                            <p className="text-[12px]  text-gray-400 uppercase tracking-[0.25em]">MÜŞTERİ PANELİ</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Profil Butonu */}
                        <button 
                            onClick={() => handleTabChange('profil')}
                            className={`p-3 rounded-md flex items-center gap-4 font-bold transition-all text-[11px] ${
                                activeTab === 'profil' 
                                ? 'bg-[#F5F3FF] text-[#8B5CF6] border border-purple-100 shadow-sm' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="text-lg">👤</span>
                            <span className="uppercase tracking-[0.12em]">Profil Bilgileri</span>
                        </button>

                        {/* Randevular Butonu */}
                        <button 
                            onClick={() => handleTabChange('randevular')}
                            className={`p-3 rounded-md flex items-center gap-4 font-bold transition-all text-[11px] ${
                                activeTab === 'randevular' 
                                ? 'bg-[#F5F3FF] text-[#8B5CF6] border border-purple-100 shadow-sm' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="text-lg">📅</span>
                            <span className="uppercase tracking-[0.12em]">Randevularım</span>
                        </button>
                    </div>

                    
                </div>
            </div>
            
            {/* Mobilde içerik kaymasını önlemek için boşluk */}
            <div className="lg:hidden h-16 w-full" />
        </>
    );
};

export default Sidebar;