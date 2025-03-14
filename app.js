import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscriptions.routes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(arcjetMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`${process.env.SERVER_URL}${PORT}`);
  await connectDB();
});
