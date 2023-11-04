import React from 'react';

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className="flex justify-center">
      <div className='w-300 p-1 mb-1'>
        <img className='w-400' src={urlToImage} alt={urlToImage} />
        <h3><a href={url}>{title}</a></h3>
        <p>{description}</p>
       </div> 
     </div>
  );
};

export default NewsItem;