const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


// Soft delete method
itemSchema.methods.softDelete = function() {
    this.isDeleted = true;
    return this.save();
};


// Middleware: hide deleted data automatically
itemSchema.pre(/^find/, function() {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model('Item', itemSchema);