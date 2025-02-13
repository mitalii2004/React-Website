// // import React from 'react'
import { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";

const cardsData = [
  {
    id: 1,
    type: "video",
    src: "1st.mp4",
    text: "Ramotion",
    views: "10.7k",
    likes: 127,
  },
  {
    id: 2,
    type: "image",
    src: "2nd.webp",
    text: "Nixtio",
    views: "5.4k",
    likes: 89,
  },
  {
    id: 3,
    type: "image",
    src: "3rd.webp",
    text: "HALO LAB",
    views: "7.2k",
    likes: 112,
  },
  {
    id: 4,
    type: "image",
    src: "4th.webp",
    text: "Recently updated",
    views: "8.3k",
    likes: 98,
  },
  {
    id: 5,
    type: "image",
    src: "5th.webp",
    text: "Trending now",
    views: "12.1k",
    likes: 145,
  },
  {
    id: 6,
    type: "image",
    src: "6th.webp",
    text: "Creative Design",
    views: "15.2k",
    likes: 210,
  },
  {
    id: 7,
    type: "image",
    src: "7th.webp",
    text: "Just added",
    views: "6.8k",
    likes: 76,
  },
  {
    id: 8,
    type: "image",
    src: "8th.webp",
    text: "New Release",
    views: "9.4k",
    likes: 134,
  },
  {
    id: 9,
    type: "image",
    src: "9th.webp",
    text: "Popular this week",
    views: "11.6k",
    likes: 198,
  },
  {
    id: 10,
    type: "image",
    src: "10th.webp",
    text: "Top Rated",
    views: "14.5k",
    likes: 256,
  },
  {
    id: 11,
    type: "image",
    src: "11th.webp",
    text: "Editor's Pick",
    views: "13.7k",
    likes: 178,
  },
  {
    id: 12,
    type: "image",
    src: "12th.webp",
    text: "User Favorite",
    views: "16.2k",
    likes: 312,
  },
  {
    id: 13,
    type: "video",
    src: "13th.mp4",
    text: "Ramotion",
    views: "10.7k",
    likes: 127,
  },
];

const Card = () => {
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cardsData.map(({ id, type, src, text, views, likes }) => (
          <div key={id} className="col">
            <div className="card w-20 h-20 shadow-lg border-0 rounded flex flex-col items-center justify-center">
              {type === "video" ? (
                <video
                  src={src}
                  className="w-26 h-26 object-cover rounded"
                  controls
                />
              ) : (
                <img
                  src={src}
                  className="w-16 h-16 object-contain"
                  alt={`Card ${id}`}
                />
              )}

              <div className="card-footer bg-light w-100 d-flex justify-content-between align-items-center p-2">
                <div className="text-muted">{text}</div>

                <div className="d-flex gap-2">
                  <FaHeart
                    className={`cursor-pointer ${
                      likedItems[id] ? "text-danger" : "text-secondary"
                    }`}
                    onClick={() => toggleLike(id)}
                    size={20}
                  />
                  {likes}
                  <FaEye className="text-primary" size={20} />
                  {views}
                </div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
    
  );
};

export default Card;
