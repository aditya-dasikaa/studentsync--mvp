import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  desc: { type: String },
  date: { type: String },
  priority: { type: String },
  category: { type: String },
  status: { type: String, default: "pending" },
  alarmEnabled: { type: Boolean, default: false },
  alarmTime: { type: String },
  alarmTriggered: { type: Boolean, default: false }
});

export default mongoose.model("Task", taskSchema);