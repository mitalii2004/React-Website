import "./App.css";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/otpVerify" element={<OTPVerification />}></Route>
      </Routes>
    </>
  );
}
