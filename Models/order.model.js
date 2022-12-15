const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    customerId:{
        type:String,
        required:true
    },
    deliveryLocation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:["Accepted","shipped","failed"]
    },
    item:{
        type:String,
        required:true
    },
    orderDate:{
        type:String,
        required:true,
        default:()=>{
            return Date.now();
        },
    },
    quantity:{
        type:Numaber,
        required:true
    },
    paymentMode:{
        type:String,
        required:true,
        enum:["UPI","net Banking","Dabit card"]
    }
})

module.exports=mongoose.model('order',orderSchema);