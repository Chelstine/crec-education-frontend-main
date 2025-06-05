import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Vérifier si l'utilisateur a un abonnement vérifié
  const subscriberInfo = localStorage.getItem('subscriberInfo');
  const isVerified = subscriberInfo ? JSON.parse(subscriberInfo).verified : false;
  
  const location = useLocation();

  if (!isVerified) {
    // Rediriger vers la page de vérification d'abonnement
    return <Navigate to="/subscription-verification" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
