// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // If no token, redirect to login
    if (!token) {
      navigate('/login');
    }

    // Set up axios headers
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    // Fetch user data
    axios
      .get('http://localhost:5000/api/auth/user', config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err.response.data);
        // If token is invalid, remove it and redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {/* Add more components here */}
    </div>
  );
}

export default Dashboard;
