const User = require('../Models/User.js');
// import User from '../Models/User.js';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.userRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'success',
            userId: user._id
        })
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                message: 'error',
                error: 'Invalid email or password'
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
}catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}