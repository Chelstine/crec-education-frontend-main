import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminRequired?: boolean;
  permissions?: string[];
  requiredRoles?: AdminRole[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

/**
 * Composant de protection des routes basé sur les rôles et permissions
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  adminRequired = false,
  permissions = [],
  requiredRoles = [],
  requiredPermissions = [],
  fallbackPath = '/admin/login'
}) => {
  const location = useLocation();
  const { isAuthenticated, hasRole, hasPermission, canAccessRoute } = useAuth();

  // Pour les routes admin avec nouveau système de permissions
  if (adminRequired || requiredRoles.length > 0 || requiredPermissions.length > 0) {
    // Vérifier l'authentification
    if (!isAuthenticated) {
      return <Navigate to={fallbackPath} state={{ from: location }} replace />;
    }

    // Vérifier les rôles si spécifiés
    if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
      return <Navigate to="/admin/unauthorized" replace />;
    }

    // Vérifier les permissions si spécifiées
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission => 
        hasPermission(permission)
      );
      
      if (!hasAllPermissions) {
        return <Navigate to="/admin/unauthorized" replace />;
      }
    }

    // Vérifier l'accès à la route actuelle
    if (!canAccessRoute(location.pathname)) {
      return <Navigate to="/admin/unauthorized" replace />;
    }

    return <>{children}</>;
  }

  // Pour les routes protégées non-admin (par exemple réservation)
  if (requireAuth) {
    const fablabUser = localStorage.getItem('fablabUser');
    
    if (!fablabUser) {
      return <Navigate to="/fablab/login" state={{ from: location }} replace />;
    }
    
    try {
      const userData = JSON.parse(fablabUser);
      if (!userData.loggedIn || !userData.verified) {
        return <Navigate to="/fablab/login" state={{ from: location }} replace />;
      }
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur:', error);
      return <Navigate to="/fablab/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

/**
 * HOC pour protéger les composants avec des rôles spécifiques
 */
export const withRoleProtection = (
  Component: React.ComponentType<any>,
  requiredRoles: AdminRole[]
) => {
  return (props: any) => (
    <ProtectedRoute requiredRoles={requiredRoles}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

/**
 * HOC pour protéger les composants avec des permissions spécifiques
 */
export const withPermissionProtection = (
  Component: React.ComponentType<any>,
  requiredPermissions: string[]
) => {
  return (props: any) => (
    <ProtectedRoute requiredPermissions={requiredPermissions}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

export default ProtectedRoute;
