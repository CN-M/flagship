import { createFlagSchema, updateFlagSchema } from "@flagship/schemas";
import express, { type Router } from "express";
import {
	createFlag,
	deleteFlag,
	getFlag,
	getTenantFlags,
	updateFlag,
} from "../controllers/flagController";
import { protect, validateBody } from "../middleware";

const router: Router = express.Router();

router
	.route("/")
	.get(protect, getTenantFlags)
	.post(protect, validateBody(createFlagSchema), createFlag);

router
	.route("/:id")
	.get(protect, getFlag)
	.put(protect, validateBody(updateFlagSchema), updateFlag)
	.delete(protect, deleteFlag);

export default router;
