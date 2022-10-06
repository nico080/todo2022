import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	task: { type: String, required: true },
	done: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'createdAt' } });


export default mongoose.models.task || mongoose.model("task", taskSchema);