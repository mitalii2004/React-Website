import { Link } from "react-router-dom";
import "/Style.css";

const Banner = () => (
  <section
    id="hero"
    className="d-flex align-items-center text-center py-5 bg-white">
    <div className="container">
      <h1 className="display-1 fw-normal">
        Discover the world&apos;s <br /> top designers
      </h1>
      <h6 className="mt-4">
        Explore work from the most talented and accomplished designers
        <br /> ready to take on your next project
      </h6>
      <div className="search-container mt-4 w-50 mx-auto">
        <div className="input-group position-relative">
          {/* Search Input */}
          <input
            type="text"
            className="form-control border-2"
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

          {/* Search Button */}
          <button className="rounded-circle search-btn">
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
  </section>
);

export default Banner;
