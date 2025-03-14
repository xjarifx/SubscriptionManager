import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", authorize, getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, (req, res) => {
  res.send({ msg: "put/update user" });
});

userRouter.delete("/:id", authorize, (req, res) => {
  res.send({ msg: "user got deleted" });
});

export default userRouter;
