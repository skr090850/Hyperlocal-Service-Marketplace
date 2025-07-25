const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;