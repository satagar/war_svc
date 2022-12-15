const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    source:{
        type:mongoose.SchemaTypes.ObjectId,
       ref:"location"
    },
    destinetion:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"location"
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    tracking:{
        type:String,
        default:"PENDING",
        enum:["PENDING","RUNING","COMPLETED"]
    },
    paymentDetail:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"payment"
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
      immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
})

const orderModel = mongoose.model('order',orderSchema);
module.exports = orderModel