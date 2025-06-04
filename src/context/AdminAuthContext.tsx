import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminTokenResponse, AdminLoginForm } from '@/types';
import { AdminService } from '@/services/api';

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  login: (data: AdminLoginForm) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data: AdminLoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const res: AdminTokenResponse = await AdminService.login(data);
      setToken(res.token);
      setAdmin(res.user);
      localStorage.setItem('adminToken', res.token);
      localStorage.setItem('adminUser', JSON.stringify(res.user));
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, loading, error }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
