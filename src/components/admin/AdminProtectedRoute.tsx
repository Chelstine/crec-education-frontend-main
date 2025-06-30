import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

/**
 * Composant pour protéger les routes admin
 * Vérifie si l'utilisateur est authentifié et a les rôles requis
 */
const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Afficher un spinner pendant le chargement des données d'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold"></div>
      </div>
    );
  }
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  // Vérifier si un rôle spécifique est requis
  if (requiredRole && user) {
    const hasRequiredRole = user.roles.includes(requiredRole);
    if (!hasRequiredRole) {
      // Rediriger vers le tableau de bord si l'utilisateur n'a pas le rôle requis
      return <Navigate to="/admin/dashboard" />;
    }
  }
  
  // Si toutes les conditions sont remplies, afficher le contenu protégé
  return <>{children}</>;
};

export default AdminProtectedRoute;
