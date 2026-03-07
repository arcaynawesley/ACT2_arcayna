import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// Configure axios globally for the login page
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Missing Code: Redirect if token already exists (preventing login page access while logged in)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      // Ensure the URL matches your serve port (8000)
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Standard practice: set default header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        console.log("Login Success:", response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      // Added more specific error handling
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("Cannot connect to server. Make sure XAMPP and Laravel are running.");
      }
      console.error("Login Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="glass-card">
        <div className="header">
          <h1 className="welcome">Welcome Back</h1>
          <p className="subtitle">Please login to your account</p>
        </div>

        {error && <p style={{ color: "#ff4d4d", fontSize: "14px", marginBottom: "10px", textAlign: "center", fontWeight: "500" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="username@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete="email"
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="current-password"
              required 
            />
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="sign-in-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="separator"><span>or continue with</span></div>

        <div className="social-grid">
          <button type="button" className="social-item">Google</button>
          <button type="button" className="social-item">Github</button>
        </div>

        <p className="footer-text">
          Don't have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;