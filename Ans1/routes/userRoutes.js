const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Add a new address for a user
router.post('/users/:userId/address', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        user.addresses.push(req.body);
        await user.save();

        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Get users summary
router.get('/users/summary', async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = users.length;
        const totalAddresses = users.reduce((acc, user) => acc + user.addresses.length, 0);
        
        const userSummary = users.map(user => ({
            name: user.name,
            addressCount: user.addresses.length
        }));

        res.status(200).json({
            status: 'success',
            data: {
                totalUsers,
                totalAddresses,
                users: userSummary
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Get user details with addresses
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Bonus: Delete a specific address
router.delete('/users/:userId/address/:addressId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const addressIndex = user.addresses.findIndex(
            addr => addr._id.toString() === req.params.addressId
        );

        if (addressIndex === -1) {
            return res.status(404).json({
                status: 'fail',
                message: 'Address not found'
            });
        }

        user.addresses.splice(addressIndex, 1);
        await user.save();

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

module.exports = router; 