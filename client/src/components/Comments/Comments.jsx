import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// const NewComment = ({ tweet }) => {
 

//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8801/api/comments", {
//         userId: currentUser._id,
//         tweetId: tweet._id,
//         description: comments,
//       });
//       window.location.reload(false);
//     } catch (err) {
//       console.log(err);
//     }
//   }; 


//   // const handleAddComment = async () => {
//   //   if (newComment.trim() !== "") {
//   //     try {
//   //       await addComment(newComment);
//   //       setNewComment("");
//   //     } catch (error) {
//   //       console.error("Error adding comment:", error);
//   //     }
//   //   }
//   // };

//   return (
//     <div className="flex items-center gap-4">
//       <img className="w-12 h-12 rounded-full"  src={currentUser?.profilePicture} alt="Avatar" />
//       <input
//         className="border-b border-gray-300 text-gray-700 bg-transparent outline-none p-2 w-full"
//         placeholder="Tweet your reply..."
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleSubmit}>
//         <ChevronRightIcon/>
//       </button>
//     </div>
//   );
// };

const Comments = ({ tweet }) => {
  const { currentUser } = useSelector((state) => state.user);

  

  const [comments, setComments] = useState(null);
   const [newComment, setNewComment] = useState("");

  
  
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState("");


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8801/api/comments", {
  //       userId: currentUser._id,
  //       tweetId: tweet._id,
  //       description: comments,
  //     });
  //     window.location.reload(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }; 




  // const handleAddComment = async () => {
  //   if (newComment.trim() !== "") {
  //     try {
  //       await addComment(newComment);
  //       setNewComment("");
  //     } catch (error) {
  //       console.error("Error adding comment:", error);
  //     }
  //   }
  // };


  useEffect(() => {
    console.log("Fetching comments for tweet:", tweet._id);
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/api/comments/${tweet._id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [tweet]);
  
  console.log(comments); // This log will be executed immediately when the component renders.
  

  
    // const addComment = async (e) => {
    //   try {
    //     const res = await axios.post(`http://localhost:8801/api/comments`, {
    //       userId:currentUser.userId,
    //       tweetId:tweet.tweetId,
    //       desc: newComment,
         
    //     });
    //     setComments([...comments, res.data]);
    //   } catch (error) {
    //     console.error("Error adding comment:", error);
    //   }
    // };


    // const addComment = async (e) => {
    //   try {
    //     if (currentUser && currentUser.userId && tweet && tweet.tweetId && newComment) {
    //       const res = await axios.post(`http://localhost:8801/api/comments`, {
    //         userId: currentUser.userId,
    //         tweetId: tweet.tweetId,
    //         desc: newComment,
    //       });
    //       setComments([...comments, res.data]);
    //     } else {
    //       console.error("Error: Missing currentUser, tweet, or newComment data");
    //     }
    //   } catch (error) {
    //     console.error("Error adding comment:", error);
    //   }
    // };


    const addComment = async (e) => {
      e.preventDefault()
      try {
        
          const res = await axios.post(`http://localhost:8801/api/comments`, {
            userId: currentUser._id,
            tweetId: tweet._id,
            desc: newComment,
          });
          
          // window.location.reload();

          setComments(prevComments => [...prevComments, res.data]);
          setNewComment('');

        } 
       catch (error) {
        console.error("Error adding comment:", error);
      }
    };
    
   


  // const addComment = async (e) => {
  //   try {
  //     const res = await axios.post(`http://localhost:8801/api/comments`, {
  //       userId:currentUser.userId,
  //       tweetId:tweet.tweetId,
  //       desc: newComment,
       
  //     });
  //     setComments([...comments, res.data]);
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <div>
        <div className="ml-auto w-11/12 flex items-center gap-4 h-12">
      <img className="w-12 h-12 rounded-full"  src={currentUser?.profilePicture} alt="Avatar" />
      <input
        className="border-b border-gray-300 text-gray-700 bg-transparent outline-none p-2 w-full"
        placeholder="Tweet your reply ..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddComment}>
        <ChevronRightIcon/>
      </button> */}

<button className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded"
        onClick={addComment}>
  <ChevronRightIcon className="w-5 h-5" /> {/* Adjust the width and height as per your requirement */}
</button>



    </div>

       {/* {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}  */}

<div className="ml-auto w-11/12">
  {comments?.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ))}
</div>


    </div>
  );
};

export default Comments;
