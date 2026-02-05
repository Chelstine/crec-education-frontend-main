import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminRole } from '@/types';
import { School } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: AdminRole[];
  fallbackPath?: string;
}

/**
 * Composant pour protéger les routes admin
 * Vérifie si l'utilisateur est authentifié et a les rôles requis
 */
const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredRoles,
  fallbackPath = '/admin/dashboard'
}) => {
  const { isAuthenticated, loading, user, hasRole, mustChangePassword } = useAuth();
  const location = useLocation();

  // Afficher un spinner pendant le chargement des données d'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-crec-gold rounded-md p-2">
            <School className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crec-gold"></div>
          <p className="text-slate-600 text-sm">Vérification des permissions...</p>
        </div>
      </div>
    );
  }
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location }}
        replace
      />
    );
  }

  // Si l'utilisateur doit changer son mot de passe et n'est pas sur la page de login
  if (mustChangePassword && location.pathname !== '/admin/login') {
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location }}
        replace
      />
    );
  }
  
  // Vérifier si des rôles spécifiques sont requis
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = hasRole(requiredRoles);
    
    if (!hasRequiredRole) {
      // Debug en développement
      if (import.meta.env.DEV) {
        console.warn(`Accès refusé. Rôles requis: [${requiredRoles.join(', ')}], rôle utilisateur: ${user.role}`);
      }
      
      // Rediriger vers le fallback si l'utilisateur n'a pas le rôle requis
      return <Navigate to={fallbackPath} replace />;
    }
  }
  
  // Si toutes les conditions sont remplies, afficher le contenu protégé
  return <>{children}</>;
};

export default AdminProtectedRoute;