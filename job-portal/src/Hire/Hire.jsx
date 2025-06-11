import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./AllProfiles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);
  const [animatedIds, setAnimatedIds] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user?.userName || "");
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/jobseeker/profiles/all"
        );
        if (data.success) {
          setProfiles(data.profiles);
          setFilteredProfiles(data.profiles);

          data.profiles.forEach((profile, idx) => {
            setTimeout(() => {
              setAnimatedIds((prev) => [...prev, profile._id]);
            }, idx * 100);
          });
        } else {
          setError("Failed to load profiles");
        }
      } catch {
        setError("Error fetching profiles");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this profile?")) return;

    setDeletingIds((prev) => [...prev, id]);
    try {
      await axios.delete(`http://localhost:3001/jobseeker/profiles/delete/${id}`);
      setTimeout(() => {
        setProfiles((prev) => prev.filter((p) => p._id !== id));
        setFilteredProfiles((prev) => prev.filter((p) => p._id !== id));
        setDeletingIds((prev) => prev.filter((delId) => delId !== id));
        setAnimatedIds((prev) => prev.filter((animId) => animId !== id));
      }, 500);
    } catch {
      alert("Failed to delete profile");
      setDeletingIds((prev) => prev.filter((delId) => delId !== id));
    }
  };

  useEffect(() => {
    const ft = filterText.trim().toLowerCase();
    if (!ft) {
      setFilteredProfiles(profiles);
      return;
    }
    const filtered = profiles.filter((profile) => {
      const name = profile.name?.toLowerCase() || "";
      const location = profile.location?.toLowerCase() || "";
      const skills = Array.isArray(profile.skills)
        ? profile.skills.map((s) => s.toLowerCase())
        : [];
      return (
        name.includes(ft) ||
        location.includes(ft) ||
        skills.some((skill) => skill.includes(ft))
      );
    });
    setFilteredProfiles(filtered);
  }, [filterText, profiles]);

  const capitalize = (text) =>
    text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase();

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <p className="text-danger text-center mt-5 fs-5">{error}</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center text-primary fw-bold">Job Seeker Profiles</h2>

      {username && (
        <p className="text-end text-muted small">
          Logged in as: <strong>{capitalize(username)}</strong>
        </p>
      )}

      <div className="search-wrapper mb-4 position-relative">
        <input
          type="search"
          className="form-control rounded-pill ps-5 py-2 shadow-sm"
          placeholder="Search by name, skills or location..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <i className="bi bi-search search-icon position-absolute top-50 translate-middle-y ps-3"></i>
      </div>

      {filteredProfiles.length === 0 ? (
        <p className="text-center text-muted fs-6">No profiles found.</p>
      ) : (
        <div className="row gy-4">
          {filteredProfiles.map((profile, index) => {
            const isDeleting = deletingIds.includes(profile._id);
            const isAnimated = animatedIds.includes(profile._id);

            return (
              <div
                key={profile._id}
                className={`col-12 col-md-6 col-lg-4 profile-card-wrapper ${
                  isDeleting ? "card-deleting" : ""
                } ${isAnimated ? "card-entrance" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="profile-card card shadow-sm border-0 rounded-4 p-3 position-relative gap-3">
                  {username.trim().toLowerCase() === "admin" && (
                    <button
                      className="delete-icon"
                      onClick={(e) => handleDelete(profile._id, e)}
                      title="Delete Profile"
                      disabled={isDeleting}
                    >
                      <FaTrash />
                    </button>
                  )}

                  <div className="d-flex gap-3 align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="fw-semibold mb-1 text-capitalize">
                        {capitalize(profile.name) || "N/A"}{" "}
                        <span className="text-danger small">
                          {profile.employeeCode || ""}
                        </span>
                      </h5>
                      <p className="mb-1 fw-medium">
                        {profile.experience || "0"} years
                      </p>

                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {profile.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="badge bg-light border text-dark rounded-pill px-2 py-1"
                          >
                            {capitalize(skill)}
                          </span>
                        ))}
                      </div>

                      <p className="small text-muted mb-2" style={{ color: "black" }}>
                        {profile.discription || "No description available..."}
                      </p>

                      <a
                        href={`mailto:kchannel022@gmail.com?subject=Hire ${capitalize(
                          profile.name
                        )}&body=Hello Admin,%0D%0A%0D%0AI am interested in hiring ${capitalize(
                          profile.name
                        )}.%0D%0A%0D%0APlease provide further details.`}
                        className="small text-primary text-decoration-none"
                      >
                        <i className="bi bi-person-plus me-1"></i>
                        Hire {capitalize(profile.name?.split(" ")[0])}
                      </a>
                    </div>

                    <div className="d-flex flex-column align-items-center ms-auto p-3">
                      {profile.profilePicture ? (
                        <img
                          src={`http://localhost:3001/uploads/${profile.profilePicture}`}
                          alt="Profile"
                          className="rounded-circle border border-2 border-primary mb-3"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="profile-placeholder mb-3">
                          <i className="bi bi-person-fill fs-1 text-secondary"></i>
                        </div>
                      )}

                      {profile.resume ? (
                        <a
                          href={`http://localhost:3001/uploads/${profile.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-primary rounded-pill mb-1"
                        >
                          <i className="bi bi-download me-1"></i> Resume
                        </a>
                      ) : (
                        <span className="text-muted small mb-1">No resume</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProfiles;
