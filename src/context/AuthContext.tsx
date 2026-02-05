import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth-service';
import { BackendUser, AdminRole } from '@/types';

export interface AuthContextType {
  user: BackendUser | null;
  setUser: (user: BackendUser | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<{ requiresPasswordChange: boolean }>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  loading: boolean;
  isAuthLoading: boolean;
  error: string | null;
  hasRole: (roles: AdminRole[]) => boolean;
  clearError: () => void;
  updateProfile: (profileData: { nom: string; prenom: string; email: string }) => Promise<BackendUser>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérification de l'utilisateur au tout premier chargement (refresh)
  useEffect(() => {
    setIsAuthLoading(true);
    authService.fetchCurrentUser()
      .then(fetchedUser => setUser(fetchedUser))
      .catch(() => setUser(null))
      .finally(() => setIsAuthLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<{ requiresPasswordChange: boolean }> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setUser(response.admin);
      return { requiresPasswordChange: response.admin?.must_change_password === true };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Identifiants incorrects ou problème réseau';
      setError(errorMessage);
      setUser(null);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (authService.isAuthenticated()) {
        await authService.logout();
      }
    } catch (err) {
      // On catch juste pour ne pas bloquer le logout côté front
      console.error("Erreur lors du logout:", err);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      return;
    }
    setLoading(true);
    try {
      const backendUser = await authService.fetchCurrentUser();
      if (backendUser) {
        setUser(backendUser);
      } else {
        setUser(null);
        authService.clearAuth();
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        authService.clearAuth();
        setUser(null);
      }
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Erreur lors de la récupération de l'utilisateur"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      await authService.changePassword(currentPassword, newPassword, confirmPassword);
      await getCurrentUser();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Erreur lors du changement de mot de passe'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: { nom: string; prenom: string; email: string }): Promise<BackendUser> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Erreur lors de la mise à jour du profil'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (roles: AdminRole[]): boolean => {
    if (!user || !user.role) return false;
    return roles.includes(user.role as AdminRole);
  };

  const clearError = () => setError(null);

  // Valeurs calculées
  const isAdmin = !!user && !!user.role;
  const mustChangePassword = !!user?.must_change_password;
  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated,
    isAdmin,
    mustChangePassword,
    login,
    logout,
    getCurrentUser,
    changePassword,
    loading,
    isAuthLoading,
    error,
    hasRole,
    clearError,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
