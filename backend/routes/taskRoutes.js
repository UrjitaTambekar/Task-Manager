import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// CREATE TASK
router.post("/", createTask);

// GET TASKS
router.get("/", getTasks);

// UPDATE TASK
router.put("/:id", updateTask);

// DELETE TASK
router.delete("/:id", deleteTask);

export default router;