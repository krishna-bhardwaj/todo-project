const express = require("express");
const tasksController = require("../controllers/tasksController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();
router.use(authenticateUser);

router.get("/getTasks", tasksController.getTasks);
router.post("/addTask", tasksController.addTask);
router.delete("/:taskId/deleteTask", tasksController.deleteTask);
router.patch("/:taskId/updateTitle", tasksController.updateTitle);
router.patch("/:taskId/startTask", tasksController.startTask);
router.patch("/:taskId/pauseTask", tasksController.pauseTask);
router.patch("/:taskId/resumeTask", tasksController.resumeTask);
router.patch("/:taskId/completeTask", tasksController.completTask);
router.get("/:taskId/getHistory", tasksController.getHistory);
router.get("/:getSummary", tasksController.getSummary);
module.exports = router;
