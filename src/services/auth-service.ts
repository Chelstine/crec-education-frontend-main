import { LoginResponse, BackendUser } from '../types';
import api from './api'; // instance Axios



const authService = {
  // Connexion - VERSION CORRIGÉE
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await api.post('/admin/login', { email, password });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur de connexion');
      }

      // ✅ CORRECTION : Le token est dans res.data.data.token
      const token = res.data.data?.token;
      const adminData: BackendUser = res.data.data?.admin;

      if (!token) {
        console.error('Structure de réponse:', res.data);
        throw new Error("Aucun token reçu depuis l'API");
      }

      localStorage.setItem('auth_token', token);
      if (adminData) {
        localStorage.setItem('admin_info', JSON.stringify(adminData));
      }

      return {
        success: true,
        message: res.data.message || 'Connexion réussie',
        token,
        admin: adminData,
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    try {
      if (token) {
        await api.post('/admin/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      // Même si l'API fail (token expiré etc), on nettoie local
      console.warn('Erreur lors de la déconnexion côté serveur:', e);
    }
    authService.clearAuth();
  },

  // Nettoyer localStorage
  clearAuth: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_info');
  },

  // Est connecté ?
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // User du localStorage
  getCurrentUser: (): BackendUser | null => {
    const adminInfo = localStorage.getItem('admin_info');
    if (!adminInfo) return null;
    try {
      return JSON.parse(adminInfo) as BackendUser;
    } catch {
      return null;
    }
  },

  // User live (backend) - utile après reload - VERSION CORRIGÉE
  fetchCurrentUser: async (): Promise<BackendUser | null> => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    try {
      const res = await api.get('/admin/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Impossible de récupérer les informations utilisateur');
      }

      // ✅ CORRECTION : Les données admin sont dans res.data.data
      const adminData: BackendUser = res.data.data;

      if (adminData) {
        localStorage.setItem('admin_info', JSON.stringify(adminData));
      }
      return adminData;
    } catch (error: any) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      if (error.response?.status === 401) {
        authService.clearAuth();
      }
      throw error;
    }
  },

  // Récupérer le token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // Demande de réinitialisation de mot de passe (mot de passe oublié)
  forgotPassword: async (email: string): Promise<void> => {
    try {
      const response = await api.post('/admin/forgot-password', { email });
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Erreur lors de la demande de réinitialisation');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  // Changer mot de passe connecté (ou premier login)
  changePassword: async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      };
      const res = await api.put('/admin/change-password', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors du changement de mot de passe');
      }

      // ✅ CORRECTION : Les données peuvent être dans res.data.data
      const adminData = res.data.data || res.data.admin;
      if (adminData) {
        localStorage.setItem('admin_info', JSON.stringify(adminData));
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Savoir si le user doit changer son mot de passe au login
  mustChangePassword: (): boolean => {
    const admin = authService.getCurrentUser();
    return admin?.must_change_password === true;
  },

  // Mise à jour du profil de l'admin connecté - VERSION CORRIGÉE
  updateProfile: async (profileData: { nom: string; prenom: string; email: string }): Promise<BackendUser> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const response = await api.put('/admin/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.success) {
        // ✅ CORRECTION : Les données peuvent être dans response.data.data
        const adminData = response.data.data || response.data.admin;
        if (adminData) {
          localStorage.setItem('admin_info', JSON.stringify(adminData));
          return adminData;
        }
      }
      throw new Error(response.data?.message || 'Erreur lors de la mise à jour du profil');
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  // --- Gestion des admins (SuperAdmin) ---

  // Liste des admins - VERSION CORRIGÉE
  getAdmins: async (): Promise<BackendUser[]> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const res = await api.get('/admin/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors de la récupération des administrateurs');
      }

      // ✅ CORRECTION : Priorité à res.data.data
      if (Array.isArray(res.data.data)) {
        return res.data.data;
      } else if (Array.isArray(res.data.admins)) {
        return res.data.admins;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        console.warn('Format de réponse inattendu pour getAdmins:', res.data);
        return [];
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Créer un admin - VERSION CORRIGÉE
  createAdmin: async (adminData: {
    nom: string;
    prenom: string;
    email: string;
    role: string;
  }): Promise<BackendUser> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const res = await api.post('/admin/admins', adminData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors de la création de l\'admin');
      }
      return res.data.data || res.data.admin;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Modifier un admin existant - VERSION CORRIGÉE
  updateAdmin: async (id: number, adminData: {
    nom?: string;
    prenom?: string;
    email?: string;
    role?: string;
  }): Promise<BackendUser> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const res = await api.put(`/admin/admins/${id}`, adminData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors de la mise à jour de l\'admin');
      }
      return res.data.data || res.data.admin;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Supprimer un admin
  deleteAdmin: async (id: number): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const res = await api.delete(`/admin/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors de la suppression de l\'admin');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Réinitialiser le mot de passe d'un admin - VERSION CORRIGÉE
  resetAdminPassword: async (id: number): Promise<{ temporary_password: string }> => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Aucun token d\'authentification');
    try {
      const res = await api.post(`/admin/admins/${id}/reset-password`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Erreur lors de la réinitialisation du mot de passe');
      }

      // ✅ CORRECTION : Vérifier res.data.data aussi
      const tempPassword = res.data.data?.temporary_password || res.data.temporary_password;

      return {
        temporary_password: tempPassword || ''
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Vérification du token de réinitialisation
  verifyResetToken: async (token: string, email: string): Promise<{ valid: boolean; message?: string }> => {
    try {
      const response = await api.post('/admin/verify-reset-token', {
        token,
        email
      });

      return {
        valid: response.data?.success || false,
        message: response.data?.message
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la vérification du token');
    }
  },

  // Réinitialisation du mot de passe avec token
  resetPassword: async (data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<void> => {
    try {
      const response = await api.post('/admin/reset-password', data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Erreur lors de la réinitialisation');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe');
    }
  }
};

export default authService;