import mongoose from "mongoose";

// 1. Hizmetler için Alt Şema
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
}); 

// 2. Çalışanlar için Alt Şema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    services: { type: [String] } 
}); 

// 3. Ana Mağaza Şeması
const shopSchema = new mongoose.Schema({
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    salonType: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        district: { type: String, required: true },
        text: { type: String, required: true }
    },
    rating: { type: Number, default: 0 },
    
 
    services: [serviceSchema],   
    employees: [employeeSchema], 

    date: { type: Number, required: true }
});

const shopModel = mongoose.models.shop || mongoose.model("shop", shopSchema);

export default shopModel;