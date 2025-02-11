// import React from 'react'
import "/Style.css";

const Banner = () => {
  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div className="container text-center">
          <h1>
            <center>
              Discover the world’s
              <br /> top designers
            </center>
          </h1>
        </div>
        <h3>
          <center>
            Explore work from the most talented and accomplished designers
            <br /> ready to take on your next project
          </center>
        </h3>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="What are you looking for?"
          />
          <button className="search-button">Search</button>
        </div>
        <br />
        <br />
        <ul className="right">
          <li>
            <a href="#">Trending Searches</a>
          </li>
          <li>
            <a href="#">loading page</a>
          </li>
          <li>
            <a href="#">e-commerce</a>
          </li>
          <li>
            <a href="#">mobile app</a>
          </li>
          <li>
            <a href="#">logo design</a>
          </li>
          <li>
            <a href="#">dashboard</a>
          </li>
          <li>
            <a href="#">icons</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Banner;
