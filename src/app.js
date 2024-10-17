require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

module.exports = app;
