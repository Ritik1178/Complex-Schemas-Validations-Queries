const User = require('../models/User');

// Create a new user
exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists'
            });
        }
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Add a new profile to user
exports.addProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        user.profiles.push(req.body);
        await user.save();

        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get all users with optional profile filtering
exports.getUsers = async (req, res) => {
    try {
        let query = User.find();
        
        if (req.query.profileName) {
            query = query.where('profiles.profileName').equals(req.query.profileName);
        }

        const users = await query;
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Search users and profiles
exports.search = async (req, res) => {
    try {
        const { name, profile } = req.query;
        
        const user = await User.findOne({ name });
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        if (profile) {
            const matchingProfile = user.profiles.find(p => p.profileName === profile);
            if (!matchingProfile) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User found, but profile not found',
                    user: {
                        name: user.name
                    }
                });
            }
            return res.status(200).json({
                status: 'success',
                data: matchingProfile
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const profileIndex = user.profiles.findIndex(
            p => p.profileName === req.params.profileName
        );

        if (profileIndex === -1) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        user.profiles[profileIndex].url = req.body.url;
        await user.save();

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const profileIndex = user.profiles.findIndex(
            p => p.profileName === req.params.profileName
        );

        if (profileIndex === -1) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        user.profiles.splice(profileIndex, 1);
        await user.save();

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}; 