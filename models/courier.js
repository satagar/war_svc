const { default: mongoose, mongo } = require("mongoose");

const courierSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Courier", courierSchema);