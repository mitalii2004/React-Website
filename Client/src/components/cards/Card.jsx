import { useState } from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cardsData = constants;

const Card = () => {
  
  const [likedItems, setLikedItems] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    Object.fromEntries(cardsData.map(({ id, likes }) => [id, likes]))
  );
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userDetail, setUserDetail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem("user");
  const toggleLike = (id) => {
    if (!isLoggedIn()) {
      setShowAuthModal(true);
      return;
    }
    setLikedItems((prev) => {
      const isLiked = !prev[id];
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + (isLiked ? 1 : -1),
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        userDetail,
        password,
      });
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("response", response);
        setShowAuthModal(false);
        setTimeout(() => navigate("/"), 100);
      } else {
        alert("Invalid login response!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, userDetail, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Please Login.");
        setIsLogin(true);
      } else {
        alert(data.message || "Signup Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={`container ${showAuthModal ? "blurred" : ""}`}>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="col position-relative"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={(e) => {
              e.stopPropagation(); 
              setSelectedCard(card);
            }}
          >
            <div className="card border-0 rounded overflow-hidden">
              <img
                src={card.src}
                className="w-100 h-100 object-contain"
                alt={`Card ${card.id}`}
              />
              {hoveredCard === card.id && (
                <div className="hover-options text-white">
                  <div className="option-box">
                    <FaBookmark size={22} />
                  </div>
                  <div
                    className="option-box text-white"
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

              <div className="card-footer bg-white w-100 d-flex justify-content-between align-items-center p-2">
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
                  <FaEye className="text-secondary" size={20} />
                  {card.views}
                </div>
              </div>
              {selectedCard && (
                <div className="detail-view">
                  <button
                    className="back-btn"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setSelectedCard(null);
                    }}
                  >
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
            </div>
          </div>
        ))}
      </div>

      {showAuthModal && (
        <div className="auth-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowAuthModal(false)}
            >
              ✖
            </button>

            {isLogin ? (
              <>
                <h2>Sign in to continue</h2>
                <p>To like this post, please log in to your account.</p>
                <input
                  type="text"
                  placeholder="Email or Username"
                  className="input-field"
                  value={userDetail}
                  onChange={(e) => setUserDetail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-dark w-100" onClick={handleLogin}>
                  Login
                </button>
                <p className="mt-3 text-center">
                  Don’t have an account?{" "}
                  <span
                    className="register-link"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2>Create an account</h2>
                <p>Sign up to like this post and engage with content.</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email or Username"
                  className="input-field"
                  value={userDetail}
                  onChange={(e) => setUserDetail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-dark w-100" onClick={handleSignup}>
                  Sign Up
                </button>
                <p className="mt-3 text-center">
                  Already have an account?{" "}
                  <span
                    className="register-link"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
      <style>
        {`
        .detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

 .auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}


.register-link {
  color: blue;
  cursor: pointer;
}

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
            background-color: rgb(13,37,60);
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 10px rgb(13, 37, 60);
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }

          .option-box:hover {
            background-color:rgb(110, 143, 174);
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

          .auth-modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            width: 350px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }

          .close-btn {
            position: absolute;
            top: 10px; right: 10px;
            background: transparent;
            border: none;
            font-size: 18px;
            cursor: pointer;
          }

          .register-link {
            color: #ea4c89;
            font-weight: bold;
            cursor: pointer;
          }

          .register-link:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default Card;
