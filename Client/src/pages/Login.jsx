import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "/Style.css";

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [userDetail, setUserDetail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  
  const isValidUsername = (username) => /^[a-zA-Z0-9_]+$/.test(username);

  const validateForm = () => {
    let newErrors = {};

    if (!userDetail.trim()) {
      newErrors.userDetail = "Username or Email is required";
    } else if (userDetail.includes("@")) {
      if (!isValidEmail(userDetail)) {
        newErrors.userDetail = "Invalid email format";
      }
    } else if (!isValidUsername(userDetail)) {
      newErrors.userDetail = "Enter a valid username (no spaces)";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Incorrect Password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    let newErrors = { ...errors };

    if (field === "userDetail") {
      setUserDetail(value);

      if (!value.trim()) {
        newErrors.userDetail = "Username or Email is required";
      } else if (value.includes("@")) {
        if (!isValidEmail(value)) {
          newErrors.userDetail = "Invalid email format";
        } else {
          delete newErrors.userDetail;
        }
      } else if (!isValidUsername(value)) {
        newErrors.userDetail = "Enter a valid username (no spaces)";
      } else {
        delete newErrors.userDetail;
      }
    }

    if (field === "password") {
      setPassword(value);
      if (!value.trim()) {
        newErrors.password = "Password is required";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "email") {
      setEmail(value);

      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/users/forgotPassword",
        { email }
      );
      console.log(response);
      toast.success("Reset instructions sent to email!");

      setIsForgotPassword(false);
      setEmail("");
      setSubmitted(false);
      setErrors({});
    } catch (error) {
      setError("Please enter a valid email.", error);
      toast.error("Failed to send reset instructions!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        userDetail,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Login successful:", response);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/");
      }, 3500);
    } catch (error) {
      setError("Invalid email, username, or password.", error);
      toast.error("Login Failed!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:3000/users/auth/google";
    } catch (error) {
      console.error("Google Log In Failed:", error);
      toast.error("Google Log In Failed!");
    }
  };
  
  return (
    <div className="container-fluid vh-100 d-flex">
      <ToastContainer />
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
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-75">
          {isForgotPassword ? (
            <div>
              <h2 className="mb-4 text-center">Forgot Password?</h2>
              <p className="text-center text-muted">
                Enter your email and we’ll send you reset instructions.
              </p>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                  {submitted && errors.email && (
                    <p className="text-danger small">{errors.email}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-dark w-100 custom-input"
                >
                  Send Reset Instructions
                </button>
              </form>
              <p className="mt-3 text-center">
                <button
                  className="btn btn-link text-black"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Login
                </button>
              </p>
            </div>
          ) : (
            <div>
              <h2 className="mb-4 text-center">Sign in to Dribbble</h2>
              <button
                className="btn btn-light w-100 mb-2 custom-input"
                onClick={handleGoogleLogin}
              >
                <i className="fab fa-google me-2 google-icon"></i> Sign In with Google
              </button>
              <p className="text-center text-muted divider">
                or sign in with email
              </p>

              {error && <p className="text-danger text-center">{error}</p>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Username or Email</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={userDetail}
                    onChange={(e) => handleInputChange(e, "userDetail")}
                  />
                  {submitted && errors.userDetail && (
                    <p className="text-danger small">{errors.userDetail}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control custom-input password-input"
                      value={password}
                      onChange={(e) => handleInputChange(e, "password")}
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {submitted && errors.password && (
                    <p className="text-danger small">{errors.password}</p>
                  )}
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
                <Link to="/SignUp">
                  <u>Sign up</u>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
