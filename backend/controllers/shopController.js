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
            services: JSON.parse(services),   
            employees: employeesParsed, 
            date: Date.now(),
            rating: 0, 
            vendorId: req.vendor.id 
        };

        // =================== SAVE ===================
        const shop = new Shop(shopData);
        await shop.save();


        res.json({ success: true, message: "Shop added", shop });
    } catch (error) {
    console.log("Mongoose Kayıt Hatası:", error.errors);
    res.json({ success: false, message: error.message });
}
};

export const getMyStore = async (req, res) => {
    try {
        const shop = await Shop.findOne({ vendorId: req.vendor.id }).lean(); 

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
};
// ================= UPDATE SHOP =================
export const updateShop = async (req, res) => {
    try {
        const { name, description, category, salonType, city, district, services, employees } = req.body;
        const shopId = req.params.id;

        const shop = await Shop.findById(shopId);
        if (!shop || shop.vendorId !== req.vendor.id) {
            return res.status(403).json({ success: false, message: "Yetkisiz işlem." });
        }

        // 1. Ana Mağaza Resimleri (Mevcut logic doğru, yeni varsa yükler yoksa eskisi kalır)
        let updatedImages = [...shop.images];
        const imageKeys = ['image1', 'image2', 'image3', 'image4'];
        for (let i = 0; i < imageKeys.length; i++) {
            const file = req.files[imageKeys[i]] && req.files[imageKeys[i]][0];
            if (file) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "shops",
                    resource_type: "image",
                });
                updatedImages[i] = result.secure_url;
            }
        }

        // 2. Çalışanları Güncelleme (Yeni Mantık)
        let employeesParsed = JSON.parse(employees);
        const empImages = req.files.empImages || [];

        // Yeni yüklenen çalışan resimlerini sırayla işle
        let empImageCounter = 0;
        for (let emp of employeesParsed) {
            // Eğer frontend bu çalışanın resminin değiştiğini söylüyorsa veya image alanı null gelmişse
            // Ve Multer ile yeni bir dosya gelmişse Cloudinary'ye yükle
            if (emp.image && typeof emp.image === 'object' && empImages[empImageCounter]) {
                const result = await cloudinary.uploader.upload(empImages[empImageCounter].path, {
                    folder: "employees",
                    resource_type: "image",
                });
                emp.image = result.secure_url;
                empImageCounter++;
            }
            // Not: Eğer emp.image bir URL string ise (değişmemişse), ona hiç dokunmuyoruz.
        }

        const updateData = {
            name,
            description,
            category,
            salonType,
            location: {
                city,
                district,
                text: `${district}/${city}`,
            },
            images: updatedImages,
            services: JSON.parse(services),
            employees: employeesParsed, // Silinmiş ve güncellenmiş hali direkt kaydedilir
        };

        const updatedShop = await Shop.findByIdAndUpdate(shopId, updateData, { new: true });

        res.json({ success: true, message: "Değişiklikler başarıyla kaydedildi", shop: updatedShop });
    } catch (error) {
        console.log("Update Hatası:", error);
        res.json({ success: false, message: error.message });
    }
};

// ================= DELETE SHOP =================
export const deleteShop = async (req, res) => {
    try {
        const shopId = req.params.id;

        // Sadece kendi mağazasını silebilmesi için 
        const shop = await Shop.findById(shopId);
        
        if (!shop) {
            return res.status(404).json({ success: false, message: "Mağaza bulunamadı." });
        }

        if (shop.vendorId !== req.vendor.id) {
            return res.status(403).json({ success: false, message: "Bu mağazayı silme yetkiniz yok." });
        }

        await Shop.findByIdAndDelete(shopId);

        res.json({ success: true, message: "Mağaza kalıcı olarak silindi." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

