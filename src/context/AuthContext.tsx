import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
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

  // Vérifie si l'utilisateur a le rôle admin
  const isAdmin = !!user && (user.roles.includes('admin') || user.roles.includes('super_admin'));

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    logout,
    loading,
    error
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
