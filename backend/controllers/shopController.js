import Shop from "../models/shopModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createShop = async (req, res) => {

    try {
        // =================== BODY ===================
        const { name, description, category, salonType, city, district, services, employees, } = req.body;

        // =================== IMAGES ===================
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    folder: "shops",
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // =================== SHOP DATA ===================
        const shopData = {
            name,
            description,
            category,
            salonType,
            location: {
                city,
                district,
                text: `${district}/${city}`,
            },
            images: imagesUrl,
            services: JSON.parse(services),   // [{_id, name, price}]
            employees: JSON.parse(employees), // [{_id, name, image, service}]
            date: Date.now(),
            rating: 0, // başlangıç rating,
            vendorId: req.vendor.id // ✅ giriş yapan vendor ID
        };

        // =================== SAVE ===================
        const shop = new Shop(shopData);
        await shop.save();


        res.json({ success: true, message: "Shop added", shop });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
