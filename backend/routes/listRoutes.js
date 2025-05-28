const express = require('express');
const listController = require('./../controllers/listController');
const {authenticateUser} = require('../middleware/auth');

const router = express.Router();
router.use(authenticateUser);

router.post('/addtask', listController.createTask);
router.put('/updateTask', listController.updateTask);
router.post('/getTasks', listController.getTasks);

module.exports = router;
