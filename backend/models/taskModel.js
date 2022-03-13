import mongoose from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
      project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
   
    priority: {
      type: String,
      default: "Low",
      enum: ["High", "Medium", "Low"] 
        },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Delivered", "Cancelled"] 
    },
    
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task',taskSchema)

export default Task