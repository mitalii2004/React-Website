import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import Banner from "../../common/Banner";
import Card from "../../components/cards/Card";
import Footer from "../../common/Footer";

const categories = [
  [
    // { name: "Mobile", image: "/1st.webp" },
    { name: "Print", image: "/2nd.webp" },
    { name: "Typography", image: "/3rd.webp" },
    { name: "Product Design", image: "/4th.webp" },
  ],
  [
    // { name: "Web Design", image: "/1st.webp" },
    { name: "Illustration", image: "/2nd.webp" },
    { name: "Branding", image: "/3rd.webp" },
    { name: "Animation", image: "/4th.webp" },
  ],
];

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds (moving from right to left)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <>
      <Navbar />
      <Banner />
      <div className="container mt-3">
        {/* Top Navigation Bar */}
        <div className="d-flex align-items-center justify-content-between p-2">
          {/* Popular Dropdown */}
          <div>
            <select className="form-select d-inline w-auto">
              <option defaultValue="Popular">Popular</option>
              <option>New & Noteworthy</option>
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="nav">
            <Link className="btn btn-light text-black border-black px-3" to="/discover">
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

          {/* Filters Button */}
          <button
            className="btn btn-outline-secondary no-hover"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-funnel"></i> Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="filter-container d-flex gap-3 p-3 mt-2 bg-light rounded shadow-sm">
            {/* Tags Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Tags</label>
              <input type="text" className="form-control" placeholder="Search tags..." />
            </div>

            {/* Color Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Color</label>
              <div className="position-relative">
                <input
                  type="color"
                  className="form-control form-control-color w-100"
                  style={{ height: "38px", padding: "5px" }}
                />
              </div>
            </div>

            {/* Timeframe Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Timeframe</label>
              <select className="form-select fs-6">
                <option>Now</option>
                <option>This Past Week</option>
                <option>This Past Month</option>
                <option>This Past Year</option>
                <option>All Time</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <br />
      <Card />

      {/* Custom Carousel (Sliding from Right to Left) */}
      <div className="container mt-4">
        <h3 className="text-center mb-3">Featured Categories</h3>

        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {categories.map((group, index) => (
              <div key={index} className="carousel-slide">
                <div className="row">
                  {group.map((category, idx) => (
                    <div key={idx} className="col-md-3 text-center">
                      <img src={category.image} className="img-fluid rounded" alt={category.name} />
                      <p className="fw-bold mt-2">{category.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-btn left" onClick={prevSlide}>
            ❮
          </button>
          <button className="carousel-btn right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      <Footer />

      {/* Styles for Custom Carousel */}
      <style>
        {`
          .carousel-container {
            position: relative;
            overflow: hidden;
            width: 100%;
          }
          .carousel-track {
            display: flex;
            transition: transform 1s ease-in-out;
          }
          .carousel-slide {
            min-width: 100%;
            box-sizing: border-box;
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
