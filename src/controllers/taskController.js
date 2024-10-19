const Task = require('../models/Task');
const io = require('../services/socketService').getSocketInstance();
const { createTaskSchema, getTasksSchema, updateTaskSchema, deleteTaskSchema } = require('../schemaValidation/taskSchema');

exports.createTask = async (req, res) => {

    try {
        const { title, description, priority, dueDate, assignees } = req.body;

        const { error } = createTaskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if required fields are present
        if (!title || !priority || !dueDate || !assignees) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            status: 'incomplete', // Default status
            assignees,
            createdBy: req.user.userId, // Assuming req.user is populated by the auth middleware
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);  // Return the created task
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: "Error creating task" });
    }

};

exports.getTasks = async (req, res) => {
    // Extract query parameters and convert page and limit to numbers
    const { status, priority, assignees, page = 1, limit = 10 } = req.query;
    const query = {};

    const { error } = getTasksSchema.validate(req.query);
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (status) {
        query.status = status;
    }

    if (priority) {
        query.priority = priority;
    }

    if (assignees) {
        const assigneeArray = Array.isArray(assignees) ? assignees : [assignees];
        if (assigneeArray.length) {
            query.assignees = { $in: assigneeArray.map(assignee => mongoose.Types.ObjectId(assignee)) }; // Convert to ObjectId
        }
    }

    try {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        // Find tasks with pagination
        const tasks = await Task.find(query)
            .limit(limitNum) // Apply limit
            .skip((pageNum - 1) * limitNum) // Apply skip for pagination
            .populate('assignees', 'username');

        // Return the found tasks
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};


exports.updateTask = async (req, res) => {
    const { title, description, priority, dueDate, status, assignees } = req.body;

    const { error } = updateTaskSchema.validate({ id: req.params.id, title, description, priority, dueDate, status, assignees });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const taskId = req.params.id;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
        }

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                priority,
                dueDate,
                status,
                assignees
            },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    const { error } = deleteTaskSchema.validate({ id: taskId });
    if (error) return res.status(400).json({ message: 'Invalid Task ID' });

    try {
        // Check if the user has permission to delete the task
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Check if the task was found and deleted
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Emit the task deleted event
        // io.emit('taskDeleted', taskId); 

        // Respond with a success message
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};
