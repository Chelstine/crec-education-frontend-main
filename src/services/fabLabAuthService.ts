// Service d'authentification pour les réservations FabLab
export interface FabLabUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  subscriptionType: 'mensuel' | 'trimestriel' | 'annuel';
  expiresAt: number;
  verified: boolean;
}

class FabLabAuthService {
  private readonly SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 heures pour les réservations
  private readonly STORAGE_KEYS = {
    USER: 'subscriberInfo',
    TOKEN: 'fabLabToken',
    EXPIRES_AT: 'fabLabExpiresAt',
    LAST_ACTIVITY: 'fabLabLastActivity'
  };

  /**
   * Vérifier l'abonnement utilisateur
   */
  async verifySubscription(accessKey: string): Promise<{ success: boolean; user?: FabLabUser; error?: string }> {
    try {
      // TODO: Remplacer par un appel API réel
      // Simulation de vérification d'abonnement
      if (accessKey.startsWith('CREC-FAB-')) {
        const user: FabLabUser = {
          id: accessKey,
          email: 'user@example.com',
          name: 'Utilisateur FabLab',
          phone: '+228 12 34 56 78',
          subscriptionType: 'mensuel',
          expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 jours
          verified: true
        };

        this.storeUserData(user);
        return { success: true, user };
      } else {
        return { success: false, error: 'Clé d\'accès invalide' };
      }
    } catch (error) {
      return { success: false, error: 'Erreur de vérification' };
    }
  }

  /**
   * Vérifier si l'utilisateur a un accès valide
   */
  isVerified(): boolean {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    if (!userStr) return false;

    try {
      const user = JSON.parse(userStr);
      
      // Vérifier si l'abonnement n'a pas expiré
      if (user.expiresAt && Date.now() > user.expiresAt) {
        this.logout();
        return false;
      }

      // Vérifier la session
      const lastActivity = localStorage.getItem(this.STORAGE_KEYS.LAST_ACTIVITY);
      if (lastActivity && Date.now() - parseInt(lastActivity) > this.SESSION_TIMEOUT) {
        this.logout();
        return false;
      }

      return user.verified === true;
    } catch {
      return false;
    }
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): FabLabUser | null {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Enregistrer l'activité utilisateur
   */
  recordActivity(): void {
    localStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }

  /**
   * Déconnecter l'utilisateur
   */
  logout(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Stocker les données utilisateur
   */
  private storeUserData(user: FabLabUser): void {
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }

  /**
   * Vérifier les permissions de réservation
   */
  canMakeReservation(): boolean {
    const user = this.getCurrentUser();
    if (!user || !this.isVerified()) return false;

    // Vérifier si l'abonnement permet les réservations
    return user.expiresAt > Date.now();
  }

  /**
   * Obtenir les headers pour les requêtes API
   */
  getAuthHeaders(): Record<string, string> {
    const user = this.getCurrentUser();
    return user ? { 'X-FabLab-User': user.id } : {};
  }
}

export const fabLabAuthService = new FabLabAuthService();

// Hook React pour l'authentification FabLab
export const useFabLabAuth = () => {
  const verifySubscription = async (accessKey: string) => {
    return await fabLabAuthService.verifySubscription(accessKey);
  };

  const isVerified = () => fabLabAuthService.isVerified();
  
  const getCurrentUser = () => fabLabAuthService.getCurrentUser();
  
  const canMakeReservation = () => fabLabAuthService.canMakeReservation();

  const logout = () => fabLabAuthService.logout();

  return {
    verifySubscription,
    isVerified,
    getCurrentUser,
    canMakeReservation,
    logout,
    recordActivity: fabLabAuthService.recordActivity.bind(fabLabAuthService)
  };
};
