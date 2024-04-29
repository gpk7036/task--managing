const {userModel} = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userRegister = async (req, res) => {
    const {username, email, password, role} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user) {
            res.status(404).send("user already exists");
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) res.status(500).send(err);
            const user = new userModel({email, password:hash, username, role});
            await user.save();
            res.status(201).send("User created");
        })
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
}

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send("Unauthorized");
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if(result) {
                const user = await userModel({email, password});
                const token = jwt.sign({userId : user._id, role : user.role}, process.env.SECRETKEY, {expiresIn: '1hr'})
                return res.status(201).json({"message":"User is logged in", token});
            } else {
                return res.status(411).send("Password doesn't match");
            }
        })
    } catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    userRegister,
    userLogin
}