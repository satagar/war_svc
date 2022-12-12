const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
    sourceId:{
        type:String,
        required:true,
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
    distance:{
        type:Number,
        default:Math.floor(Math.random()*1000),//only for now
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
const sourceModel = mongoose.model('location',locationSchema);
module.exports = sourceModel