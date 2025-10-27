import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => {
  res.send({title: "CREATE a user"});
});

userRouter.put("/:id", (req, res) => {
  res.send({title: "UPDATE a user by id"});
});

userRouter.delete("/:id", (req, res) => {
  res.send({title: "DELETE a user by id"});
});

export default userRouter;