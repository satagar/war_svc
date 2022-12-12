const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    Pincode: Number
});

module.exports = mongoose.model('address', addressSchema);