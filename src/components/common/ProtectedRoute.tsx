import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminRequired?: boolean; // Conservé pour compatibilité future
  permissions?: string[]; // Conservé pour compatibilité future
}

// Version simplifiée de ProtectedRoute en attendant la nouvelle implémentation admin
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  adminRequired = false,
  permissions = []
}) => {
  const location = useLocation();

  // Pour les routes admin - à réimplémenter plus tard
  if (adminRequired) {
    // Version temporaire - redirection vers une page indiquant que l'admin est en cours de développement
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Pour les routes protégées non-admin (par exemple réservation)
  if (requireAuth) {
    const subscriberInfo = localStorage.getItem('subscriberInfo');
    const isVerified = subscriberInfo ? JSON.parse(subscriberInfo).verified : false;
    
    if (!isVerified) {
      return <Navigate to="/subscription-verification" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
