const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your Names'],
        minlength: [8, 'Name Should Contain 8 Characters']
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    img: {
        type: String,
        required: [true, 'Please enter img Link']
    }

})

module.exports = mongoose.model('User', userSchema);