const mongoose = require('mongoose');
const { Schema } = mongoose;
const users = mongoose.model('users')

const groupSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    idSubject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects',
        required: true,
    },
    idTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = mongoose.model('groups', groupSchema);