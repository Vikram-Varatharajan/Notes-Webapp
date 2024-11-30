// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Passwordinput from "../input/Passwordinput";
import ConfirmPasswordinput from "../input/ConfirmPasswordinput";
import { Link } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper";

const Signup = () => {
  const HandleSignup = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please Enter a Valid Email");
      return;
    }
    setError("");

    if (!Name) {
      setError("Please Enter a Name");
      return;
    }
    setError("");

    if (!newpassword) {
      setError("Please Enter Password");
      return;
    }
    setError("")

    if (!confirmPassword){
      setError("Re-Enter your Password")
      return
    }
    setError("")
    if (newpassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
  };

  const [Name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [newpassword, newsetPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState("");

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-16">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={HandleSignup}>
            <h4 className="text-2xl mb-7">Signup</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={Name}
              onChange={(e) => SetName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput
              value={newpassword}
              onChange={(e) => newsetPassword(e.target.value)}
            />
            <ConfirmPasswordinput
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account ?{""}
              <Link
                to="/login"
                className="ml-2 mfont-medium text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
