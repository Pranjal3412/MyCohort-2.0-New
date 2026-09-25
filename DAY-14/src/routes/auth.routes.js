const express = require('express');
const authController = require('../controllers/auth.controller')


const authRouter = express.Router()
/**
 * POST /api/auth/register
 */
authRouter.post('/register', authController.registerUser) 

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.loginUser)

module.exports = authRouter