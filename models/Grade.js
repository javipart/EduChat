const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradeSchema = new Schema({
    grade: {
        type: String,
        required: true,
    },
    idSubject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects',
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('grades', gradeSchema);