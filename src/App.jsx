import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";

/**
 * App.jsx - Main Routing Component
 * Defines the navigation structure for the ACT2 project.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: 
            The root path displays the Glassmorphism Login page. 
        */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Route: 
            The Dashboard is wrapped in ProtectedRoute to check for a valid 
            token in localStorage before allowing access.
        */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Route: 
            Redirects any undefined paths back to the Login page. 
        */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;