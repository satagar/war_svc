const mongoose = require('mongoose');

const ED = new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },

    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "order"
    },

    items: {
        type: Number,
        required: true
    },

    typeOfDevice: {
        type: String,
        required: true,
    },

    deviceDescription: {
        type: String
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

module.exports = mongoose.model("Electronic_Device", ED)