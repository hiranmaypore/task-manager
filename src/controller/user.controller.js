import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../model/user.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: 'Username or email already exists' });
    } else {
      res.status(400).send(error);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid login credentials' });
  }
});

export default router;