const mongoose = require('mongoose');

const items = ["Books", "Electronic_Device"]
const order = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },

    address: {
        type: [String],
        required: true
    },

    status: {
        type: String,
        default: "UnPlaced"
    },

    typeOfOrder: {
        type: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: [items]
        },
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    orderPlacedAtLocation: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },

    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },

})

module.exports = mongoose.model("Order", order)