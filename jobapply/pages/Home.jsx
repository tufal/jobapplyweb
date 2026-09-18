import { useEffect, useState } from "react";
import axios from "axios";
import meri from "../src/assets/meri.png";

const Home = () => {
  const words = [
    "Find Your Job",
    "Find Your Career",
    "Find Your Future",
    "Find Your Dream Job",
  ];

  const components = [
    { name: "React Developer", emoji: "⚛️" },
    { name: "JavaScript Developer", emoji: "🟨" },
    { name: "TypeScript Developer", emoji: "🔷" },
    { name: "Frontend Developer", emoji: "🎨" },
    { name: "Backend Developer", emoji: "⚙️" },
    { name: "Full Stack Developer", emoji: "🌐" },
    { name: "Node.js Developer", emoji: "🟢" },
    { name: "Database Developer", emoji: "🗄️" },
    { name: "API Developer", emoji: "🔌" },
    { name: "DevOps Engineer", emoji: "🚀" },
    { name: "Cloud Engineer", emoji: "☁️" },
    { name: "Cyber Security Developer", emoji: "🛡️" },
    { name: "AI Engineer", emoji: "🤖" },
    { name: "Machine Learning Engineer", emoji: "🧠" },
    { name: "Data Scientist", emoji: "📊" },
    { name: "Mobile Developer", emoji: "📱" },
    { name: "Game Developer", emoji: "🎮" },
    { name: "Software Engineer", emoji: "💡" },
    { name: "UI/UX Developer", emoji: "✨" },
    { name: "Git Developer", emoji: "🌿" },
  ];

  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [jobsdetails, setJobsDetails] = useState(null);

  const visibleComponents = showAll
    ? components
    : components.slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        

        const jobsData = Array.isArray(response.data)
          ? response.data
          : [];

        setJobs(jobsData);
      } catch (err) {
        console.error(
          "Jobs API Error:",
          err.response?.data || err.message
        );
      }
    };

    fetchJobs();
  }, []);

  const handleApply = () => {
    if (!jobsdetails?.apply_link) {
      alert("Apply link available nahi hai.");
      return;
    }

    window.open(
      jobsdetails.apply_link,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <section className="hero-section position-relative">
        <img
          src={meri}
          alt="Job Search"
          className="hero-image"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content position-absolute">

          <span className="badge bg-primary fs-6 px-3 py-2 mb-3">
            Find your next opportunity
          </span>

          <h1
            key={index}
            className="display-3 fw-bold text-white hero-title"
          >
            {words[index]}
          </h1>

          <p className="lead text-white mb-4">
            Discover the right opportunity and build your
            successful career with JobApply.
          </p>

          

          <div className="search-box bg-white rounded-3 shadow p-2">

            <div className="row g-2">

              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control form-control-lg border-0"
                  placeholder="Job title, skills or keywords"
                />
              </div>

              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg border-0"
                  placeholder="Location"
                />
              </div>

              <div className="col-lg-3">
                <button className="btn btn-primary btn-lg w-100">
                  Search Jobs
                </button>
              </div>

            </div>

          </div>

          <p className="text-white-50 mt-3 mb-0">
            Popular: React Developer · Node.js · JavaScript · UI/UX
          </p>

        </div>
      </section>

      

      <section className="components-section py-5">

        <div className="container">

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Explore Developer Roles
            </h2>

            <p className="text-secondary">
              Find opportunities based on your skills and expertise
            </p>

          </div>

          <div className="row g-4">

            {visibleComponents.map((component, index) => (

              <div
                key={index}
                className="col-6 col-md-4 col-lg-3"
              >

                <div className="component-container">

                  <span className="emoji">
                    {component.emoji}
                  </span>

                  <span className="component-name">
                    {component.name}
                  </span>

                </div>

              </div>

            ))}

          </div>

          <div className="text-center mt-4">

            <button
              className="btn btn-outline-primary px-4"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show Less ↑"
                : "View All Roles →"}
            </button>

          </div>

        </div>

      </section>

      {/* ================= JOBS ================= */}

      <section className="jobs-section">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Latest Job Opportunities
            </h2>

            <p className="text-secondary">
              Explore the latest opportunities and find your perfect job
            </p>

          </div>

          {/* JOB LIST */}

          <div className="jobs-list">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="job-card"
              >

                <div className="job-card-body">

                  <div className="job-card-header">

                    <div>

                      <h4 className="job-company">
                        {job.company || "Company not available"}
                      </h4>

                      <span className="job-type">
                        {job.job_title || "Job Title"}
                      </span>

                    </div>

                    <span className="job-badge">
                      Hiring
                    </span>

                  </div>

                  <p className="job-description">
                    {job.job_description ||
                      "No description available."}
                  </p>

                  <div className="job-card-footer">

                    <div className="job-location">
                      📍 {job.location || "Location not available"}
                    </div>

                    <button
                      className="view-job-btn"
                      onClick={() =>
                        setJobsDetails(job)
                      }
                    >
                      View More →
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {jobsdetails && (

        <div
          className="job-modal-overlay"
          onClick={() => setJobsDetails(null)}
        >

          <div
            className="job-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="job-details-header">

              <div>

                <h3>
                  {jobsdetails.job_title ||
                    "Job Details"}
                </h3>

                <span>
                  {jobsdetails.company ||
                    "Company"}
                </span>

              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setJobsDetails(null)
                }
                aria-label="Close"
              >
                ✕
              </button>

            </div>

            <div className="details-description">

              <h5>
                Job Description
              </h5>

              <p>
                {jobsdetails.job_description ||
                  "Not specified"}
              </p>

            </div>

            <div className="details-description">

              <h5>
                About Company
              </h5>

              <p>
                {jobsdetails.about_company ||
                  "Not specified"}
              </p>

            </div>

            <div className="details-description">

              <h5>
                Role & Responsibilities
              </h5>

              <p>
                {jobsdetails.role_and_responsibility ||
                  "Not specified"}
              </p>

            </div>

            <div className="job-info-grid">

              <div className="job-info">

                <small>
                  📍 Location
                </small>

                <strong>
                  {jobsdetails.location ||
                    "Not available"}
                </strong>

              </div>

              <div className="job-info">

                <small>
                  💼 Job Type
                </small>

                <strong>
                  {jobsdetails.job_type ||
                    "Not available"}
                </strong>

              </div>

              <div className="job-info">

                <small>
                  🎯 Experience
                </small>

                <strong>
                  {jobsdetails.experience ||
                    "Not specified"}
                </strong>

              </div>

              <div className="job-info">

                <small>
                  📅 Posted Date
                </small>

                <strong>
                  {jobsdetails.posted_date
                    ? new Date(
                        jobsdetails.posted_date
                      ).toLocaleDateString("en-IN")
                    : "Not available"}
                </strong>

              </div>

            </div>

            <div className="skills-section">

              <h5>
                Education & Skills
              </h5>

              <div className="details-description">

                <p>
                  {jobsdetails.education_and_skills ||
                    "Not specified"}
                </p>

              </div>

            </div>

            <div className="job-modal-actions">

              <button
                className="close-bottom-btn"
                onClick={() =>
                  setJobsDetails(null)
                }
              >
                Close
              </button>

              <button
                className="apply-job-btn"
                onClick={handleApply}
              >
                Apply Now →
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default Home;