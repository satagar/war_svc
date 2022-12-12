const mongoose = require('mongoose');

const book = new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },

    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "order"
    },

    noOfBooks: {
        type: Number,
        required: true
    },

    typeOfBook: {
        type: String,
        required: true,
    },

    bookDescription: {
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

module.exports = mongoose.model("Books", book)