const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/sign_in', authController.login);

module.exports = router;
