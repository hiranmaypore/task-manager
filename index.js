import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import config from './config/config.js'; 

dotenv.config();

const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);


app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.port} in ${config.env} mode`);
});