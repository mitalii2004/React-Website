import { useState } from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";

const cardsData = [
  {
    id: 1,
    type: "image",
    src: "12th.webp",
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
    type: "image",
    src: "11th.webp",
    text: "Ramotion",
    views: "10.7k",
    likes: 127,
  },
];

const Card = () => {
  // const [selectedCard, setSelectedCard] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    Object.fromEntries(cardsData.map(({ id, likes }) => [id, likes]))
  );
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] + (likedItems[id] ? -1 : 1),
    }));
  };

  return (
    <div className="container">
{/*       
      {selectedCard ? (
        <div className="detail-view text-center">
          <button className="back-btn" onClick={() => setSelectedCard(null)}>
            ⬅ Back
          </button>
          <img
            src={selectedCard.src}
            className="w-50 rounded"
            alt={selectedCard.text}
          />
          <h2 className="mt-3">{selectedCard.text}</h2>
          <p className="text-muted">
            <FaEye className="text-primary" /> {selectedCard.views} Views |
            <FaHeart className="text-danger" /> {selectedCard.likes} Likes
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="col"
              onClick={() => setSelectedCard(card)}
            >
              <div className="card border-0 rounded overflow-hidden cursor-pointer">
                <img
                  src={card.src}
                  className="w-100 h-100 object-cover"
                  alt={card.text}
                />
                <div className="card-footer bg-light d-flex justify-content-between p-2">
                  <div>{card.text}</div>
                  <div>
                    <FaHeart className="text-danger" /> {card.likes}{" "}
                    <FaEye className="text-primary" /> {card.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cardsData.map(({ id, type, src, text, views }) => (
          <div
            key={id}
            className="col position-relative"
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card  border-0 rounded overflow-hidden">
              {type === "video" ? (
                <video
                  src={src}
                  className="w-100 h-100 object-cover rounded mb-50px"
                  controls
                />
              ) : (
                <img
                  src={src}
                  className="w-100 h-100 object-contain"
                  alt={`Card ${id}`}
                />
              )}

              {/* Hover Options */}
              {hoveredCard === id && (
                <div className="hover-options">
                  <div className="option-box">
                    <FaBookmark size={22} />
                  </div>
                  <div className="option-box" onClick={() => toggleLike(id)}>
                    <FaHeart
                      className={likedItems[id] ? "text-danger" : ""}
                      size={22}
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="card-footer bg-light w-100 d-flex justify-content-between align-items-center p-2 ">
                <div className="text-muted ">{text}</div>
                <div className="d-flex gap-2 align-items-center ">
                  <FaHeart
                    className={`cursor-pointer ${
                      likedItems[id] ? "text-danger" : "text-secondary "
                    }`}
                    onClick={() => toggleLike(id)}
                    size={20}
                  />
                  {likeCounts[id]}
                  <FaEye className="text-primary" size={20} />
                  {views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style>
        {`
          .card {
            position: relative;
            overflow: hidden;
          }

          .hover-options {
        
        border-radius:25px;
            position: absolute;
            bottom: 30%;
            right: 10px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .col:hover .hover-options {
            opacity: 2;
            
          }

          .option-box {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 10px #f8f9fa;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }

          .option-box:hover {
            background-color: #f8f9fa;
          }

          .icon {
            transition: color 0.3s ease-in-out;
            color
          }

          .icon:hover {
            color: #ea4c89;
          }
        `}
      </style>
      <style>
        {`
          .cursor-pointer { cursor: pointer; }
          .detail-view { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh; 
            background: white; display: flex; flex-direction: column; 
            justify-content: center; align-items: center; z-index: 1000;
          }
          .back-btn {
            position: absolute; top: 20px; left: 20px; background: black; 
            color: white; border: none; padding: 10px 15px; cursor: pointer; 
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Card;
