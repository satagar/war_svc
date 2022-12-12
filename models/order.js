const { default: mongoose, mongo } = require("mongoose");

const statuses = ['placed', 'in_transit', 'delivered', 'cancelled'];

const orderSchema = mongoose.Schema({
    status: {
        type: String,
        enum: statuses,
        default: 'placed'
    },
    fromAddress: {
        type: String,
        required: true
    },
    toAddress: {
        type: String,
        required: true
    },
    items: {
        type: [String]
    },
    expectedDeliveryDate: {
        type: Date
    },
    actualDeliveryDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true,
    statics: {
        statuses: statuses
    },
});

module.exports = mongoose.model("Order", orderSchema);