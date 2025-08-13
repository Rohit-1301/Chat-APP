import express from "express";
import authRoutes from "./routes/user.routes.js";
import message from "./routes/message.routes.js";
import dotenv from "dotenv";
import { connectDB  } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port=process.env.PORT || 5000;

const app=express();

app.use(express.json());
app.use(cookieParser())


app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB();
})