const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    caption : {
        type :String,
        default: ""
    },
    imgUrl : {
        type : String,
        required : [true, "ImgURL is required for creating a post"]
    },
    user:{
        ref : "Users",
        type : mongoose.Schema.Types.ObjectId,
        required : [true, "UserId is required for creating a post"]
    },
    likes:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }
})

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;