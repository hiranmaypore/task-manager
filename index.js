import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import userRouter from './src/controller/user.controller.js';
import taskRouter from './src/controller/task.controller.js';
import config from './src/config/config.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT} in ${config.env} mode`);
});