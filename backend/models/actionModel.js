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

actionSchema.methods.toJSON = function () {
  const action = this.toObject();
  action.id = action._id;
  delete action._id;
  delete action.__v;
  delete action.taskId;
  return action;
};

module.exports = mongoose.model("TaskAction", actionSchema);
