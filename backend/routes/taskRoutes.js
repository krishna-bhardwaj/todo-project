const express = require("express");
const tasksController = require("../controllers/tasksController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();
router.use(authenticateUser);

router.get("/getTasks", tasksController.getTasks);
router.post("/addTask", tasksController.addTask);
router.delete("/deleteTask/:taskId", tasksController.deleteTask);
router.patch("/updateTitle/:taskId", tasksController.updateTitle);

module.exports = router;
