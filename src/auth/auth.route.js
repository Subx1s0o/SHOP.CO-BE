import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  return res.send("okay");
});

authRouter.post("/signup", authController.createUser);

export default authRouter;
