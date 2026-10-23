const express = require("express");
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


const userRouter = express.Router();



/**
 * @route POST /api/users/follow/:userid
 * @description follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/** 
 * @route DELETE /api/users/unfollow/:userid
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)


/**
 * @route PATCH /api/users/follow/:userid
 * @description update follow request
 * @access Private
 */
userRouter.patch("/follow-request/:username", identifyUser, userController.updateFollowRequestController)


module.exports = userRouter;