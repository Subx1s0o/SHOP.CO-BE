import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  return res.send("okay");
});

authRouter.post("/sign-up", authController.createUser);
authRouter.post("/sign-in", authController.loginUser);

export default authRouter;
