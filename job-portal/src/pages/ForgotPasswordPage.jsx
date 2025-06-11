import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/ForgotPassword.css';
import Footer from '../Home/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/auth/forgot-password', { email });
      
      alert(res.data.message);
      setEmail('');
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong.';
      
      alert(errorMsg);

      if (
        errorMsg.toLowerCase().includes('user not found') ||
        errorMsg.toLowerCase().includes('user name not found')
      ) {
        navigate('/signup');
      }

      console.error('Forgot password error:', err.response || err.message || err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="forgot-container">
        <form className="forgot-form" onSubmit={handleForgot}>
          <h2>Forgot Password</h2>
          <p>Enter your registered email to receive a reset link.</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
