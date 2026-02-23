import { createSlice } from '@reduxjs/toolkit';

const randevuSlice = createSlice({
  name: 'randevu',
  initialState: {
    // MVP aşamasında ekranı görebilmek için örnek veriler
    items: [
      {
        _id: "1",
        customerName: "Beyza",
        serviceName: "Saç Kesimi & Fön",
        employeeName: "Alperen",
        date: "2026-02-25",
        time: "14:30",
        status: "beklemede"
      },
      {
        _id: "2",
        customerName: "Alperen",
        serviceName: "Cilt Bakımı",
        employeeName: "Beyza",
        date: "2026-02-23",
        time: "10:00",
        status: "beklemede"
      },
      {
        _id: "3",
        customerName: "Ayşe ",
        serviceName: "Manikür",
        employeeName: "Selin",
        date: "2026-02-15",
        time: "11:00",
        status: "tamamlandi"
      }
    ],
    loading: false,
    error: null
  },
  reducers: {
    // Backend bağlantısı yapıldığında kullanılacak
    setRandevular: (state, action) => {
      state.items = action.payload;
    },
    // Randevu durumunu (Tamamlandı/İptal) güncellemek için
    durumGuncelle: (state, action) => {
      const { id, yeniDurum } = action.payload;
      const index = state.items.findIndex(item => item._id === id);
      if (index !== -1) {
        state.items[index].status = yeniDurum;
      }
    }
  }
});

export const { setRandevular, durumGuncelle } = randevuSlice.actions;
export default randevuSlice.reducer;