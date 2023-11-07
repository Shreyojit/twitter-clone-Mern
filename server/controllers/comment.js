import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Tweet from "../models/Tweet.js";






// export const createTweet = async (req, res, next) => {
//   // Extracting the tweet data from the request body
//   const { userId, description } = req.body;

//   // Regular expression to match hashtags
//   const hashtagRegex = /#(\w+(?:-\w+)*)/g;

  
//   // Extracting tags from the description using the regular expression
//   const extractedTags = description.match(hashtagRegex);

//   const tagsWithoutHash = extractedTags.map(tag => tag.slice(1));

//   // Filter out duplicates and create a unique set of tags
//   const uniqueTags = [...new Set(tagsWithoutHash)];

//   try {
//       // Creating a new tweet instance
//       const newTweet = new Tweet({
//           userId,
//           description,
//           tags: uniqueTags || [], // Including extracted tags; if not provided, defaults to an empty array
//       });

//       // Saving the tweet to the database
//       const savedTweet = await newTweet.save();

//       // Sending the saved tweet as a response
//       res.status(200).json(savedTweet);
//   } catch (err) {
//       handleError(500, err); // Assuming handleError is defined elsewhere for error handling
//   }
// };














export const addComment = async (req, res, next) => {
  try {
    const { userId, tweetId, desc } = req.body;

    const newComment = new Comment({
      userId,
      tweetId,
      desc,
    });

    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const tweet = await Tweet.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === tweet.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const tId = req.params.id;

   

    // Find comments using the provided tweetId
    const comments = await Comment.find({ tweetId : tId });

    

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};




export const getNumberOfComments = async (req, res, next) => {
  try {
    const tweetId = req.params.id;

    console.log(tweetId)

    // Find comments using the provided tweetId and get the count
    const commentsCount = await Comment.countDocuments({ tweetId: tweetId });

    console.log(commentsCount)

    res.status(200).json({ count: commentsCount });
  } catch (err) {
    next(err);
  }
};




// import Comment from './yourCommentModel'; // Import the Comment model

// export const addReply = async (req, res, next) => {
//   const { commentId } = req.params; // Assuming you have the comment's ID
//   const { desc } = req.body; // Description of the reply

//   try {
//     const parentComment = await Comment.findById(commentId);

//     if (!parentComment) {
//       return res.status(404).json({ error: "Comment not found" });
//     }

//     const newReply = {
//       desc,
//       userId: req.user.id, // Assuming you have a user ID in the request
//     };

//     const commentReply = new Comment({
//       ...newReply,
//       parentComment: parentComment._id,
//     });

//     parentComment.replies.push(commentReply);
//     await parentComment.save();

//     res.status(200).send(parentComment);
//   } catch (err) {
//     next(err);
//   }
// };
