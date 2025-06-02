const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("TaskAction", actionSchema);
