import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  dueDate: { type: Date },
  assignedTo: { type: String }, // Optional, for future user assignment
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
