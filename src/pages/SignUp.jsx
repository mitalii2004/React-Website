// Import React
import { Link } from "react-router-dom";

const SignUp = () => {
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

          {/* Google Sign-Up */}
          <button className="btn btn-dark w-100 mb-2 custom-input">
            <i className="fab fa-google me-2"></i> Sign up with Google
          </button>

          <p className="text-center text-muted">or</p>
          <hr />
          {/* Email Sign-Up */}
          <button className="btn btn-light w-100 mb-2 border custom-input">
            Continue with email
          </button>
          <br />
          <br />
          <br />

          {/* Terms and Policy */}
          <p className="text-center small text-muted">
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
          </p>

          {/* Already have an account */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/Login">
              <u>Sign In</u>
            </Link>
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`           
          .form-container {             
            width: 100%;             
            max-width: 400px;             
            background: #fff;             
            border-radius: 10px;           
          }                                  
          .custom-input {             
            border-radius: 20px !important;             
            padding: 12px;             
            font-weight: 500;           
          }            

          a {             
            color: black !important;             
            text-decoration: none;           
          }            

          @media (max-width: 768px) {             
            .form-container {               
              max-width: 100%;               
              padding: 20px;             
            }           
          }         
        `}
      </style>
    </div>
  );
};

export default SignUp;
