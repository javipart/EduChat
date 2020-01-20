const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    typeUser: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('users', userSchema);