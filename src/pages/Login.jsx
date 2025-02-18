import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Side - Background */}
      <div className="d-none d-md-flex col-md-4 bg-dark text-white align-items-center justify-content-center position-relative">
        <h1
          className="position-absolute top-0 start-0 m-3 fst-italic"
          style={{ fontFamily: "cursive", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          Dribbble
        </h1>
        <img
          src="Login1.gif"
          alt="Background"
          className="img-fluid vh-100 w-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Side - Login / Forgot Password Form */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-75">
          {isForgotPassword ? (
            // Forgot Password Form
            <div>
              <h2 className="mb-4 text-center">Forgot Password?</h2>
              <p className="text-center text-muted">
                Enter the email address you used when you joined, and we’ll send
                <br />
                you instructions to reset your password.
                <br />
                <br />
                For security reasons, we do NOT store your password. So rest
                <br />
                assured that we will never send your password via email.
              </p>
              <form>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control custom-input" />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark w-50 custom-input"
                >
                  Send Reset Instructions
                </button>
              </form>
            </div>
          ) : (
            // Login Form
            <div>
              <h2 className="mb-4 text-center">Sign in to Dribbble</h2>
              <button className="btn btn-light w-100 mb-3 border custom-input">
                <i className="fab fa-google me-2"></i> Sign in with Google
              </button>
              <p className="text-center text-muted divider">
                or sign in with email
              </p>
              {/* <hr /> */}
              <form>
                <div className="mb-3">
                  <label className="form-label">Username or Email</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Enter email..."
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Enter password..."
                  />
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-link small text-black"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot?
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark w-100 custom-input"
                >
                  Sign In
                </button>
              </form>
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <Link to="/Signup">
                  <u>Sign up</u>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .custom-input {
            border-radius: 20px !important;
            padding: 10px 15px;
          }

          a {
            color: black !important;
            text-decoration: none ;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
