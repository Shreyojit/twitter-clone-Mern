import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createTweet = async (req, res, next) => {
   // Extracting the tweet data from the request body
   const { userId, description } = req.body;

   // Regular expression to match hashtags
   const hashtagRegex = /#(\w+(?:-\w+)*)/g;

   
   // Extracting tags from the description using the regular expression
   const extractedTags = description.match(hashtagRegex);

   const tagsWithoutHash = extractedTags?.map(tag => tag.slice(1));

   // Filter out duplicates and create a unique set of tags
   const uniqueTags = [...new Set(tagsWithoutHash)];

   try {
       // Creating a new tweet instance
       const newTweet = new Tweet({
           userId,
           description,
           tags: uniqueTags || [], // Including extracted tags; if not provided, defaults to an empty array
       });

       // Saving the tweet to the database
       const savedTweet = await newTweet.save();

       // Sending the saved tweet as a response
       res.status(200).json(savedTweet);
   } catch (err) {
       handleError(500, err); // Assuming handleError is defined elsewhere for error handling
   }
};
export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);

      res.status(200).json("tweet has been deleted");
    
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};


export const RetweetOrRetrive = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.retweets.includes(req.body.id)) {
      await tweet.updateOne({ $push: { retweets: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { retweets: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};



export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};
export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};

export const getTrendingTags = async (req,res,next) => {
  try {
    const tagsData = await Tweet.aggregate([
      {
        $unwind: "$tags", // Separate tags into individual documents
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Sort by count in descending order
      },
      {
        $limit: 5, // Limit the results to the top 5 tags
      },
    ]);

    const topTags = tagsData.map((tag) => tag._id);

    console.log("Top 5 Tags:", topTags);

    res.status(200).json(topTags);
  } catch (err) {
    handleError(500, err);
  }
  }

  export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
      const tweets = await Tweet.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(tweets);
    } catch (err) {
      handleError(500, err);
    }
  };
  
  export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
      const tweets = await Tweet.find({
        description: { $regex: query, $options: "i" },
      }).limit(10);
      res.status(200).json(tweets);
    } catch (err) {
      handleError(500, err);
    }
  };


  // Bookmark a tweet
export const bookmarkTweet = async (req, res, next) => {
  
  console.log(req.params.id)
  console.log(req.body.id)

  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.bookmarks.includes(req.body.id)) {
      await tweet.updateOne({ $push: { bookmarks: req.body.id } });
      res.status(200).json("Tweet has been bookmarked");
    } else {
      await tweet.updateOne({ $pull: { bookmarks: req.body.id } });
      res.status(200).json("Bookmark removed");
    }
  } catch (err) {
    handleError(500, err);
  }
};

// Get bookmarked tweets for a user
export const getBookmarkedTweets = async (req, res, next) => {
  try {
    const bookmarkedTweets = await Tweet.find({ bookmarks: req.params.userId });
    res.status(200).json(bookmarkedTweets);
  } catch (err) {
    handleError(500, err);
  }
};

export const removeBookmark = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    // Check if the user's ID is in the bookmarks array
    const index = tweet.bookmarks.indexOf(req.body.userId);
    if (index > -1) {
      tweet.bookmarks.splice(index, 1); // Remove the user's ID from bookmarks array
      await tweet.save(); // Save the updated tweet

      res.status(200).json('Bookmark removed');
    } else {
      res.status(200).json('Bookmark not found');
    }
  } catch (err) {
    handleError(500, err); // Handle errors
  }
};
