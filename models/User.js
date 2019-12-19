const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Generate JWT
UserSchema.methods.generateAuthToken = () => {
    return jwt.sign({_id: this._id}, config.get('private_key'));
};

const User = mongoose.model('User', UserSchema);

// Validate user
const validateUser = user => {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };

    return Joi.validate(user, schema);
};

exports.User = User;
exports.validateUser = validateUser;