import { AuthService } from './modernApiServices';
import { User, AuthResponse, AdminRole } from '../types';

/**
 * Service d'authentification pour l'espace administrateur
 */
const authService = {
  /**
   * Connecte un utilisateur et stocke son token d'authentification
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Utiliser le vrai service d'authentification
      const response = await AuthService.login(email, password);
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_info', JSON.stringify(response.user));
      
      return {
        token: response.token,
        user: response.user
      };
    } catch (error: any) {
      // En cas d'erreur, essayer les comptes de développement
      console.warn('Backend authentication failed, falling back to dev accounts:', error.message);
      
      // Identifiants codés en dur pour le développement (à supprimer en production)
      if (email === 'chelstineogoubiyi@gmail.com' && password === 'kylie') {
        const mockUser: User = {
          id: '1',
          firstname: 'Chelstine',
          lastname: 'Admin',
          email: 'chelstineogoubiyi@gmail.com',
          roles: ['super_admin'],
          avatar: '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          permissions: []
        };
        
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-123456789',
          user: mockUser
        };
        
        localStorage.setItem('auth_token', mockResponse.token);
        localStorage.setItem('user_info', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      // Ajout d'autres comptes de test pour les différents rôles
      if (email === 'content@crec.bj' && password === 'content123') {
        const contentAdmin: User = {
          id: '2',
          firstname: 'Admin',
          lastname: 'Contenu',
          email: 'content@crec.bj',
          roles: ['content_admin'],
          avatar: '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          permissions: []
        };
        
        const mockResponse: AuthResponse = {
          token: 'mock-content-token-456',
          user: contentAdmin
        };
        
        localStorage.setItem('auth_token', mockResponse.token);
        localStorage.setItem('user_info', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      if (email === 'inscription@crec.bj' && password === 'inscription123') {
        const inscriptionAdmin: User = {
          id: '3',
          firstname: 'Admin',
          lastname: 'Inscription',
          email: 'inscription@crec.bj',
          roles: ['inscription_admin'],
          avatar: '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          permissions: []
        };
        
        const mockResponse: AuthResponse = {
          token: 'mock-inscription-token-789',
          user: inscriptionAdmin
        };
        
        localStorage.setItem('auth_token', mockResponse.token);
        localStorage.setItem('user_info', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      // Si aucun compte ne correspond, relancer l'erreur
      throw new Error('Identifiants incorrects');
    }
  },

  /**
   * Déconnecte l'utilisateur en supprimant le token d'authentification
   */
  logout: (): void => {
    try {
      AuthService.logout();
    } catch {
      // Fallback: suppression locale
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  },

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  /**
   * Récupère les informations de l'utilisateur actuel
   */
  getCurrentUser: (): User | null => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  hasRole: (role: AdminRole): boolean => {
    const user = authService.getCurrentUser();
    return user?.roles.includes(role) || false;
  },

  /**
   * Vérifie si l'utilisateur a au moins un des rôles spécifiés
   */
  hasAnyRole: (roles: AdminRole[]): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return roles.some(role => user.roles.includes(role));
  },

  /**
   * Vérifie si l'utilisateur a tous les rôles spécifiés
   */
  hasAllRoles: (roles: AdminRole[]): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return roles.every(role => user.roles.includes(role));
  },

  /**
   * Obtient le token d'authentification actuel
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};

export default authService;
