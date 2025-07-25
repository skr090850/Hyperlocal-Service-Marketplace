const Provider = require('../Models/Provider');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.providerRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const provider = await Provider.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'success',
            providerId: provider._id
        })
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}

exports.providerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const provider = await Provider.findOne({ email });
        if (!provider || !await bcrypt.compare(password, provider.password)) {
            return res.status(401).json({
                message: 'error',
                error: 'Invalid email or password'
            })
        }
        const token = jwt.sign({ providerId: provider._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
}catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}