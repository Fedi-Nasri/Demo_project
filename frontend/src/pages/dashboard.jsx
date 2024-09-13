import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { username, email, token } = location.state || {}; // Access state safely

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {/* Render only the string representation of the token */}
      <p>Access Token: {token?.accessToken}</p>
      <p>Refresh Token: {token?.refreshToken}</p>
    </div>
  );
};

export default Dashboard;
