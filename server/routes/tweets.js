import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
  getTrendingTags,
  search,
  getByTag,
  bookmarkTweet,
  getBookmarkedTweets,
  removeBookmark, 
  RetweetOrRetrive,
  getSortedTweets,
} from "../controllers/tweet.js";

const router = express.Router();

// Create a Tweet
router.post("/", createTweet);

// Delete a Tweet
router.delete("/:id", deleteTweet);

// Like or Dislike a Tweet
router.put("/:id/like", likeOrDislike);

router.put("/:id/retweet", RetweetOrRetrive);

// get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// get user Tweets only
router.get("/user/all/:id", getUserTweets);

//explore
router.get("/explore", getExploreTweets);
router.get("/trending_tags", getTrendingTags)

router.get("/search", search);
router.get("/tags", getByTag)

router.put('/:id/bookmark', bookmarkTweet);

// Route to get all bookmarked tweets for a user
router.get('/bookmarks/:userId', getBookmarkedTweets);

router.delete('/:id/bookmark', removeBookmark);

router.get('/sortedtweets', getSortedTweets)


export default router;