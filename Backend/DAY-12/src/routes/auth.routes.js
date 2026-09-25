const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post("/register", async(req, res) =>{
    const {email, name, password} = req.body 
    
    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exist with this email address"
        })
    }

    const user = await userModel.create({
        email, password, name
    })
    const token = jwt.sign(
        {
        id: user._id,
        email: user.email,
        password: user.password
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

     res.status(201).json({
        message:"user registerd",
        user,
        token
     })
})


/**
 * /api/auth/protected
 */
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);
})

module.exports = authRouter