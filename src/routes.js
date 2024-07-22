import { Router } from "express";
import authRouter from "./auth/auth.route.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;
