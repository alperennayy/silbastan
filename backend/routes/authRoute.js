import express from 'express'
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);


export default authRouter;