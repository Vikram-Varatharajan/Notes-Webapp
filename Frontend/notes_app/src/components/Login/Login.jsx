/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Passwordinput from "../input/Passwordinput";
import { ValidateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosinstances.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const HandleLogin = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please Enter a Valid Email");
      return;
    }
  
    setError("");
    if (!password) {
      setError("Please Enter a Password");
      return;
    }

    setError("");

    // Login API
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An Unexpected error Occurred,Please Try Again")
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={HandleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not Registered yet ?{""}
              <Link
                to="/signup"
                className="ml-2 mfont-medium text-primary underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default Login;
