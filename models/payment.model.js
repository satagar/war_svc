const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    paymentId:{
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
    Amount:{
        type:Number,
       required:true
    },
    paymentMethod:{
        type:String,
        default:"INTERNET_BANKING",
        enum:['INTERNET_BANKING',"COD","DEBIT_CARD"]//user only allow these method for payment
    },
    orderId:{
        type:mongoose.SchemaType.ObjectId,
        required:"order"
    },
    user:{
        type:mongoose.SchemaType.ObjectId,
        ref:"user"
    },
    paymentStatus:{
        type:String,
        default:"SUCCESS",
        enum:["SUCCESS","FAILED"]
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

const paymentModel = mongoose.model('payment',orderSchema);
module.exports = paymentModel