const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    houseNo: {
        type: String,
        required: true
    },
    Locality: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String.apply,
        required: true
    },
    areaCode: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        immutable: true,
        defualt: Date.now()
    },
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    orderItem: {
        type: String,
        required: true,
    },
    orderQuantity: {
        type: Number,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true
    },
    alternatePhoneNo: {
        type: Number,
        required: false
    },
    emailid: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: addressSchema
    },
    createdOn: {
        type: Date,
        required: true,
        immutable: true,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        required: true,
        defualt: ""
    }
})



module.exports = mongoose.model('order', orderSchema)