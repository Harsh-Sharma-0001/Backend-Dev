const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    lastLogin: Date,
    lastLogout: Date,
    lastActive: Date
});

// FIXED middleware (no next)
userSchema.pre('save', function() {
    this.lastActive = new Date();
});

// Login method
userSchema.methods.loginUser = function() {
    this.lastLogin = new Date();
    return this.save();
};

// Logout method
userSchema.methods.logoutUser = function() {
    this.lastLogout = new Date();
    return this.save();
};

module.exports = mongoose.model('User', userSchema);