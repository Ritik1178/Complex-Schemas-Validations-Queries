const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route 1: Create a new user
router.post('/add-user', userController.addUser);

// Route 2: Add a new profile to user
router.post('/add-profile/:userId', userController.addProfile);

// Route 3: Get all users with optional profile filtering
router.get('/get-users', userController.getUsers);

// Route 4: Search users and profiles
router.get('/search', userController.search);

// Route 5: Update a profile
router.put('/update-profile/:userId/:profileName', userController.updateProfile);

// Route 6: Delete a profile
router.delete('/delete-profile/:userId/:profileName', userController.deleteProfile);

module.exports = router; 