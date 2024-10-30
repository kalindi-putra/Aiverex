import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/UserContext';

const ProtectedRoute = ({ path, element }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!userData || (userData.role !== 'student' && userData.role !== 'mentor')) {
    return <Navigate to="/login" replace />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
