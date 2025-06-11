import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ForgotPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return alert('Please fill out both password fields.');
    if (password !== confirmPassword) return alert('Passwords do not match.');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/auth/reset-password', {
        userId,
        token,
        newPassword: password,
      });
      alert(res.data.message);
      if (res.data.success) navigate('/login');
    } catch (err) {
      console.error('Reset error:', err);
      alert(err.response?.data?.message || 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className="input-group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;