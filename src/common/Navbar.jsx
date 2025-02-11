// import React from 'react'
import "/Style.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navdiv">
          <div className="logo">
            <a href="#">Dribbble</a>
          </div>
          <ul className="d-flex align-items-right">
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">Hire a designer</a>
            </li>
            <li>
              <a href="#">Find Jobs</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
          <div className="auth-buttons">
            <div className="signup-button">
              <h3>
                <a href="#">Sign Up</a>
              </h3>
            </div>
            <div className="login-button">
              <button><a href="#">Login</a></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
