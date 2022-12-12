require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { createRoutes } = require('./routes/parentRouter');
const app = express();

app.use(express.json());

// connection
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb://localhost:27017/courierService');
        console.log("connected to DB");
    }catch(err){
        console.log(err);
    }
}
connectDB();

createRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});