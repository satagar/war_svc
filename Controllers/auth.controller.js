const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Address = require("../models/location.model");

exports.signup = async (req, res) => {
    const location = req.body.location;
    try{
        var locationCreated = await Location.create(location);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        });
    }
    const user = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        location: locationCreated.ObjectId
    }
    try {
        const userCreated = await User.create(user);
        const postResponse = {
            userId: userCreated.userId,
            name: userCreated.name,
            email: userCreated.email
        }
        res.status(201).send(postResponse);
    } catch (err) {
        console.log("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        });
    }
}

exports.signin = async (req, res) => {
    const user = await User.findOne({ userId: req.body.userId });

    if (user == null) {
        res.status(400).send({
            message: "Failed! Userid doesn't exist!"
        });
        return;
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    var token = jwt.sign({ id: user.userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400
    });
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        accessToken: token
    });
}