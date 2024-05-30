import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
   

    if (isAuthenticated === undefined) {
        // return null;
    
    }

    return isAuthenticated ? children : <Navigate to="/register-login" />;
};


export default PrivateRoute;
