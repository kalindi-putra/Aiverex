'use client';
import ProtectedRoute from '../../Components/protectRoute';

export default function StudentLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      {children}
    </ProtectedRoute>
  );
}
