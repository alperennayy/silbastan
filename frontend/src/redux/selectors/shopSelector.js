// redux/selectors/shopSelectors.js

// --- FILTRELEME FONKSIYONU ---
const applyFilters = (shops, city, district, salonType) => {
    if (!Array.isArray(shops)) return [];

    return shops.filter((shop) => {
        const matchesCity = city
            ? shop.location?.city?.toLowerCase() === city.toLowerCase()
            : true;

        const matchesDistrict = district
            ? shop.location?.district?.toLowerCase() === district.toLowerCase()
            : true;

        const matchesType = salonType
            ? shop.salonType?.toLowerCase() === salonType.toLowerCase()
            : true;



        return matchesCity && matchesDistrict && matchesType;
    });
};

// --- SELECTOR ---
export const selectFilteredShops = (state) => {
    const { shops } = state.shop;      // 🔥 DB’den gelen veri
    const { city, district, salonType } = state.filter;

    if (!city && !district && !salonType) {
        return shops;
    }

    return applyFilters(shops, city, district, salonType);
};
