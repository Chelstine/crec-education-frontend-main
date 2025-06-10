// Services pour les appels API
// Configuration pour connexion backend

import axios, { AxiosResponse, AxiosError } from 'axios';
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
  Testimonial
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Configuration d'Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification automatiquement
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('userToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Configuration des endpoints (relatifs à la base URL)
export const API_ENDPOINTS = {
  // Projets Fablab
  projects: {
    getAll: '/projects',
    getById: (id: string) => `/projects/${id}`,
    getByCategory: (category: string) => `/projects?category=${category}`,
    create: '/projects',
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
  },
  
  // Machines et équipements
  machines: {
    getAll: '/machines',
    getAvailable: '/machines?available=true',
    getById: (id: string) => `/machines/${id}`,
  },
  
  // Configuration des prix
  pricing: {
    getConfig: '/pricing/config',
    updateConfig: '/pricing/config',
  },
  
  // Contact
  contact: {
    send: '/contact',
    getContactInfo: '/contact/info',
  },
  
  // Formations et inscriptions
  formations: {
    getAll: '/formations',
    getById: (id: string) => `/formations/${id}`,
    getUniversity: '/formations/university',
    getOpenFormations: '/formations/ouvertes',
    getPrograms: '/formations/programs',
    inscription: '/formations/inscription',
    universityApplication: '/formations/university/application',
  },
  
  // Événements
  events: {
    getAll: '/events',
    getById: (id: string) => `/events/${id}`,
    getUpcoming: '/events?upcoming=true',
    getCalendar: '/events/calendar',
  },
  
  // News et actualités
  news: {
    getAll: '/news',
    getById: (id: string) => `/news/${id}`,
    getLatest: '/news?latest=true',
    getByCategory: (category: string) => `/news?category=${category}`,
  },
  
  // Témoignages
  testimonials: {
    getAll: '/testimonials',
    getApproved: '/testimonials?approved=true',
    submit: '/testimonials',
  },
  
  // Réservations
  reservations: {
    create: '/reservations',
    getByUser: (userId: string) => `/reservations/user/${userId}`,
    getAvailableSlots: '/reservations/available-slots',
    cancel: (id: string) => `/reservations/${id}/cancel`,
  },
  
  // Abonnements
  subscriptions: {
    create: '/subscriptions',
    getPlans: '/subscriptions/plans',
    cancel: (id: string) => `/subscriptions/${id}/cancel`,
  },
  
  // Donations
  donations: {
    create: '/donations',
    getStats: '/donations/stats',
    processPayment: '/donations/payment',
  },
  
  // Stages et emplois
  stages: {
    getAll: '/stages',
    getById: (id: string) => `/stages/${id}`,
    apply: '/stages/apply',
  },
};

// Generic error handler
export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || 'Une erreur est survenue';
    console.error('API Error:', message);
    return message;
  }
  console.error('Unknown error:', error);
  return 'Une erreur inattendue est survenue';
};

// Fonction utilitaire pour les appels API avec Axios
export const apiCall = async <T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
  } = {}
): Promise<T> => {
  try {
    const response = await apiClient({
      url: endpoint,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ===== SERVICES SPÉCIFIQUES =====

// Projects Service
export class ProjectService {
  static async getAll(): Promise<ApiResponse<Project[]>> {
    return apiCall<ApiResponse<Project[]>>(API_ENDPOINTS.projects.getAll);
  }

  static async getByCategory(category: string): Promise<ApiResponse<Project[]>> {
    return apiCall<ApiResponse<Project[]>>(API_ENDPOINTS.projects.getByCategory(category));
  }

  static async getById(id: string): Promise<ApiResponse<Project>> {
    return apiCall<ApiResponse<Project>>(API_ENDPOINTS.projects.getById(id));
  }

  static async create(project: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    return apiCall<ApiResponse<Project>>(API_ENDPOINTS.projects.create, {
      method: 'POST',
      data: project,
    });
  }

  static async update(id: string, project: Partial<Project>): Promise<ApiResponse<Project>> {
    return apiCall<ApiResponse<Project>>(API_ENDPOINTS.projects.update(id), {
      method: 'PUT',
      data: project,
    });
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    return apiCall<ApiResponse<void>>(API_ENDPOINTS.projects.delete(id), {
      method: 'DELETE',
    });
  }
}

// Machines Service 
export class MachineService {
  static async getAll(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.machines.getAll);
  }

  static async getAvailable(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.machines.getAvailable);
  }

  static async getById(id: string): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.machines.getById(id));
  }
}

// Contact Service
export class ContactService {
  static async sendMessage(data: ContactForm): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.contact.send, {
      method: 'POST',
      data,
    });
  }

  static async getContactInfo(): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.contact.getContactInfo);
  }
}

// Formations Service
export class FormationService {
  static async getAll(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.formations.getAll);
  }

  static async getUniversity(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.formations.getUniversity);
  }

  static async getOpenFormations(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.formations.getOpenFormations);
  }

  static async getPrograms(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.formations.getPrograms);
  }

  static async submitInscription(data: InscriptionForm): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.formations.inscription, {
      method: 'POST',
      data,
    });
  }

  static async submitUniversityApplication(data: any): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.formations.universityApplication, {
      method: 'POST',
      data,
    });
  }


}

// Events Service
export class EventService {
  static async getAll(): Promise<ApiResponse<Event[]>> {
    return apiCall<ApiResponse<Event[]>>(API_ENDPOINTS.events.getAll);
  }

  static async getById(id: string): Promise<ApiResponse<Event>> {
    return apiCall<ApiResponse<Event>>(API_ENDPOINTS.events.getById(id));
  }

  static async getUpcoming(): Promise<ApiResponse<Event[]>> {
    return apiCall<ApiResponse<Event[]>>(API_ENDPOINTS.events.getUpcoming);
  }

  static async getCalendar(): Promise<ApiResponse<Event[]>> {
    return apiCall<ApiResponse<Event[]>>(API_ENDPOINTS.events.getCalendar);
  }
}

// News Service
export class NewsService {
  static async getAll(): Promise<ApiResponse<Article[]>> {
    return apiCall<ApiResponse<Article[]>>(API_ENDPOINTS.news.getAll);
  }

  static async getById(id: string): Promise<ApiResponse<Article>> {
    return apiCall<ApiResponse<Article>>(API_ENDPOINTS.news.getById(id));
  }

  static async getLatest(): Promise<ApiResponse<Article[]>> {
    return apiCall<ApiResponse<Article[]>>(API_ENDPOINTS.news.getLatest);
  }

  static async getByCategory(category: string): Promise<ApiResponse<Article[]>> {
    return apiCall<ApiResponse<Article[]>>(API_ENDPOINTS.news.getByCategory(category));
  }
}

// Testimonials Service
export class TestimonialService {
  static async getAll(): Promise<ApiResponse<Testimonial[]>> {
    return apiCall<ApiResponse<Testimonial[]>>(API_ENDPOINTS.testimonials.getAll);
  }

  static async getApproved(): Promise<ApiResponse<Testimonial[]>> {
    return apiCall<ApiResponse<Testimonial[]>>(API_ENDPOINTS.testimonials.getApproved);
  }

  static async submit(data: any): Promise<ApiResponse<Testimonial>> {
    return apiCall<ApiResponse<Testimonial>>(API_ENDPOINTS.testimonials.submit, {
      method: 'POST',
      data,
    });
  }
}

// Reservations Service
export class ReservationService {
  static async create(data: ReservationForm): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.reservations.create, {
      method: 'POST',
      data,
    });
  }

  static async getByUser(userId: string): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.reservations.getByUser(userId));
  }

  static async getAvailableSlots(): Promise<ApiResponse<any[]>> {
    return apiCall<ApiResponse<any[]>>(API_ENDPOINTS.reservations.getAvailableSlots);
  }

  static async cancel(id: string): Promise<ApiResponse<void>> {
    return apiCall<ApiResponse<void>>(API_ENDPOINTS.reservations.cancel(id), {
      method: 'DELETE',
    });
  }
}

// Donations Service
export class DonationService {
  static async create(data: DonationForm): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.donations.create, {
      method: 'POST',
      data,
    });
  }

  static async getStats(): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.donations.getStats);
  }

  static async processPayment(data: any): Promise<ApiResponse<any>> {
    return apiCall<ApiResponse<any>>(API_ENDPOINTS.donations.processPayment, {
      method: 'POST',
      data,
    });
  }


}

// Pricing Service
export class PricingService {
  static async getConfig(): Promise<ApiResponse<PricingConfig>> {
    return apiCall<ApiResponse<PricingConfig>>(API_ENDPOINTS.pricing.getConfig);
  }

  static async updateConfig(config: PricingConfig): Promise<ApiResponse<PricingConfig>> {
    return apiCall<ApiResponse<PricingConfig>>(API_ENDPOINTS.pricing.updateConfig, {
      method: 'PUT',
      data: config,
    });
  }
}

// ===== FABLAB SUBSCRIPTIONS API =====
export const FablabSubscriptionService = {
  // Obtenir tous les abonnements
  async getAllSubscriptions(): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get('/fablab/subscriptions');
    return response.data;
  },

  // Créer un nouvel abonnement
  async createSubscription(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subscriptionType: 'monthly' | 'yearly';
    paymentMethod: 'mobile_money' | 'bank_transfer';
    paymentReceipt: File;
  }): Promise<ApiResponse<{ subscriptionId: string; subscriptionKey: string }>> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await apiClient.post('/fablab/subscriptions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Vérifier un abonnement avec nom + clé
  async verifySubscription(name: string, subscriptionKey: string): Promise<ApiResponse<{
    isValid: boolean;
    subscription?: any;
    remainingHours?: number;
    isBlocked?: boolean;
  }>> {
    const response = await apiClient.post('/fablab/subscriptions/verify', {
      name,
      subscriptionKey
    });
    return response.data;
  },

  // Obtenir le rapport d'utilisation
  async getUsageReport(subscriptionId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.get(`/fablab/subscriptions/${subscriptionId}/usage`);
    return response.data;
  },

  // Méthodes pour la gestion des abonnements FabLab
  async getSubscriptions(): Promise<any[]> {
    try {
      const response = await apiClient.get('/fablab/subscriptions');
      return response.data?.data || [];
    } catch (error) {
      console.error('Erreur lors du chargement des abonnements:', error);
      return [];
    }
  },

  async validateSubscription(subscriptionId: string): Promise<void> {
    await apiClient.put(`/fablab/subscriptions/${subscriptionId}/validate`);
  },

  async rejectSubscription(subscriptionId: string, reason?: string): Promise<void> {
    await apiClient.put(`/fablab/subscriptions/${subscriptionId}/reject`, { reason });
  },

  async generateAccessKey(subscriptionId: string, accessKey: any): Promise<void> {
    await apiClient.post(`/fablab/subscriptions/${subscriptionId}/access-key`, accessKey);
  },

  async sendAccessKey(subscriptionId: string, keyCode: string): Promise<void> {
    await apiClient.post(`/fablab/subscriptions/${subscriptionId}/send-key`, { keyCode });
  },
};

// ===== FABLAB RESERVATIONS API =====
export const FablabReservationService = {
  // Créer une réservation
  async createReservation(data: {
    subscriptionId: string;
    machineId: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }): Promise<ApiResponse<any>> {
    const response = await apiClient.post('/fablab/reservations', data);
    return response.data;
  },

  // Obtenir les réservations d'un utilisateur
  async getUserReservations(subscriptionId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get(`/fablab/reservations/subscription/${subscriptionId}`);
    return response.data;
  },

  // Obtenir les créneaux disponibles pour une machine
  async getAvailableSlots(machineId: string, date: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get(`/fablab/machines/${machineId}/available-slots?date=${date}`);
    return response.data;
  },

  // Annuler une réservation
  async cancelReservation(reservationId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/fablab/reservations/${reservationId}`);
    return response.data;
  }
};

// ===== FABLAB MACHINES API =====
export const FablabMachineService = {
  // Obtenir toutes les machines avec tarifs
  async getAllMachines(): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get('/fablab/machines');
    return response.data;
  },

  // Obtenir les tarifs horaires
  async getHourlyRates(): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get('/fablab/machines/rates');
    return response.data;
  },

  // Obtenir une machine spécifique
  async getMachine(machineId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.get(`/fablab/machines/${machineId}`);
    return response.data;
  }
};
