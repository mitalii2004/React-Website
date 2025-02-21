import { useState } from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";
import constants from "../../utils/constants";

const cardsData = constants; 
console.log("Imported Cards Data:", cardsData);

const Card = () => {
  const [likedItems, setLikedItems] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    Object.fromEntries(cardsData.map(({ id, likes }) => [id, likes]))
  );
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // ✅ Fixed toggleLike function to use functional updates
  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const isLiked = !prev[id];

      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + (isLiked ? 1 : -1),
      }));

      return { ...prev, [id]: isLiked };
    });
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="col position-relative"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setSelectedCard(card)}
          >
            <div className="card border-0 rounded overflow-hidden">
              <img
                src={card.src}
                className="w-100 h-100 object-contain"
                alt={`Card ${card.id}`}
              />
              {hoveredCard === card.id && (
                <div className="hover-options">
                  <div className="option-box">
                    <FaBookmark size={22} />
                  </div>
                  <div
                    className="option-box"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(card.id);
                    }}
                  >
                    <FaHeart
                      className={likedItems[card.id] ? "text-danger" : ""}
                      size={22}
                    />
                  </div>
                </div>
              )}
              <div className="card-footer bg-light w-100 d-flex justify-content-between align-items-center p-2">
                <div className="text-muted">{card.text}</div>
                <div className="d-flex gap-2 align-items-center">
                  <FaHeart
                    className={`cursor-pointer ${
                      likedItems[card.id] ? "text-danger" : "text-secondary"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(card.id);
                    }}
                    size={20}
                  />
                  {likeCounts[card.id]}
                  <FaEye className="text-primary" size={20} />
                  {card.views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="detail-view">
          <button className="back-btn" onClick={() => setSelectedCard(null)}>
            Close
          </button>
          <img
            src={selectedCard.src}
            alt={selectedCard.text}
            className="detail-image-small"
          />
          <h2>{selectedCard.text}</h2>
          <p>Views: {selectedCard.views}</p>
          <p>Likes: {likeCounts[selectedCard.id]}</p>
        </div>
      )}

      {/* ✅ Fixed CSS */}
      <style>
        {`
          .card {
            position: relative;
            overflow: hidden;
          }

          .hover-options {
            border-radius: 25px;
            position: absolute;
            bottom: 30%;
            right: 10px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .col:hover .hover-options {
            opacity: 1;
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
          }

          .icon:hover {
            color: #ea4c89;
          }

          .cursor-pointer { cursor: pointer; }
          .detail-view {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: white; display: flex; flex-direction: column;
            justify-content: center; align-items: center; z-index: 1000;
          }
          .detail-image-small {
            max-width: 70%;
            height: 70%;
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