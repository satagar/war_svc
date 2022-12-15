const jwt = require('jsonwebtoken')
const key = require('../configs/scretKey')
exports.isValieduser = (req,res,next)=>{
       const token = req.headers.auth;
      jwt.verify(token,key.scretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            })
        }
        req.userId = decoded.userId;
        next()
      })
}