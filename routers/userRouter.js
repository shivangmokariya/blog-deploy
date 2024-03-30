import express from "express";
import { getUserInfo, updateUser } from "../controller/UserController.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.route("/:id").patch(verifyUser, updateUser);

export { userRouter };
