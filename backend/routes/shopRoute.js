import express from 'express';
import { createShop } from '../controllers/shopController.js';
import upload from '../middleware/multer.js';
import authVendor from '../middleware/vendorAuth.js';

const shopRouter = express.Router();

// ================= ADD SHOP =================
shopRouter.post('/create', authVendor,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    createShop
);


export default shopRouter;
