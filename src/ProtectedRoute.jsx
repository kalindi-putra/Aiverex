import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/UserContext';

const ProtectedRoute = ({ element, role }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (!userData || userData.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }


  return element;
};

export default ProtectedRoute;
