import Shop from "../models/shopModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id)
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" })
        }

        res.json(shop)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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

        const empImages = req.files.empImages || [];

        const empImagesUrl = await Promise.all(
            empImages.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    folder: "employees",
                    resource_type: "image",
                })
                return result.secure_url
            })
        )

        const employeesParsed = JSON.parse(employees);

        employeesParsed.forEach((emp, index) => {
            emp.image = empImagesUrl[index];
        });

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
            employees: employeesParsed, // [{_id, name, image, service}]
            date: Date.now(),
            rating: 0, // başlangıç rating,
            vendorId: req.vendor.id // ✅ giriş yapan vendor ID
        };

        // =================== SAVE ===================
        const shop = new Shop(shopData);
        await shop.save();


        res.json({ success: true, message: "Shop added", shop });
    } catch (error) {
    console.log("Mongoose Kayıt Hatası:", error.errors); // Hangi alanın hata verdiğini söyler
    res.json({ success: false, message: error.message });
}
};
// shopController.js içine ekle
export const getMyStore = async (req, res) => {
    try {
        // authVendor middleware'inden gelen req.vendor.id kullanılıyor
        const shop = await Shop.findOne({ vendorId: req.vendor.id });

        if (!shop) {
            return res.json({ success: false, message: "Henüz bir mağaza oluşturulmamış" });
        }

        res.json({ success: true, shop });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const listShops = async (req, res) => {
    try {

        //db den tüm mağazaları çekicez
        const shops = await Shop.find()

        console.log("mağazalar :", shops)

        res.json({ success: true, message: "mağazalar listelendi", shops })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}
