
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    
    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(
        "http://localhost:5000/api/jobs/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      setSuccess(
        response.data?.message || "Login successful."
      );

      if (response.status === 200) {
        console.log("Login successful");

        navigate("/");

        
        window.location.reload();
      }

    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <span>MERIJOB</span>
          </div>

          <h1 className="login-title">
            Welcome back
          </h1>

          <p className="login-subtitle">
            Sign in to continue your job search
          </p>
        </div>

        {/* Body */}
        <div className="login-body">

          {/* Error */}
          {error && (
            <div className="login-alert login-alert-error">
              <span className="login-alert-icon">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="login-alert login-alert-success">
              <span className="login-alert-icon">✓</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="login-field">
              <label
                htmlFor="email"
                className="login-label"
              >
                Email address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className={`login-input ${
                  focused === "email"
                    ? "login-input-focused"
                    : ""
                }`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="login-field">

              <div className="login-label-row">
                <label
                  htmlFor="password"
                  className="login-label login-label-inline"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="login-forgot-link"
                >
                  Forgot password?
                </a>
              </div>

              <div className="login-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  id="password"
                  name="password"
                  className={`login-input login-input-password ${
                    focused === "password"
                      ? "login-input-focused"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-toggle-btn"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`login-submit-btn ${
                loading
                  ? "login-submit-btn-loading"
                  : ""
              }`}
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>

          {/* Register */}
          <p className="login-footer">
            Don't have an account?{" "}

            <a
              href="/register"
              className="login-footer-link"
            >
              Create account
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

