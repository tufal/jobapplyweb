
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isauth, setIsauth] = useState(false);
  const [uname,setUname] = useState(" ");
  const navigate = useNavigate();

 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/jobs/profile",
          {
            withCredentials: true,
          }
        );

        console.log("PROFILE DATA:", data);
        setUname(data.user.username);
        
        

        if (data?.user ) {
          setIsauth(true);
          
        } else {
          setIsauth(false);
        }

      } catch (error) {
        console.log(
          "PROFILE ERROR:",
          error.response?.data || error.message
        );

        setIsauth(false);
      }
    };

    checkAuth();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/jobs/logout",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("LOGOUT:", data);

      setIsauth(false);

      navigate("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div
        className="container-fluid"
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
        }}
      >
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4 text-primary me-3 me-lg-4"
          to="/"
        >
          MERIJOB
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation */}
          <ul className="navbar-nav mx-auto gap-lg-3">
            <li className="nav-item fs-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 ${
                    isActive ? "text-primary fw-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item fs-5">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `nav-link px-3 ${
                    isActive ? "text-primary fw-semibold" : ""
                  }`
                }
              >
                Jobs
              </NavLink>
            </li>

            <li className="nav-item fs-5">
              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `nav-link px-3 ${
                    isActive ? "text-primary fw-semibold" : ""
                  }`
                }
              >
                Applications
              </NavLink>
            </li>

            
            {isauth && (
              <>
                <li className="nav-item fs-5">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `nav-link px-3 ${
                        isActive ? "text-primary fw-semibold" : ""
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item fs-5">
                  <NavLink
  to="/complete-profile"
  className={({ isActive }) =>
    `nav-link px-3 ${
      isActive ? "text-primary fw-semibold" : ""
    }`
  }
>
  CompleteProfile
</NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Authentication Buttons */}
          
          <div className="d-flex gap-2">
            {isauth ? (
              <>
                <p className="mb-0 me-3 text-secondary fw-medium text-nowrap">
                  Welcome, <span className="text-primary">{uname.trim()}</span>
                </p>
                <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary px-4"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-primary px-4"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

