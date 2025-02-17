import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import Banner from "../../common/Banner";
import Card from "../../components/cards/Card";
import Footer from "../../common/Footer";

const categories = [
  { name: "Print", image: "/2nd.webp" },
  { name: "Typography", image: "/3rd.webp" },
  { name: "Product Design", image: "/4th.webp" },
  { name: "Animation", image: "/5th.webp" },
  { name: "Illustration", image: "/6th.webp" },
  { name: "Branding", image: "/7th.webp" },
  { name: "Web Design", image: "/8th.webp" },
  { name: "Product Design", image: "/9th.webp" },
  { name: "Print", image: "/10th.webp" },
  { name: "Typography", image: "/11th.webp" },
  { name: "Product Design", image: "/12th.webp" },
];

// Duplicate items for infinite scrolling
const getInfiniteItems = (arr) => [...arr, ...arr];

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [color, setColor] = useState("#000000");
  const [pause, setPause] = useState(false);
  const [manualControl] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    if (trackRef.current) {
      trackRef.current.style.animationPlayState =
        pause || manualControl ? "paused" : "running";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pause, manualControl]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <Banner />

      {/* Navigation Bar */}
      <div className="d-flex align-items-center justify-content-between p-2">
        <div>
          <select className="form-select d-inline w-auto text-black">
            <option defaultValue="Popular">Popular</option>
            <option>New & Noteworthy</option>
          </select>
        </div>

        <nav className="nav">
          <Link
            className="btn btn-light text-black custom-filter-btn"
            to="/discover"
          >
            Discover
          </Link>
          <Link className="nav-link text-black" to="/animation">
            Animation
          </Link>
          <Link className="nav-link text-black" to="/branding">
            Branding
          </Link>
          <Link className="nav-link text-black" to="/illustration">
            Illustration
          </Link>
          <Link className="nav-link text-black" to="/mobile">
            Mobile
          </Link>
          <Link className="nav-link text-black" to="/print">
            Print
          </Link>
          <Link className="nav-link text-black" to="/product-design">
            Product Design
          </Link>
          <Link className="nav-link text-black" to="/typography">
            Typography
          </Link>
          <Link className="nav-link text-black" to="/web-design">
            Web Design
          </Link>
        </nav>
        <button
          className="btn btn-outline-secondary custom-filter-btn text-black"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <i className="fa-solid fa-sliders text-black"></i> Filters
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="filter-container d-flex gap-3 p-3 mt-2 bg-white rounded shadow-sm">
          {/* Tags Filter */}
          <div className="filter-option w-100">
            <label className="form-label fw-bold">
              Tags <i className="fas fa-search"></i>
            </label>
            <div className="input-group border-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search tags..."
              />
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-option w-100">
            <label className="form-label fw-bold">Color</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control w-100"
                value={color}
                readOnly
              />
              <input
                type="color"
                className="position-absolute"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "100%",
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          {/* Timeframe Filter */}
          <div className="filter-option w-100">
            <label className="form-label fw-bold">Timeframe</label>
            <select className="form-select">
              <option>Now</option>
              <option>This Past Week</option>
              <option>This Past Month</option>
              <option>This Past Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
      )}
      <br />
      <br />
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
      {/* Cards Section */}
      <Card />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center vh-90 mt-5">
        <Link to="/SignUp">
          <button className="px-4 py-2 rounded-pill text-white bg-dark border-none">
            Sign Up to Continue
          </button>
        </Link>
      </div>
      <br />
      <br />
      {/* Infinite Scrolling Carousel */}
      <div className="container mt-4">
        <h3 className="text-center mb-3">Featured Categories</h3>
        <br />
        <div
          className="carousel-container"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <div className="carousel-track" ref={trackRef}>
            {getInfiniteItems(categories).map((category, idx) => (
              <div key={idx} className="carousel-slide">
                <img
                  src={category.image}
                  className="img-fluid rounded"
                  alt={category.name}
                />
                <p className="fw-bold mt-2">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />

      {/* Styles */}
      <style>
        {`
        .discover-btn:active,
.discover-btn:focus {
  pointer-events: none; 
  background-color: #f8f9fa !important; 
  color: black !important;
  border-color: black !important;
}

        .search-button{
  background: #ff4081;
  border: none;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
          .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            transition: opacity 0.3s ease-in-out;
          }

          .custom-filter-btn:hover {
            background-color: transparent !important;
            border-color: inherit !important;
            color: inherit !important;
          }

          .carousel-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            padding: 10px 0;
          }

          .carousel-track {
            display: flex;
           gap: 20px;
          width: max-content;
          animation: scroll 40s linear infinite;
          overflow-x: auto;
          scroll-behavior: smooth;
          }

          @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

           .carousel-slide {
             flex: 0 0 auto;
             width: 200px;
             text-align: center;
           }

        

          .carousel-btn {
             position: absolute;
             top: 50%;
             transform: translateY(-50%);
             background: rgba(0, 0, 0, 0.5);
             color: white;
             border: none;
             padding: 10px 15px;
             cursor: pointer;
             font-size: 20px;
             border-radius: 50%;
             z-index: 10;
           }

           .carousel-btn.left {
             left: 10px;
           }

           .carousel-btn.right {
             right: 10px;
           }

           .carousel-btn:hover {
             background: rgba(0, 0, 0, 0.8);
         }

        `}
      </style>
    </>
  );
};

export default Dashboard;
