const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
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
        required: true,
    }, 
});

module.exports = mongoose.model('grades', chatSchema);