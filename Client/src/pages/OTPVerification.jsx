import { useState, useRef } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, e) => {
    let value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (!phoneNumber) {
      alert("Phone number not found!");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      alert("Please enter a 4-digit OTP.");
      return;
    }

    try {
      const response = await fetch("https://yourapi.com/otpverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpCode, phoneNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("OTP Verified Successfully!");
      } else {
        alert(data.message || "OTP verification failed.");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "#E8F5E9" }}>
      <img src="" alt="Logo" className="mb-3" />
      <div className="bg-white p-4 rounded shadow" style={{ width: "350px" }}>
        <h4 className="fw-bold text-center">Verification Code</h4>
        <p className="text-muted text-center">Enter the 4-digit code sent</p>

        <div className="text-center">
          <label className="fw-bold">OTP</label>
          <div className="d-flex justify-content-center gap-2 my-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                className="form-control text-center fw-bold"
                style={{
                  width: "55px",
                  height: "55px",
                  fontSize: "24px",
                  border: "2px solid #A5D6A7",
                  borderRadius: "8px",
                  transition: "0.2s",
                }}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        <button className="btn btn-success w-100 fw-bold" onClick={handleSubmit}>
          Next
        </button>

        <p className="mt-3 text-center">
          <button className="btn btn-link text-danger fw-bold">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
