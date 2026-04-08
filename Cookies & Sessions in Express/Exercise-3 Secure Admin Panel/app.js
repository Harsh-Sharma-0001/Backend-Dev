const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));

// Dummy users (for testing)
const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "user", password: "123", role: "user" }
];


// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Store user in session
    req.session.user = user;

    res.json({ message: "Login successful", user });
});


// LOGOUT ROUTE
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});


// AUTH MIDDLEWARE
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Login required" });
    }
    next();
};


// ROLE MIDDLEWARE
const isAdmin = (req, res, next) => {
    if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only access" });
    }
    next();
};


// PROTECTED USER ROUTE
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.json({
        message: "Welcome User Dashboard",
        user: req.session.user
    });
});


// ADMIN ROUTE
app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin Panel",
        user: req.session.user
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});