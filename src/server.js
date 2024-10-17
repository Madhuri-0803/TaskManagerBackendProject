require('dotenv').config();  // Load environment variables from .env

const app = require('./app');
const socketService = require('./services/socketService');

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

socketService.init(server);  // Initialize Socket.io
