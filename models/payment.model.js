const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    account:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
       required:true
    },
    paymentMethod:{
        type:String,
        default:"INTERNET_BANKING"
    },
    orderId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"order"
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    paymentStatus:{
        type:String,
        default:"SUCCESS",
        enum:["SUCCESS","PENDING","FAILED"]
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

const paymentModel = mongoose.model('payment',paymentSchema);
module.exports = paymentModel