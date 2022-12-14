exports.checkInputforPaymet = (req,res,next)=>{
    if(!req.body.orderId || !req.body.title || !req.body.account || !req.body.amount){
        return res.status(404).send({
            message:"please fill orderid , title , account number , payable amount fileds!"
        })
    }
    next()
}