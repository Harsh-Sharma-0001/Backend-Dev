const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = "mysecret";

// Dummy login route (generates token + OTP)
app.post('/login', (req, res) => {
    const user = { id: 1, name: "John" };

    const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

    res.json({ 
        token, 
        otp: "123456"  // simulate OTP
    });
});

// MFA Middleware
const mfaMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const otp = req.headers['x-otp'];

    if (!authHeader || !otp) {
        return res.status(401).json({ message: "Missing token or OTP" });
    }

    // Handle "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);

        if (otp !== "123456") {
            return res.status(403).json({ message: "Invalid OTP" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Protected route
app.get('/secure', mfaMiddleware, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});