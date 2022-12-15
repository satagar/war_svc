const mongoose=require('mongoose');
const locationSchema=new mongoose.Schema({
    locationId:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
        immutable:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports=mongoose.model('location',locationSchema);