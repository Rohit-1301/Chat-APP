// import mongoose from "mongoose";
// export const connectDB= async () => {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGODB_URI is not defined in environment variables");
//     }
    
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(
//       `The database is connected successfully with ${conn.connection.host}`
//     );
//   } catch (error) {
//     console.log("MongoDB connection failure", error);
//     process.exit(1);
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};