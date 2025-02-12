// // import React from 'react'

import { Link } from "react-router-dom";
// import './index.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="#">
          Dribbble
        </Link>

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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Hire a Designer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Find Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Blog
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">
            <Link to="#" className="btn btn fw-bold">
              Sign Up
            </Link>
            <Link to="#" className="btn btn text-white bg-dark">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
