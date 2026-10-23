const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");





async function followUserController(req, res) {
     const followerUsername = req.user.username
     const followeeUsername = req.params.username


     if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "You are trying to follow doea not exist user"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending"
})

res.status(201).json({
    message: `Follow request sent to ${followeeUsername}`,
    status: followRecord.status
})

}

async function updateFollowRequestController(req, res){
    try{
        const currentUsername = req.user.username
        const {username : followerUsername} = req.params
        const {status} = req.body;

        if(!["accepted", "rejected"].includes(status)){
            return res.status(400).json({
                message: "Status must be either accepted or rejected"
            })
        }
        const request = await followModel.findOne({
            follower: followerUsername,
            followee: currentUsername,
            status: "pending"
        })
        if(!request){
            return res.status(404).json({
                message: "You have no pending follow request"
            })
        }
        request.status = status
        await request.save();

        return res.status(200).json({
            message: `Follow request ${status}ed successfully`,
            status: request.status
        })
    } catch(error){
        console.log(error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


async function unfollowUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username; // Fixed param matching

    // Find and delete the record in one single database call
    const deletedRecord = await followModel.findOneAndDelete({
      follower: followerUsername,
      followee: followeeUsername
    });

    // If no follow record exists between these users
    if (!deletedRecord) {
      return res.status(404).json({
        message: `You are not following ${followeeUsername}`
      });
    }

    // Success response
    return res.status(200).json({
      message: `You are now unfollowing ${followeeUsername}`
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = {
    followUserController,
    updateFollowRequestController,
    unfollowUserController
}