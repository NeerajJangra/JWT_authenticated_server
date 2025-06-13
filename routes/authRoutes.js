import express, { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerController);

AuthRouter.post("/login", loginController);

export default AuthRouter;
