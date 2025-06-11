import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaTrash, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave,
  FaBriefcase, FaClock
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/JobList.css';
import Footer from '../Home/Footer';

const JobList = ({ refresh }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '', location: '', minSalary: '', maxSalary: '', title: '',
  });
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.userName || '';

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:3001/jobs');
      setJobs(res.data);
      setAllJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refresh]);

  // Apply filters when filters or allJobs change
  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const matchesTitle = filters.title === '' || job.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesType = filters.jobType === '' || job.type === filters.jobType;
      const matchesLocation = job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinSalary = filters.minSalary === '' || parseInt(job.salary) >= parseInt(filters.minSalary);
      const matchesMaxSalary = filters.maxSalary === '' || parseInt(job.salary) <= parseInt(filters.maxSalary);
      return matchesTitle && matchesType && matchesLocation && matchesMinSalary && matchesMaxSalary;
    });
    setJobs(filtered);
  }, [filters, allJobs]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job post?')) {
      try {
        await axios.delete(`http://localhost:3001/jobs/${id}`);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); 
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  // Apply for a job
  const handleApply = (jobId) => {
    if (!user) {
      navigate('/signup');
    } else {
      setIsApplying(true);
      const job = jobs.find((job) => job._id === jobId);
      navigate('/apply', { state: { jobDetails: job } });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <div className="joblist-container">
        <div className="joblist-wrapper-row">
          {/* Filters Section */}
          <div className="filters-left">
            <h3>Filters</h3>
            <input
              type="text"
              name="title"
              placeholder="Filter by Job Title"
              value={filters.title}
              onChange={handleFilterChange}
            />
            <select name="jobType" onChange={handleFilterChange} value={filters.jobType}>
              <option value="">Filter by Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Filter by Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="minSalary"
              placeholder="Min Salary"
              value={filters.minSalary}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxSalary"
              placeholder="Max Salary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
            />
          </div>

          {/* Job List Section */}
          <div className="joblist-grid-right">
            <h2 className="joblist-title">📋 All Posted Jobs</h2>
            {jobs.length === 0 ? (
              <div className="no-jobs-message">🚫 No Job Posts Available</div>
            ) : (
              <div className="job-cards-grid">
                {jobs.map((job) => (
                  <div className="job-card" key={job._id} onClick={() => handleApply(job._id)}>
                    {job.logo && (
                      <img src={`http://localhost:3001${job.logo}`} className="job-logo" alt="Company Logo" />
                    )}
                    <div className="job-content">
                      <h3 className="job-title-left">{job.title}</h3>

                      {username === 'admin' && (
                        <div className="admin-controls">
                          <button className="icon-btn" onClick={(e) => handleDelete(job._id, e)}>
                            <FaTrash style={{ color: 'red' }} />
                          </button>
                        </div>
                      )}

                      <p><FaBuilding className="icon" /><strong>{job.company}</strong></p>
                      <div className="job-details-inline">
                        <span><FaBriefcase className="icon" /> {job.experience} yrs</span>
                        <span><FaMoneyBillWave className="icon" /> ₹{job.salary}</span>
                        <span><FaMapMarkerAlt className="icon" /> {job.location}</span>
                      </div>
                      <p><FaClock className="icon" /> {job.type}</p>
                      <div className="job-description">
                        <p>{job.description.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}</p>
                      </div>
                      <button
                        className={`apply-btn ${isApplying ? 'applying' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job._id);
                        }}
                        disabled={isApplying}
                      >
                        {isApplying ? 'Applying...' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobList;
