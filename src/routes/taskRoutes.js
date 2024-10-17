const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const taskController = require('../controllers/taskController');

router.post('/', auth, taskController.createTask);              // Create Task
router.get('/', auth, taskController.getTasks);                 // Get Tasks (with pagination)
router.put('/:id', auth, role(['admin', 'user']), taskController.updateTask);  // Update Task
router.delete('/:id', auth, role(['admin']), taskController.deleteTask);       // Delete Task

module.exports = router;
