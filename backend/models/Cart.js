const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    products: [{ productId: String, quantity: Number, price: Number }],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
