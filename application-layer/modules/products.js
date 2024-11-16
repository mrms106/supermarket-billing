const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Changed to Number
        required: true
    },
    stock: {
        type: Number, // Changed to Number
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: { // Fixed typo from 'catagory'
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Product', products); // Exports the model directly
