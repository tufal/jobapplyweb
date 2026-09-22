import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const ProtectProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jobs/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectProfile;