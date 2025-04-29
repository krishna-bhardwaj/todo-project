const List = require("../models/listModel");

exports.createTask = async (req, res, next) => {
  try {
    const { title, user } = req.body;
    const list = new List({ todoTitle: title, user });
    await list.save().then(() => res.status(200).json({ list }));
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const list = await List.find({ user: req.body.username });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No Task" });
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

const checkActive = async (user) => {
  let activeTasks = await List.find({ user: user, isActive: 1 });
  if (activeTasks.length !== 0) return true;
  return false;
};

exports.updateTask = async (req, res) => {
  try {
    const { action, id, user } = req.body;
    const isActiveTask = await checkActive(user);
    let task = await List.findById(id);
    let update = {};

    if (action === "START") {
      if (isActiveTask) {
        return res
          .status(403)
          .json({ message: "Only one task can be active at a time." });
      }
      update = {
        isActive: 1,
        startTime: Date.now(),
        status: 2,
        isPaused: false,
        isCompleted: false,
        pauseStep: [{ type: "start", time: Date.now() }],
      };
    } else if (action === "PAUSE") {
      update = {
        isActive: 0,
        duration: task.duration + (Date.now() - task.startTime),
        isPaused: true,
        isCompleted: false,
        pauseStep: [...task.pauseStep, { type: "pause", time: Date.now() }],
      };
    } else if (action === "RESUME") {
      if (isActiveTask) {
        return res
          .status(403)
          .json({ message: "Only one task can be active at a time." });
      }
      update = {
        isActive: 1,
        startTime: Date.now(),
        isPaused: false,
        pauseStep: [...task.pauseStep, { type: "resume", time: Date.now() }],
      };
    } else if (action === "END") {
      update = {
        isActive: 0,
        duration: task.isPaused
          ? 0
          : task.duration + (Date.now() - task.startTime),
        endTime: Date.now(),
        status: 3,
        isCompleted: true,
        pauseStep: [...task.pauseStep, { type: "end", time: Date.now() }],
      };
    }

    const updatedTask = await List.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Task updated successfully", data: updatedTask });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error during update" });
  }
};
