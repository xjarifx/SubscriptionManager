import { Router } from "express";
import {
  getUser,
  getUsers,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.put("/:id", (req, res) => {
  res.send({ msg: "put/update user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ msg: "user got deleted" });
});

export default userRouter;
