// controllers/taskController.js
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status, tags } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      status,
      tags,
      userId: req.user._id, // ✅ secure
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', err });
  }
};

// Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', err });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', err });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', err });
  }
};
