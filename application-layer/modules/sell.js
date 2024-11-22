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
  date: { type: String, required: true  }, // New field for system-generated time
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
