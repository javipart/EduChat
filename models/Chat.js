const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    idGroup: {
        type: Schema.Types.ObjectId,
        ref: 'groups',
        required: true,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }, 
});

module.exports = mongoose.model('chats', chatSchema);