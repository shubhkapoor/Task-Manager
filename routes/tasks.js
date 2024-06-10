const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.use(auth);

// Task routes
router.route('/tasks').get(taskController.getAllTasks);
router.route('/tasks').post(taskController.createTask);
router.route('/tasks/:taskId').put(taskController.updateTask);
router.route('/tasks/:taskId').delete(taskController.deleteTask);

// Subtask routes
router.route('/tasks/:taskId/subtasks').get(taskController.getSubtasksForTask);
router.route('/tasks/:taskId/subtasks').put(taskController.updateSubtasksForTask);

module.exports = router;