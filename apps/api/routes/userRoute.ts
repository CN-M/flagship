import { userLoginSchema, userRegisterSchema } from "@flagship/schemas";
import express, { type Router } from "express";
import {
	deleteUser,
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
	updateUser,
} from "../controllers/userController";
import { protect, validateBody } from "../middleware";

const router: Router = express.Router();

router.route("/").delete(protect, deleteUser).put(protect, updateUser);

router.route("/login").post(validateBody(userLoginSchema), loginUser);
router.route("/register").post(validateBody(userRegisterSchema), registerUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").post(refreshUser);

export default router;
