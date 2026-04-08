const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userTracker')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));


// Import model
const User = require('./models/User');


// Create user (for testing)
app.post('/create-user', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username
        });

        await user.save();

        res.json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Login route
app.post('/login/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.loginUser();

        res.json({
            message: "User logged in",
            lastLogin: user.lastLogin,
            lastActive: user.lastActive
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Logout route
app.post('/logout/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.logoutUser();

        res.json({
            message: "User logged out",
            lastLogout: user.lastLogout,
            lastActive: user.lastActive
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get user details
app.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});