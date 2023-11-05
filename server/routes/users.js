import express from "express";
import {
  getUser,
  update,
  deleteUser,
  follow,
  unFollow,
  numberOfFollowing,
  numberOfFollowers,
  tweetCount
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Update User
router.put("/:id",  update);

// Get User
router.get("/find/:id", getUser);

// Delete User
router.delete("/:id", deleteUser);

// Follow
router.put("/follow/:id",  follow);

// Unfollow
router.put("/unfollow/:id",  unFollow);

router.get("/:id/followersCount", numberOfFollowers)

router.get("/:id/followingCount", numberOfFollowing)

router.get('/:userId/tweetsCount',tweetCount)


export default router;