const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

const app = express();
app.use(express.json());

// Mongo sanitize
app.use(mongoSanitize());

// Custom XSS sanitize
app.use((req, res, next) => {
    const sanitize = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = xss(obj[key]);
            }
        }
    };

    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);

    next();
});

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/sanitizeDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Model
const User = require('./models/User');

// Routes
app.post('/create-user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});