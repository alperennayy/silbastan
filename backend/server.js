import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoute.js'
import connectCloudinary from './config/cloudinary.js'
import shopRouter from './routes/shopRoute.js'


const app = express()
const port = process.env.PORT || 4000

// DB
connectDB()

//Cloudinary
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']
app.use(cors({ origin: allowedOrigins, credentials: true }))


// Routes
app.use('/api/auth', authRouter)
app.use("/api/shops", shopRouter);


app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () =>
    console.log('Server started on PORT :' + port)
)
