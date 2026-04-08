const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/softDeleteDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Import model
const Item = require('./models/Item');


// Create item
app.post('/create-item', async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name
        });

        await item.save();

        res.json({ message: "Item created", item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all items (deleted ones hidden automatically)
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Soft delete item
app.delete('/delete-item/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        await item.softDelete();

        res.json({ message: "Item soft deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get single item
app.get('/item/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});