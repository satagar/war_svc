const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    customerId: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true
    },
    status: {
        type: String,
        enum: ["Accepted", "Shipped", "Completed", "Failed"]
    },
    orderDate: {
        type: String,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    item:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ["Net-banking", "UPI", "Debit/Credit Card"],
        required: true
    }
});

module.exports = mongoose.model("order", orderSchema);