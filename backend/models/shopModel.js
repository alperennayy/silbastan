import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },


    images: { type: [String], required: true },
    // shop image url listesi

    category: { type: String, required: true },

    salonType: { type: String, required: true },

    location: {
        city: { type: String, required: true },
        district: { type: String, required: true },

    },

    rating: { type: Number, default: 0 },

    services: { type: Array, required: true },
    // [{ _id, name, price }]

    employees: { type: Array, required: true },
    // [{ _id, name, image, service }]

    date: { type: Number, required: true }
});

const shopModel =
    mongoose.models.shop || mongoose.model("shop", shopSchema);

export default shopModel;
