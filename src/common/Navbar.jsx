import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaFileAlt, FaBriefcase, FaHandshake } from "react-icons/fa";
const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.getElementById("hero"); // Get the banner section
      if (!searchBar) return;

      const searchBarBottom = searchBar.getBoundingClientRect().bottom;

      // Show search if banner scrolls out of view
      if (searchBarBottom <= 0) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Logo */}
          <Link
            className="navbar-brand dribbble-text fw-bold fst-italic"
            to="/"
          >
            Dribbble
          </Link>
          {showSearch && (
            <div className="navbar-search-container">
              <input
                type="text"
                className="form-control"
                placeholder="What are you looking for?"
              />
              
              <button className="btn rounded-circle search-btn">
                <i className="fas fa-search text-white"></i>
              </button>
            </div>
          )}

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto align-items-left">
              {/* Explore Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter("explore")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-link dropdown-toggle text-black"
                  id="exploreDropdown"
                  aria-expanded={openDropdown === "explore"}
                >
                  Explore
                </button>
                <ul
                  className={`dropdown-menu ${
                    openDropdown === "explore" ? "show" : ""
                  }`}
                  aria-labelledby="exploreDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/product-design">
                      <i className="fas fa-star me-2 text-black"></i> Popular
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product-design">
                      <i className="fas fa-fire me-2 text-danger text-black"></i>
                      New and Noteworthy
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" to="/product-design">
                      Product Design
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/web-design">
                      Web Design
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/animation">
                      Animation
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/branding">
                      Branding
                    </Link>
                  </li>{" "}
                  <li>
                    <Link className="dropdown-item" to="/illustration">
                      Illustration
                    </Link>
                  </li>{" "}
                  <li>
                    <Link className="dropdown-item" to="/mobile">
                      Mobile
                    </Link>
                  </li>{" "}
                  <li>
                    <Link className="dropdown-item" to="/typography">
                      Typography
                    </Link>
                  </li>{" "}
                  <li>
                    <Link className="dropdown-item" to="/print">
                      Print
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Hire a Designer Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter("hire")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-link dropdown-toggle text-black"
                  id="hireDropdown"
                  aria-expanded={openDropdown === "hire"}
                >
                  Hire a Designer
                </button>
                <ul
                  className={`dropdown-menu ${
                    openDropdown === "hire" ? "show" : ""
                  }`}
                  aria-labelledby="hireDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/browse-designers">
                      <FaUsers className="me-2 text-primary text-black" />{" "}
                      Browse Designers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/submit-brief">
                      <FaFileAlt className="me-2 text-info text-black" /> Submit
                      a Project Brief
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/post-job">
                      <FaBriefcase className="me-2 text-success text-black" />{" "}
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/hiring">
                      <FaHandshake className="me-2 text-warning text-black" />{" "}
                      Hiring on Dribbble
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Find Jobs */}
              <li className="nav-item">
                <Link className="nav-link text-black" to="/find-jobs">
                  Find Jobs
                </Link>
              </li>

              {/* Blog */}
              <li className="nav-item">
                <Link className="nav-link text-black" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            <div className="d-flex gap-2">
              <Link to="/signup" className="btn fw-bold">
                Sign Up
              </Link>
              <Link to="/login" className="btn text-white bg-dark">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom Styles */}
      <style>
        {`
        .dribbble-text {
  font-family: "Pacifico", cursive !important;  /* Cursive font */
  font-size: 30px !important;  /* Adjust text size */
  color: #05000d !important; /* Dark color */
  text-decoration: none !important;
}

.dribbble-text:hover {
  color: #ea4c89 !important; /* Dribbble pink on hover */
  transition: color 0.3s ease-in-out;
}

          .dropdown-menu {
            display: none;
            position: absolute;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .dropdown-menu.show {
            display: block;
          }

          
        `}
      </style>
      <style>
        {`
    .navbar-search-container {
    width:100%;
      display: flex;
      align-items: center;
      gap: 25px;
      background: #F0F0F0;
      color: black;
      padding: 5px;
      border-radius: 25px;
    }
    .navbar-search-container input {
      border: none;
      background: none;
      outline: none;
      padding: 5px;
    }
  `}
      </style>

      <style>
        {`
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: white;
    }

  

    .navbar-collapse {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .navbar-nav {
      flex-grow: 1;
      justify-content: left; 
    }

    .d-flex {
      justify-content: flex-end;
    }

    /* To prevent overlap with content */
    body {
      padding-top: 70px; /* Adjust based on navbar height */
    }
  `}
      </style>
    </>
  );
};

export default Navbar;
