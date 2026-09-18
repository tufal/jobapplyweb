import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError(false);

    if (!form.username || !form.email || !form.password) {
      setError(true);
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/jobs/register",
        form,
        {
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
      setError(false);

      // Form clear after successful registration
      setForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(true);

      setMessage(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <div className="register-logo">
            <span>JOBPORTAL</span>
          </div>

          <h1 className="register-title">
            Create an Account
          </h1>

          <p className="register-subtitle">
            Join JobPortal and start your journey
          </p>
        </div>

        <form
          className="register-body"
          onSubmit={handleRegister}
        >

          {message && (
            <div
              className={`register-alert ${
                error
                  ? "register-alert-error"
                  : "register-alert-success"
              }`}
            >
              <span className="register-alert-icon">
                {error ? "⚠" : "✓"}
              </span>

              <span>{message}</span>
            </div>
          )}

          <div className="register-field">
            <label className="register-label">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="register-input"
              autoComplete="username"
            />
          </div>

          <div className="register-field">
            <label className="register-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="register-input"
              autoComplete="email"
            />
          </div>

          <div className="register-field">
            <label className="register-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="register-input"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="register-footer">
            Already have an account?{" "}
            <a href="/login" className="register-footer-link">
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;