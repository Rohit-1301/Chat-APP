// import express from "express";
// import authRoutes from "./src/routes/user.routes.js";
// import messageRoutes from "./src/routes/message.routes.js";
// import dotenv from "dotenv";
// import { connectDB } from "./src/lib/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();
// const port = process.env.PORT || 5000;

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   connectDB();
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/user.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});