import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/productRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173', // The origin you want to allow
    credentials: true, // Allow cookies and other credentials
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));

dotenv.config()

const PORT = process.env.PORT || 8282

app.get("/", (req, res) => {
    
    res.send("Welcome Homepage")
})
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)


app.listen(PORT, () => {
    connectDB()
    console.log("Server running on port", PORT)
})