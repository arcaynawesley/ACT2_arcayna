import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="hero-section">
        <div className="hero-content">
          <h2>Decide faster so you can do more</h2>
          <p>Join our community and manage your workflow efficiently.</p>
        </div>
      </div>

      <div className="form-section">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Log in</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="6+ characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="footer-text">
            Don't have an account? <span className="link">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;