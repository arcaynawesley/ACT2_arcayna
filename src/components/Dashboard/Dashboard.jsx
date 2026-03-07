import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

/**
 * UserTable Component
 * Renders the list of all registered users in a Glassmorphism container.
 */
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/users-all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  /**
   * Delete User Function
   * Sends a DELETE request to Laravel and updates the UI locally
   */
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter out the deleted user so the UI updates instantly
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      // Handles the "You cannot delete yourself" error from Laravel
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading system users...</p>;

  return (
    <div className="main-data-container animate-fade-in">
      <div className="card-header">
        <h3>System User Management</h3>
        <span className="status-tag info">{users.length} Total</span>
      </div>
      <div className="table-responsive">
        <table className="user-management-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th> {/* New Column Header */}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td>
                  {/* Delete Button with aesthetic class */}
                  <button 
                    onClick={() => deleteUser(u.id)} 
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total_users: 0, system_status: "Offline" });
  const [tokenStatus, setTokenStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // Controls which view is shown

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [userRes, statsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/user", { headers }),
          axios.get("http://127.0.0.1:8000/api/stats", { headers })
        ]);

        setUser(userRes.data);
        setStats(statsRes.data.data);
      } catch (err) {
        console.error("Connection failed:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const handleTokenTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/token-test", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTokenStatus(response.data.message); 
      setTimeout(() => setTokenStatus(null), 3000); 
    } catch (err) {
      setTokenStatus("Connection Failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"></div>
          <span>NOVA CORE</span>
        </div>
        
        <nav className="menu-nav">
          <p className="section-label">Main Menu</p>
          <div 
            className={`menu-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
             <span className="icon">📊</span> Overview
          </div>
          <div className="menu-item disabled">
             <span className="icon">📈</span> Analytics
          </div>
          <div 
            className={`menu-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
             <span className="icon">👥</span> User Management
          </div>
          <div className="menu-item disabled">
             <span className="icon">🛡️</span> System Logs
          </div>
        </nav>

        <div className="sidebar-bottom">
          <button className="test-token-btn" onClick={handleTokenTest}>
            Verify Connection
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="main-view">
        <header className="top-navbar">
          <div className="search-container">
            <input type="text" placeholder="Search analytics..." />
          </div>
          <div className="user-actions">
            {tokenStatus && <span className="token-success-msg">● {tokenStatus}</span>}
            <span className="notification-bell">🔔</span>
            <div className="profile-badge">
              {user ? user.name.substring(0, 2).toUpperCase() : "..."}
            </div>
            <span className="profile-name">{user ? user.name : "Loading..."}</span>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === "overview" ? (
            <>
              <div className="welcome-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome back, {user ? user.name : "User"}! Here's what's happening today.</p>
              </div>

              <div className="metrics-grid">
                <div className="metric-card">
                  <span className="label">Total Users</span>
                  <div className="value-group">
                    <h2>{stats.total_users}</h2>
                    <span className="trend positive">Live</span>
                  </div>
                </div>
                <div className="metric-card">
                  <span className="label">System Status</span>
                  <div className="value-group">
                    <h2>{stats.system_status}</h2>
                    <span className="trend neutral">Active</span>
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
                      <p className="activity-time">{stats.last_sync || "Just now"}</p>
                    </div>
                    <span className="status-tag success">Completed</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <UserTable />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;