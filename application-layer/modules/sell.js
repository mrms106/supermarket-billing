const mongoose = require('mongoose');

// Single Cart Schema to store all details
const cartSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  cartProducts: [
    {
      name: { type: String, required: true },
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      totalPrice: { type: Number, required: true }, // Price * Stock
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a Cart Model using the cart schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
