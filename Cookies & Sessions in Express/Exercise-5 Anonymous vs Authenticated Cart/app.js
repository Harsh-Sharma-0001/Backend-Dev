const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));


// Add item to cart
app.post('/add-cart', (req, res) => {
    const item = req.body.item;

    //  Logged-in user → session
    if (req.session.user) {
        req.session.cart = req.session.cart || [];
        req.session.cart.push(item);
    }
    //  Guest user → cookies
    else {
        let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        cart.push(item);

        res.cookie('cart', JSON.stringify(cart), {
            maxAge: 24 * 60 * 60 * 1000
        });
    }

    res.send("Item added to cart");
});


// Login route (merge carts)
app.post('/login', (req, res) => {
    // simulate login
    req.session.user = { name: "John" };

    // get cookie cart
    const cookieCart = req.cookies.cart
        ? JSON.parse(req.cookies.cart)
        : [];

    // merge carts
    req.session.cart = (req.session.cart || []).concat(cookieCart);

    // clear cookie cart
    res.clearCookie('cart');

    res.send("Logged in & cart merged");
});


// View cart
app.get('/cart', (req, res) => {
    if (req.session.user) {
        return res.json({
            type: "session cart",
            items: req.session.cart || []
        });
    }

    const cart = req.cookies.cart
        ? JSON.parse(req.cookies.cart)
        : [];

    res.json({
        type: "cookie cart",
        items: cart
    });
});


// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});