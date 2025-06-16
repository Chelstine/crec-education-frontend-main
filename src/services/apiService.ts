// Service API configuré pour production avec authentification
import { authService } from './authService';
import { fabLabAuthService } from './fabLabAuthService';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class ApiService {
  private readonly baseUrl: string;
  private readonly timeout: number = 30000; // 30 secondes

  constructor() {
    // Configuration de l'URL de base selon l'environnement
    this.baseUrl = this.getBaseUrl();
  }

  /**
   * Obtenir l'URL de base selon l'environnement
   */
  private getBaseUrl(): string {
    if (typeof window === 'undefined') return '';
    
    // En développement
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    }
    
    // En production
    return import.meta.env.VITE_API_URL || 'https://api.crec.edu/api';
  }

  /**
   * Obtenir les headers d'authentification
   */
  private getHeaders(isAdmin: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (isAdmin) {
      const adminHeaders = authService.getAuthHeaders();
      Object.assign(headers, adminHeaders);
    } else {
      const fabLabHeaders = fabLabAuthService.getAuthHeaders();
      Object.assign(headers, fabLabHeaders);
    }

    return headers;
  }

  /**
   * Effectuer une requête HTTP générique
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    isAdmin: boolean = false
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = this.getHeaders(isAdmin);

      const config: RequestInit = {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: AbortSignal.timeout(this.timeout),
      };

      const response = await fetch(url, config);
      
      // Gestion des erreurs HTTP
      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré ou invalide
          if (isAdmin) {
            authService.logout();
          } else {
            fabLabAuthService.logout();
          }
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
        message: data.message
      };

    } catch (error) {
      console.error('Erreur API:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
          return {
            success: false,
            error: 'Délai d\'attente dépassé. Vérifiez votre connexion.'
          };
        }
        
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: false,
        error: 'Une erreur inattendue s\'est produite.'
      };
    }
  }

  // ==================== MÉTHODES ADMIN ====================

  /**
   * Authentification admin
   */
  async adminLogin(email: string, password: string): Promise<ApiResponse<{
    user: any;
    tokens: { accessToken: string; refreshToken: string; expiresAt: number };
  }>> {
    return this.request('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  /**
   * Rafraîchir le token admin
   */
  async adminRefreshToken(refreshToken: string): Promise<ApiResponse<{
    accessToken: string;
    expiresAt: number;
  }>> {
    return this.request('/admin/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });
  }

  /**
   * Obtenir les statistiques du dashboard
   */
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request('/admin/dashboard/stats', { method: 'GET' }, true);
  }

  /**
   * Gestion des formations ISTMR
   */
  async getISTMRFormations(): Promise<ApiResponse<any[]>> {
    return this.request('/admin/formations/istmr', { method: 'GET' }, true);
  }

  async createISTMRFormation(data: any): Promise<ApiResponse<any>> {
    return this.request('/admin/formations/istmr', {
      method: 'POST',
      body: JSON.stringify(data)
    }, true);
  }

  async updateISTMRFormation(id: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/admin/formations/istmr/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }, true);
  }

  /**
   * Gestion des inscriptions FabLab
   */
  async getFabLabInscriptions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.request(`/admin/inscriptions/fablab?${queryString}`, { method: 'GET' }, true);
  }

  async approveFabLabInscription(id: string): Promise<ApiResponse<any>> {
    return this.request(`/admin/inscriptions/fablab/${id}/approve`, {
      method: 'POST'
    }, true);
  }

  async rejectFabLabInscription(id: string, reason?: string): Promise<ApiResponse<any>> {
    return this.request(`/admin/inscriptions/fablab/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }, true);
  }

  /**
   * Gestion des événements
   */
  async getEvents(): Promise<ApiResponse<any[]>> {
    return this.request('/admin/events', { method: 'GET' }, true);
  }

  async createEvent(data: any): Promise<ApiResponse<any>> {
    return this.request('/admin/events', {
      method: 'POST',
      body: JSON.stringify(data)
    }, true);
  }

  async updateEvent(id: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }, true);
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.request(`/admin/events/${id}`, { method: 'DELETE' }, true);
  }

  // ==================== MÉTHODES FABLAB ====================

  /**
   * Vérification d'abonnement FabLab
   */
  async verifyFabLabSubscription(accessKey: string): Promise<ApiResponse<{
    user: any;
    subscription: any;
  }>> {
    return this.request('/fablab/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ accessKey })
    });
  }

  /**
   * Obtenir les machines disponibles
   */
  async getFabLabMachines(): Promise<ApiResponse<any[]>> {
    return this.request('/fablab/machines', { method: 'GET' });
  }

  /**
   * Créer une réservation
   */
  async createReservation(data: {
    machineId: string;
    startTime: string;
    endTime: string;
    projectDescription: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/fablab/reservations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Obtenir les réservations de l'utilisateur
   */
  async getUserReservations(): Promise<ApiResponse<any[]>> {
    return this.request('/fablab/reservations/user', { method: 'GET' });
  }

  /**
   * Annuler une réservation
   */
  async cancelReservation(id: string): Promise<ApiResponse<void>> {
    return this.request(`/fablab/reservations/${id}/cancel`, { method: 'POST' });
  }

  // ==================== MÉTHODES PUBLIQUES ====================

  /**
   * Obtenir les formations ouvertes
   */
  async getOpenFormations(): Promise<ApiResponse<any[]>> {
    return this.request('/public/formations/open', { method: 'GET' });
  }

  /**
   * Soumettre une inscription FabLab
   */
  async submitFabLabApplication(data: any): Promise<ApiResponse<any>> {
    return this.request('/public/applications/fablab', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Soumettre une candidature ISTMR
   */
  async submitISTMRApplication(data: any): Promise<ApiResponse<any>> {
    return this.request('/public/applications/istmr', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Obtenir les événements publics
   */
  async getPublicEvents(): Promise<ApiResponse<any[]>> {
    return this.request('/public/events', { method: 'GET' });
  }

  /**
   * Upload de fichiers
   */
  async uploadFile(file: File, type: 'document' | 'image' | 'avatar'): Promise<ApiResponse<{
    url: string;
    filename: string;
  }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Laisser le navigateur définir le Content-Type pour FormData
    });
  }

  // ==================== MÉTHODES UTILITAIRES ====================

  /**
   * Vérifier la santé de l'API
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/health', { method: 'GET' });
  }

  /**
   * Obtenir la configuration publique
   */
  async getPublicConfig(): Promise<ApiResponse<any>> {
    return this.request('/config', { method: 'GET' });
  }
}

// Instance singleton
export const apiService = new ApiService();

// Hook React pour utiliser l'API
export const useApi = () => {
  return {
    // Admin
    adminLogin: apiService.adminLogin.bind(apiService),
    getDashboardStats: apiService.getDashboardStats.bind(apiService),
    getISTMRFormations: apiService.getISTMRFormations.bind(apiService),
    getFabLabInscriptions: apiService.getFabLabInscriptions.bind(apiService),
    approveFabLabInscription: apiService.approveFabLabInscription.bind(apiService),
    rejectFabLabInscription: apiService.rejectFabLabInscription.bind(apiService),
    
    // FabLab
    verifyFabLabSubscription: apiService.verifyFabLabSubscription.bind(apiService),
    getFabLabMachines: apiService.getFabLabMachines.bind(apiService),
    createReservation: apiService.createReservation.bind(apiService),
    getUserReservations: apiService.getUserReservations.bind(apiService),
    
    // Public
    getOpenFormations: apiService.getOpenFormations.bind(apiService),
    submitFabLabApplication: apiService.submitFabLabApplication.bind(apiService),
    getPublicEvents: apiService.getPublicEvents.bind(apiService),
    
    // Utilitaires
    uploadFile: apiService.uploadFile.bind(apiService),
    healthCheck: apiService.healthCheck.bind(apiService),
  };
};
