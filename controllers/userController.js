const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Ensure the correct path

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({ message: 'Login successful', token: 'your-jwt-token' });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = { registerUser, loginUser, getUsers };
