import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  desc: String,
  date: String,
  priority: String,
  category: String,
  status: { type: String, default: "pending" },
  alarmEnabled: Boolean,
  alarmTime: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);