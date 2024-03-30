import express from "express";
import { RegisterUser, loginUser } from "../controller/authController.js";

const AuthRouter = express.Router();

AuthRouter.route("/login").post(loginUser);
AuthRouter.route("/register").post(RegisterUser);

export { AuthRouter };
