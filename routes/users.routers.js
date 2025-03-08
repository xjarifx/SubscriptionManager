import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ msg: "all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ msg: "specific user" });
});

userRouter.post("/", (req, res) => {
  res.send({ msg: "post an user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ msg: "put/update user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ msg: "user got deleted" });
});

export default userRouter;
