const Joi = require('joi');

// Define the validation schema for createTask
const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    dueDate: Joi.date().iso().required(),
    assignees: Joi.array().items(Joi.string()).min(1).required()
});

// The validation schema for getTasks query parameters
const getTasksSchema = Joi.object({
    status: Joi.string().valid('incomplete', 'complete').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    assignees: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10)
});

// The validation schema for updateTask
const updateTaskSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    dueDate: Joi.date().iso().optional(),
    status: Joi.string().valid('incomplete', 'complete').optional(),
    assignees: Joi.array().items(Joi.string()).optional()
});

const deleteTaskSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createTaskSchema,
    getTasksSchema,
    updateTaskSchema,
    deleteTaskSchema
};