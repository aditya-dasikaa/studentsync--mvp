import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Add new task
router.post("/", async (req, res) => {
  try {
    const { userId, text, date, priority } = req.body;
    if (!userId || !text || !date || !priority)
      return res.status(400).json({ error: "Missing required fields" });

    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: "Error saving task" });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default router;
