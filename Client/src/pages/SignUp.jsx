import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "/Style.css";

const SignUp = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/users/signUp", {
        name,
        userName,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      navigate("/"); // Redirect after signup
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left side with image */}
      <div className="d-none d-md-flex col-md-4 bg-dark text-white align-items-center justify-content-center position-relative">
        <h1
          className="position-absolute top-0 start-0 m-3 fst-italic"
          style={{ fontFamily: "cursive", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          Dribbble
        </h1>
        <img
          src="SignUp.gif"
          alt="Background"
          className="img-fluid vh-100 w-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Side - Signup Options */}
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

              <label className="form-check-label small text-muted">
                By creating an account, you agree to our{" "}
                <Link to="/terms">
                  <u>Terms of Service</u>
                </Link>
                ,{" "}
                <Link to="/privacy">
                  <u>Privacy Policy</u>
                </Link>
                , and our{" "}
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
              {error && <p className="text-danger text-center">{error}</p>}

              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    required
                  />
                  <label className="form-check-label small text-muted">
                    I agree to Dribbble’s{" "}
                    <Link to="/terms">
                      <u>Terms of Service</u>
                    </Link>
                    ,{" "}
                    <Link to="/privacy">
                      <u>Privacy Policy</u>
                    </Link>
                    , and{" "}
                    <Link to="/settings">
                      <u>Notification Settings</u>
                    </Link>
                    .
                  </label>
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-2 custom-input">
                  Create Account
                </button>
              </form>
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
