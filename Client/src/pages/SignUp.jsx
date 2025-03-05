import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "/Style.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!phoneNumber.trim() || phoneNumber.length < 10)
      newErrors.phoneNumber = "Valid phone number is required";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    if (!agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    if (field === "name") setName(value);
    if (field === "userName") setUserName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "agreeTerms") setAgreeTerms(e.target.checked);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim() !== "" || (field === "agreeTerms" && e.target.checked)) {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    try {
      let countryCode = phoneNumber.startsWith("+")
        ? phoneNumber.slice(1, 3)
        : "";
      let purePhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber.slice(3)
        : phoneNumber;
      console.log(countryCode);
      const response = await axios.post("http://localhost:3000/users/signUp", {
        name,
        userName,
        email,
        phoneNumber: purePhoneNumber,
        password,
      });

      console.log("OTP Sent:", response);
      localStorage.setItem(
        "phoneNumber",
        JSON.stringify(response.data.phoneNumber)
      );
      toast.success("OTP Sent Successfully!");

      setTimeout(() => {
        navigate("/otpVerify");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.msg || "Signup failed. Please try again.");
      toast.error("Sign Up Failed!");
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
              <button
                className="btn btn-dark w-100 mb-2 custom-input"
                onClick={() => (window.location.href = "/auth/google")}
              >
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
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/Login">
                  <u>Login</u>
                </Link>
              </p>
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
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                  {submitted && errors.name && (
                    <p className="text-danger small">{errors.name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={userName}
                    onChange={(e) => handleInputChange(e, "userName")}
                  />
                  {submitted && errors.userName && (
                    <p className="text-danger small">{errors.userName}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
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

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <PhoneInput
                    country={"us"}
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        if (value.trim() !== "") delete newErrors.phoneNumber;
                        return newErrors;
                      });
                    }}
                    inputClass="form-control custom-input"
                  />

                  {submitted && errors.phoneNumber && (
                    <p className="text-danger small">{errors.phoneNumber}</p>
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
                    <FaEye
                      className={`password-toggle ${
                        showPassword ? "d-none" : ""
                      }`}
                      onClick={() => setShowPassword(true)}
                    />
                    <FaEyeSlash
                      className={`password-toggle ${
                        showPassword ? "" : "d-none"
                      }`}
                      onClick={() => setShowPassword(false)}
                    />
                  </div>
                  {submitted && errors.password && (
                    <p className="text-danger small">{errors.password}</p>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={agreeTerms}
                    onChange={(e) => handleInputChange(e, "agreeTerms")}
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
                  {submitted && errors.agreeTerms && (
                    <p className="text-danger small">{errors.agreeTerms}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 mb-2 custom-input"
                >
                  Create Account
                </button>
                <otpVerify />
              </form>
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/Login">
                  <u>Log In</u>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
