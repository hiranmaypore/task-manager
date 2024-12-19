import mongoose from 'mongoose';



const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    dueDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Task = mongoose.model('Task', taskSchema);
