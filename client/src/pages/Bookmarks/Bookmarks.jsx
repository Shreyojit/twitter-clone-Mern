import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import Tweet from "../../components/Tweet/Tweet";


const Bookmarks = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [bookmarkTweets, setBookmarkTweets] = useState([]);
  

  useEffect(() => {
    const fetchTweets = async () => {
      const res = await axios.get(`http://localhost:8801/api/tweets/bookmarks/${currentUser._id}`);
      setBookmarkTweets(res.data);
    };
    fetchTweets();
  },  [currentUser._id]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const timelineTweets = await axios.get(
//           `http://localhost:8801/api/tweets/timeline/${currentUser._id}`
//         );

//         setTimeLine(timelineTweets.data);
//       } catch (err) {
//         console.log("error", err);
//       }
//     };

//     fetchData();
//   }, [currentUser._id]);





  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="mt-6">
      {bookmarkTweets &&
        bookmarkTweets.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setBookmarkTweets} />
            </div>
          );
        })}
    </div>
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;