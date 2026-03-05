import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: AdminRole[];
  fallbackPath?: string;
  adminRequired?: boolean;      // Pour compatibilité avec tes helpers
  simpleAdminAuth?: boolean;    // Pour routes nécessitant juste la connexion
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallbackPath = '/admin/login',
  adminRequired = false,
  simpleAdminAuth = false,
}) => {
  const location = useLocation();
  const { isAuthenticated, hasRole, isAuthLoading } = useAuth();

  // ⏳ Pendant chargement Auth, afficher un loader ou rien (pour éviter la redirection "flash")
  if (isAuthLoading) {
    // Tu peux customiser le loader si tu veux
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <span>Chargement...</span>
      </div>
    );
  }

  // Auth obligatoire
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Si rôle requis, on check l'accès
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Si juste simpleAdminAuth = true, on ne vérifie que la connexion
  if (simpleAdminAuth && !isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Tout est OK
  return <>{children}</>;
};

export default ProtectedRoute;
