import express, { Router } from "express";
import { authValidator } from "../validators/authValidators.js";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const AuthRouter = Router();

AuthRouter.post("/register", authValidator, validateRequest, registerController);

AuthRouter.post("/login", loginController);

export default AuthRouter;
