import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobApplication.css'; 

const JobApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetails = location.state?.jobDetails;

  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setApplicationData({
        name: storedUser.userName || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        resume: null,
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement.tagName.toLowerCase();
      if (e.key === 'Backspace' && activeTag !== 'input' && activeTag !== 'textarea') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setErrors((prevErrors) => ({ ...prevErrors, resume: 'Only PDF files are allowed' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, resume: '' }));
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!applicationData.name) newErrors.name = 'Name is required';
    if (!applicationData.email) newErrors.email = 'Email is required';
    if (!applicationData.phone) newErrors.phone = 'Phone number is required';
    if (!applicationData.resume) newErrors.resume = 'Resume is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobDetails._id);
    formData.append('name', applicationData.name);
    formData.append('email', applicationData.email);
    formData.append('phone', applicationData.phone);
    formData.append('resume', applicationData.resume);

    setLoading(true);

    try {
      await axios.post('http://localhost:3001/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully!');
      navigate('/apply-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow rounded position-relative">
            {/* Close Button */}
            <button
              className="btn btn-outline-secondary close-btn"
              onClick={() => navigate(-1)}
              title="Go Back"
            >
              &times;
            </button>

            <div className="card-body">
              <h3 className="text-center mb-4">Apply for Job</h3>
              {jobDetails ? (
                <div className="mb-4">
                  <h5><strong>Job Title:</strong> {jobDetails.title}</h5>
                  <p><strong>Company:</strong> {jobDetails.company}</p>
                  <p><strong>Description:</strong> {jobDetails.description}</p>
                </div>
              ) : (
                <p>No job details available</p>
              )}

              <form onSubmit={handleSubmitApplication}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Resume</label>
                  <input
                    type="file"
                    className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                    onChange={handleResumeUpload}
                  />
                  {applicationData.resume && (
                    <small className="text-success mt-2 d-block">
                      File selected: {applicationData.resume.name}
                    </small>
                  )}
                  {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !applicationData.name || !applicationData.email || !applicationData.phone || !applicationData.resume}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
