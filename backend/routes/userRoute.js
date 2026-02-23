import express from 'express'
import authClient from '../middleware/clientAuth.js';
import { getClientData , updateClientData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/client/data', authClient, getClientData);
userRouter.post('/client/update', authClient, updateClientData);
export default userRouter;