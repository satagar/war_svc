const express=require('express');
const mongoose = require('mongoose');
const app =express();
app.use(express.json());
const port=5000;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/deliveryservicedb', {family:4},(err)=>{
    if(err){
        console.log(err.massage);
    }else{
        console.log('database connected successfully')
        app.listen(port,()=>{
            console.log(`server started at port:${port}`)
        })
    }
})