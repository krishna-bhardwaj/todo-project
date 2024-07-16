const express = require('express');
const listController = require('./../controllers/listController');

const router = express.Router();

router.post('/addtask', listController.createTask);
router.put('/updateTask', listController.updateTask);
router.post('/getTasks', listController.getTasks);

module.exports = router;
