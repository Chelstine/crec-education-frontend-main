import api from './api';

/**
 * Service d'authentification pour l'espace administrateur
 */
const authService = {
  /**
   * Connecte un utilisateur et stocke son token d'authentification
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   */
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Déconnecte l'utilisateur en supprimant ses informations d'authentification
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  },

  /**
   * Vérifie si l'utilisateur est actuellement authentifié
   * @returns Booléen indiquant si l'utilisateur est connecté
   */
  isAuthenticated: (): boolean => {
    return localStorage.getItem('auth_token') !== null;
  },

  /**
   * Récupère les informations de l'utilisateur connecté
   * @returns Les informations de l'utilisateur ou null s'il n'est pas connecté
   */
  getCurrentUser: () => {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role Le rôle à vérifier
   * @returns Booléen indiquant si l'utilisateur a le rôle spécifié
   */
  hasRole: (role: string): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.roles?.includes(role) || false;
  }
};

export default authService;
