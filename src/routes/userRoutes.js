const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signUp', userController.signUp);  // User Registration
router.post('/login', userController.login);        // User Login

module.exports = router;
