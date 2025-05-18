const mongoose = require('mongoose');
const validator = require('validator');

// Address Schema as a subdocument
const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    country: {
        type: String,
        default: 'India',
        trim: true
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v);
            },
            message: 'Pincode must be 6 digits'
        }
    }
});

// User Schema
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
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age must be greater than 0'],
        max: [120, 'Age must be less than 120']
    },
    addresses: [addressSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 