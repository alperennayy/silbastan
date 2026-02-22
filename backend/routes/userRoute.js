import express from 'express'
import authClient from '../middleware/clientAuth.js';
import { getClientData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/client/data', authClient, getClientData);

export default userRouter;