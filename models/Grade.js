const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    grade: {
        type: String,
        required: true,
    },
    idGroup: {
        type: Schema.Types.ObjectId,
        ref: 'groups',
        required: true,
    },
});

module.exports = mongoose.model('grades', gradeSchema);