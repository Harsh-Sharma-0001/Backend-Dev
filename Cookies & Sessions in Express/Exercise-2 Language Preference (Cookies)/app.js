const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Set language
app.get('/set-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, {
        maxAge: 24 * 60 * 60 * 1000
    });

    res.send("Language set");
});

// Get language
app.get('/', (req, res) => {
    const lang = req.cookies.lang || "en";
    res.send(`Language: ${lang}`);
});

app.listen(3000, () => console.log("Server running"));