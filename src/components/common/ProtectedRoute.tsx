import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminRequired?: boolean;
  permissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  adminRequired = false,
  permissions = []
}) => {
  const location = useLocation();

  // Pour les routes admin
  if (adminRequired) {
    const adminToken = localStorage.getItem('adminToken');
    const adminExpiresAt = localStorage.getItem('adminTokenExpiresAt');
    
    // Vérifier si l'utilisateur est connecté et si le token n'a pas expiré
    if (!adminToken || !adminExpiresAt || Date.now() > parseInt(adminExpiresAt)) {
      // Nettoyer le localStorage si le token a expiré
      if (adminToken && adminExpiresAt && Date.now() > parseInt(adminExpiresAt)) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTokenExpiresAt');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminLastActivity');
      }
      
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // Vérifier les permissions si spécifiées
    if (permissions.length > 0) {
      const adminUser = localStorage.getItem('adminUser');
      if (adminUser) {
        try {
          const user = JSON.parse(adminUser);
          const hasPermission = permissions.some(permission => 
            user.permissions?.includes(permission)
          );
          
          if (!hasPermission) {
            // Pour le moment, on va laisser passer tous les admins
            // Plus tard, on pourra implémenter un système de permissions plus sophistiqué
            // return <Navigate to="/admin" replace />;
            console.warn(`User ${user.email} attempted to access ${location.pathname} without required permissions: ${permissions.join(', ')}`);
          }
        } catch {
          return <Navigate to="/admin/login" replace />;
        }
      }
    }

    return <>{children}</>;
  }

  // Pour les routes de réservation FabLab
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
