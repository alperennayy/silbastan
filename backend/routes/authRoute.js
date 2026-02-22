import express from 'express'
import { registerVendor, loginVendor, logoutVendor, registerClient, loginClient, logoutClient } from '../controllers/authController.js';


const authRouter = express.Router();

authRouter.post('/vendor/register', registerVendor);
authRouter.post('/vendor/login', loginVendor);
authRouter.post('/vendor/logout', logoutVendor);
authRouter.post('/client/register', registerClient);
authRouter.post('/client/login', loginClient)
authRouter.post('/client/logout', logoutClient);


export default authRouter;