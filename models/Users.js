const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: false,
    },
});

const User = mongoose.model('User', usersSchema);

module.exports = User;