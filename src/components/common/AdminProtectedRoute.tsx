import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Vérifier si l'utilisateur est authentifié comme admin
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    // Rediriger vers la page de login admin avec l'URL de retour
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;
