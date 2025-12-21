import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoute.js'

const app = express()
const port = process.env.PORT || 4000

// DB
connectDB()

// Middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true
}))

// Routes
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () =>
    console.log('Server started on PORT :' + port)
)
