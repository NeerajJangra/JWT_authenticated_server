import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import AuthRouter from "./routes/authRoutes.js"
import { protect } from "./middlewares/authMiddleware.js"
import { RateLimiter } from "./middlewares/rateLimiter.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("MongoDB connected")
    }).catch((error)=>{
        console.log(`Error while connecting DB ${error}`)
    })

const PORT = process.env.PORT
app.use(express.json())

app.use(RateLimiter)
app.use('/api/auth', AuthRouter)


app.get('/api/tasks/protected', protect, (req,res)=> {
    console.log("came to request")
    res.json({message: "This route is protected"})
})


app.listen(PORT, ()=>{
    console.log("Server is listening to port ", PORT)
})