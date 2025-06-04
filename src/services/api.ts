// Services pour les appels API
// Configuration pour connexion backend

import { 
  Project, 
  PricingConfig, 
  ApiResponse, 
  ContactForm, 
  InscriptionForm, 
  ReservationForm, 
  DonationForm,
  Event,
  Article,
  Testimonial,
  AdminLoginForm,
  AdminTokenResponse,
  AdminDashboardStats,
  AdminUser,
  EditablePage
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configuration des endpoints
export const API_ENDPOINTS = {
  // Projets Fablab
  projects: {
    getAll: `${API_BASE_URL}/projects`,
    getById: (id: string) => `${API_BASE_URL}/projects/${id}`,
    getByCategory: (category: string) => `${API_BASE_URL}/projects?category=${category}`,
    create: `${API_BASE_URL}/projects`,
    update: (id: string) => `${API_BASE_URL}/projects/${id}`,
    delete: (id: string) => `${API_BASE_URL}/projects/${id}`,
  },
  
  // Machines et équipements
  machines: {
    getAll: `${API_BASE_URL}/machines`,
    getAvailable: `${API_BASE_URL}/machines?available=true`,
    getById: (id: string) => `${API_BASE_URL}/machines/${id}`,
  },
  
  // Configuration des prix
  pricing: {
    getConfig: `${API_BASE_URL}/pricing/config`,
    updateConfig: `${API_BASE_URL}/pricing/config`,
  },
  
  // Contact
  contact: {
    send: `${API_BASE_URL}/contact`,
    getContactInfo: `${API_BASE_URL}/contact/info`,
  },
  
  // Formations et inscriptions
  formations: {
    getAll: `${API_BASE_URL}/formations`,
    getById: (id: string) => `${API_BASE_URL}/formations/${id}`,
    getUniversity: `${API_BASE_URL}/formations/university`,
    getOpenFormations: `${API_BASE_URL}/formations/open`,
    getPrograms: `${API_BASE_URL}/formations/programs`,
    inscription: `${API_BASE_URL}/formations/inscription`,
    universityApplication: `${API_BASE_URL}/formations/university/application`,
  },
  
  // Événements
  events: {
    getAll: `${API_BASE_URL}/events`,
    getById: (id: string) => `${API_BASE_URL}/events/${id}`,
    getUpcoming: `${API_BASE_URL}/events?upcoming=true`,
    getCalendar: `${API_BASE_URL}/events/calendar`,
  },
  
  // News et actualités
  news: {
    getAll: `${API_BASE_URL}/news`,
    getById: (id: string) => `${API_BASE_URL}/news/${id}`,
    getLatest: `${API_BASE_URL}/news?latest=true`,
    getByCategory: (category: string) => `${API_BASE_URL}/news?category=${category}`,
  },
  
  // Témoignages
  testimonials: {
    getAll: `${API_BASE_URL}/testimonials`,
    getApproved: `${API_BASE_URL}/testimonials?approved=true`,
    submit: `${API_BASE_URL}/testimonials`,
  },
  
  // Réservations
  reservations: {
    create: `${API_BASE_URL}/reservations`,
    getByUser: (userId: string) => `${API_BASE_URL}/reservations/user/${userId}`,
    getAvailableSlots: `${API_BASE_URL}/reservations/available-slots`,
    cancel: (id: string) => `${API_BASE_URL}/reservations/${id}/cancel`,
  },
  
  // Abonnements
  subscriptions: {
    create: `${API_BASE_URL}/subscriptions`,
    getPlans: `${API_BASE_URL}/subscriptions/plans`,
    cancel: (id: string) => `${API_BASE_URL}/subscriptions/${id}/cancel`,
  },
  
  // Donations
  donations: {
    create: `${API_BASE_URL}/donations`,
    getStats: `${API_BASE_URL}/donations/stats`,
    processPayment: `${API_BASE_URL}/donations/payment`,
  },
  
  // Stages et emplois
  stages: {
    getAll: `${API_BASE_URL}/stages`,
    getById: (id: string) => `${API_BASE_URL}/stages/${id}`,
    apply: `${API_BASE_URL}/stages/apply`,
  },
  
  // Administration
  admin: {
    login: `${API_BASE_URL}/admin/login`,
    dashboard: `${API_BASE_URL}/admin/dashboard`,
    users: {
      getAll: `${API_BASE_URL}/admin/users`,
      getById: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
      create: `${API_BASE_URL}/admin/users`,
      update: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
      delete: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    },
    // Gestion des pages éditables (about, etc.)
    pages: {
      getAll: `${API_BASE_URL}/admin/pages`,
      getBySlug: (slug: string) => `${API_BASE_URL}/admin/pages/${slug}`,
      update: (slug: string) => `${API_BASE_URL}/admin/pages/${slug}`,
    },
  },
};

// Headers par défaut pour les requêtes
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

// Headers avec authentification (pour futures fonctionnalités admin)
export const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...getDefaultHeaders(),
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Fonction utilitaire pour les appels API (préparation future)
export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(endpoint, {
    headers: getDefaultHeaders(),
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Services spécifiques (à implémenter quand le backend sera prêt)
export class ProjectService {
  static async getAll() {
    // TODO: Connecter au backend
    // return apiCall<ApiResponse<Project[]>>(API_ENDPOINTS.projects.getAll);
    throw new Error('Backend not implemented yet');
  }

  static async getByCategory(category: string) {
    // TODO: Connecter au backend
    throw new Error('Backend not implemented yet');
  }

  static async create(project: Omit<Project, 'id'>) {
    // TODO: Connecter au backend
    throw new Error('Backend not implemented yet');
  }
}

export class MachineService {
  static async getAll() {
    // TODO: Connecter au backend
    throw new Error('Backend not implemented yet');
  }

  static async getAvailable() {
    // TODO: Connecter au backend
    throw new Error('Backend not implemented yet');
  }
}

export class PricingService {
  static async getConfig() {
    // TODO: Connecter au backend
    throw new Error('Backend not implemented yet');
  }

  static async updateConfig(config: PricingConfig) {
    // TODO: Connecter au backend (admin only)
    throw new Error('Backend not implemented yet');
  }
}

// ===== ADMIN SERVICES =====
export class AdminService {
  static async login(data: AdminLoginForm) {
    return apiCall<AdminTokenResponse>(API_ENDPOINTS.admin.login, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getDashboardStats() {
    return apiCall<AdminDashboardStats>(API_ENDPOINTS.admin.dashboard, {
      headers: getAuthHeaders(),
    });
  }

  static async getAllUsers() {
    return apiCall<AdminUser[]>(API_ENDPOINTS.admin.users.getAll, {
      headers: getAuthHeaders(),
    });
  }

  static async updateUser(id: string, data: Partial<AdminUser>) {
    return apiCall<AdminUser>(API_ENDPOINTS.admin.users.update(id), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  }

  static async deleteUser(id: string) {
    return apiCall<void>(API_ENDPOINTS.admin.users.delete(id), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  }

  // Gestion des pages éditables (about, etc.)
  static async getAllPages() {
    return apiCall<EditablePage[]>(API_ENDPOINTS.admin.pages.getAll, {
      headers: getAuthHeaders(),
    });
  }

  static async getPageBySlug(slug: string) {
    return apiCall<EditablePage>(API_ENDPOINTS.admin.pages.getBySlug(slug), {
      headers: getAuthHeaders(),
    });
  }

  static async updatePage(slug: string, data: Partial<EditablePage>) {
    return apiCall<EditablePage>(API_ENDPOINTS.admin.pages.update(slug), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  }
}
