const mongoose = require("mongoose");
const { TASK_ACTIONS } = require("../constants");

const actionSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    enum: Object.values(TASK_ACTIONS),
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  metaData: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model("TaskAction", actionSchema);
