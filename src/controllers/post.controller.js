const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs').default;
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const likeModel = require('../models/like.model');

const imageKit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
   
   
   const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName : "Test",
    folder: "cohort-2-insta-clone-posts"
   })
  
   const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
   })
   res.status(201).json({
    message: "Post created successfully",
    post
   })
}

async function getPostController(req, res) { 
   
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })
    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })
}

async function getPostDetailsController(req, res) {
    
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }
 
    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden containt , You are not authorized to view this post"
        })
    }
    return res.status(200).json({
        message: "Post details fetched successfully.",
        post
    })
}

async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const existingLike = await likeModel.findOne({
        post: postId,
        user: username
    })
    if(existingLike){
        return res.status(200).json({
            message: "You have already liked this post",
            like: existingLike
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })
    res.status(201).json({
        message: "Post liked successfully",
        like
    })
}

module.exports = { 
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,

};