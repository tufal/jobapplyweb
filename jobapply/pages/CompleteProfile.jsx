import React, { useState } from "react";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    education: "",
    skills: "",
    experience: "",
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Profile Data:", formData);
    console.log("Resume:", resume);

    alert("Profile details saved!");
  };

  return (
    <div className="container py-5">

      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <div className="card-body p-4">

          <h2 className="text-center mb-2">
            Complete Your Profile
          </h2>

          <p className="text-center text-muted mb-4">
            Add your details to apply for jobs
          </p>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">
                Location
              </label>

              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="e.g. Ahmedabad, Gujarat"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Education */}
            <div className="mb-3">
              <label className="form-label">
                Education
              </label>

              <input
                type="text"
                name="education"
                className="form-control"
                placeholder="e.g. BCA, BSc IT, MCA"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>

            {/* Skills */}
            <div className="mb-3">
              <label className="form-label">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                className="form-control"
                placeholder="e.g. React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
                required
              />

              <small className="text-muted">
                Example: React, Node.js, MongoDB
              </small>
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label className="form-label">
                Experience
              </label>

              <select
                name="experience"
                className="form-select"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Experience
                </option>

                <option value="Fresher">
                  Fresher
                </option>

                <option value="0-1 Years">
                  0-1 Years
                </option>

                <option value="1-2 Years">
                  1-2 Years
                </option>

                <option value="2-5 Years">
                  2-5 Years
                </option>

                <option value="5+ Years">
                  5+ Years
                </option>
              </select>
            </div>

            {/* Resume */}
            <div className="mb-4">
              <label className="form-label">
                Resume
              </label>

              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <small className="text-muted">
                PDF, DOC, DOCX — Maximum 5MB
              </small>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Complete Profile
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default CompleteProfile;