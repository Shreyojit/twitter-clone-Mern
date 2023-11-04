import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";

const RightSidebar = () => {

  const [trendingTweets, setTrendingTweets] = useState(null);

  const [articles, setArticles] = useState([])

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=94b4edea80d34e5d88e0b84eef54812d`)
            
            setArticles(response.data.articles.slice(0, 4))
            console.log(response)
        }

        getArticles()
    }, [])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendings = await axios.get(
          `http://localhost:8801/api/tweets/trending_tags`
        );

        setTrendingTweets(trendings.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  console.log("TRENDINGS#", trendingTweets);


  return (
    <>
    
    <div className="p-6 bg-slate-100 rounded-lg mx-4 my-4 space-y-4">
        <h2 className="font-large">Trending-Tags</h2>
        {trendingTweets &&
          trendingTweets.map((tweet) => (
            <div key={tweet._id} className="p-2">
              <h2 className="font-medium"> # {tweet}</h2>
            </div>
          ))}
      </div>

      
      <>
  <div className="p-6 bg-slate-100 rounded-lg mx-4 space-y-4">
  <h2 className="font-large text-center">BBC News</h2>

    {articles.map(article => (
      <NewsItem
        title={article.title}
        description={article.description}
        url={article.url}
        urlToImage={article.urlToImage}
      />
    ))}
  </div>
</>
{/* {articles.map(article => {
                return(
                    <NewsItem
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage} 
                    />
                )
            })} */}

    
    
    </>
    
  
      



    );
    
  
  
  

};
  


export default RightSidebar;