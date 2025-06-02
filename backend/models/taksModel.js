const mongoose = require("mongoose");
const { TASK_ACTIONS } = require("../constants");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  lastAction: {
    type: {
      name: {
        type: String,
        enum: Object.values(TASK_ACTIONS),
        required: true,
      },
      timeStamp: {
        type: Date,
        required: true,
      },
    },
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
