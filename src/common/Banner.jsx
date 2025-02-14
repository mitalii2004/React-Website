// import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

const Banner = () => {
  const [selectedOption, setSelectedOption] = useState("Shots");

  return (
    <section
      id="hero"
      className="d-flex align-items-center text-center py-5 bg-white"
    >
      <div className="container">
        <h1 className="display-1  ">
          Discover the worlds
          <br /> top designers
        </h1>
        <h6 className="mt-3">
          Explore work from the most talented and accomplished designers
          <br /> ready to take on your next project
        </h6>
        <div className="search-container mt-4 w-50 mx-auto">
          <div className="input-group">
            {/* Search Input */}
            <input
              type="text"
              className="form-control border-0"
              placeholder="What are you looking for?"
            />

            {/* Dropdown */}
            <div className="dropdown">
              <button
                className="btn dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedOption}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedOption("Shots")}
                  >
                    Shots
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedOption("Designers")}
                  >
                    Designers
                  </button>
                </li>
              </ul>
            </div>

            {/* Search Button */}
            <button className="btn rounded-circle search-btn">
              <i className="fas fa-search text-white"></i>
            </button>
          </div>
        </div>

        <ul className="list-inline mt-4">
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              Trending Searches
            </Link>
          </li>
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              loading page
            </Link>
          </li>
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              e-commerce
            </Link>
          </li>
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              mobile app
            </Link>
          </li>
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              logo design
            </Link>
          </li>
          <li className="list-inline-item me-3">
            <Link className="text-decoration-none text-black" to="#">
              dashboard
            </Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-decoration-none text-black" to="#">
              icons
            </Link>
          </li>
        </ul>
      </div>

      <style>
        {`
  
  .search-container {
  background: #f5f5f5;
  border-radius: 30px;
  padding: 5px;
}

.input-group {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 30px;
  overflow: hidden;
}

.form-control {
  background: none;
  border-radius: 30px;
}

.dropdown-toggle {
  background: none;
  font-weight: bold;
}

.search-btn {
  background: #e91e63;
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}
  .search-btn:hover{
  background: #e91e63;
  }

  `}
      </style>
    </section>
  );
};

export default Banner;

