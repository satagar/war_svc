const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const key = require('../configs/scretKey')
const jwt = require('jsonwebtoken')
const {
    sigup
} = require('../helpers/user.helper')
exports.sigup = async (req, res) => {
    if (!sigup.isValiedBody(req.body)) {
        return res.status(404).send({
            message: "Please Provide name , email , password !"
        })
    }
    const data = {
        userId: parseInt(Math.random() * 1000),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 9),
    };
    try {
        const user = await userModel.create(data);
        return res.status(201).send({
            message: "Signup successfully!"
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.login = async (req, res) => {
     const data = req.body;
     try{
        const user = await userModel.findOne({email:data.email});
        if(!user){
            return res.status(404).send({
                message:"user does not exists!"
            })
        }
        const isValied = bcrypt.compareSync(data.password,user.password);
        if(!isValied){
            return res.status(401).send({
                message:"login failed due to invalied password"
            })
        }
        const token  = jwt.sign({userId:user.userId},key.scretKey,{
            expiresIn:'1d'
        })
        return res.status(401).send({
            message:"login successfully",
            userId:user.userId,
            accessToken:token
        })
     }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error!"
        })
     }
}
exports.filter = async (req,res) =>{
    const find = {};
   if(req.query.id){
    find._id = req.query.id
   }
    if(req.query.name){
        find.name = {$regex:req.query.name}
    }
    try{
           const finded = await userModel.find(find);
           return res.status(200).send({
             users:finded
           })
    }catch(err){
        return res.status(500).send({
            message:"internal server error!"
        })
    }
}