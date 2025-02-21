import { Link } from "react-router-dom";
import "/Style.css"

const Footer = () => {
  return (
    <div className="bg-white text-dark py-4 ">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <Link className="navbar-brand dribbble-text fw-bold fst-italic" to="/">
          Dribbble
        </Link>
        <br />

        <div className="d-flex flex-wrap gap-5 my-3">
          <Link to="#" className="text-dark text-decoration-none">
            For designers
          </Link>
          <Link to="#" className="text-dark text-decoration-none">
            Hire talent
          </Link>
          <Link to="#" className="text-dark text-decoration-none">
            Inspiration
          </Link>
          <Link to="#" className="text-dark text-decoration-none">
            Advertising
          </Link>
          <Link to="#" className="text-dark text-decoration-none">
            Blog
          </Link>
          <Link to="#" className="text-dark text-decoration-none">
            About
          </Link>
        </div>
        <div className="d-flex gap-3">
          <Link to="#" className="text-dark fs-5">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#" className="text-dark fs-5">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link to="#" className="text-dark fs-5">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="#" className="text-dark fs-5">
            <i className="fab fa-pinterest"></i>
          </Link>
        </div>
      </div>
      <br />
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center pt-3">
        <p className="mb-0 text-muted">
          © 2025 Dribbble{" "}
          <Link to="#" className="text-muted text-decoration-none mx-2">
            Terms
          </Link>{" "}
          <Link to="#" className="text-muted text-decoration-none mx-2">
            Privacy
          </Link>{" "}
          <Link to="#" className="text-muted text-decoration-none mx-2">
            Cookies
          </Link>
        </p>
        <div className="d-flex gap-3">
          <Link to="#" className="text-muted text-decoration-none">
            Jobs
          </Link>
          <Link to="#" className="text-muted text-decoration-none">
            Designers
          </Link>
          <Link to="#" className="text-muted text-decoration-none">
            Freelancers
          </Link>
          <Link to="#" className="text-muted text-decoration-none">
            Tags
          </Link>
          <Link to="#" className="text-muted text-decoration-none">
            Places
          </Link>
          <Link to="#" className="text-muted text-decoration-none">
            Resources
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Footer;
