


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUser } from "./auth";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [login_id, setLoginId] = useState("");
  const [userpwd, setUserPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Emp Code Input
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,6}$/; // Only allow up to 6 digits
    if (regex.test(value)) {
      setLoginId(value);
      setError(""); // Clear any existing error
    } else {
      setError("Emp Code must be a 5-digit number with no spaces.");
    }
  };

  // Handle Password Input
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (!value.includes(" ")) {
      setUserPwd(value);
      setError(""); // Clear any existing error
    } else {
      setError("Password cannot contain spaces.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login_id || !userpwd) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (login_id.length !== 5) {
      setError("Emp Code must be exactly 5 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://omhrms.omlogistics.co.in/api/login",
        { login_id, userpwd }
      );

      if (!response.data.error) {
        setUser(response.data.user, response.data.token);
        navigate("/dashboard");
      } else {
        toast.error(response.data.msg || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#002D62] via-[#a9c0d1] to-[#ecedff] flex justify-center items-center overflow-hidden">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-[500px] p-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            className="w-[120px] h-auto object-cover"
            alt="Logo"
            src="/omlogo.png"
          />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-bold text-center text-[#002D62] mb-4">
          Continue Login to Geo Tracking
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Employee Code */}
          <div className="flex flex-col">
            <label className="font-medium text-[#002D62] mb-1">Emp Code</label>
            <input
              id="empCode"
              type="text"
              placeholder="Enter your Employee Code"
              value={login_id}
              onChange={handleUsernameChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg bg-[#fafafa] outline-none focus:border-[#002D62] focus:ring-2 focus:ring-[#a9c0d1]"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="font-medium text-[#002D62] mb-1">Password</label>
            <div className="flex items-center px-4 py-3 border border-gray-300 rounded-md bg-[#fafafa]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={userpwd}
                onChange={handlePasswordChange}
                className="flex-1 bg-transparent outline-none text-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#002D62] font-semibold ml-2"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-[#2e80b6] to-[#002D62] rounded-md text-lg font-semibold shadow hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <img
          src="decoration.png"
          alt="Decoration"
          className="absolute top-[-100px] left-[50%] transform -translate-x-1/2 w-[1000px] opacity-20"
        />
        <img
          src="truck-fBfTNEzKAq.png"
          alt="Truck"
          className="absolute bottom-[-50px] right-[-150px] w-[600px] opacity-30"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
