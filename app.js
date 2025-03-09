import express from "express";
import cookieParser from "cookie-parser";
import PORT from "./config/env.js";
import userRouter from "./routes/users.routers.js";
import authRouter from "./routes/auth.routers.js";
import subscriptionRouter from "./routes/subscriptions.routers.js";
import connectDB from "./database/mongodb.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.listen(PORT, async () => {
  console.log(`${process.env.SERVER_URL}${PORT}`);
  await connectDB();
});
