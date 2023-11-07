import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
import mongoose from 'mongoose';

export const getUser = async(req,res,next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const update = async (req,res,next) => {
  
      try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            {
              new: true,
            }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          next(err);
        }
      }; 
      
    


    
    //     try{
    //         const updateUser = await User.findByIdAndUpdate(
    //             req.params.id,
    //             {
    //                 $set: req.body,
    //             },
    //             { new:true},
    //         )
        
    //     res.status(200).json(updateUser);
    // }
    //  catch(err){
    //     next(err);
    // }



export const deleteUser = async(req,res,next) => {
    
        try{
            await User.findByIdAndDelete(req.params.id);
            await Tweet.remove({userId: req.params.id});
        } catch(err) {
            next(err);
        
    } 
    

};



// export const follow = async (req, res, next) => {
 
//     console.log(req.body.id,req.params.id);

//     try {
//         const user = await User.findById(req.params.id); // Use req.params.id for route parameters

//         const currentUser = await User.findById(req.body.id); // Use req.body.id for data in the request body
             
//        console.log(currentUser, user)

//         if (!user.followers.includes(req.body.id)) {
//             await user.updateOne({
//                 $push: { followers: req.body.id },
//             });
//             await currentUser.updateOne({ $push: { following: req.params.id } });
//         } else {
//             res.status(403).json("You already follow this user");
//         }
//         res.status(200).json("Following the user!");
//     } catch (err) {
//         next(err);
//     }
// };



export const follow = async (req, res, next) => {
  const followerId = req.body.id;
  const followeeId = req.params.id;

  
  try {
      const followee = await User.findById(followeeId);
      const follower = await User.findById(followerId);
      

      if (!followee || !follower) {
          return res.status(404).json("User not found");
      }

      if (followee.followers.some(follower => follower._id.toString() === followee._id.toString())) {
        return res.status(403).json("You already follow this user");
      }
      
      

      await followee.updateOne({ $push: { followers: followerId } });
      await follower.updateOne({ $push: { following: followeeId } });

      res.status(200).json("Following the user!");
  } catch (err) {
      next(err);
  }
}


    export const unFollow = async (req, res, next) => {
        try {
          //user
          const user = await User.findById(req.params.id);
          //current user
          const currentUser = await User.findById(req.body.id);
      
          if (currentUser.following.includes(req.params.id)) {
            await user.updateOne({
              $pull: { followers: req.body.id },
            });
      
            await currentUser.updateOne({ $pull: { following: req.params.id } });
          } else {
            res.status(403).json("you are not following this user");
          }
          res.status(200).json("unfollowing the user");
        } catch (err) {
          next(err);
        }
      };


      export const numberOfFollowers = async (req, res, next) => {
        try {
            const userId = req.params.id; // Extract the user ID from the request parameter
    
            // Find the user by their ID and populate the 'followers' field to get an array of followers
            const user = await User.findById(userId).populate('followers');
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            // Get the total number of followers from the populated 'followers' field

            console.log(`FOLLOWERS COUNT = ${user.followers}`);

            const totalFollowers = user.followers.length;
    
            console.log(`FOLLOWERS COUNT = ${totalFollowers}`);
    
            res.status(200).json({ totalFollowers });
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    };
    
    // Get the count of following for a specific user
    export const numberOfFollowing = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).populate("following");
            const followingCount = user.following.length;
            console.log(`FOLLOWing COUNT = ${followingCount}`);
            res.status(200).json({ followingCount });
        } catch (err) {
            next(err);
        }
        
      }
    
    
  export const tweetCount = async (req,res,next) => {

    try{
      const userId = req.params.userId;

      // Query the database to count the tweets for the specific user
      const tweetCount = await Tweet.countDocuments({ userId });
      
      console.log(`Tweet COUNT = ${tweetCount}`);

      res.status(200).json({ tweetCount });
      


    } catch(err) {
      next(err)
    }

  }