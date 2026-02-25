import express from 'express';
import { createShop, getShopById, listShops, getMyStore, updateShop, deleteShop} from '../controllers/shopController.js';
import upload from '../middleware/multer.js';
import authVendor from '../middleware/vendorAuth.js';

const shopRouter = express.Router();

// ================= MAĞAZA EKLEME =================
shopRouter.post('/create', authVendor,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
        { name: 'empImages', maxCount: 10 }
    ]),
    createShop
);

// ================= MAĞAZA GÜNCELLEME =================

shopRouter.put('/update/:id', authVendor, 
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
        { name: 'empImages', maxCount: 10 }
    ]), 
    updateShop
);

// ================= MAĞAZA SİLME =================
shopRouter.delete('/delete/:id', authVendor, deleteShop);

// ================= LİSTELEME & GETİRME =================
shopRouter.get('/list', listShops);
shopRouter.get('/my-shop', authVendor, getMyStore);
shopRouter.get('/:id', getShopById);

export default shopRouter;