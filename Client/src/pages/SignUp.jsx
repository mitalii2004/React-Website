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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    // Set errors but don't check the checkbox yet
    setErrors(newErrors);

    // If no input errors, then check the checkbox validation
    if (Object.keys(newErrors).length === 0) {
      if (!agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms & conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post("http://localhost:3000/users/signUp", {
        name,
        userName,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
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

      <div className="col-md-7 d-flex align-items-center justify-content-center">
        <div className="form-container p-4">
          <h2 className="mb-4 text-center">Sign up to Dribbble</h2>

          {!showEmailForm ? (
            <>
              <button className="btn btn-dark w-100 mb-2 custom-input">
                <i className="fab fa-google me-2"></i> Sign up with Google
              </button>

              <p className="text-center text-muted">or</p>
              <hr />

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
                , and{" "}
                <Link to="/settings">
                  <u>Notification Settings</u>
                </Link>
                .
              </label>
            </>
          ) : (
            <>
              <button
                className="btn btn-link text-dark mb-3"
                onClick={() => setShowEmailForm(false)}
                style={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                <i className="fas fa-arrow-left"></i>
              </button>

              {error && <p className="text-danger text-center">{error}</p>}

              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {submitted && errors.name && <p className="text-danger small">{errors.name}</p>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {submitted && errors.userName && <p className="text-danger small">{errors.userName}</p>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {submitted && errors.email && <p className="text-danger small">{errors.email}</p>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {submitted && errors.password && <p className="text-danger small">{errors.password}</p>}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
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
                  {submitted && errors.agreeTerms && <p className="text-danger small">{errors.agreeTerms}</p>}
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-2 custom-input">
                  Create Account
                </button>
              </form>
            </>
          )}

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
