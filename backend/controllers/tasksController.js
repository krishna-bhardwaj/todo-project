const { TASK_ACTIONS } = require("../constants");
const Task = require("../models/taksModel");
const TaskAction = require("../models/actionModel");
const mongoose = require("mongoose");

exports.addTask = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const { title } = req.body;

    const newTask = new Task({
      userId,
      title,
      duration: 0,
      lastAction: {
        name: TASK_ACTIONS.CREATE,
        timeStamp: new Date(),
      },
    });

    const savedTask = await newTask.save({ session });

    const newAction = new TaskAction({
      taskId: savedTask._id,
      name: savedTask.lastAction.name,
      timeStamp: savedTask.lastAction.timeStamp,
    });

    await newAction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ task: savedTask });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// const checkActive = async (user) => {
//   let activeTasks = await List.find({ user: user, isActive: 1 });
//   if (activeTasks.length !== 0) return true;
//   return false;
// };

// //UPDATE TASK
// exports.updateTask = async (req, res) => {
//   try {
//     const { action, id, user } = req.body;
//     const isActiveTask = await checkActive(user);
//     let task = await List.findById(id);
//     let update = {};

//     if (action === "START") {
//       if (isActiveTask) {
//         return res
//           .status(403)
//           .json({ message: "Only one task can be active at a time." });
//       }
//       update = {
//         isActive: 1,
//         startTime: Date.now(),
//         status: 2,
//         isPaused: false,
//         isCompleted: false,
//         pauseStep: [{ type: "start", time: Date.now() }],
//       };
//     } else if (action === "PAUSE") {
//       update = {
//         isActive: 0,
//         duration: task.duration + (Date.now() - task.startTime),
//         isPaused: true,
//         isCompleted: false,
//         pauseStep: [...task.pauseStep, { type: "pause", time: Date.now() }],
//       };
//     } else if (action === "RESUME") {
//       if (isActiveTask) {
//         return res
//           .status(403)
//           .json({ message: "Only one task can be active at a time." });
//       }
//       update = {
//         isActive: 1,
//         startTime: Date.now(),
//         isPaused: false,
//         pauseStep: [...task.pauseStep, { type: "resume", time: Date.now() }],
//       };
//     } else if (action === "END") {
//       update = {
//         isActive: 0,
//         duration: task.isPaused
//           ? 0
//           : task.duration + (Date.now() - task.startTime),
//         endTime: Date.now(),
//         status: 3,
//         isCompleted: true,
//         pauseStep: [...task.pauseStep, { type: "end", time: Date.now() }],
//       };
//     }

//     const updatedTask = await List.findOneAndUpdate({ _id: id }, update, {
//       new: true,
//     });

//     return res
//       .status(200)
//       .json({ message: "Task updated successfully", data: updatedTask });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: "Error during update" });
//   }
// };
