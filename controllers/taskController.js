const User = require("../models/user");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const tasks = user.tasks ? user.tasks.filter(task => !task.isDeleted) : [];
    
    tasks.forEach(task => {
      task.subtasks = task.subtasks ? task.subtasks.filter(subtask => !subtask.isDeleted) : [];
    });

    res.json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    }

    const newTask = {
      subject: req.body.subject,
      deadline: req.body.deadline,
      status: req.body.status,
      isDeleted: req.body.isDeleted,
      subtasks: [],
    };

    user.tasks.push(newTask);

    await user.save();

    res.status(201).json({
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const taskId = req.params.taskId;

    const task = user.tasks.id(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.subject = req.body.subject;
    task.deadline = req.body.deadline;
    task.status = req.body.status;

    await user.save();

    res.status(201).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const taskId = req.params.taskId;

    const task = user.tasks.id(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.isDeleted = true;

    await user.save();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get subtasks for a task
exports.getSubtasksForTask = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const taskId = req.params.taskId;
    const task = user.tasks.id(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const subtasks = task.subtasks.filter(subtask => !subtask.isDeleted);

    res.json(subtasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update subtasks for a task
exports.updateSubtasksForTask = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const taskId = req.params.taskId;
    const task = user.tasks.id(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const updatedSubtasks = req.body.subtask;

    task.subtasks = [
      ...task.subtasks.filter((subtask) => subtask.isDeleted),
      ...updatedSubtasks,
    ];

    await user.save();

    res.status(201).json(task.subtasks.filter((subtask) => !subtask.isDeleted));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
