const express = require("express");
const tasksController = require("../controllers/tasksController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();
router.use(authenticateUser);

router.get("/getTasks", tasksController.getTasks);

module.exports = router;
