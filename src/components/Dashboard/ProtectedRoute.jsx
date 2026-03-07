import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("token");

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;