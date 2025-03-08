import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ msg: "get all subs" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ msg: "get specific sub" });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ msg: "post a sub" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ msg: "put/update a sub" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ msg: "delete a sub" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ msg: "user sub details" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ msg: "cancel user sub" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ msg: "upcoming renewals" });
});

export default subscriptionRouter;
