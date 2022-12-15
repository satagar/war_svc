exports.checkInput = (req,res,next)=>{
        if( !req.body.source || !req.body.orderId || !req.body.destinetion){
            return res.status(404).send({
                message:"please fill source , orderid, destinetion fields!"
            })
        }
        const source = req.body.source
        if(!source.city || !source.state || !source.country || !source.pincode){
            return res.status(404).send({
                message:"please fill in source = city,state,pincode ,country fields!"
            })
        }
        const destinetion = req.body.destinetion
        if(!destinetion.city || !destinetion.state || !destinetion.country || !destinetion.pincode){
            return res.status(404).send({
                message:"please fill  in destinestion =  city,state,pincode ,country fields!"
            })
        }
        next()
}