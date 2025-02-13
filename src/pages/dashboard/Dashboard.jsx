import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import Banner from "../../common/Banner";
import Card from "../../components/cards/Card";
import Footer from "../../common/Footer";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);

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
            <Link
              className="btn btn-light text-black border-black px-3"
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

          {/* Filters Button */}
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-funnel"></i> Filters
          </button>
        </div>

        {/* Filter Options (Side by Side with Equal Size) */}
        {showFilters && (
          <div className="filter-container d-flex gap-3 p-3 mt-2 bg-light rounded shadow-sm">
            {/* Tags Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search tags..."
              />
            </div>

            {/* Color Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Color</label>
              <div className="position-relative">
                <input
                  type="color"
                  className="form-control form-control-color w-100"
                  style={{ height: "38px", padding: "5px" }} // Match height & padding with other inputs
                />
              </div>
            </div>

            {/* Timeframe Filter */}
            <div className="filter-option w-100">
              <label className="form-label fw-bold">Timeframe</label>
              <select className="form-select">
                <option>Now</option>
                <option>Past Week</option>
                <option>Past Month</option>
                <option>Past Year</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <Card />
      <Footer />
    </>
  );
};

export default Dashboard;
