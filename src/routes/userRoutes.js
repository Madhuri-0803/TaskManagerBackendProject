const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);  // User Registration
router.post('/login', userController.login);        // User Login

module.exports = router;
