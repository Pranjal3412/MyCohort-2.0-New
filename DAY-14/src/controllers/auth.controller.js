const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


 async function registerController(req, res){
    const {email, username, password, bio, profileImage} = req.body;


   // const isUserExistsByEmail = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(400).json({
    //         message: "User already exists with same email"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({username})

    // if(isUserExistsByUsername){
    //     return res.status(400).json({
    //         message: "User already exists with by username"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username}, 
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists" + (isUserAlreadyExists.email == email ? "Email already exist" : "Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })
    /**
         * - user ka data hona chahiye
         * - data unique hona chahiye
         */
    const token = jwt.sign(
        {
            id: user._id
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    )
    res.cookie("token", token)
    res.status(201).json({
        message: " User Registered successfully",
        user:{
            email : user.email,
            username : user.username,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
}

async function loginController(req, res){
    const { username, email, password } = req.body
/**
 * username
 * password
 * 
 * email
 * password
 */

  const user = await userModel.findOne({
        $or:[
            {
            /**
             * condition 1
             */
            username: username 
            },
            {
            /**
             * condition 2
            */
            email : email 
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const isPasswordValid = hash == user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    }) 
} 

module.exports = {
    registerController,
    loginController
}