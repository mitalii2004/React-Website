import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import "/Style.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([...Array(4)].map(() => null));
  const navigate = useNavigate(); 

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1].focus();
      }
      setOtp(newOtp);
    }
  };
  const handleSubmit = async () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (!phoneNumber) {
      toast.error("Phone number not found!");
      return;
    }
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.warning("Please enter a 4-digit OTP.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/users/otpverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode, phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("OTP Verified Successfully!");
        
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      } else {
        toast.error(data.message || "OTP verification failed.");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.");
      console.error(error);
    }
  };
  const handleResend = () => {
    setResendTimer(30);
    setIsResendDisabled(true);
    toast.info("New OTP sent!");
  };

  return (
    <div className="otp-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="otp-box">
        <h4>Enter OTP</h4>
        <p>Enter the 4-digit code sent to your phone.</p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="otp-field"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button
          className={`submit-btn ${otp.join("").length === 4 ? "active" : ""}`}
          onClick={handleSubmit}
          disabled={otp.join("").length !== 4}
        >
          Verify OTP
        </button>
        <p>
          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
