const mongoose = require('../Database/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);
 
module.exports = User;