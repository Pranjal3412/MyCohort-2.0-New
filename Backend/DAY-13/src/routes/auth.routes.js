const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require('crypto')

/**
 * /api/auth/register
 */
authRouter.post("/register", async(req, res) =>{
    const {email, name, password} = req.body 
    
    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exist with this email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email, password: hash, name
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

    res.status(200).json({
        message : "This is a protected route"
    })
})

/**
 * POST/api/auth/login
 */
/**
 * Controller
 */
authRouter.post("/login", async (req, res) => {
    const { email, password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message : "User not found with this email address"
        })
    }
    const isPasswordMathced = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMathced){
        return res.status(401).json({
            message : "Invalid Password"
        })
    }
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("Jwt_Token", token)
    res.status (200).json({
        message : "User logged in",
        user,
    })
})

module.exports = authRouter