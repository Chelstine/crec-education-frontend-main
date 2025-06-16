// Service d'authentification avec gestion des sessions
import { useNavigate } from 'react-router-dom';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

class AuthService {
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private readonly STORAGE_KEYS = {
    TOKEN: 'adminToken',
    REFRESH_TOKEN: 'adminRefreshToken',
    USER: 'adminUser',
    EXPIRES_AT: 'adminTokenExpiresAt',
    LAST_ACTIVITY: 'adminLastActivity'
  };
  
  private activityTimeout: NodeJS.Timeout | null = null;

  /**
   * Authentifier un utilisateur
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // TODO: Remplacer par un appel API réel
      if (email === 'admin@crec.edu' && password === 'admin123') {
        const user: AdminUser = {
          id: '1',
          email,
          name: 'Administrateur CREC',
          role: 'admin',
          permissions: ['read', 'write', 'delete', 'manage_users']
        };

        const tokens: AuthTokens = {
          accessToken: this.generateMockToken(),
          refreshToken: this.generateMockToken(),
          expiresAt: Date.now() + this.SESSION_TIMEOUT
        };

        this.storeAuthData(user, tokens);
        this.startSessionMonitoring();
        
        return { success: true, user };
      } else {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }
    } catch (error) {
      return { success: false, error: 'Erreur de connexion' };
    }
  }

  /**
   * Déconnecter l'utilisateur
   */
  logout(): void {
    this.clearAuthData();
    this.stopSessionMonitoring();
    window.location.href = '/admin/login';
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.STORAGE_KEYS.TOKEN);
    const expiresAt = localStorage.getItem(this.STORAGE_KEYS.EXPIRES_AT);
    
    if (!token || !expiresAt) {
      return false;
    }

    if (Date.now() > parseInt(expiresAt)) {
      this.logout();
      return false;
    }

    return true;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): AdminUser | null {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Rafraîchir le token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return false;

      // TODO: Appel API pour rafraîchir le token
      const newTokens: AuthTokens = {
        accessToken: this.generateMockToken(),
        refreshToken: this.generateMockToken(),
        expiresAt: Date.now() + this.SESSION_TIMEOUT
      };

      localStorage.setItem(this.STORAGE_KEYS.TOKEN, newTokens.accessToken);
      localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, newTokens.refreshToken);
      localStorage.setItem(this.STORAGE_KEYS.EXPIRES_AT, newTokens.expiresAt.toString());

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Enregistrer l'activité utilisateur
   */
  recordActivity(): void {
    localStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }

  /**
   * Vérifier l'inactivité
   */
  checkInactivity(): boolean {
    const lastActivity = localStorage.getItem(this.STORAGE_KEYS.LAST_ACTIVITY);
    if (!lastActivity) return false;

    const timeSinceActivity = Date.now() - parseInt(lastActivity);
    return timeSinceActivity > this.SESSION_TIMEOUT;
  }

  /**
   * Démarrer la surveillance de session
   */
  startSessionMonitoring(): void {
    this.stopSessionMonitoring();
    
    // Surveiller l'activité utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      this.recordActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Vérifier périodiquement l'expiration
    this.activityTimeout = setInterval(() => {
      if (!this.isAuthenticated() || this.checkInactivity()) {
        this.logout();
      }
    }, 60000); // Vérifier chaque minute
  }

  /**
   * Arrêter la surveillance de session
   */
  stopSessionMonitoring(): void {
    if (this.activityTimeout) {
      clearInterval(this.activityTimeout);
      this.activityTimeout = null;
    }
  }

  /**
   * Stocker les données d'authentification
   */
  private storeAuthData(user: AdminUser, tokens: AuthTokens): void {
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, tokens.accessToken);
    localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(this.STORAGE_KEYS.EXPIRES_AT, tokens.expiresAt.toString());
    localStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }

  /**
   * Effacer les données d'authentification
   */
  private clearAuthData(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Générer un token mock (à remplacer par la logique backend)
   */
  private generateMockToken(): string {
    return `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Vérifier les permissions
   */
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) || false;
  }

  /**
   * Obtenir le token pour les requêtes API
   */
  getAuthToken(): string | null {
    if (!this.isAuthenticated()) return null;
    return localStorage.getItem(this.STORAGE_KEYS.TOKEN);
  }

  /**
   * Obtenir les headers d'authentification pour les requêtes
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();

// Hook React pour l'authentification
export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success) {
      navigate('/admin');
    }
    return result;
  };

  const logout = () => {
    authService.logout();
  };

  const isAuthenticated = () => authService.isAuthenticated();
  
  const getCurrentUser = () => authService.getCurrentUser();
  
  const hasPermission = (permission: string) => authService.hasPermission(permission);

  return {
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    hasPermission,
    recordActivity: authService.recordActivity.bind(authService)
  };
};
