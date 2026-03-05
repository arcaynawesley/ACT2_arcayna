import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar with improved styling */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"></div>
          <span>NOVA CORE</span>
        </div>
        
        <nav className="menu-nav">
          <p className="section-label">Main Menu</p>
          <div className="menu-item active">
             <span className="icon">📊</span> Overview
          </div>
          <div className="menu-item">
             <span className="icon">📈</span> Analytics
          </div>
          <div className="menu-item">
             <span className="icon">👥</span> User Management
          </div>
          <div className="menu-item">
             <span className="icon">🛡️</span> System Logs
          </div>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-button" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area with a top bar and containers */}
      <main className="main-view">
        <header className="top-navbar">
          <div className="search-container">
            <input type="text" placeholder="Search analytics..." />
          </div>
          <div className="user-actions">
            <span className="notification-bell">🔔</span>
            <div className="profile-badge">AU</div>
            <span className="profile-name">Admin User</span>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">Revenue</span>
              <div className="value-group">
                <h2>$42,000</h2>
                <span className="trend positive">+12.5%</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="label">Sessions</span>
              <div className="value-group">
                <h2>12,402</h2>
                <span className="trend neutral">Stable</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="label">System Errors</span>
              <div className="value-group">
                <h2>0</h2>
                <span className="trend positive">Perfect</span>
              </div>
            </div>
          </div>

          <div className="main-data-container">
            <div className="card-header">
              <h3>Recent System Activity</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-info">
                  <p className="activity-title">Database Sync</p>
                  <p className="activity-time">2 minutes ago</p>
                </div>
                <span className="status-tag success">Completed</span>
              </div>
              <div className="activity-item">
                <div className="activity-info">
                  <p className="activity-title">Security Firewall Update</p>
                  <p className="activity-time">45 minutes ago</p>
                </div>
                <span className="status-tag success">Active</span>
              </div>
              <div className="activity-item">
                <div className="activity-info">
                  <p className="activity-title">New User Registration</p>
                  <p className="activity-time">1 hour ago</p>
                </div>
                <span className="status-tag info">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;