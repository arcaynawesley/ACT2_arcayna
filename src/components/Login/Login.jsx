import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirect to dashboard on click
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="glass-card">
        <div className="header">
          <h1 className="welcome">Welcome Back</h1>
          <p className="subtitle">Please login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="username@gmail.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>

        <div className="separator"><span>or continue with</span></div>

        <div className="social-grid">
          <button className="social-item">Google</button>
          <button className="social-item">Github</button>
        </div>

        <p className="footer-text">
          Don't have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;