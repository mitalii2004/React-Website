import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="d-none d-md-flex col-md-4 bg-dark text-white align-items-center justify-content-center position-relative">
        {/* Text Overlay */}
        <h1
          className="position-absolute top-0 start-0 m-3 fst-italic"
          style={{ fontFamily: "cursive", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          Dribbble
        </h1>
        {/* Background Image */}
        <img
          src="SignUp.gif"
          alt="Background"
          className="img-fluid vh-100 w-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="col-md-7 d-flex align-items-center justify-content-center">
        <div className="form-container p-4">
          <h2 className="mb-4 text-center">Sign up to Dribbble</h2>

          {!showEmailForm ? (
            <>
              {/* Google Sign-Up */}
              <button className="btn btn-dark w-100 mb-2 custom-input">
                <i className="fab fa-google me-2"></i> Sign up with Google
              </button>

              <p className="text-center text-muted">or</p>
              <hr />
              {/* Email Sign-Up Button */}
              <button
                className="btn btn-light w-100 mb-2 border custom-input"
                onClick={() => setShowEmailForm(true)}
              >
                Continue with email
              </button>
              <label
                className="form-check-label small text-muted"
                htmlFor="termsCheck"
              >
                By creating an account you agree with our{" "}
                <Link to="/terms">
                  <u>Terms of Service</u>
                </Link>
                ,{" "}
                <Link to="/privacy">
                  <u>Privacy Policy</u>
                </Link>
                , and our default{" "}
                <Link to="/settings">
                  <u>Notification Settings</u>
                </Link>
                .
              </label>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                className="btn btn-link text-dark mb-3"
                onClick={() => setShowEmailForm(false)}
                style={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                <i className="fas fa-arrow-left"></i>
              </button>

              {/* Email Signup Form */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Username"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control custom-input"
                  placeholder="Email Address"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control custom-input"
                  placeholder="6+ characters"
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                />
                <label
                  className="form-check-label small text-muted"
                  htmlFor="termsCheck"
                >
                  I agree with Dribbble&asop;s{" "}
                  <Link to="/terms">
                    <u>Terms of Service</u>
                  </Link>
                  ,{" "}
                  <Link to="/privacy">
                    <u>Privacy Policy</u>
                  </Link>
                  , and default{" "}
                  <Link to="/settings">
                    <u>Notification Settings</u>
                  </Link>
                  .
                </label>
              </div>

              <button className="btn btn-dark w-100 mb-2 custom-input">
                Create Account
              </button>
            </>
          )}

          {/* Already have an account */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/Login">
              <u>Sign In</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
