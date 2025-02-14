import { Link } from "react-router-dom";

const Login = () => {
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
          src="Login1.gif"
          alt="Background"
          className="img-fluid vh-100 w-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-75">
          <h2 className="mb-4 text-center">Sign in to Dribbble</h2>

          {/* Google Sign-In */}
          <button className="btn btn-light w-100 mb-3 border custom-input">
            <i className="fab fa-google me-2"></i> Sign in with Google
          </button>

          <p className="text-center text-muted">or sign in with email</p>
          <hr />
          {/* Login Form */}
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
                <Link to="/forgot-password" className="small">
                  Forgot?
                </Link>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 custom-input">
              Sign In
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-3 text-center">
            Dont have an account?{" "}
            <Link to="/Signup">
              <u>Sign up</u>
            </Link>
          </p>
        </div>
      </div>

      {/* Custom CSS for Input Fields */}
      <style>
        {`
          .custom-input {
            border-radius: 20px !important;
            padding: 10px 15px;
          }

          a {
            color: black !important;
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
