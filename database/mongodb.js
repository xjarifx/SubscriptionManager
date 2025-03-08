import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Provide a database uri inside .env");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
