const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type : String,
        unique: [true, "Email already exists"],
        reuired: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/Pranjal3412/360_F_1168505794_IBCEiafsIrHFJ09e65P2vh5115C1XI7e.jpg"
    }
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;