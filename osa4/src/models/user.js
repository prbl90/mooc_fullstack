const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: String,
    password: String,
    adult: Boolean,
    name: String
});

module.exports = User;