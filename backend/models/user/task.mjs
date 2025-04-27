import mongoose from 'mongoose';

// Task Schema
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'To Do' }, 
  },
  { timestamps: true } 
)
 const Task = mongoose.model('Task', TaskSchema);
 export default Task