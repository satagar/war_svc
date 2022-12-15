const mongoose = require("mongoose");
const Location = require('./location.model');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location"
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "order"
    }
});

module.exports = mongoose.model("user", userSchema);