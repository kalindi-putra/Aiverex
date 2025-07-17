'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (allowedRoles && !allowedRoles.includes(userData?.role)) {
      router.push('/');
    }
  }, [isLoggedIn, userData, allowedRoles, router]);

  if (!isLoggedIn || (allowedRoles && !allowedRoles.includes(userData?.role))) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
