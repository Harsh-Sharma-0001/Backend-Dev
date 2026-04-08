const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Step 1
app.post('/step1', (req, res) => {
    req.session.user = { name: req.body.name };
    res.send("Step 1 saved");
});

// Step 2
app.post('/step2', (req, res) => {
    req.session.user.age = req.body.age;
    res.send("Step 2 saved");
});

// Final step
app.get('/result', (req, res) => {
    res.json(req.session.user);
});

app.listen(3000, () => console.log("Server running"));