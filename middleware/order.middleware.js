exports.inputCheck = (req,res,next)=>{
           if(!req.body.title){
            return res.status(404).send({
                message:"please fill title or description!"
            })
           }
           next()
}