// import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-5 mt-5">
      <div className="container text-center">
        <div className="row mt-3">
          <div className="col-md-12 mb-3">
            <h5 className="fw-bold">Dribbble</h5>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              For designers
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Hire talent
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Inspiration
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Advertising
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Blog
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              About
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Careers
            </Link>
            <Link className="text-dark text-decoration-none" to="#">
              Support
            </Link>
          </div>
        </div>
        <div className="row mt-3 align-items-center justify-content-between">
          <div className="col-md-6 text-start">
            <p className="mb-0 text-muted">© 2025 Dribbble</p>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Terms
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Privacy
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Cookies
            </Link>
          </div>
          <div className="col-md-6 text-end">
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Jobs
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Designers
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Freelancers
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Tags
            </Link>
            <Link className="text-dark me-3 text-decoration-none" to="#">
              Places
            </Link>
            <Link className="text-dark text-decoration-none" to="#">
              Resources
            </Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Link className="text-dark me-3" to="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="text-dark me-3" to="#">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link className="text-dark me-3" to="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className="text-dark me-3" to="#">
              <i className="fab fa-pinterest"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
