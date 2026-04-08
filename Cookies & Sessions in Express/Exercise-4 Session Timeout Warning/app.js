const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session setup (1 minute expiry)
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000   // 60 seconds
    }
}));


// Login route (start session)
app.get('/login', (req, res) => {
    req.session.user = { name: "John" };
    res.send("User logged in");
});


// Check session status
app.get('/session-info', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Session expired" });
    }

    res.json({
        message: "Session active",
        remainingTime: req.session.cookie.maxAge
    });
});


// Extend session
app.get('/extend-session', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Session expired");
    }

    // reset expiry
    req.session.cookie.maxAge = 60000;

    res.send("Session extended");
});


// Protected route
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Session expired, login again");
    }

    res.send("Welcome to dashboard");
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});