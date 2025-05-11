import {auth} from './firebase/Firebase';
import { signOut } from 'firebase/auth';
import { useContext , useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './context/UserContext';
import { MainNav } from './Components/CustNav';
import { publicRoutes } from './routes/PublicRoutes';
import { studentRoutes } from './routes/StudentRoutes';
import { mentorRoutes } from './routes/MentorRoutes';
import PageNotFound from './Components/404';
import ErrorBoundary from './ErrorBoundary';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userData } = useContext(AuthContext);
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

function App() {
  const { userData } = useContext(AuthContext);
  console.log("1--->",userData);
  
  const location = useLocation();

  useEffect(() => {
    signOut(auth).then(() => console.log("User logged out on refresh."));
  }, []);


  return (
    <>
       {location.pathname !== '/' && <MainNav />} 
      
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Student Routes */}
        {studentRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}

        {/* Mentor Routes */}
        {mentorRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;