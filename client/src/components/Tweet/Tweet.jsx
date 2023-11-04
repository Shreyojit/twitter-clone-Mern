import axios from "axios";
import React, { useState } from "react";


import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RedoIcon from '@mui/icons-material/Redo';

import DeleteIcon from '@mui/icons-material/Delete';

import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Comments from "../Comments/Comments";


const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);


  console.log(currentUser._id)

  const [userData, setUserData] = useState();

 
  const location = useLocation().pathname;

  

  const { id } = useParams();

  console.log(id);

  console.log(location);


  const [commentCount, setCommentCount] = useState(0); // State to hold the comment count


  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8801/api/comments/count/${tweet._id}`); // Adjust the API route as per your backend
        setCommentCount(response.data.count); // Update the state with the comment count
      } catch (error) {
        console.error('Error fetching comment count:', error);
      }
    };

    fetchCommentCount(); // Call the function to get comment count
  }, [tweet._id]); // useEffect will trigger when tweetId changes




  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`http://localhost:8801/api/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`http://localhost:8801/api/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`http://localhost:8801/api/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();

    try {
      const bookmarks = await axios.put(`http://localhost:8801/api/tweets/${tweet._id}/bookmark`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`http://localhost:8801/api/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };


  const handleRetweet = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`http://localhost:8801/api/tweets/${tweet._id}/retweet`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`http://localhost:8801/api/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`http://localhost:8801/api/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
     const del = await axios.delete(`http://localhost:8801/api/tweets/${tweet._id}` );
 
     console.log("Tweet deleted:", del);
     window.location.reload();
    } catch (err) {
      console.log("error", err);
    }
  };



  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
          <img
              src={userData?.profilePicture}
              alt="Profile Picture"
              className="w-6 h-6 rounded-full"
            />
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length>0 && tweet.likes.length}
          </button>

          <button onClick={handleBookmark}>
            {tweet.bookmarks.includes(currentUser._id) ? (
              <BookmarkIcon className="ml-4 my-2 cursor-pointer"></BookmarkIcon>
            ) : (
              <BookmarkBorderIcon className="ml-4 my-2 cursor-pointer"></BookmarkBorderIcon>
            )}
            
          </button>

          <button onClick={handleRetweet}>
            {tweet.retweets.includes(currentUser._id) ? (
              <KeyboardReturnIcon className="ml-4 my-2 cursor-pointer"></KeyboardReturnIcon>
            ) : (
              <RedoIcon className="ml-4 my-2 cursor-pointer"></RedoIcon>
            )}
             { tweet.retweets.length > 0 && tweet.retweets.length }
          </button>

          {(currentUser._id === tweet.userId)  &&  (
  <button onClick={handleDelete}>
    <DeleteIcon className="ml-4 my-2 cursor-pointer"></DeleteIcon>
  </button>
)}

  <button >
    <InsertCommentIcon className="ml-4 my-2 cursor-pointer"></InsertCommentIcon>
  </button>
  {commentCount>0 && commentCount}



  {/* {tweet.likes.length} */}
     
  
  <Comments tweet={tweet}/>
  
  {/* <Comments tweet={tweet}/> */}


        </>

      )}
      </div>
  );
        };
    
  


export default Tweet;