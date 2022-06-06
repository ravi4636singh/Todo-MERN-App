import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/auth-routes.js'
import cors from 'cors'
import noteRoutes from './routes/note-routes.js'
import profileRoutes from './routes/profile-routes.js'

dotenv.config()
const app = express()

// CORS Policy
app.use(cors())

// JSON middleware
app.use(express.json())

// DB connection
connectDB(process.env.MONGO_URI)

// Load Routes
app.use('/api/auth', authRoutes)
app.use('/api/note', noteRoutes)
app.use('/api/profile', profileRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT} PORT`))
