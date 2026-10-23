const express = require('express');
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @routes POST /api/posts [protected]
 * - @description create a post with the content and image(optional) provided in the request body
 */
postRouter.post("/",upload.single("image"),identifyUser, postController.createPostController)

/**
 * @routes GET /api/posts [protected]
 * @description get all posts created by the user that the request come from. also check whether 
 * the post belongs to the user that the request come from
 */
postRouter.get("/", identifyUser, postController.getPostController)

/**
 * @routes GET /api/posts/details/:postId
 * @description return an detail about specific post with the id. also check whether 
 * the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)
 

/**
 * @routes Post /api/posts/like/:postid
 * @description like a post with the id provided in the request params.
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter