import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ApplySuccess.css';

const ApplySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <span role="img" aria-label="checkmark">✔️</span>
        </div>
        <h2>Success!</h2>
        <p>Congratulations, your application has been successfully submitted.</p>
        <div className="success-actions">
          <button
            onClick={() => navigate('/')}
            className="continue-btn"
          >
            Continue Home
          </button>
          <button
            onClick={() => navigate('/currentjobs')}
            className="view-jobs-btn"
          >
            View Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplySuccess;
