const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const locationModel = require('../models/location.model');
const paymentModel = require('../models/payment.model')
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

exports.orderFilrter = async (req,res)=>{
    const find = {};
    if(req.query.orderid){
        find.orderId = req.query.orderid
    }
    if(req.query.title){
        find.title ={$regex:req.query.title}
    }
    if(req.query.status){
        find.tracking = req.query.status
    }
    try{
        const orders = await orderModel.find(find);
        return res.status(200).send({
            orderSummary:orders
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
    }
}
exports.updateOrder = async(req,res)=>{
    const body = req.body
    if(!body.orderid){
         return res.status(404).send({
            message:"please fill orderID!"
         })
    }
    try{
        const order = await orderModel.findOne({orderId:body.orderid})
       if(body.title){
        order.title = body.title
       }
       if(body.description){
        order.description = body.description
       }
       if(body.status){
        order.tracking = body.status
       }
       await order.save();
       return res.status(200).send({
        message:"order update successfully",
        order:order
       })
    }catch(err){
   console.log(err.message);
   return res.status(500).send({
    message:"internal server error!",
    order:order
   })
    }
}
exports.deleteOrder = async (req,res)=>{
    const find = {}
    if(!req.body.orderId){
        return res.status(404).send({
           message:"please fill orderID!"
        })
   }
   find.orderId = req.body.orderId;
   try{
       const order = await orderModel.findOneAndDelete(find)
       if(!order){
            return res.status(201).send({
                message:"Order already deleted!"
            })
       }
        await locationModel.deleteOne({_id:order.source});
        await locationModel.deleteOne({_id:order.destinetion})
        await paymentModel.deleteOne({_id:order.paymentDetail})
        const user = await userModel.findOne({_id:order.user})
        const index = user.orderDetails.indexOf(order._id)
        user.orderDetails.splice(index,1);
        await user.save()
        return res.status(200).send({
            message:"order deleted successfully",
            Delted_Order : order
           })
   }catch(err){
    console.log(err.message);
    return res.status(500).send({
     message:"internal server error!",
    })
     }
}