// import React from 'react'
import "/Style.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      id="hero"
      className="d-flex align-items-center text-center py-5 bg-white"
    >
      <div className="container">
        <h1 className="fw-bold">
          Discover the worlds
          <br /> top designers
        </h1>
        <h3 className="mt-3">
          Explore work from the most talented and accomplished designers
          <br /> ready to take on your next project
        </h3>
        <div className="input-group mt-4 w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="What are you looking for?"
          />
          <button className="search-button">
            <i className="fas fa-search"></i> Search
          </button>
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
    </section>
  );
};

export default Banner;
