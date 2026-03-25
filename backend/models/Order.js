const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    products: Array,
    totalPrice: Number,
    status: { type: String, default: 'pending' },
    shippingAddress: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
