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

    const action = new TaskAction({
      taskId: savedTask._id,
      name: TASK_ACTIONS.CREATE,
      timeStamp: savedTask.lastAction.timeStamp,
    });

    await action.save({ session });

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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const status = req.query.status;
    const searchText = req.query.searchText;

    const filter = { userId };

    if (status) {
      const statusArray = status.split(",");

      filter["lastAction.name"] = { $in: statusArray };
    }

    if (searchText) {
      filter["title"] = { $regex: searchText, $options: "i" };
    }

    const totalCount = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const hasMore = page * limit < totalCount;

    res.status(200).json({
      tasks,
      page,
      limit,
      totalCount,
      hasMore,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next, action) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    const taskId = req.params.taskId;

    const task = await Task.findOne({ _id: taskId, userId });

    let durationIncrement = 0;

    if (action == TASK_ACTIONS.PAUSE || TASK_ACTIONS.COMPLETE) {
      durationIncrement =
        new Date().getTime() - task.lastAction.timeStamp.getTime();
    }

    task.lastAction = {
      name: action,
      timeStamp: new Date(),
    };

    task.duration = task.duration + durationIncrement;

    const savedTask = await task.save();

    const taskAction = new TaskAction({
      taskId: task._id,
      name: action,
      timeStamp: savedTask.lastAction.timeStamp,
    });

    await taskAction.save();
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "Task updated Successfully", task: savedTask });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.updateTitle = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    const { title } = req.body;

    const task = await Task.findOne({ _id: taskId, userId });

    const prevTitle = task.title;

    task.title = title;

    const savedTask = await task.save();

    const action = new TaskAction({
      taskId: task._id,
      name: TASK_ACTIONS.EDIT,
      timeStamp: new Date(),
      metaData: {
        from: prevTitle,
        to: title,
      },
    });

    await action.save();

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "Task title updated successfully", task: savedTask });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const taskId = req.params.taskId;

    await Task.deleteOne({ _id: taskId });
    await TaskAction.deleteMany({ taskId });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Task deleted successFully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.startTask = async (req, res, next) => {
  updateTask(req, res, next, TASK_ACTIONS.START);
};

exports.pauseTask = async (req, res, next) => {
  updateTask(req, res, next, TASK_ACTIONS.PAUSE);
};

exports.resumeTask = async (req, res, next) => {
  updateTask(req, res, next, TASK_ACTIONS.RESUME);
};

exports.completTask = async (req, res, next) => {
  updateTask(req, res, next, TASK_ACTIONS.COMPLETE);
};

exports.getHistory = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const actions = await TaskAction.find({ taskId });
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const summary = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$lastAction.name",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {};
    for (const entry of summary) {
      result[entry._id] = entry.count;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
