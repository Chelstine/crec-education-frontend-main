import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth-service';
import { User, AdminRole } from '../types';
import { hasPermission, hasRole, isSuperAdmin, canAccessSection, checkRoutePermission } from '../services/permissionService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isContentAdmin: boolean;
  isInscriptionAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  // Fonctions de vérification des permissions
  hasPermission: (permission: string) => boolean;
  hasRole: (roles: AdminRole[]) => boolean;
  canAccessSection: (section: string) => boolean;
  canAccessRoute: (routePath: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const isAuth = authService.isAuthenticated();
        
        if (isAuth) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Si nous avons un token mais pas d'infos utilisateur, déconnexion
            authService.logout();
          }
        }
      } catch (err) {
        console.error('Erreur d\'initialisation de l\'authentification:', err);
        setError('Erreur lors de l\'initialisation de l\'authentification');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(email, password);
      setUser(response.user);
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError(err.response?.data?.message || 'Identifiants incorrects');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Vérifie si l'utilisateur a le rôle admin (compatibilité)
  const isAdmin = !!user && (user.roles.includes('super_admin') || user.roles.includes('content_admin') || user.roles.includes('inscription_admin'));
  
  // Vérifie les rôles spécifiques
  const userIsSuperAdmin = !!user && isSuperAdmin(user.roles);
  const isContentAdmin = !!user && user.roles.includes('content_admin');
  const isInscriptionAdmin = !!user && user.roles.includes('inscription_admin');

  // Fonctions de vérification des permissions
  const userHasPermission = (permission: string): boolean => {
    return !!user && hasPermission(user.roles, permission);
  };

  const userHasRole = (roles: AdminRole[]): boolean => {
    return !!user && hasRole(user.roles, roles);
  };

  const userCanAccessSection = (section: string): boolean => {
    return !!user && canAccessSection(user.roles, section);
  };

  const canAccessRoute = (routePath: string): boolean => {
    return !!user && checkRoutePermission(user.roles, routePath);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    isSuperAdmin: userIsSuperAdmin,
    isContentAdmin,
    isInscriptionAdmin,
    login,
    logout,
    loading,
    error,
    hasPermission: userHasPermission,
    hasRole: userHasRole,
    canAccessSection: userCanAccessSection,
    canAccessRoute
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
