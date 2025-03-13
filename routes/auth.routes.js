import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.post("/signup", signup);

export default authRouter;
