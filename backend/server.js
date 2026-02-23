import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoute.js'
import connectCloudinary from './config/cloudinary.js'
import shopRouter from './routes/shopRoute.js'
import userRouter from './routes/userRoute.js'


const app = express()
const port = process.env.PORT || 4000

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']
app.use(cors({ origin: allowedOrigins, credentials: true }))

// Middleware
app.use(express.json())
app.use(cookieParser())
// Routes
app.use('/api/auth', authRouter);
app.use('/api/shops', shopRouter);
app.use('/api/user', userRouter);
// DB
connectDB()

//Cloudinary
connectCloudinary()

app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () =>
    console.log('Server started on PORT :' + port)
)
