const mongoose = require('mongoose');
const subjects = mongoose.model('subjects');
const { Schema } = mongoose;

const groupSchema = new Schema({
    name: {
        type: String,
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