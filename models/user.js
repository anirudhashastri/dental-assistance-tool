const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    clinicName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uploads: [String] // Array of image paths
});

// Hash password before saving
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Verify password
UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema , 'RaiDental-Users');

module.exports = User;
