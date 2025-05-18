const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
    profileName: {
        type: String,
        required: [true, 'Profile name is required'],
        enum: {
            values: ['fb', 'twitter', 'github', 'instagram'],
            message: 'Profile name must be one of: fb, twitter, github, instagram'
        }
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: 'Please provide a valid URL'
        }
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profiles: [profileSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 