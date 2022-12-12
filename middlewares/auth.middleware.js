const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload){
        if(err){
            res.sendStatus(401);
            return;
        }
        req.body.user = payload;
        next();
    });
}