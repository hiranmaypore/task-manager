import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js'; // Ensure this path is correct
import User from '../model/user.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            password: hashedPassword,
            email
        });
        
        await user.save();
        
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            throw new Error('Invalid login credentials');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Invalid login credentials');
        }
        
        const token = jwt.sign(
            { userId: user._id }, 
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;