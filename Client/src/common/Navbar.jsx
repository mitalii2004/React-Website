import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUsers, FaFileAlt, FaBriefcase, FaHandshake } from "react-icons/fa";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("user");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "No user logged in.",
      });
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/users/logout",
        { deviceToken: "abc" },
        {
          headers: { authorization: `Bearer ${JSON.parse(token).token}` },
        }
      );
      localStorage.clear()
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
      return;
    }
    localStorage.clear();
    setUser(null);
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You've logged out successfully!",
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
    setTimeout(() => navigate("/"), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.getElementById("hero");
      setShowSearch(searchBar && searchBar.getBoundingClientRect().bottom <= 0);
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

              {/* Dropdown */}
              <div className="dropdown">
                <button className="btn dropdown-toggle border-0">Shots</button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item">Shots</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Designers</button>
                  </li>
                </ul>
              </div>
              <button className="rounded-circle search-btn">
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
                    <Link className="dropdown-item" to="/popular">
                      <i className="fas fa-star me-2 text-black"></i> Popular
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/newNetworthy">
                      <i className="fas fa-fire me-2 text-danger text-black"></i>
                      New and Noteworthy
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" to="/productdesign">
                      Product Design
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/webDesign">
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
                    <Link className="dropdown-item" to="/browseDesigners">
                      <FaUsers className="me-2 text-primary text-black" />{" "}
                      Browse Designers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/submitBrief">
                      <FaFileAlt className="me-2 text-info text-black" /> Submit
                      a Project Brief
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/postJob">
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
                <Link className="nav-link text-black" to="/findJobs">
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
              {user ? (
                <div className="user-container">
                  <span className="user-name">{user.name}</span>
                  <button
                    className="logout_button px-4 py-1 rounded-lg rounded-pill text-white bg-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signup" className="btn fw-bold">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn text-white bg-dark">
                    Log In
                  </Link>
                </>
              )}
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
