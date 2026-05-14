import Task from "../models/Task.js";

// ================= CREATE TASK =================

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    // SOCKET EMIT
    const io = req.app.get("io");

    io.emit("taskCreated", task);

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET TASKS =================

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE TASK =================

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    const io = req.app.get("io");

    io.emit("taskUpdated", task);

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE TASK =================

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");

    io.emit("taskDeleted", req.params.id);

    res.json({
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
