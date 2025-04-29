const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 1,
  },
  isActive:{
    type:Boolean,
    default:0,
  },
  startTime: {
    type: Date,
  },
  duration:{
    type:Number,
    default:0,
  },
  endTime: {
    type: Date,
  },
  isPaused: {
    type: Boolean,
    default: true,
  },
  pauseStep: [
    {
      type: { type: String },
      time: { type: Date },
    },
  ],
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
