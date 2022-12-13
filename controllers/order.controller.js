const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
exports.createOrder = async (req,res)=>{
    const data = {
        orderId:parseInt(Math.random()*10000),
        title:req.body.title,
    };
    let user;
    try{
           user = await userModel.findOne({userId:req.userId});
         if(!user){
            return res.status(401).send({
                message:"Please login!"
            })
         }

         data.user = user._id;
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
    try{
             const order = await orderModel.create(data)
             console.log(order)
            if(!user.orderDetails){
                user.orderDetails = [order._id]
            }else{
                user.orderDetails.push(order._id)
            }
            await user.save();
             return res.status(201).send({
                orderId:order.orderId,
                payableAmount:parseInt(Math.random()*10000),
                message:"please fill the source and destinetion via this link :/location/add"
            })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error in order creation!"
        })
    }
}