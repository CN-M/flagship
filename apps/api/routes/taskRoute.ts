import express, { type Router } from "express";

const router: Router = express.Router();

import {
	createTask,
	deleteTask,
	getTasks,
	updateTask,
} from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";

router.route("/").get(protect, getTasks).post(protect, createTask);

router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
