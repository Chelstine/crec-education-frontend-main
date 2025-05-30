import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
  const location = useLocation();

  if (!isSubscribed) {
    const redirectPath = location.pathname.replace(/^\//, '');
    return <Navigate to={`/souscription?redirect=${redirectPath}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
