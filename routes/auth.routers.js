import { Router } from "express";
const authRouter = Router();

authRouter.post("/signin", (req, res) => {
  res.send({ msg: "Sign in" });
});

authRouter.post("/signout", (req, res) => {
  res.send({ msg: "Sign out" });
});

authRouter.post("/signup", (req, res) => {
  res.send({ msg: "Sign up" });
});

export default authRouter;
