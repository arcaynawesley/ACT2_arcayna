import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h1>Welcome</h1>
        <p>You have successfully logged into your dashboard.</p>
        <button className="logout-btn" onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;