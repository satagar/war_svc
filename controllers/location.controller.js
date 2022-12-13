const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const locationModel = require('../models/location.model')
exports.createLocation = async (req,res)=>{
    const source = req.body.source
    const orderid = req.body.orderId
    const destinetion = req.body.destinetion;
    const sourceData = {
        locationId:parseInt(Math.random()*10000),
        city:source.city,
        state:source.state,
        country:source.country,
        pincode:source.pincode,
    };
    const destinetionData = {
        locationId:parseInt(Math.random()*10000),
        city:destinetion.city,
        state:destinetion.state,
        country:destinetion.country,
        pincode:destinetion.pincode,
    };
   sourceData.distance = parseInt(Math.random()*1000)
    try{
           const fromAddress= await locationModel.create(sourceData);
           const toAddress = await locationModel.create(destinetionData)     
           try{
                 const order = await orderModel.findOne({orderId:orderid});
                 order.source = fromAddress._id;
                 order.destinetion = toAddress._id;
                 await order.save()
           }catch(err){
            console.log(err.message);
            return res.status(500).send({
                message:"Internal server error!"
            })
           }      
             return res.status(201).send({
                orderId:orderid,
                message:"Payment  link :/payment/pay"
            })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}