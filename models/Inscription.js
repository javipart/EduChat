const mongoose = require('mongoose');
const { Schema } = mongoose;

const inscriptionSchema = new Schema({
    idStudent: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    idGroup: {
        type: Schema.Types.ObjectId,
        ref: 'groups',
        required: true,
    },
});

module.exports = mongoose.model('inscriptions', inscriptionSchema);