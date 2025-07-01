import api from './api';
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
    // Identifiants codés en dur pour le développement (à supprimer en production)
    if (email === 'chelstineogoubiyi@gmail.com' && password === 'kylie') {
      const mockUser: User = {
        id: '1',
        firstName: 'Chelstine',
        lastName: 'Admin',
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
        firstName: 'Admin',
        lastName: 'Contenu',
        email: 'content@crec.bj',
        roles: ['content_admin'],
        avatar: '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        permissions: []
      };
      
      const response: AuthResponse = {
        token: 'mock-jwt-token-content-123',
        user: contentAdmin
      };
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_info', JSON.stringify(response.user));
      
      return response;
    }
    
    if (email === 'inscription@crec.bj' && password === 'inscription123') {
      const inscriptionAdmin: User = {
        id: '3',
        firstName: 'Admin',
        lastName: 'Inscription',
        email: 'inscription@crec.bj',
        roles: ['inscription_admin'],
        avatar: '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        permissions: []
      };
      
      const response: AuthResponse = {
        token: 'mock-jwt-token-inscription-123',
        user: inscriptionAdmin
      };
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_info', JSON.stringify(response.user));
      
      return response;
    }
    
    // Version normale avec API (désactivée temporairement)
    try {
      // Simulation d'une connexion réussie pour éviter les erreurs API
      /* Commenté pour éviter les appels API qui échoueraient
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      return response.data;
      */
      
      throw new Error('Identifiants incorrects. Comptes disponibles:\n- chelstineogoubiyi@gmail.com / kylie (Super Admin)\n- content@crec.bj / content123 (Admin Contenu)\n- inscription@crec.bj / inscription123 (Admin Inscription)');
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
  getCurrentUser: (): User | null => {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role Le rôle à vérifier
   * @returns Booléen indiquant si l'utilisateur a le rôle spécifié
   */
  hasRole: (role: AdminRole): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.roles?.includes(role) || false;
  }
};

export default authService;
