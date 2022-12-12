const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

exports.fetchAllOrders = async (req, res) => {
    const userId = req.body.user.userId;
    try{
        const result = await User.find({userId: userId}).populate('orders');
        res.status(200).send(result.orders);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Error occured. Please try again after sometime!"
        });
    }
}