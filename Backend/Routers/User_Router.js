const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/User');
const { protect } = require('../Middleware/UserToken');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;