import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: null,

  // IMAGES (File)
  image1: null,
  image2: null,
  image3: null,
  image4: null,

  // SHOP INFO
  name: "",
  salonType: "",
  description: "",
  category: "",
  city: "",
  district: "",

  // SERVICES
  serviceName: "",
  price: "",
  services: [],

  // EMPLOYEES
  employees: [],
  empImage: null,
  empName: "",
  empDesc: "",
  empServices: []

};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {

    /* SHOP INFO */
    setShopName: (state, action) => {
      state.name = action.payload;
    },
    setSalonType: (state, action) => {
      state.salonType = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
      state.district = "";
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },

    /* IMAGES (File) */
    setImage1: (state, action) => {
      state.image1 = action.payload;
    },
    setImage2: (state, action) => {
      state.image2 = action.payload;
    },
    setImage3: (state, action) => {
      state.image3 = action.payload;
    },
    setImage4: (state, action) => {
      state.image4 = action.payload;
    },

    /* SERVICES */
    setServiceName: (state, action) => {
      state.serviceName = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    addService: (state) => {
      if (!state.serviceName || !state.price) return;

      state.services.push({
        _id: "srv-" + Date.now(),
        name: state.serviceName,
        price: Number(state.price),
      });

      state.serviceName = "";
      state.price = "";
    },

    /* EMPLOYEES */
    setEmpName: (state, action) => {
      state.empName = action.payload;
    },
    setEmpDesc: (state, action) => {
      state.empDesc = action.payload;
    },
    setEmpImage: (state, action) => {
      state.empImage = action.payload; // File
    },
    toggleEmpService: (state, action) => {
      state.empServices.includes(action.payload)
        ? state.empServices = state.empServices.filter(id => id !== action.payload)
        : state.empServices.push(action.payload);
    },
    addEmployee: (state) => {
      if (!state.empName || state.empServices.length === 0) return;

      state.employees.push({
        _id: "emp-" + Date.now(),
        name: state.empName,
        description: state.empDesc,
        image: state.empImage ? [state.empImage] : [],
        service: state.empServices,
      });

      state.empName = "";
      state.empDesc = "";
      state.empServices = [];
      state.empImage = null;
    },

    /* SUBMIT */
    addShop: (state) => {
      const images = [state.image1, state.image2, state.image3, state.image4].filter(Boolean);

      state.shop = {
        _id: Date.now().toString(),
        name: state.name,
        description: state.description,
        image: images,
        category: state.category,
        salonType: state.salonType,
        location: {
          city: state.city,
          district: state.district,
          text: `${state.district}/${state.city}`,
        },
        rating: 0,
        services: state.services,
        employees: state.employees,
      };
      console.log("🟢 işletmem (reducer)", state.shop);
      
    },
    resetShop: () => initialState

  },
});

export const shopActions = shopSlice.actions;
export default shopSlice.reducer;
