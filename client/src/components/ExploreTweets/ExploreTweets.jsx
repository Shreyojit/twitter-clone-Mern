import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const ExploreTweets = () => {
  // const [explore, setExplore] = useState(null);
  // const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const exploreTweets = await axios.get("http://localhost:8801/api/tweets/sortedtweets")
  //       console.log(exploreTweets)
  //       setExplore(exploreTweets.data);
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   };
  //   fetchData();
  // }, [currentUser._id]);

  const [sortedTweets, setSortedTweets] = useState([]);

  useEffect(() => {
    const fetchSortedTweets = async () => {
      try {
        const response = await axios.get('http://localhost:8801/api/tweets/explore');
        setSortedTweets(response.data);
      } catch (error) {
        console.error('Error fetching sorted tweets:', error);
        // Handle errors
      }
    };

    fetchSortedTweets();
  }, []);

  console.log(sortedTweets)


  return (
    <div className="mt-6">
      {sortedTweets &&
       sortedTweets?.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setSortedTweets} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;


// http://localhost:8801/api/tweets/explore