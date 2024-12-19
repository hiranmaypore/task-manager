import mongoose from 'mongoose';
import { config } from '../config/config.js';



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
    });



export const User = mongoose.model('User', userSchema);

