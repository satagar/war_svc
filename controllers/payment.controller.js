const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const paymentModel = require('../models/payment.model')
exports.payment = async (req,res)=>{
    const  orderid = req.body.orderId
    const data = {
        title:req.body.title,
        account:req.body.account,
        amount:req.body.amount,
    }
    try{
        const pay = await paymentModel.create(data)
        const order = await orderModel.findOne({orderId:orderid});
        order.paymentDetail = pay._id
        pay.orderId = order._id
        pay.user = order.user
        await order.save();
        await pay.save()
        return res.status(201).send({
            message:"payment successfully!",
            paymentSummary:pay
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"internal server error!"
        })
    }
}
