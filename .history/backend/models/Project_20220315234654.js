import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
          description: {
            type: String,
            required: true,
        },
         user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
    },
        
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project  