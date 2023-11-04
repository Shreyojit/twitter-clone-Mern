import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRadioGroup } from "@mui/material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SmsIcon from '@mui/icons-material/Sms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const[userProfile,setUserProfile] = useState(null);

  const [likeClicked, setLikeClicked] = useState(false);
  const [replyClicked, setReplyClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked); // Toggles the like icon
    // Add your logic for 'like' functionality here
  };

  const handleReplyClick = () => {
    setReplyClicked(!replyClicked); // Toggles the reply icon
    // Add your logic for 'reply' functionality here
  };


  const handleDeleteClick = () => {
    setDeleteClicked(!deleteClicked); // Toggles the reply icon
    // Add your logic for 'reply' functionality here
  };


  const { currentUser } = useSelector((state) => state.user);
  

  

  const id =comment?.userId
  

  console.log("Username: " + comment?.userId);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const userProfile = await axios.get(`http://localhost:8801/api/users/find/${id}`);

       
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [id]);



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8801/api/comments", {
  //       userId: currentUser._id,
  //       tweetId: tweet._id,
  //       desc: tweetText,
  //     });
  //     window.location.reload(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }; 


 

  // const { profilePicture, username } = userId;







 

  return (
    <div className="flex gap-4 my-6">
      <img
        src={userProfile?.profilePicture}
        alt="Avatar"
        className="w-6 h-6 rounded-full"
      />
      <div className="flex flex-col gap-2 text-gray-800">
        <span className="text-sm font-semibold">
          {userProfile?.username} <span className="text-xs text-gray-500 ml-1">1 day ago</span>
        </span>
         <span className="text-base">{comment?.desc}</span>
         

         {/* <div className="flex flex-row gap-2 text-gray-800"> 
          
         <span className="text-sm font-semibold">
          like
          </span>
          <span className="text-sm font-semibold">
          reply
          </span>


         </div>
          */}

{/* <div className="flex flex-row gap-2 text-gray-800">
      <span className="text-sm font-semibold cursor-pointer" onClick={handleLikeClick}>
        <VolunteerActivismIcon sx={{ fontSize: 18, color: likeClicked ? 'blue' : 'inherit' }} />
        <span className="ml-1">Like</span>
      </span>
      <span className="text-sm font-semibold cursor-pointer" onClick={handleReplyClick}>
        <SmsIcon sx={{ fontSize: 18, color: replyClicked ? 'green' : 'inherit' }} />
        <span className="ml-1">Reply</span>
      </span>
    </div>
   */}

<div className="flex flex-row gap-2 text-gray-800">
      <div className="text-sm font-semibold cursor-pointer flex items-center" onClick={handleLikeClick}>
        <VolunteerActivismIcon sx={{ fontSize: 18, color: likeClicked ? 'red' : 'inherit' }} />
        <span className="ml-1 hover:text-blue-500 transition-colors" onClick={handleLikeClick}>
          Like
        </span>
      </div>
      <div className="text-sm font-semibold cursor-pointer flex items-center" onClick={handleReplyClick}>
        <SmsIcon sx={{ fontSize: 18, color: replyClicked ? 'green' : 'inherit' }} />
        <span className="ml-1 hover:text-green-500 transition-colors" onClick={handleReplyClick}>
          Reply
        </span>
      </div>


      {/* <div className="text-sm font-semibold cursor-pointer flex items-center" onClick={handleDeleteClick}>
        <DeleteForeverIcon sx={{ fontSize: 18, color: replyClicked ? 'red' : 'inherit' }} />
        <span className="ml-1 hover:text-grey-500 transition-colors" onClick={handleDeleteClick}>
          Delete
        </span>
      </div> */}


{(currentUser._id === comment?.userId) && (
  <div className="text-sm font-semibold cursor-pointer flex items-center" onClick={handleDeleteClick}>
    <DeleteForeverIcon sx={{ fontSize: 18, color: replyClicked ? 'red' : 'inherit' }} />
    <span className="ml-1 hover:text-grey-500 transition-colors" onClick={handleDeleteClick}>
      Delete
    </span>
  </div>
)}





    </div>
     

     




      </div>
    </div>
  );
};

export default Comment;
