import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../CSS/Auth.css';
import Footer from "../Home/Footer";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = {
      userName,
      email,
      phoneNumber,
      password,
      role: 'user'
    };

    axios.post('http://localhost:3001/signup', formData) 
      .then(res => {
        if (res.data.success) {
          toast.success("Sign Up Successful!", { autoClose: 2000 });
          setTimeout(() => navigate('/login'), 2500);
        } else {
          toast.error(res.data.message || "Sign Up failed.");
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="auth-container">
        <ToastContainer position="top-right" />
        <div className="auth-form">
          <h2 className="auth-title">Create Your Account</h2>
          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  title={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="auth-btn">Sign Up</button>
          </form>

          <div className="account-message">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate('/login')} className="link-text">
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
